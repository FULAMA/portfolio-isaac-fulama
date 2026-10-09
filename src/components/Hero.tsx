import React from 'react';
import Image from 'next/image';
import { ArrowDownRight, Mail, MapPin, ShieldCheck, Cpu } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 border-b border-[#27272A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Colonne Gauche : Photo de profil officielle */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <div className="relative w-64 sm:w-72 lg:w-full max-w-xs aspect-[4/5] rounded-md overflow-hidden border border-[#27272A] bg-[#141416] p-1.5 shadow-2xl">
              <div className="relative w-full h-full rounded sm:rounded-sm overflow-hidden bg-zinc-900">
                <Image
                  src="/avatar.jpg"
                  alt="Ir. Isaac FULAMA MATONDO"
                  fill
                  priority
                  className="object-cover object-top filter grayscale contrast-[1.05]"
                  sizes="(max-width: 768px) 280px, 340px"
                />
              </div>
              <div className="absolute bottom-3 left-3 right-3 bg-[#09090B]/90 backdrop-blur border border-[#27272A] px-3 py-1.5 rounded flex items-center justify-between font-mono text-[11px] text-[#A1A1AA]">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  DISPONIBLE
                </span>
                <span>KINSHASA, RDC</span>
              </div>
            </div>
          </div>

          {/* Colonne Droite : Informations Profil */}
          <div className="lg:col-span-8 space-y-6 text-left">
            
            {/* Tag / Status Header */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#141416] border border-[#27272A] font-mono text-xs text-[#A1A1AA]">
              <Cpu className="w-3.5 h-3.5 text-zinc-400" />
              <span>INGÉNIERIE LOGICIELLE & ARCHITECTURE SYSTEMS</span>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#EDEDED]">
                Ir. Isaac FULAMA MATONDO
              </h1>
              <p className="text-lg sm:text-xl font-medium text-zinc-300 leading-snug">
                Architecte Logiciel & Développeur Full-Stack <br className="hidden sm:inline" />
                <span className="text-[#A1A1AA] font-normal">
                  Spécialiste Clean Architecture & SaaS B2B
                </span>
              </p>
            </div>

            {/* Tagline Obligatoire */}
            <blockquote className="p-4 rounded border-l-2 border-zinc-600 bg-[#141416] text-[#EDEDED] font-serif italic text-base sm:text-lg leading-relaxed">
              « Je conçois des architectures logiciels robustes et adaptées aux contraintes du terrain. »
            </blockquote>

            {/* Badges de spécialisations */}
            <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs text-[#A1A1AA]">
              <span className="px-2.5 py-1 rounded bg-[#141416] border border-[#27272A]">
                <ShieldCheck className="w-3 h-3 inline mr-1 text-zinc-400" /> Clean Architecture & DDD
              </span>
              <span className="px-2.5 py-1 rounded bg-[#141416] border border-[#27272A]">
                <MapPin className="w-3 h-3 inline mr-1 text-zinc-400" /> Kinshasa, RDC
              </span>
              <span className="px-2.5 py-1 rounded bg-[#141416] border border-[#27272A]">
                Mobile Money & Cloud Resilient
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 pt-4 font-mono text-xs">
              <a
                href="#projets"
                className="inline-flex items-center gap-2 px-5 py-3 rounded bg-[#EDEDED] text-[#09090B] font-semibold hover:bg-white transition-all shadow-sm"
              >
                <span>VOIR LES PROJETS</span>
                <ArrowDownRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded bg-[#141416] text-[#EDEDED] border border-[#27272A] hover:bg-[#1a1a1d] hover:border-[#3f3f46] transition-all"
              >
                <Mail className="w-4 h-4 text-[#A1A1AA]" />
                <span>ME CONTACTER</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

