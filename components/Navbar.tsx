import React, { useState } from 'react';
import { Terminal, Menu, X } from 'lucide-react';
import { ext_links } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'SYSTEM_ROOT', path: '#' },
    { label: 'EXP_LOGS', path: '#experience' },
    { label: 'SKILL_MATRIX', path: '#skills' },
    { label: 'COMM_LINK', path: '#contact' },
    { label: 'DOWNLOAD_CV', path: ext_links.DOWNLOAD_CV_PATH },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-retro-bg/90 border-b border-retro-green backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/"><div className="flex items-center">
            <Terminal className="h-6 w-6 text-retro-green mr-2 animate-pulse" />
            <span className="font-mono text-xl font-bold tracking-wider text-retro-green">
              MD_SHOHAIB<span className="animate-pulse-fast">_</span>
            </span>
          </div></a>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.path}
                  download={item.label === 'DOWNLOAD_CV' ? true : undefined}
                  className={index < 4 ? 'text-retro-green hover:bg-retro-green hover:text-retro-bg px-3 py-2 rounded-sm text-sm font-medium transition-colors duration-200 border border-transparent hover:border-retro-green' : 'text-retro-accent hover:bg-retro-accent hover:text-retro-bg px-3 py-2 rounded-sm text-lg font-medium transition-colors duration-200 border border-transparent hover:border-retro-accent'}
                >
                  [{item.label}]
                </a>
              ))}
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-retro-green hover:text-retro-accent focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-retro-bg border-b border-retro-green">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={index < 4 ? "text-retro-green hover:bg-retro-green hover:text-retro-bg block px-3 py-2 rounded-md text-base font-medium" : "text-retro-accent hover:bg-retro-accent hover:text-retro-bg block px-3 py-2 rounded-md text-lg font-medium"}
              >
                {'>'} {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;