import React from 'react';
import Image from 'next/image';
import { ArrowDownRight, Mail, MapPin, ShieldCheck, Cpu, Code2, Layers } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-36 pb-20 md:pt-44 md:pb-28 border-b border-[#1e2234] bg-[#07080c] relative overflow-hidden">
      
      {/* Subtle Background Glow Spheres */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#10b981]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#3b82f6]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Official Profile Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-72 sm:w-80 lg:w-full max-w-sm aspect-[4/5] rounded-3xl p-3 bg-gradient-to-b from-[#1e2234] via-[#11131c] to-[#07080c] border border-[#1e2234] shadow-2xl shadow-emerald-950/20 group">
              
              {/* Photo Wrapper */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#07080c] border border-white/5">
                <Image
                  src="/avatar.jpg"
                  alt="Ir. Isaac FULAMA MATONDO"
                  fill
                  priority
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 320px, 400px"
                />
              </div>

              {/* Status Pill Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#07080c]/90 backdrop-blur-md border border-[#10b981]/40 px-4 py-2.5 rounded-xl shadow-xl flex items-center justify-between font-mono text-xs text-[#f3f4f6]">
                <span className="flex items-center gap-2 font-semibold text-[#10b981]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse"></span>
                  DISPONIBLE
                </span>
                <span className="text-[#9ca3af] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#10b981]" /> KINSHASA, RDC
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#11131c] border border-[#10b981]/30 font-mono text-xs text-[#10b981] font-semibold">
              <Cpu className="w-4 h-4 text-[#10b981]" />
              <span>ARCHITECTE LOGICIEL & INGÉNIEUR SYSTEMS</span>
            </div>

            {/* Name & Title */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Ir. Isaac FULAMA MATONDO
              </h1>
              <p className="text-lg sm:text-xl font-medium text-[#34d399] leading-snug">
                Architecte Logiciel & Développeur Full-Stack <br className="hidden sm:inline" />
                <span className="text-[#9ca3af] font-normal">
                  Spécialiste Clean Architecture & SaaS B2B
                </span>
              </p>
            </div>

            {/* Tagline Obligatoire */}
            <blockquote className="p-5 rounded-2xl border-l-4 border-[#10b981] bg-[#11131c] text-[#f3f4f6] italic text-base sm:text-lg leading-relaxed shadow-sm">
              « Je conçois des architectures logiciels robustes et adaptées aux contraintes du terrain. »
            </blockquote>

            {/* Stat Counters Row */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-[#11131c] border border-[#1e2234] text-center">
                <div className="font-mono font-bold text-xl sm:text-2xl text-white">4+</div>
                <div className="text-[11px] text-[#9ca3af] font-mono mt-0.5">Projets Majeurs</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#11131c] border border-[#1e2234] text-center">
                <div className="font-mono font-bold text-xl sm:text-2xl text-[#10b981]">100%</div>
                <div className="text-[11px] text-[#9ca3af] font-mono mt-0.5">Clean Architecture</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#11131c] border border-[#1e2234] text-center">
                <div className="font-mono font-bold text-xl sm:text-2xl text-[#3b82f6]">SaaS</div>
                <div className="text-[11px] text-[#9ca3af] font-mono mt-0.5">B2B ERP Ready</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4 font-mono text-xs">
              <a
                href="#projets"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#10b981] text-[#07080c] font-bold font-sans hover:bg-[#34d399] transition-all duration-300 shadow-xl shadow-emerald-950/50 text-sm"
              >
                <span>VOIR LES PROJETS</span>
                <ArrowDownRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#11131c] text-white border border-[#1e2234] hover:border-[#10b981] hover:bg-[#161a26] transition-all duration-300 text-sm font-sans"
              >
                <Mail className="w-4 h-4 text-[#10b981]" />
                <span>ME CONTACTER</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
