import React from 'react';

export default function Footer() {
  return (
    <footer className="py-10 bg-[#0b0c10] border-t border-[#c5a059]/20 font-mono text-xs text-[#9ca3af]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          © 2026 Ir. Isaac FULAMA MATONDO. Tous droits réservés.
        </div>
        <div className="text-[#c5a059] font-serif italic">
          Clean Architecture & Distinctive Editorial Engineering
        </div>
      </div>
    </footer>
  );
}
