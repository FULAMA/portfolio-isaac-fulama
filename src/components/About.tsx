import React from 'react';
import { Award, CheckCircle2, Shield, Code2, GraduationCap, Terminal } from 'lucide-react';

export default function About() {
  return (
    <section id="apropos" className="py-24 border-b border-[#1e2234] bg-[#07080c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="font-mono text-xs text-[#10b981] uppercase tracking-widest mb-2 font-bold flex items-center gap-2">
            <Terminal className="w-4 h-4" /> 01 // PARCOURS & RIGUEUR D'INGÉNIERIE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Discipline & Security-by-Design
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Description */}
          <div className="lg:col-span-7 space-y-6 text-[#9ca3af] text-base leading-relaxed">
            <p className="text-white font-medium text-lg sm:text-xl leading-snug">
              Ingénieur Informaticien et Architecte Logiciel orienté résultat, je me spécialise dans la conception de solutions logicielles d'entreprise robustes, sécurisées et hautement maintenables.
            </p>
            <p>
              Ma démarche repose sur une application stricte des principes d'ingénierie moderne : la <strong className="text-white font-semibold">Clean Architecture</strong>, le <strong className="text-white font-semibold">Domain-Driven Design (DDD)</strong> et la <strong className="text-white font-semibold">sécurité dès la conception (Security-by-Design)</strong>. Dans des environnements où la connectivité et la fiabilité réseau posent problème, je privilégie des architectures découplées et des stratégies *Offline-First*.
            </p>
            <p>
              Chaque ligne de code est pensée pour durer : découplage des dépendances, couverture de tests automatisés, modélisation rigoureuse des bases de données et documentation technique claire.
            </p>
          </div>

          {/* Qualifications & Pillars Grid */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Diploma / Credentials Card */}
            <div className="p-7 rounded-2xl bg-[#11131c] border border-[#1e2234] shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-[#07080c] border border-[#10b981]/30 text-[#10b981]">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-white">
                  QUALIFICATIONS ACADÉMIQUES
                </h3>
              </div>

              <div className="space-y-5">
                <div className="border-l-2 border-[#10b981] pl-4 py-0.5">
                  <div className="font-bold text-white text-base">Master 1 en Architecture Logicielle</div>
                  <div className="text-xs text-[#9ca3af] font-mono mt-0.5">Spécialisation Systèmes d'Information & DDD</div>
                </div>

                <div className="border-l-2 border-[#3b82f6] pl-4 py-0.5">
                  <div className="font-bold text-white text-base">Licence en Informatique de Gestion</div>
                  <div className="text-xs text-[#9ca3af] font-mono mt-0.5">Génie Logiciel & Bases de Données</div>
                </div>
              </div>
            </div>

            {/* Core Values / Checklist */}
            <div className="p-7 rounded-2xl bg-[#11131c] border border-[#1e2234] space-y-3.5 font-mono text-xs">
              <div className="text-[#10b981] font-bold tracking-widest mb-3 uppercase flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#10b981]" /> PRINCES DE CONCEPTION
              </div>
              
              <div className="flex items-start gap-3 text-[#9ca3af]">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#10b981] shrink-0 mt-0.5" />
                <span>Security-by-design & validation stricte des données</span>
              </div>
              <div className="flex items-start gap-3 text-[#9ca3af]">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#10b981] shrink-0 mt-0.5" />
                <span>Clean Architecture (Ports & Adaptateurs)</span>
              </div>
              <div className="flex items-start gap-3 text-[#9ca3af]">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#10b981] shrink-0 mt-0.5" />
                <span>Intégration fluide des paiements Mobile Money</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
