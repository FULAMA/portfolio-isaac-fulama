import React from 'react';
import { Code, Layers, Database } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      title: 'Languages & Frameworks',
      icon: Code,
      skills: [
        { name: 'Python (FastAPI)', level: 'Expert / Principal' },
        { name: 'Angular', level: 'Web Client Frontend' },
        { name: 'Dart (Flutter)', level: 'Mobile Native & Cross-Platform' },
        { name: 'CustomTkinter', level: 'Desktop Applications' },
        { name: 'TypeScript', level: 'Full-Stack Type-Safe' },
      ],
    },
    {
      title: 'Architecture & Modélisation',
      icon: Layers,
      skills: [
        { name: 'Clean Architecture', level: 'Spécialiste & Adaptateurs' },
        { name: 'DDD (Domain-Driven Design)', level: 'Modélisation Métier' },
        { name: 'SOLID Principles', level: 'Conception Objet Rigoureuse' },
        { name: 'Ports & Adaptateurs', level: 'Hexagonal Architecture' },
      ],
    },
    {
      title: 'Databases & Cloud',
      icon: Database,
      skills: [
        { name: 'PostgreSQL', level: 'RDBMS Relationnel Principal' },
        { name: 'SQLite & Drift', level: 'Embedded / Mobile Offline' },
        { name: 'MariaDB', level: 'Gestion de Données Web' },
        { name: 'Supabase & Firebase', level: 'BaaS & Realtime Sync' },
        { name: 'Railway', level: 'Hébergement & PaaS' },
      ],
    },
  ];

  return (
    <section id="competences" className="py-20 border-b border-[#27272A] bg-[#09090B]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="font-mono text-xs text-[#A1A1AA] uppercase tracking-wider mb-2">02 // MATRICE TECHNIQUE</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#EDEDED] tracking-tight">
            Compétences & Stack Imposée
          </h2>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <div
                key={cat.title}
                className="p-6 rounded bg-[#141416] border border-[#27272A] flex flex-col justify-between hover:border-[#3f3f46] transition-colors"
              >
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded bg-[#09090B] border border-[#27272A] text-[#EDEDED]">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-mono text-xs uppercase tracking-wider text-[#EDEDED] font-bold">
                      {cat.title}
                    </h3>
                  </div>

                  <ul className="space-y-3 font-mono text-xs">
                    {cat.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="p-2.5 rounded bg-[#09090B] border border-[#27272A] flex items-center justify-between"
                      >
                        <span className="text-[#EDEDED] font-medium">{skill.name}</span>
                        <span className="text-[10px] text-[#A1A1AA] bg-[#141416] px-2 py-0.5 rounded border border-zinc-800">
                          {skill.level}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

