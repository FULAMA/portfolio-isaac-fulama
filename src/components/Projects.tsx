import React from 'react';
import projectsData from '@/data/projects.json';
import { ExternalLink, Github, Sparkles, FolderGit2 } from 'lucide-react';

export default function Projects() {
  return (
    <section id="projets" className="py-20 border-b border-[#27272A] bg-[#09090B]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="font-mono text-xs text-[#A1A1AA] uppercase tracking-wider mb-2">03 // RÉALISATIONS</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#EDEDED] tracking-tight">
              Projets Réels & Application Système
            </h2>
          </div>
          <div className="font-mono text-xs text-[#A1A1AA]">
            Système de gestion basé sur <code className="text-[#EDEDED] bg-[#141416] px-1.5 py-0.5 rounded border border-[#27272A]">projects.json</code>
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className={`p-6 sm:p-7 rounded bg-[#141416] border transition-all flex flex-col justify-between ${
                project.featured
                  ? 'border-zinc-500 shadow-lg'
                  : 'border-[#27272A] hover:border-[#3f3f46]'
              }`}
            >
              <div>
                {/* Header Category & Status Badge */}
                <div className="flex items-center justify-between gap-2 mb-4 font-mono text-xs">
                  <span className="px-2.5 py-1 rounded bg-[#09090B] border border-[#27272A] text-[#A1A1AA]">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-2.5 py-1 rounded bg-[#EDEDED] text-[#09090B] font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-zinc-900" /> PROJET PHARE
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-xl font-bold text-[#EDEDED] mb-1">
                  {project.title}
                </h3>
                <p className="font-mono text-xs text-zinc-400 mb-4">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Stack Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6 font-mono text-[11px]">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-[#09090B] border border-[#27272A] text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Footer Links & Status */}
                <div className="pt-4 border-t border-[#27272A] flex items-center justify-between font-mono text-xs">
                  <span className="text-zinc-400 text-[11px] truncate max-w-[200px]" title={project.status.label}>
                    ● {project.status.phase}
                  </span>

                  <div className="flex items-center gap-3">
                    {project.id === 'edunova' && (
                      <a
                        href="#edunova"
                        className="text-[#EDEDED] underline hover:text-white transition-colors"
                      >
                        Étude de cas →
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#A1A1AA] hover:text-[#EDEDED] transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
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

