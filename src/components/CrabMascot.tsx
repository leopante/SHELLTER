'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function CrabMascot() {
  const [message, setMessage] = useState(0);
  
  const messages = [
    "Welcome to The Shellter! 🦀",
    "Early crabs get the gains! 💰",
    "Join the revolution NOW! 🚀",
    "We're going to the moon! 🌙",
    "Don't miss out - buy NOW! ⚡",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", duration: 1 }}
    >
      <motion.div
        animate={{ 
          y: [0, -20, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative"
      >
        {/* Speech bubble */}
        <motion.div
          key={message}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute bottom-full right-0 mb-4 bg-white text-shell-dark px-6 py-3 rounded-2xl shadow-2xl whitespace-nowrap font-body font-semibold text-lg"
          style={{
            boxShadow: '0 0 30px rgba(255, 107, 53, 0.5)'
          }}
        >
          {messages[message]}
          <div className="absolute top-full right-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></div>
        </motion.div>

        {/* Crab mascot */}
        <div className="relative cursor-pointer group">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-32 h-32 relative"
          >
            {/* Glow effect */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute inset-0 bg-shell-primary rounded-full blur-xl opacity-50"
            />
            
            {/* Crab body */}
            <svg viewBox="0 0 200 200" className="relative z-10">
              {/* Main shell */}
              <ellipse cx="100" cy="100" rx="60" ry="50" fill="#FF6B35" />
              <ellipse cx="100" cy="100" rx="50" ry="40" fill="#FF8C61" />
              
              {/* Shell pattern */}
              <circle cx="100" cy="85" r="8" fill="#FF4500" />
              <circle cx="85" cy="95" r="6" fill="#FF4500" />
              <circle cx="115" cy="95" r="6" fill="#FF4500" />
              <circle cx="100" cy="105" r="7" fill="#FF4500" />
              
              {/* Left claw */}
              <motion.g
                animate={{
                  rotate: [0, -15, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ transformOrigin: '50px 110px' }}
              >
                <ellipse cx="40" cy="110" rx="15" ry="20" fill="#FF6B35" />
                <path d="M 30 110 L 20 100 L 25 105 L 20 110 L 30 110 Z" fill="#FF4500" />
              </motion.g>
              
              {/* Right claw */}
              <motion.g
                animate={{
                  rotate: [0, 15, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ transformOrigin: '150px 110px' }}
              >
                <ellipse cx="160" cy="110" rx="15" ry="20" fill="#FF6B35" />
                <path d="M 170 110 L 180 100 L 175 105 L 180 110 L 170 110 Z" fill="#FF4500" />
              </motion.g>
              
              {/* Eyes */}
              <motion.g
                animate={{
                  scaleY: [1, 0.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                <ellipse cx="85" cy="80" rx="8" ry="12" fill="white" />
                <ellipse cx="115" cy="80" rx="8" ry="12" fill="white" />
                <circle cx="85" cy="82" r="5" fill="black" />
                <circle cx="115" cy="82" r="5" fill="black" />
                <circle cx="87" cy="80" r="2" fill="white" />
                <circle cx="117" cy="80" r="2" fill="white" />
              </motion.g>
              
              {/* Smile */}
              <path 
                d="M 85 105 Q 100 115 115 105" 
                stroke="#FF4500" 
                strokeWidth="3" 
                fill="none" 
                strokeLinecap="round"
              />
              
              {/* Legs */}
              {[-30, -15, 0, 15, 30].map((offset, i) => (
                <motion.line
                  key={i}
                  x1={100 + offset}
                  y1="130"
                  x2={100 + offset + (i % 2 ? 10 : -10)}
                  y2="150"
                  stroke="#FF6B35"
                  strokeWidth="4"
                  strokeLinecap="round"
                  animate={{
                    y2: [150, 155, 150],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </svg>

            {/* Sparkles */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  top: `${20 + i * 30}%`,
                  left: `${10 + i * 20}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                ✨
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
