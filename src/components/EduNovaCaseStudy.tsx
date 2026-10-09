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
    <section id="edunova" className="py-24 border-b border-[#c5a059]/20 bg-[#12141c]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-sm bg-[#12141c] border border-[#c5a059]/40 font-mono text-xs text-[#c5a059] uppercase tracking-wider mb-4 font-semibold">
            <span>IV // ÉTUDE DE CAS DE RANG MAJEUR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#f4f1ea] tracking-tight">
            EduNova — Architecture ERP Scolaire B2B
          </h2>
          <p className="mt-4 text-[#9ca3af] text-base sm:text-lg max-w-3xl leading-relaxed">
            EduNova est une plateforme d'ingénierie logicielle conçue pour numériser la gestion administrative et financière des établissements d'enseignement. L'architecture privilégie la haute disponibilité, l'isolation des données par établissement et l'intégration native des paiements locaux via Mobile Money.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="mb-16">
          <h3 className="font-serif font-bold text-sm text-[#f4f1ea] uppercase tracking-wider mb-6 flex items-center gap-2">
            <span>MODULES FONCTIONNELS DE L'ARCHITECTURE</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod) => {
              const IconComp = mod.icon;
              return (
                <div
                  key={mod.title}
                  className="p-6 rounded-sm bg-[#12141c] border border-[#c5a059]/30 space-y-3 hover:border-[#c5a059] transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-sm bg-[#0b0c10] border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059]">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-[#f4f1ea] text-lg">{mod.title}</h4>
                  <p className="text-xs text-[#9ca3af] leading-relaxed">{mod.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Pipeline Block */}
        <div className="p-8 sm:p-10 rounded-sm bg-[#12141c] border border-[#c5a059]/40 shadow-xl">
          <h3 className="font-serif font-bold text-sm text-[#f4f1ea] uppercase tracking-wider mb-8">
            TRAJECTOIRE & STATUT DE DÉVELOPPEMENT
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {statusSteps.map((s, idx) => (
              <div key={s.title} className="relative space-y-3">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-[#c5a059]">PHASE {s.step}</span>
                  {s.active ? (
                    <span className="px-2.5 py-1 rounded-sm bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" /> {s.status}
                    </span>
                  ) : s.current ? (
                    <span className="px-2.5 py-1 rounded-sm bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-bold flex items-center gap-1">
                      <Hourglass className="w-3 h-3" /> {s.status}
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-sm bg-[#0b0c10] text-[#9ca3af] border border-[#c5a059]/20 text-[10px]">
                      {s.status}
                    </span>
                  )}
                </div>

                <h4 className="text-xl font-serif font-bold text-[#f4f1ea]">{s.title}</h4>
                <p className="text-xs text-[#9ca3af] leading-relaxed">{s.desc}</p>

                {idx < statusSteps.length - 1 && (
                  <div className="hidden md:block absolute top-2 -right-4 text-[#c5a059]/40">
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
