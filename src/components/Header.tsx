'use client';

import React, { useState } from 'react';
import { Menu, X, Cpu, Send } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'À propos', href: '#apropos' },
    { name: 'Compétences', href: '#competences' },
    { name: 'Projets', href: '#projets' },
    { name: 'EduNova (SaaS)', href: '#edunova' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#07080c]/85 backdrop-blur-xl border-b border-[#1e2234]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Status */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10b981] to-[#3b82f6] p-[1px] shadow-lg shadow-emerald-950/40">
            <div className="w-full h-full rounded-[11px] bg-[#07080c] flex items-center justify-center text-white">
              <Cpu className="w-5 h-5 text-[#10b981] group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm sm:text-base tracking-tight text-white group-hover:text-[#10b981] transition-colors">
              Ir. Isaac FULAMA MATONDO
            </span>
            <span className="font-mono text-[11px] text-[#9ca3af] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping"></span>
              Architecte Logiciel & Ingénieur
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[#9ca3af] hover:text-white transition-colors uppercase tracking-wider"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#10b981] text-[#07080c] font-bold font-sans hover:bg-[#34d399] transition-all shadow-lg shadow-emerald-950/50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>CONTACT DIRECT</span>
          </a>
        </nav>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#9ca3af] hover:text-white"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#07080c] border-b border-[#1e2234] px-6 py-6 space-y-4 font-mono text-xs">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#9ca3af] hover:text-[#10b981] py-1.5 uppercase font-medium"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
