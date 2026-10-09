import React from 'react';
import projectsData from '@/data/projects.json';
import { ExternalLink, Github, Award, ArrowUpRight } from 'lucide-react';

export default function Projects() {
  return (
    <section id="projets" className="py-24 border-b border-[#1e2234] bg-[#07080c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <div className="font-mono text-xs text-[#10b981] uppercase tracking-widest mb-2 font-bold">
              03 // TRAVAUX & RÉALISATIONS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Projets Réels & Code-base
            </h2>
          </div>
          <div className="font-mono text-xs text-[#9ca3af]">
            Données du registre <code className="text-[#10b981] bg-[#11131c] px-2 py-1 rounded-md border border-[#1e2234]">projects.json</code>
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className={`p-8 rounded-2xl bg-[#11131c] border transition-all duration-300 flex flex-col justify-between hover:border-[#10b981] hover:shadow-2xl shadow-xl ${
                project.featured
                  ? 'border-[#10b981]'
                  : 'border-[#1e2234]'
              }`}
            >
              <div>
                {/* Header Category & Status Badge */}
                <div className="flex items-center justify-between gap-2 mb-4 font-mono text-xs">
                  <span className="px-3 py-1 rounded-lg bg-[#07080c] border border-[#1e2234] text-[#9ca3af]">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-3 py-1 rounded-lg bg-[#10b981] text-[#07080c] font-bold text-xs flex items-center gap-1.5 shadow-md">
                      <Award className="w-3.5 h-3.5 text-[#07080c]" /> PROJET PHARE
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-2xl font-bold text-white mb-1">
                  {project.title}
                </h3>
                <p className="font-mono text-xs text-[#34d399] mb-4">
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
                      className="px-2.5 py-1 rounded-md bg-[#07080c] border border-[#1e2234] text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Footer Links & Status */}
                <div className="pt-4 border-t border-[#1e2234] flex items-center justify-between font-mono text-xs">
                  <span className="text-[#9ca3af] text-[11px] truncate max-w-[200px]" title={project.status.label}>
                    ● {project.status.phase}
                  </span>

                  <div className="flex items-center gap-4">
                    {project.id === 'edunova' && (
                      <a
                        href="#edunova"
                        className="text-[#10b981] font-bold underline hover:text-[#34d399] transition-colors flex items-center gap-1"
                      >
                        Étude de cas <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#9ca3af] hover:text-white transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>Code</span>
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
