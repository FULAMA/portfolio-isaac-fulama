'use client';

import React, { useState } from 'react';
import { Menu, X, Award } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'À propos & Vision', href: '#apropos' },
    { name: 'Compétences', href: '#competences' },
    { name: 'Réalisations', href: '#projets' },
    { name: 'EduNova (ERP)', href: '#edunova' },
    { name: 'Correspondance', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0b0c10]/95 backdrop-blur-md border-b border-[#c5a059]/25">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Monogram Brand Wordmark */}
        <a href="#" className="flex items-center gap-3 text-[#f4f1ea] hover:text-[#c5a059] transition-colors group">
          <div className="w-10 h-10 rounded border border-[#c5a059]/40 bg-[#12141c] flex items-center justify-center font-serif font-bold text-base text-[#c5a059] shadow-sm group-hover:border-[#c5a059]">
            IFM
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-base tracking-tight text-[#f4f1ea] group-hover:text-[#c5a059] transition-colors">
              Ir. Isaac FULAMA MATONDO
            </span>
            <span className="font-mono text-[10px] tracking-widest text-[#9ca3af] uppercase">
              Architecte Logiciel & Systèmes
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-wider">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[#9ca3af] hover:text-[#c5a059] transition-colors uppercase font-medium"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="px-4 py-2 rounded-sm border border-[#c5a059]/50 bg-[#12141c] text-[#f4f1ea] font-serif font-semibold hover:bg-[#c5a059] hover:text-[#0b0c10] transition-all duration-300 text-xs shadow-sm"
          >
            ME CONTACTER
          </a>
        </nav>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#9ca3af] hover:text-[#c5a059]"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0b0c10] border-b border-[#c5a059]/30 px-6 py-6 space-y-4 font-mono text-xs">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#9ca3af] hover:text-[#c5a059] py-1.5 uppercase font-medium"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
