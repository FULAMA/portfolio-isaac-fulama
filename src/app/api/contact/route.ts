import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const MAX_BODY_BYTES = 20_000;
const MAX_NAME_LENGTH = 120;
const MAX_ORGANIZATION_LENGTH = 160;
const MAX_MESSAGE_LENGTH = 10_000;

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[character] ?? character;
  });
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { success: false, message: 'Le message est trop volumineux.' },
      { status: 413 },
    );
  }

  let body: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) {
      return NextResponse.json(
        { success: false, message: 'Le corps de la requête est vide.' },
        { status: 400 },
      );
    }

    const chunks: Uint8Array[] = [];
    let totalBytes = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      totalBytes += value.byteLength;
      if (totalBytes > MAX_BODY_BYTES) {
        await reader.cancel();
        return NextResponse.json(
          { success: false, message: 'Le message est trop volumineux.' },
          { status: 413 },
        );
      }

      chunks.push(value);
    }

    const payload = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) {
      payload.set(chunk, offset);
      offset += chunk.byteLength;
    }

    body = JSON.parse(new TextDecoder().decode(payload));
  } catch {
    return NextResponse.json(
      { success: false, message: 'Le format de la requête est invalide.' },
      { status: 400 },
    );
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return NextResponse.json(
      { success: false, message: 'Les données du formulaire sont invalides.' },
      { status: 400 },
    );
  }

  const fields = body as Record<string, unknown>;
  const name = typeof fields.name === 'string' ? fields.name.trim() : '';
  const email = typeof fields.email === 'string' ? fields.email.trim() : '';
  const organization =
    typeof fields.organization === 'string' ? fields.organization.trim() : '';
  const message = typeof fields.message === 'string' ? fields.message.trim() : '';
  const website = typeof fields.website === 'string' ? fields.website.trim() : '';

  // Honeypot: respond successfully without sending an email to avoid exposing the filter.
  if (website) {
    return NextResponse.json({ success: true, message: 'Message envoyé.' });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { success: false, message: 'Veuillez fournir un nom, un email et un message.' },
      { status: 400 },
    );
  }

  if (
    name.length > MAX_NAME_LENGTH ||
    email.length > 254 ||
    organization.length > MAX_ORGANIZATION_LENGTH ||
    message.length > MAX_MESSAGE_LENGTH ||
    !isValidEmail(email)
  ) {
    return NextResponse.json(
      { success: false, message: 'Vérifiez les champs et leurs longueurs.' },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipientEmail = process.env.CONTACT_NOTIFICATION_EMAIL;

  if (!apiKey || !recipientEmail) {
    return NextResponse.json(
      { success: false, message: "Le service de contact n'est pas configuré." },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeOrganization = escapeHtml(organization || 'Non spécifiée');
    const safeMessage = escapeHtml(message);

    const { error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: recipientEmail,
      replyTo: email,
      subject: `Nouveau message portfolio — ${name.slice(0, 80)}`,
      text: [
        `Nom : ${name}`,
        `Email : ${email}`,
        `Organisation : ${organization || 'Non spécifiée'}`,
        '',
        message,
      ].join('\n'),
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: sans-serif; background: #09090B; color: #EDEDED; padding: 24px; border: 1px solid #27272A; border-radius: 6px;">
          <h2 style="color: #EDEDED; border-bottom: 1px solid #27272A; padding-bottom: 12px;">Nouveau message portfolio</h2>
          <p><strong>Nom :</strong> ${safeName}</p>
          <p><strong>Email :</strong> ${safeEmail}</p>
          <p><strong>Organisation :</strong> ${safeOrganization}</p>
          <hr style="border-color: #27272A;" />
          <h3 style="color: #A1A1AA;">Message :</h3>
          <p style="white-space: pre-line; line-height: 1.6; background: #141416; padding: 16px; border-radius: 4px; border: 1px solid #27272A;">${safeMessage}</p>
        </div>
      `,
    });

    if (error) {
      throw new Error('Le fournisseur email a refusé le message.');
    }

    return NextResponse.json(
      { success: true, message: 'Votre message a été transmis avec succès.' },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error('Erreur du service de contact:', error);
    return NextResponse.json(
      { success: false, message: "Une erreur est survenue lors de l'envoi du message." },
      { status: 502 },
    );
  }
}
