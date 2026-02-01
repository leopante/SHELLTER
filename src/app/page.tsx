'use client';

import Header from '@/components/Header';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-shell-surface border border-shell-border rounded-full text-xs text-shell-muted animate-fade-in">
              <span className="w-1.5 h-1.5 bg-shell-primary rounded-full animate-pulse"></span>
              <span>Live on Solana</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-slide-up">
              The Shellter
            </h1>
            
            <p className="text-lg md:text-xl text-shell-muted max-w-2xl mx-auto animate-slide-up" style={{animationDelay: '0.1s'}}>
              When markets crash, crabs survive. Join the movement.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 animate-slide-up" style={{animationDelay: '0.2s'}}>
              <button className="btn-primary w-full sm:w-auto">
                Buy $SHELL
              </button>
              <Link href="/game" className="btn-secondary w-full sm:w-auto">
                Play Game
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-shell-border">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Market Cap', value: '$XXX,XXX' },
              { label: 'Holders', value: 'XXX' },
              { label: 'Liquidity', value: '$XXX,XXX' },
              { label: '24h Volume', value: '$XXX,XXX' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-shell-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tokenomics */}
      <section id="tokenomics" className="section">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold">Tokenomics</h2>
              <p className="text-shell-muted max-w-2xl mx-auto">
                Fair launch with transparent distribution and locked liquidity.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { 
                  label: 'Total Supply', 
                  value: '1,000,000,000',
                  unit: 'SHELL',
                  description: 'Fixed supply, no minting'
                },
                { 
                  label: 'Liquidity Pool', 
                  value: '85%',
                  description: 'Locked for 2 years'
                },
                { 
                  label: 'Community', 
                  value: '10%',
                  description: 'Airdrops & rewards'
                },
                { 
                  label: 'Development', 
                  value: '5%',
                  description: 'Vested over 12 months'
                },
              ].map((item, i) => (
                <div key={i} className="card group">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-sm text-shell-muted mb-1">{item.label}</div>
                      <div className="text-2xl font-bold text-white">
                        {item.value} {item.unit && <span className="text-lg text-shell-primary">{item.unit}</span>}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-shell-muted">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              {[
                { icon: '🔒', title: 'LP Locked', desc: '2 years minimum' },
                { icon: '🚫', title: 'No Tax', desc: '0% buy/sell fees' },
                { icon: '✅', title: 'Renounced', desc: 'Contract ownership renounced' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-shell-surface border border-shell-border rounded-lg hover:border-shell-primary/50 transition-colors">
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <div className="font-medium text-white mb-1">{item.title}</div>
                    <div className="text-sm text-shell-muted">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="section bg-shell-surface/30">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold">Roadmap</h2>
              <p className="text-shell-muted">Building the future, one step at a time.</p>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  phase: 'Phase 1',
                  title: 'Foundation',
                  status: 'Complete',
                  statusColor: 'bg-green-500/20 text-green-400 border-green-500/30',
                  items: ['Token Launch', 'Website Live', 'Community Building', 'Initial Liquidity'],
                },
                {
                  phase: 'Phase 2',
                  title: 'Growth',
                  status: 'In Progress',
                  statusColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
                  items: ['DEX Listings', 'CoinGecko & CMC', 'Marketing Push', 'Game Launch'],
                },
                {
                  phase: 'Phase 3',
                  title: 'Expansion',
                  status: 'Q2 2026',
                  statusColor: 'bg-shell-border text-shell-muted border-shell-border',
                  items: ['CEX Listings', 'NFT Collection', 'Staking Platform', 'Partnerships'],
                },
                {
                  phase: 'Phase 4',
                  title: 'Ecosystem',
                  status: 'Q3 2026',
                  statusColor: 'bg-shell-border text-shell-muted border-shell-border',
                  items: ['DAO Governance', 'Cross-chain Bridge', 'Mobile App', 'Shellter Protocol'],
                },
              ].map((item, i) => (
                <div key={i} className="card">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="text-sm text-shell-muted mb-1">{item.phase}</div>
                      <div className="text-xl font-semibold text-white">{item.title}</div>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${item.statusColor} w-fit`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {item.items.map((feature, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm text-shell-muted">
                        <div className="w-1 h-1 bg-shell-primary rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-shell-border">
        <div className="container-custom py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                <div className="w-6 h-6 bg-gradient-to-br from-shell-primary to-shell-accent rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🦀</span>
                </div>
                <span className="font-semibold">The Shellter</span>
              </div>
              <p className="text-sm text-shell-muted">Survive the storm.</p>
            </div>

            <div className="flex items-center gap-3">
              {[
                { 
                  name: 'X', 
                  href: 'https://x.com', 
                  icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                },
                { 
                  name: 'Telegram', 
                  href: 'https://t.me', 
                  icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
                },
                { 
                  name: 'Discord', 
                  href: 'https://discord.com', 
                  icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center border border-shell-border rounded-lg hover:border-shell-primary hover:text-shell-primary transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-shell-border text-center">
            <p className="text-xs text-shell-muted">
              © 2026 The Shellter. All rights reserved. Not financial advice. DYOR.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
