import React from 'react';

export default function Footer() {
  return (
    <footer className="py-8 bg-[#09090B] border-t border-[#27272A] font-mono text-xs text-[#A1A1AA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          © 2026 Ir. Isaac FULAMA MATONDO. Tous droits réservés.
        </div>
        <div className="text-zinc-400">
          Clean Architecture & Swiss Editorial Design
        </div>
      </div>
    </footer>
  );
}

