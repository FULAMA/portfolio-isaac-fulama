import React from 'react';
import { ShieldCheck, Smartphone, Users, FileText, Clock, BarChart3, BrainCircuit, Check, Hourglass, ArrowRight } from 'lucide-react';

export default function EduNovaCaseStudy() {
  const modules = [
    {
      title: "Gestion de l'Identité & Rôles",
      desc: "Système RBAC granulaire pour Administrateurs, Enseignants, Parents et Élèves.",
      icon: Users,
    },
    {
      title: "Suivi des Élèves & Inscriptions",
      desc: "Dossiers scolaires centralisés, matricules uniques et réinscriptions automatisées.",
      icon: FileText,
    },
    {
      title: "Gestion des Notes & Bulletins",
      desc: "Calcul automatisé des moyennes pondérées et impression PDF des bulletins trimestriels.",
      icon: BarChart3,
    },
    {
      title: "Pointage & Présences",
      desc: "Suivi rigoureux des absences, retards et justifications avec historique temporel.",
      icon: Clock,
    },
    {
      title: "Paiements Mobile Money",
      desc: "Intégration directe des API M-Pesa, Orange Money, Airtel Money pour frais d'études.",
      icon: Smartphone,
    },
    {
      title: "Reporting & Analytique",
      desc: "Tableaux de bord d'encaissement en temps réel et indicateurs de santé financière.",
      icon: ShieldCheck,
    },
    {
      title: "Trajectoire IA (R&D)",
      desc: "Module prédictif d'analyse précoce des risques de décrochage scolaire (En conception).",
      icon: BrainCircuit,
    },
  ];

  const statusSteps = [
    {
      step: "01",
      title: "Conçu",
      status: "Complété",
      active: true,
      desc: "Dossier d'architecture technique rédigé, modélisation DDD & Clean Architecture validée.",
    },
    {
      step: "02",
      title: "En pilote",
      status: "Prochainement",
      active: false,
      current: true,
      desc: "Déploiement expérimental prévu dans des établissements scolaires partenaires.",
    },
    {
      step: "03",
      title: "Déploiement",
      status: "Planifié",
      active: false,
      desc: "Mise à disposition générale de la plateforme SaaS B2B multi-établissements.",
    },
  ];

  return (
    <section id="edunova" className="py-20 border-b border-[#27272A] bg-[#141416]/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#141416] border border-[#27272A] font-mono text-xs text-zinc-300 mb-4">
            <span>PROJET PHARE // ÉTUDE DE CAS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#EDEDED] tracking-tight">
            EduNova — Architecture ERP Scolaire B2B Multi-Établissements
          </h2>
          <p className="mt-3 text-[#A1A1AA] text-base max-w-3xl leading-relaxed">
            EduNova est une plateforme d'ingénierie logicielle conçue pour numériser la gestion administrative et financière des établissements d'enseignement. L'architecture privilégie la haute disponibilité, l'isolation des données par établissement et l'intégration native des paiements locaux via Mobile Money.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="mb-16">
          <h3 className="font-mono text-xs text-[#EDEDED] uppercase tracking-wider mb-6 flex items-center gap-2 font-semibold">
            <span>MODULES FONCTIONNELS DE L'ARCHITECTURE</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod) => {
              const IconComp = mod.icon;
              return (
                <div
                  key={mod.title}
                  className="p-5 rounded bg-[#141416] border border-[#27272A] space-y-3 hover:border-zinc-700 transition-colors"
                >
                  <div className="w-9 h-9 rounded bg-[#09090B] border border-[#27272A] flex items-center justify-center text-[#EDEDED]">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-[#EDEDED] text-base">{mod.title}</h4>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">{mod.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Pipeline Block */}
        <div className="p-8 rounded bg-[#141416] border border-[#27272A]">
          <h3 className="font-mono text-xs text-[#EDEDED] uppercase tracking-wider mb-8 font-bold">
            TRAJECTOIRE & STATUT DE DÉVELOPPEMENT
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {statusSteps.map((s, idx) => (
              <div key={s.title} className="relative space-y-3">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[#A1A1AA]">PHASE {s.step}</span>
                  {s.active ? (
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" /> {s.status}
                    </span>
                  ) : s.current ? (
                    <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-bold flex items-center gap-1">
                      <Hourglass className="w-3 h-3" /> {s.status}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-[#09090B] text-zinc-400 border border-[#27272A] text-[10px]">
                      {s.status}
                    </span>
                  )}
                </div>

                <h4 className="text-lg font-bold text-[#EDEDED]">{s.title}</h4>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">{s.desc}</p>

                {idx < statusSteps.length - 1 && (
                  <div className="hidden md:block absolute top-2 -right-4 text-zinc-700">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

