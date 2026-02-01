'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import CrabGame from '@/components/CrabGame';
import CrabMascot from '@/components/CrabMascot';

export default function Home() {
  const [contractAddress] = useState('TBA - Coming Soon!');
  const [showGame, setShowGame] = useState(false);

  return (
    <main className="min-h-screen section-container">
      <CrabMascot />
      
      {/* Ticker urgenza */}
      <div className="ticker-wrapper fixed top-0 left-0 right-0 z-40">
        <div className="ticker">
          <span className="font-display font-bold text-shell-accent mr-8">
            🔥 PRESALE LIVE NOW! 🔥 EARLY BIRDS GET 10X GAINS! 🚀 JOIN BEFORE IT'S TOO LATE! 💰 
            LIMITED SUPPLY! ⚡ DON'T MISS OUT! 🦀 THE SHELLTER IS YOUR ONLY HOPE! 🌊
          </span>
          <span className="font-display font-bold text-shell-accent mr-8">
            🔥 PRESALE LIVE NOW! 🔥 EARLY BIRDS GET 10X GAINS! 🚀 JOIN BEFORE IT'S TOO LATE! 💰 
            LIMITED SUPPLY! ⚡ DON'T MISS OUT! 🦀 THE SHELLTER IS YOUR ONLY HOPE! 🌊
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="fixed top-16 left-0 right-0 z-30 bg-shell-dark/80 backdrop-blur-md border-b-2 border-shell-primary">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.h1 
            className="text-3xl font-display font-black text-shell-primary glow-text"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            THE SHELLTER 🦀
          </motion.h1>
          
          <motion.div
            className="bg-shell-secondary/50 px-6 py-3 rounded-lg border-2 border-shell-accent"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <p className="text-xs font-body text-shell-light mb-1">Contract Address:</p>
            <p className="text-sm font-display font-bold text-shell-accent">{contractAddress}</p>
          </motion.div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-32 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 1.5 }}
          >
            <h2 className="text-7xl md:text-9xl font-display font-black mb-6 glow-text">
              <span className="text-shell-primary">THE</span>{' '}
              <span className="text-shell-accent">SHELLTER</span>
            </h2>
          </motion.div>

          <motion.p
            className="text-2xl md:text-4xl font-body font-bold text-shell-light mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Your Only Refuge in the Crypto Storm! 🌊
          </motion.p>

          <motion.div
            className="max-w-3xl mx-auto mb-12"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-shell-dark/60 backdrop-blur-lg border-4 border-shell-primary rounded-2xl p-8 shadow-2xl">
              <h3 className="text-3xl font-display font-bold text-shell-accent mb-4">
                ⚡ THE EARLIER YOU ENTER, THE MORE YOU EARN! ⚡
              </h3>
              <p className="text-xl font-body text-shell-light leading-relaxed mb-6">
                Markets are CRASHING. Bears are WINNING. But crabs? <span className="text-shell-primary font-bold">Crabs SURVIVE.</span>
              </p>
              <p className="text-xl font-body text-shell-light leading-relaxed mb-6">
                The Shellter isn't just a meme coin - it's a <span className="text-shell-accent font-bold">MOVEMENT</span>. 
                While others panic, we THRIVE. Join the crab army NOW and secure your position before the EXPLOSIVE launch!
              </p>
              <div className="bg-shell-primary/20 border-2 border-shell-primary rounded-xl p-6 mb-6">
                <p className="text-2xl font-display font-black text-shell-accent mb-2">
                  🚨 PRESALE BONUS STRUCTURE 🚨
                </p>
                <div className="space-y-2 text-left">
                  <p className="font-body text-lg text-shell-light">
                    <span className="text-shell-accent font-bold">First 100 holders:</span> +50% Bonus Tokens
                  </p>
                  <p className="font-body text-lg text-shell-light">
                    <span className="text-shell-accent font-bold">First 500 holders:</span> +30% Bonus Tokens
                  </p>
                  <p className="font-body text-lg text-shell-light">
                    <span className="text-shell-accent font-bold">First 1000 holders:</span> +15% Bonus Tokens
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col md:flex-row gap-6 justify-center items-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <button className="px-12 py-6 bg-shell-primary hover:bg-shell-accent text-white font-display text-2xl font-black rounded-xl transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-shell-accent/70 animate-pulse-glow">
              BUY NOW! 🚀
            </button>
            <button 
              onClick={() => setShowGame(!showGame)}
              className="px-12 py-6 bg-shell-secondary hover:bg-shell-primary text-white font-display text-2xl font-black rounded-xl transform hover:scale-110 transition-all duration-300 shadow-2xl border-2 border-shell-accent"
            >
              PLAY GAME 🎮
            </button>
          </motion.div>

          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {[
              { icon: '🦀', title: 'CRAB POWER', desc: 'Sideways markets? We DOMINATE!' },
              { icon: '💎', title: 'DIAMOND CLAWS', desc: 'HODL like never before!' },
              { icon: '🌊', title: 'TSUNAMI GAINS', desc: 'Ride the wave to the moon!' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-shell-dark/60 backdrop-blur-lg border-2 border-shell-primary rounded-xl p-6 hover:border-shell-accent transition-all duration-300 hover:scale-105"
                whileHover={{ y: -10 }}
              >
                <div className="text-6xl mb-4">{item.icon}</div>
                <h4 className="text-xl font-display font-bold text-shell-accent mb-2">{item.title}</h4>
                <p className="font-body text-shell-light">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Game Section */}
      {showGame && (
        <motion.section
          id="game"
          className="min-h-screen flex items-center justify-center py-20 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="container mx-auto">
            <motion.h2
              className="text-5xl md:text-7xl font-display font-black text-center mb-12 glow-text"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <span className="text-shell-primary">CRAB</span>{' '}
              <span className="text-shell-accent">SHOOTER</span> 🎮
            </motion.h2>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <CrabGame />
            </motion.div>

            <motion.p
              className="text-center text-xl font-body text-shell-light mt-8 max-w-2xl mx-auto"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Defend The Shellter from the bear invasion! Show them who's boss! 🦀💪
            </motion.p>
          </div>
        </motion.section>
      )}

      {/* Tokenomics Section */}
      <section className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="container mx-auto">
          <motion.h2
            className="text-5xl md:text-7xl font-display font-black text-center mb-12 glow-text"
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-shell-primary">TOKENOMICS</span> 📊
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { title: 'Total Supply', value: '1,000,000,000 SHELL', icon: '🏦' },
              { title: 'Presale', value: '40%', icon: '🚀' },
              { title: 'Liquidity Pool', value: '30%', icon: '💧' },
              { title: 'Marketing & Development', value: '20%', icon: '📢' },
              { title: 'Team (Locked)', value: '5%', icon: '🔒' },
              { title: 'Community Rewards', value: '5%', icon: '🎁' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-shell-dark/60 backdrop-blur-lg border-2 border-shell-primary rounded-xl p-8 hover:border-shell-accent transition-all duration-300"
                initial={{ x: i % 2 === 0 ? -100 : 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-display font-bold text-shell-accent mb-2">{item.title}</h3>
                <p className="text-3xl font-display font-black text-shell-primary">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            className="text-5xl md:text-7xl font-display font-black text-center mb-16 glow-text"
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-shell-primary">ROADMAP</span> 🗺️
          </motion.h2>

          <div className="space-y-8">
            {[
              {
                phase: 'Phase 1: The Awakening',
                items: ['Website Launch', 'Social Media Blitz', 'Community Building', 'Presale Launch'],
                status: 'LIVE NOW! 🔴',
              },
              {
                phase: 'Phase 2: The Storm',
                items: ['DEX Listing', '1000+ Holders', 'CMC & CG Listing', 'First CEX Listing'],
                status: 'COMING SOON',
              },
              {
                phase: 'Phase 3: The Conquest',
                items: ['Major CEX Listings', '10,000+ Holders', 'NFT Collection Launch', 'Staking Platform'],
                status: 'Q2 2026',
              },
              {
                phase: 'Phase 4: The Empire',
                items: ['Shellter Metaverse', 'DAO Governance', 'Global Domination', 'TO THE MOON! 🚀'],
                status: 'Q3 2026',
              },
            ].map((phase, i) => (
              <motion.div
                key={i}
                className="bg-shell-dark/60 backdrop-blur-lg border-2 border-shell-primary rounded-xl p-8 hover:border-shell-accent transition-all duration-300"
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-display font-bold text-shell-accent">{phase.phase}</h3>
                  <span className={`px-4 py-2 rounded-full font-body font-bold ${
                    phase.status.includes('LIVE') 
                      ? 'bg-shell-primary text-white animate-pulse' 
                      : 'bg-shell-secondary text-shell-light'
                  }`}>
                    {phase.status}
                  </span>
                </div>
                <ul className="space-y-2">
                  {phase.items.map((item, j) => (
                    <li key={j} className="flex items-center font-body text-shell-light text-lg">
                      <span className="text-shell-accent mr-3">🦀</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Market Analysis Section */}
      <section className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            className="text-5xl md:text-7xl font-display font-black text-center mb-12 glow-text"
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-shell-primary">AI MARKET</span>{' '}
            <span className="text-shell-accent">ANALYSIS</span> 🤖
          </motion.h2>

          <motion.div
            className="bg-shell-dark/60 backdrop-blur-lg border-4 border-shell-primary rounded-2xl p-8 shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center mb-8">
              <motion.div
                className="w-32 h-32 border-8 border-shell-accent rounded-full border-t-shell-primary"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <h3 className="text-3xl font-display font-bold text-shell-accent text-center mb-6">
              Advanced AI Analysis Coming Soon! 🧠
            </h3>

            <div className="space-y-4 mb-8">
              <div className="bg-shell-secondary/30 rounded-lg p-4">
                <p className="font-body text-shell-light text-lg">
                  <span className="text-shell-accent font-bold">Current Market Sentiment:</span> BEARISH 📉
                </p>
              </div>
              <div className="bg-shell-secondary/30 rounded-lg p-4">
                <p className="font-body text-shell-light text-lg">
                  <span className="text-shell-accent font-bold">Shellter Opportunity:</span> MAXIMUM 🚀
                </p>
              </div>
              <div className="bg-shell-secondary/30 rounded-lg p-4">
                <p className="font-body text-shell-light text-lg">
                  <span className="text-shell-accent font-bold">Recommended Action:</span> BUY NOW! 💰
                </p>
              </div>
            </div>

            <div className="bg-shell-primary/20 border-2 border-shell-primary rounded-xl p-6">
              <p className="text-xl font-body text-shell-light text-center mb-4">
                Our AI-powered market analysis will predict the EXACT moment markets will recover!
              </p>
              <p className="text-lg font-body text-shell-accent text-center font-bold">
                Integration with advanced AI models coming in Phase 2! 🤖✨
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-shell-dark/80 backdrop-blur-md border-t-2 border-shell-primary py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-display font-black text-shell-primary mb-2">THE SHELLTER</h3>
              <p className="font-body text-shell-light">Join the Crab Revolution! 🦀</p>
            </div>

            <div className="flex gap-6">
              {[
                { name: 'Twitter', icon: '🐦', link: '#' },
                { name: 'Telegram', icon: '✈️', link: '#' },
                { name: 'Discord', icon: '💬', link: '#' },
                { name: 'Instagram', icon: '📸', link: '#' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.link}
                  className="w-14 h-14 bg-shell-primary hover:bg-shell-accent rounded-full flex items-center justify-center text-3xl transition-all duration-300 shadow-lg hover:shadow-shell-accent/50"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-shell-primary/30 text-center">
            <p className="font-body text-shell-light text-sm">
              © 2026 The Shellter. All rights reserved. This is a meme coin. DYOR. 
              <span className="text-shell-accent font-bold"> No financial advice!</span>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
