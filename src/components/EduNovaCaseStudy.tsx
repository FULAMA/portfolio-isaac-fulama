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
    <section id="edunova" className="py-24 border-b border-[#1e2234] bg-[#0b0d14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#11131c] border border-[#10b981]/30 font-mono text-xs text-[#10b981] uppercase tracking-wider mb-4 font-bold">
            <span>04 // ÉTUDE DE CAS DE RANG MAJEUR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            EduNova — Architecture ERP Scolaire B2B
          </h2>
          <p className="mt-4 text-[#9ca3af] text-base sm:text-lg max-w-3xl leading-relaxed">
            EduNova est une plateforme d'ingénierie logicielle conçue pour numériser la gestion administrative et financière des établissements d'enseignement. L'architecture privilégie la haute disponibilité, l'isolation des données par établissement et l'intégration native des paiements locaux via Mobile Money.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="mb-16">
          <h3 className="font-mono text-xs text-[#10b981] font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
            <span>MODULES FONCTIONNELS DE L'ARCHITECTURE</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod) => {
              const IconComp = mod.icon;
              return (
                <div
                  key={mod.title}
                  className="p-6 rounded-2xl bg-[#11131c] border border-[#1e2234] space-y-3 hover:border-[#10b981] transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#07080c] border border-[#1e2234] flex items-center justify-center text-[#10b981]">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-white text-lg">{mod.title}</h4>
                  <p className="text-xs text-[#9ca3af] leading-relaxed">{mod.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Pipeline Block */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#11131c] border border-[#1e2234] shadow-2xl">
          <h3 className="font-mono font-bold text-xs text-[#10b981] uppercase tracking-wider mb-8">
            TRAJECTOIRE & STATUT DE DÉVELOPPEMENT
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {statusSteps.map((s, idx) => (
              <div key={s.title} className="relative space-y-3">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[#10b981] font-bold">PHASE {s.step}</span>
                  {s.active ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" /> {s.status}
                    </span>
                  ) : s.current ? (
                    <span className="px-3 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-bold flex items-center gap-1">
                      <Hourglass className="w-3 h-3" /> {s.status}
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-[#07080c] text-[#9ca3af] border border-[#1e2234] text-[10px]">
                      {s.status}
                    </span>
                  )}
                </div>

                <h4 className="text-xl font-bold text-white">{s.title}</h4>
                <p className="text-xs text-[#9ca3af] leading-relaxed">{s.desc}</p>

                {idx < statusSteps.length - 1 && (
                  <div className="hidden md:block absolute top-2 -right-4 text-[#1e2234]">
                    <ArrowRight className="w-4 h-4 text-[#9ca3af]" />
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
