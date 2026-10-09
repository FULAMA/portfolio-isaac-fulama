'use client';

import React, { useState } from 'react';
import { Menu, X, Terminal } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'À propos', href: '#apropos' },
    { name: 'Compétences', href: '#competences' },
    { name: 'Projets', href: '#projets' },
    { name: 'EduNova', href: '#edunova' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#09090B]/90 backdrop-blur-md border-b border-[#27272A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Wordmark */}
        <a href="#" className="flex items-center gap-2.5 text-[#EDEDED] hover:text-white transition-colors group">
          <div className="w-8 h-8 rounded bg-[#141416] border border-[#27272A] flex items-center justify-center text-[#EDEDED] group-hover:border-[#3f3f46]">
            <Terminal className="w-4 h-4 text-zinc-300" />
          </div>
          <span className="font-bold text-sm tracking-editorial uppercase">
            Ir. Isaac FULAMA MATONDO
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-mono">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[#A1A1AA] hover:text-[#EDEDED] transition-colors tracking-tight uppercase"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="px-3.5 py-1.5 rounded border border-[#27272A] bg-[#141416] text-[#EDEDED] hover:bg-[#1a1a1d] hover:border-[#3f3f46] transition-all"
          >
            ME CONTACTER
          </a>
        </nav>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#A1A1AA] hover:text-[#EDEDED]"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#09090B] border-b border-[#27272A] px-4 py-5 space-y-3 font-mono text-xs">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#A1A1AA] hover:text-[#EDEDED] py-1.5 uppercase"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

