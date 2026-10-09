import React from 'react';
import { Code, Layers, Database } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      title: 'Languages & Frameworks',
      icon: Code,
      skills: [
        { name: 'Python (FastAPI)', level: 'Principal' },
        { name: 'Angular', level: 'Web Client' },
        { name: 'Dart (Flutter)', level: 'Mobile Native' },
        { name: 'CustomTkinter', level: 'Desktop Systems' },
        { name: 'TypeScript', level: 'Type-Safe Fullstack' },
      ],
    },
    {
      title: 'Architecture & Modélisation',
      icon: Layers,
      skills: [
        { name: 'Clean Architecture', level: 'Expert & Ports/Adapters' },
        { name: 'DDD (Domain-Driven Design)', level: 'Modélisation Métier' },
        { name: 'SOLID Principles', level: 'Conception Rigoureuse' },
        { name: 'Ports & Adaptateurs', level: 'Architecture Hexagonale' },
      ],
    },
    {
      title: 'Databases & Cloud',
      icon: Database,
      skills: [
        { name: 'PostgreSQL', level: 'RDBMS Relationnel' },
        { name: 'SQLite & Drift', level: 'Embedded & Offline-First' },
        { name: 'MariaDB', level: 'Données Web' },
        { name: 'Supabase & Firebase', level: 'BaaS & Realtime' },
        { name: 'Railway', level: 'Hébergement PaaS' },
      ],
    },
  ];

  return (
    <section id="competences" className="py-24 border-b border-[#1e2234] bg-[#07080c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="font-mono text-xs text-[#10b981] uppercase tracking-widest mb-2 font-bold">
            02 // MATRICE TECHNIQUE IMPOSÉE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Compétences & Maîtrise Systèmes
          </h2>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <div
                key={cat.title}
                className="p-7 rounded-2xl bg-[#11131c] border border-[#1e2234] flex flex-col justify-between hover:border-[#10b981]/50 transition-all duration-300 shadow-xl"
              >
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-[#07080c] border border-[#1e2234] text-[#10b981]">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-white">
                      {cat.title}
                    </h3>
                  </div>

                  <ul className="space-y-3 font-mono text-xs">
                    {cat.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="p-3 rounded-xl bg-[#07080c] border border-[#1e2234] flex items-center justify-between hover:border-[#10b981]/30 transition-colors"
                      >
                        <span className="text-white font-medium">{skill.name}</span>
                        <span className="text-[10px] text-[#10b981] bg-[#11131c] px-2.5 py-1 rounded-md border border-[#10b981]/25 font-bold">
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
