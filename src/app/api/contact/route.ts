import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, organization, message, website } = body;

    // 1. Protection Anti-Spam Honeypot
    if (website) {
      return NextResponse.json({ success: true, message: 'Message envoyé' }, { status: 200 });
    }

    // 2. Validation des champs requis
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Veuillez fournir un nom, un email et un message.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_NOTIFICATION_EMAIL || 'fulamaantoine@gmail.com';

    // 3. Traitement via Resend si la clé API est présente
    if (apiKey) {
      const resend = new Resend(apiKey);

      await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: recipientEmail,
        replyTo: email,
        subject: `Nouveau Message Portfolio — ${name}`,
        html: `
          <div font-family="sans-serif" style="max-width: 600px; margin: 0 auto; background: #09090B; color: #EDEDED; padding: 24px; border: 1px solid #27272A; border-radius: 6px;">
            <h2 style="color: #EDEDED; border-bottom: 1px solid #27272A; padding-bottom: 12px;">Nouveau Message Portfolio Direct</h2>
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Organisation :</strong> ${organization || 'Non spécifiée'}</p>
            <hr style="border-color: #27272A;" />
            <h3 style="color: #A1A1AA;">Message :</h3>
            <p style="white-space: pre-line; line-height: 1.6; background: #141416; padding: 16px; border-radius: 4px; border: 1px solid #27272A;">${message}</p>
          </div>
        `,
      });
    } else {
      console.log('RESEND_API_KEY absente. Simulation d\'envoi d\'email en local :', { name, email, organization, message });
    }

    return NextResponse.json(
      { success: true, message: 'Votre message a été transmis avec succès.' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Erreur de la route API contact:', error);
    return NextResponse.json(
      { success: false, message: 'Une erreur est survenue lors de l\'envoi du message.' },
      { status: 500 }
    );
  }
}

