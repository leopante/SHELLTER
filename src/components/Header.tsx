'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const contractAddress = 'TBA';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-shell-bg/80 backdrop-blur-lg border-b border-shell-border' : 'bg-transparent'
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-shell-primary rounded-md flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-lg">🦀</span>
            </div>
            <span className="font-semibold text-lg">The Shellter</span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#about" className="text-shell-muted hover:text-white transition-colors">
              About
            </Link>
            <Link href="/#tokenomics" className="text-shell-muted hover:text-white transition-colors">
              Tokenomics
            </Link>
            <Link href="/#roadmap" className="text-shell-muted hover:text-white transition-colors">
              Roadmap
            </Link>
            <Link href="/game" className="text-shell-muted hover:text-white transition-colors">
              Play Game
            </Link>
          </div>

          {/* CTA */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-shell-surface border border-shell-border rounded-md">
              <span className="text-xs text-shell-muted font-mono">CA:</span>
              <span className="text-xs font-mono text-shell-primary">{contractAddress}</span>
            </div>
            <button className="btn-primary text-sm">
              Buy Now
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
