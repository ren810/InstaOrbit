// ✅ SERVER COMPONENT - No interactivity needed
// Pure navigation with anchor links, no JavaScript required
// This renders on the server and sends minimal HTML to the client

import React from 'react';
import { NAV_ITEMS } from '@/lib/constants';
import { Menu } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-40 px-6 py-4 flex justify-between items-center mix-blend-difference text-base-100">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 border border-base-500 flex items-center justify-center rotate-45">
          <div className="w-4 h-4 bg-base-500 -rotate-45" />
        </div>
        <span className="font-display text-2xl tracking-wide uppercase">InstaOrbit</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="font-mono text-sm uppercase tracking-widest hover:text-base-500 transition-colors"
          >
            {item.label}
          </a>
        ))}
      </div>

      <button className="md:hidden text-base-100" aria-label="Open menu">
        <Menu />
      </button>
    </nav>
  );
};
