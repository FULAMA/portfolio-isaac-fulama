import React from 'react';

export default function Footer() {
  return (
    <footer className="py-10 bg-[#07080c] border-t border-[#1e2234] font-mono text-xs text-[#9ca3af]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          © 2026 Ir. Isaac FULAMA MATONDO. Tous droits réservés.
        </div>
        <div className="text-[#10b981] font-semibold">
          Clean Architecture & Enterprise Software Engineering
        </div>
      </div>
    </footer>
  );
}
