import React from 'react';
import { Award, CheckCircle2, Shield, Code2, GraduationCap } from 'lucide-react';

export default function About() {
  return (
    <section id="apropos" className="py-24 border-b border-[#c5a059]/20 bg-[#0b0c10]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="font-mono text-xs text-[#c5a059] uppercase tracking-widest mb-2 font-semibold">
            I // PARCOURS & RIGUEUR D'INGÉNIERIE
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#f4f1ea] tracking-tight">
            Discipline & Architecture de Systèmes
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Description */}
          <div className="lg:col-span-7 space-y-6 text-[#9ca3af] text-base leading-relaxed">
            <p className="text-[#f4f1ea] font-serif text-lg sm:text-xl leading-snug">
              Ingénieur Informaticien et Architecte Logiciel orienté résultat, je me spécialise dans la conception de solutions logicielles d'entreprise robustes, sécurisées et hautement maintenables.
            </p>
            <p>
              Ma démarche repose sur une application stricte des principes d'ingénierie moderne : la <strong className="text-[#f4f1ea]">Clean Architecture</strong>, le <strong className="text-[#f4f1ea]">Domain-Driven Design (DDD)</strong> et la <strong className="text-[#f4f1ea]">sécurité dès la conception (Security-by-Design)</strong>. Dans des environnements où la connectivité et la fiabilité réseau posent problème, je privilégie des architectures découplées et des stratégies *Offline-First*.
            </p>
            <p>
              Chaque ligne de code est pensée pour durer : découplage des dépendances, couverture de tests automatisés, modélisation rigoureuse des bases de données et documentation technique claire.
            </p>
          </div>

          {/* Qualifications & Pillars Grid */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Diploma / Credentials Card */}
            <div className="p-7 rounded-sm bg-[#12141c] border border-[#c5a059]/30 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-sm bg-[#0b0c10] border border-[#c5a059]/40 text-[#c5a059]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-[#f4f1ea]">
                  QUALIFICATIONS ACADÉMIQUES
                </h3>
              </div>

              <div className="space-y-5">
                <div className="border-l-2 border-[#c5a059] pl-4 py-0.5">
                  <div className="font-serif font-bold text-[#f4f1ea] text-base">Master 1 en Architecture Logicielle</div>
                  <div className="text-xs text-[#9ca3af] font-mono mt-0.5">Spécialisation Systèmes d'Information & DDD</div>
                </div>

                <div className="border-l-2 border-[#c5a059]/40 pl-4 py-0.5">
                  <div className="font-serif font-bold text-[#f4f1ea] text-base">Licence en Informatique de Gestion</div>
                  <div className="text-xs text-[#9ca3af] font-mono mt-0.5">Génie Logiciel & Bases de Données</div>
                </div>
              </div>
            </div>

            {/* Core Values / Checklist */}
            <div className="p-7 rounded-sm bg-[#12141c] border border-[#c5a059]/30 space-y-3.5 font-mono text-xs">
              <div className="text-[#c5a059] font-semibold tracking-widest mb-3 uppercase flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#c5a059]" /> PRINCES DE CONCEPTION
              </div>
              
              <div className="flex items-start gap-3 text-[#9ca3af]">
                <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <span>Security-by-design & validation stricte des données</span>
              </div>
              <div className="flex items-start gap-3 text-[#9ca3af]">
                <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <span>Clean Architecture (Ports & Adaptateurs)</span>
              </div>
              <div className="flex items-start gap-3 text-[#9ca3af]">
                <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <span>Intégration fluide des paiements Mobile Money</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
