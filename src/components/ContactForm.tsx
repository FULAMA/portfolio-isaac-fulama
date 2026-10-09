'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
    website: '', // Honeypot anti-spam
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.website) {
      setStatus('success');
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'envoi du message.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', organization: '', message: '', website: '' });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Une erreur est survenue. Écrivez directement à fulamaantoine@gmail.com');
    }
  };

  return (
    <section id="contact" className="py-24 border-b border-[#c5a059]/20 bg-[#0b0c10]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="font-mono text-xs text-[#c5a059] uppercase tracking-widest mb-2 font-semibold">
            V // PRISE DE CONTACT & CORRESPONDANCE
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#f4f1ea] tracking-tight">
            Canaux Directs & Correspondance
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Direct Channels Column */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-base text-[#9ca3af] leading-relaxed">
              Pour toute opportunité d'architecture système, de mission de conseil en ingénierie logicielle ou d'intégration SaaS B2B, vous pouvez me joindre directement via les coordonnées ci-dessous :
            </p>

            <div className="space-y-4 font-mono text-xs">
              
              <div className="p-5 rounded-sm bg-[#12141c] border border-[#c5a059]/30 flex items-center gap-4">
                <div className="p-3 rounded-sm bg-[#0b0c10] border border-[#c5a059]/40 text-[#c5a059]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[#c5a059] text-[10px] uppercase font-bold">EMAIL PRINCIPAL</div>
                  <a href="mailto:fulamaantoine@gmail.com" className="text-[#f4f1ea] hover:underline font-serif text-base font-semibold">
                    fulamaantoine@gmail.com
                  </a>
                </div>
              </div>

              <div className="p-5 rounded-sm bg-[#12141c] border border-[#c5a059]/30 flex items-center gap-4">
                <div className="p-3 rounded-sm bg-[#0b0c10] border border-[#c5a059]/40 text-[#c5a059]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[#c5a059] text-[10px] uppercase font-bold">TÉLÉPHONES & WHATSAPP</div>
                  <div className="text-[#f4f1ea] font-mono text-xs space-y-1 font-semibold mt-0.5">
                    <div>+243 852 382 067</div>
                    <div>+243 890 772 161</div>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-sm bg-[#12141c] border border-[#c5a059]/30 flex items-center gap-4">
                <div className="p-3 rounded-sm bg-[#0b0c10] border border-[#c5a059]/40 text-[#c5a059]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[#c5a059] text-[10px] uppercase font-bold">LOCALISATION</div>
                  <div className="text-[#f4f1ea] font-serif text-sm font-semibold">
                    Kinshasa, République Démocratique du Congo
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-sm bg-[#12141c] border border-[#c5a059]/30 shadow-xl">
              <h3 className="font-serif font-bold text-base uppercase tracking-wider text-[#f4f1ea] mb-6">
                FORMULAIRE DE CORRESPONDANCE
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field */}
                <div style={{ display: 'none' }}>
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block font-mono text-xs text-[#9ca3af] mb-1">
                      Nom complet <span className="text-[#c5a059]">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ir. Jean Dupont"
                      className="w-full px-4 py-3 rounded-sm bg-[#0b0c10] border border-[#c5a059]/30 text-[#f4f1ea] placeholder-zinc-600 font-mono text-xs focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-mono text-xs text-[#9ca3af] mb-1">
                      Adresse Email <span className="text-[#c5a059]">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jean.dupont@entreprise.com"
                      className="w-full px-4 py-3 rounded-sm bg-[#0b0c10] border border-[#c5a059]/30 text-[#f4f1ea] placeholder-zinc-600 font-mono text-xs focus:outline-none focus:border-[#c5a059]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="organization" className="block font-mono text-xs text-[#9ca3af] mb-1">
                    Organisation / Établissement
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="Nom de l'entreprise ou institution"
                    className="w-full px-4 py-3 rounded-sm bg-[#0b0c10] border border-[#c5a059]/30 text-[#f4f1ea] placeholder-zinc-600 font-mono text-xs focus:outline-none focus:border-[#c5a059]"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-mono text-xs text-[#9ca3af] mb-1">
                    Message <span className="text-[#c5a059]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Décrivez votre besoin d'architecture ou de projet..."
                    className="w-full px-4 py-3 rounded-sm bg-[#0b0c10] border border-[#c5a059]/30 text-[#f4f1ea] placeholder-zinc-600 font-mono text-xs focus:outline-none focus:border-[#c5a059]"
                  ></textarea>
                </div>

                {/* Notifications Status */}
                {status === 'success' && (
                  <div className="p-4 rounded-sm bg-emerald-950/80 border border-emerald-800 text-emerald-300 font-mono text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Votre message a été transmis avec succès. Merci !</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-4 rounded-sm bg-rose-950/80 border border-rose-800 text-rose-300 font-mono text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 rounded-sm bg-[#c5a059] text-[#0b0c10] font-serif font-bold text-sm hover:bg-[#e2c27b] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
                >
                  {status === 'loading' ? (
                    <span>TRANSMISSION EN COURS...</span>
                  ) : (
                    <>
                      <span>TRANSMETTRE LE MESSAGE</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
