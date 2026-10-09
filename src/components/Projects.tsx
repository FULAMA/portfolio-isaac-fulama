import React from 'react';
import projectsData from '@/data/projects.json';
import { ExternalLink, Github, Award } from 'lucide-react';

export default function Projects() {
  return (
    <section id="projets" className="py-24 border-b border-[#c5a059]/20 bg-[#0b0c10]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <div className="font-mono text-xs text-[#c5a059] uppercase tracking-widest mb-2 font-semibold">
              III // TRAVAUX & RÉALISATIONS DE RANG MAJEUR
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#f4f1ea] tracking-tight">
              Projets Système & Code-base Vérifiables
            </h2>
          </div>
          <div className="font-mono text-xs text-[#9ca3af]">
            Registre configuré via <code className="text-[#c5a059] bg-[#12141c] px-2 py-1 rounded-sm border border-[#c5a059]/30">projects.json</code>
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className={`p-7 sm:p-8 rounded-sm bg-[#12141c] border transition-all duration-300 flex flex-col justify-between ${
                project.featured
                  ? 'border-[#c5a059] shadow-xl'
                  : 'border-[#c5a059]/30 hover:border-[#c5a059]'
              }`}
            >
              <div>
                {/* Header Category & Status Badge */}
                <div className="flex items-center justify-between gap-2 mb-4 font-mono text-xs">
                  <span className="px-3 py-1 rounded-sm bg-[#0b0c10] border border-[#c5a059]/30 text-[#9ca3af]">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-3 py-1 rounded-sm bg-[#c5a059] text-[#0b0c10] font-serif font-bold text-xs flex items-center gap-1.5 shadow-sm">
                      <Award className="w-3.5 h-3.5 text-[#0b0c10]" /> PROJET PHARE
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-2xl font-serif font-bold text-[#f4f1ea] mb-1">
                  {project.title}
                </h3>
                <p className="font-mono text-xs text-[#c5a059] mb-4">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm text-[#9ca3af] leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-6 font-mono text-[11px]">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-sm bg-[#0b0c10] border border-[#c5a059]/20 text-[#f4f1ea]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Footer Links & Status */}
                <div className="pt-4 border-t border-[#c5a059]/20 flex items-center justify-between font-mono text-xs">
                  <span className="text-[#9ca3af] text-[11px] truncate max-w-[200px]" title={project.status.label}>
                    ● {project.status.phase}
                  </span>

                  <div className="flex items-center gap-4">
                    {project.id === 'edunova' && (
                      <a
                        href="#edunova"
                        className="text-[#c5a059] font-serif font-bold underline hover:text-[#e2c27b] transition-colors"
                      >
                        Étude de cas →
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#9ca3af] hover:text-[#c5a059] transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Code Dépôt</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
