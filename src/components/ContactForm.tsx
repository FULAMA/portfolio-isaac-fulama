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

    // Verification du Honeypot anti-spam
    if (formData.website) {
      // Un robot a rempli le champ caché
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
    <section id="contact" className="py-20 border-b border-[#27272A] bg-[#09090B]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="font-mono text-xs text-[#A1A1AA] uppercase tracking-wider mb-2">04 // PRISE DE CONTACT DIRECTE</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#EDEDED] tracking-tight">
            Me Contacter & Canaux Directs
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Direct Channels Column */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              Pour toute opportunité d'architecture système, de mission de conseil en ingénierie logicielle ou d'intégration SaaS B2B, vous pouvez me joindre directement via les coordonnées ci-dessous :
            </p>

            <div className="space-y-4 font-mono text-xs">
              
              <div className="p-4 rounded bg-[#141416] border border-[#27272A] flex items-center gap-3">
                <div className="p-2 rounded bg-[#09090B] border border-[#27272A] text-[#EDEDED]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[#A1A1AA] text-[10px] uppercase">EMAIL PRINCIPAL</div>
                  <a href="mailto:fulamaantoine@gmail.com" className="text-[#EDEDED] hover:underline font-semibold text-sm">
                    fulamaantoine@gmail.com
                  </a>
                </div>
              </div>

              <div className="p-4 rounded bg-[#141416] border border-[#27272A] flex items-center gap-3">
                <div className="p-2 rounded bg-[#09090B] border border-[#27272A] text-[#EDEDED]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[#A1A1AA] text-[10px] uppercase">TÉLÉPHONES & WHATSAPP</div>
                  <div className="text-[#EDEDED] font-semibold text-xs space-y-0.5">
                    <div>+243 852 382 067</div>
                    <div>+243 890 772 161</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded bg-[#141416] border border-[#27272A] flex items-center gap-3">
                <div className="p-2 rounded bg-[#09090B] border border-[#27272A] text-[#EDEDED]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[#A1A1AA] text-[10px] uppercase">LOCALISATION</div>
                  <div className="text-[#EDEDED] font-semibold text-xs">
                    Kinshasa, République Démocratique du Congo
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded bg-[#141416] border border-[#27272A]">
              <h3 className="font-mono text-xs uppercase tracking-wider text-[#EDEDED] font-bold mb-6">
                FORMULAIRE DE CONTACT PROFESSIONNEL
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field (caché pour piéger les bots) */}
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
                    <label htmlFor="name" className="block font-mono text-xs text-[#A1A1AA] mb-1">
                      Nom complet <span className="text-zinc-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ir. Jean Dupont"
                      className="w-full px-3.5 py-2.5 rounded bg-[#09090B] border border-[#27272A] text-[#EDEDED] placeholder-zinc-600 font-mono text-xs focus:outline-none focus:border-zinc-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-mono text-xs text-[#A1A1AA] mb-1">
                      Adresse Email <span className="text-zinc-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jean.dupont@entreprise.com"
                      className="w-full px-3.5 py-2.5 rounded bg-[#09090B] border border-[#27272A] text-[#EDEDED] placeholder-zinc-600 font-mono text-xs focus:outline-none focus:border-zinc-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="organization" className="block font-mono text-xs text-[#A1A1AA] mb-1">
                    Organisation / Établissement
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="Nom de l'entreprise ou institution"
                    className="w-full px-3.5 py-2.5 rounded bg-[#09090B] border border-[#27272A] text-[#EDEDED] placeholder-zinc-600 font-mono text-xs focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-mono text-xs text-[#A1A1AA] mb-1">
                    Message <span className="text-zinc-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Décrivez votre besoin d'architecture ou de projet..."
                    className="w-full px-3.5 py-2.5 rounded bg-[#09090B] border border-[#27272A] text-[#EDEDED] placeholder-zinc-600 font-mono text-xs focus:outline-none focus:border-zinc-500"
                  ></textarea>
                </div>

                {/* Notifications Status */}
                {status === 'success' && (
                  <div className="p-3.5 rounded bg-emerald-950/60 border border-emerald-800 text-emerald-300 font-mono text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Votre message a été transmis avec succès. Merci !</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-3.5 rounded bg-rose-950/60 border border-rose-800 text-rose-300 font-mono text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 rounded bg-[#EDEDED] text-[#09090B] font-mono text-xs font-bold hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <span>ENVOI EN COURS...</span>
                  ) : (
                    <>
                      <span>TRANSMETTRE LE MESSAGE</span>
                      <Send className="w-3.5 h-3.5" />
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

