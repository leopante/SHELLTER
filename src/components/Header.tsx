'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const contractAddress = 'TBA';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-shell-bg/90 backdrop-blur-xl border-b border-shell-border' : 'bg-transparent'
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 bg-gradient-to-br from-shell-primary to-shell-accent rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white text-base">🦀</span>
            </div>
            <span className="font-semibold text-base">The Shellter</span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/#tokenomics" className="text-sm text-shell-muted hover:text-white transition-colors">
              Tokenomics
            </Link>
            <Link href="/#roadmap" className="text-sm text-shell-muted hover:text-white transition-colors">
              Roadmap
            </Link>
            <Link href="/game" className="text-sm text-shell-muted hover:text-white transition-colors">
              Play Game
            </Link>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-shell-surface border border-shell-border rounded-lg">
              <span className="text-xs text-shell-muted font-mono">CA:</span>
              <span className="text-xs font-mono text-shell-primary">{contractAddress}</span>
            </div>
            <button className="btn-primary">
              Buy $SHELL
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
