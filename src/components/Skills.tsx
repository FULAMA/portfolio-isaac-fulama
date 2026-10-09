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
    <section id="competences" className="py-24 border-b border-[#c5a059]/20 bg-[#0b0c10]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="font-mono text-xs text-[#c5a059] uppercase tracking-widest mb-2 font-semibold">
            II // MATRICE TECHNIQUE IMPOSÉE
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#f4f1ea] tracking-tight">
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
                className="p-7 rounded-sm bg-[#12141c] border border-[#c5a059]/30 flex flex-col justify-between hover:border-[#c5a059] transition-all duration-300 shadow-md"
              >
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 rounded-sm bg-[#0b0c10] border border-[#c5a059]/40 text-[#c5a059]">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-[#f4f1ea]">
                      {cat.title}
                    </h3>
                  </div>

                  <ul className="space-y-3 font-mono text-xs">
                    {cat.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="p-3 rounded-sm bg-[#0b0c10] border border-[#c5a059]/15 flex items-center justify-between"
                      >
                        <span className="text-[#f4f1ea] font-medium">{skill.name}</span>
                        <span className="text-[10px] text-[#c5a059] bg-[#12141c] px-2 py-0.5 rounded-sm border border-[#c5a059]/25">
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
