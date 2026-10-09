import React from 'react';
import { Award, CheckCircle2, Shield, Layers, Code2 } from 'lucide-react';

export default function About() {
  return (
    <section id="apropos" className="py-20 border-b border-[#27272A] bg-[#09090B]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="font-mono text-xs text-[#A1A1AA] uppercase tracking-wider mb-2">01 // PARCOURS & PHILOSOPHIE</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#EDEDED] tracking-tight">
            À Propos & Rigueur d'Ingénierie
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Description */}
          <div className="lg:col-span-7 space-y-6 text-[#A1A1AA] text-sm sm:text-base leading-relaxed">
            <p className="text-[#EDEDED] font-medium text-base sm:text-lg">
              Ingénieur Informaticien et Architecte Logiciel orienté résultat, je me spécialise dans la conception de solutions logicielles d'entreprise robustes, sécurisées et hautement maintenables.
            </p>
            <p>
              Ma démarche repose sur une application stricte des principes d'ingénierie moderne : la **Clean Architecture**, le **Domain-Driven Design (DDD)** et la **sécurité dès la conception (Security-by-Design)**. Dans des environnements où la connectivité et la fiabilité réseau posent problème, je privilégie des architectures découplées et des stratégies *Offline-First*.
            </p>
            <p>
              Chaque ligne de code est pensée pour durer : découplage des dépendances, couverture de tests automatisés, modélisation rigoureuse des bases de données et documentation technique claire.
            </p>
          </div>

          {/* Qualifications & Pillars Grid */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Diploma / Credentials Card */}
            <div className="p-6 rounded bg-[#141416] border border-[#27272A]">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded bg-[#09090B] border border-[#27272A] text-[#EDEDED]">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#EDEDED] font-semibold">
                  QUALIFICATIONS ACADÉMIQUES
                </h3>
              </div>

              <div className="space-y-4">
                <div className="border-l-2 border-[#EDEDED] pl-3 py-0.5">
                  <div className="font-semibold text-[#EDEDED] text-sm">Master 1 en Architecture Logicielle</div>
                  <div className="text-xs text-[#A1A1AA] font-mono">Spécialisation Systèmes d'Information & DDD</div>
                </div>

                <div className="border-l-2 border-zinc-700 pl-3 py-0.5">
                  <div className="font-semibold text-[#EDEDED] text-sm">Licence en Informatique de Gestion</div>
                  <div className="text-xs text-[#A1A1AA] font-mono">Génie Logiciel & Bases de Données</div>
                </div>
              </div>
            </div>

            {/* Core Values / Checklist */}
            <div className="p-6 rounded bg-[#141416] border border-[#27272A] space-y-3 font-mono text-xs">
              <div className="text-[#EDEDED] font-semibold tracking-wider mb-2 uppercase flex items-center gap-2">
                <Code2 className="w-4 h-4 text-zinc-400" /> PRINCES D'INGÉNIERIE
              </div>
              
              <div className="flex items-start gap-2.5 text-[#A1A1AA]">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Security-by-design & validation stricte des données</span>
              </div>
              <div className="flex items-start gap-2.5 text-[#A1A1AA]">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Clean Architecture (Ports & Adapters)</span>
              </div>
              <div className="flex items-start gap-2.5 text-[#A1A1AA]">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Intégration fluide des paiements Mobile Money</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

