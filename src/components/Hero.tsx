import React from 'react';
import Image from 'next/image';
import { ArrowDownRight, Mail, MapPin, ShieldCheck, Award } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-36 pb-24 md:pt-44 md:pb-32 border-b border-[#c5a059]/20 bg-[#0b0c10] relative">
      
      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Official Framed Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-72 sm:w-80 lg:w-full max-w-sm aspect-[3/4] rounded-sm p-2 bg-[#12141c] border-2 border-[#c5a059]/40 shadow-2xl">
              
              {/* Inner portrait frame */}
              <div className="relative w-full h-full rounded-sm overflow-hidden border border-[#c5a059]/30 bg-[#0b0c10]">
                <Image
                  src="/avatar.jpg"
                  alt="Ir. Isaac FULAMA MATONDO"
                  fill
                  priority
                  className="object-cover object-center filter contrast-[1.03]"
                  sizes="(max-width: 768px) 320px, 400px"
                />
              </div>

              {/* Portrait Badge Overlay */}
              <div className="absolute -bottom-4 left-6 right-6 bg-[#12141c] border border-[#c5a059]/50 px-4 py-2.5 shadow-xl flex items-center justify-between font-mono text-[11px] text-[#f4f1ea]">
                <span className="flex items-center gap-2 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse"></span>
                  INGÉNIEUR D'ÉTAT
                </span>
                <span className="text-[#9ca3af]">KINSHASA, RDC</span>
              </div>
            </div>
          </div>

          {/* Right Column: Distinguished Profile Header */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Header Kicker */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-sm bg-[#12141c] border border-[#c5a059]/30 font-mono text-xs text-[#c5a059] tracking-wider uppercase">
              <Award className="w-4 h-4 text-[#c5a059]" />
              <span>ARCHITECTE LOGICIEL & INGÉNIEUR INFORMATICIEN</span>
            </div>

            {/* Name & Official Title */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-[#f4f1ea] leading-[1.1]">
                Ir. Isaac FULAMA MATONDO
              </h1>
              <p className="text-lg sm:text-xl font-sans font-medium text-[#c5a059] leading-snug">
                Architecte Logiciel & Développeur Full-Stack <br className="hidden sm:inline" />
                <span className="text-[#9ca3af] font-normal">
                  Spécialiste Clean Architecture & SaaS B2B
                </span>
              </p>
            </div>

            {/* Tagline Obligatoire */}
            <blockquote className="p-5 rounded-sm border-l-2 border-[#c5a059] bg-[#12141c] text-[#f4f1ea] font-serif italic text-base sm:text-lg leading-relaxed shadow-sm">
              « Je conçois des architectures logiciels robustes et adaptées aux contraintes du terrain. »
            </blockquote>

            {/* Badges / Values */}
            <div className="flex flex-wrap gap-2.5 pt-1 font-mono text-xs text-[#9ca3af]">
              <span className="px-3 py-1.5 rounded-sm bg-[#12141c] border border-[#c5a059]/20 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" /> Clean Architecture & DDD
              </span>
              <span className="px-3 py-1.5 rounded-sm bg-[#12141c] border border-[#c5a059]/20 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#c5a059]" /> Kinshasa, RDC
              </span>
              <span className="px-3 py-1.5 rounded-sm bg-[#12141c] border border-[#c5a059]/20">
                Paiements Mobile Money & Cloud Resilient
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 pt-4 font-mono text-xs">
              <a
                href="#projets"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm bg-[#c5a059] text-[#0b0c10] font-serif font-bold hover:bg-[#e2c27b] transition-all duration-300 shadow-lg text-sm"
              >
                <span>CONSULTER LES RÉALISATIONS</span>
                <ArrowDownRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm bg-[#12141c] text-[#f4f1ea] border border-[#c5a059]/40 hover:border-[#c5a059] hover:bg-[#1c1f2e] transition-all duration-300 text-sm font-serif"
              >
                <Mail className="w-4 h-4 text-[#c5a059]" />
                <span>CORRESPONDANCE & CONTACT</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
