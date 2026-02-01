'use client';
import { useEffect, useRef, useState } from 'react';

export default function CrabGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const gameStateRef = useRef({
    player: { x: 400, y: 300, width: 40, height: 40, speed: 5 },
    bullets: [] as Array<{ x: number; y: number; vx: number; vy: number }>,
    bears: [] as Array<{ x: number; y: number; width: number; height: number; speed: number; hp: number }>,
    keys: {} as Record<string, boolean>,
    score: 0,
    animationId: null as number | null,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 600;

    const state = gameStateRef.current;

    // Event listeners per controlli
    const handleKeyDown = (e: KeyboardEvent) => {
      state.keys[e.key] = true;
      if (e.key === ' ' && gameStarted && !gameOver) {
        shoot();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      state.keys[e.key] = false;
    };

    const handleClick = (e: MouseEvent) => {
      if (!gameStarted || gameOver) return;
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      shootTowards(mouseX, mouseY);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    canvas.addEventListener('click', handleClick);

    const shoot = () => {
      state.bullets.push({
        x: state.player.x + state.player.width / 2,
        y: state.player.y,
        vx: 0,
        vy: -10,
      });
    };

    const shootTowards = (targetX: number, targetY: number) => {
      const dx = targetX - (state.player.x + state.player.width / 2);
      const dy = targetY - (state.player.y + state.player.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = 10;
      
      state.bullets.push({
        x: state.player.x + state.player.width / 2,
        y: state.player.y + state.player.height / 2,
        vx: (dx / distance) * speed,
        vy: (dy / distance) * speed,
      });
    };

    const spawnBear = () => {
      const side = Math.floor(Math.random() * 4);
      let x, y;
      
      switch(side) {
        case 0: x = Math.random() * canvas.width; y = -50; break;
        case 1: x = canvas.width + 50; y = Math.random() * canvas.height; break;
        case 2: x = Math.random() * canvas.width; y = canvas.height + 50; break;
        default: x = -50; y = Math.random() * canvas.height;
      }

      state.bears.push({
        x,
        y,
        width: 50,
        height: 50,
        speed: 1 + Math.random() * 2,
        hp: 3,
      });
    };

    const drawPlayer = () => {
      ctx.save();
      ctx.translate(state.player.x + state.player.width / 2, state.player.y + state.player.height / 2);
      
      // Corpo del granchio (pixel art style)
      ctx.fillStyle = '#FF6B35';
      ctx.fillRect(-20, -15, 40, 30);
      
      // Chele
      ctx.fillStyle = '#FF4500';
      ctx.fillRect(-30, -10, 10, 15);
      ctx.fillRect(20, -10, 10, 15);
      
      // Occhi
      ctx.fillStyle = '#000';
      ctx.fillRect(-10, -10, 5, 5);
      ctx.fillRect(5, -10, 5, 5);
      
      // Zampe
      ctx.fillStyle = '#FF6B35';
      for (let i = -15; i <= 15; i += 10) {
        ctx.fillRect(i - 2, 15, 4, 10);
      }
      
      ctx.restore();
    };

    const drawBullet = (bullet: { x: number; y: number }) => {
      ctx.fillStyle = '#F7B801';
      ctx.shadowColor = '#F7B801';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(bullet.x, bullet.y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const drawBear = (bear: { x: number; y: number; width: number; height: number; hp: number }) => {
      ctx.save();
      ctx.translate(bear.x + bear.width / 2, bear.y + bear.height / 2);
      
      // Corpo dell'orso
      ctx.fillStyle = bear.hp > 1 ? '#8B4513' : '#A0522D';
      ctx.fillRect(-20, -20, 40, 40);
      
      // Orecchie
      ctx.beginPath();
      ctx.arc(-15, -20, 8, 0, Math.PI * 2);
      ctx.arc(15, -20, 8, 0, Math.PI * 2);
      ctx.fill();
      
      // Muso
      ctx.fillStyle = '#D2691E';
      ctx.fillRect(-10, 0, 20, 15);
      
      // Occhi
      ctx.fillStyle = '#000';
      ctx.fillRect(-10, -10, 5, 5);
      ctx.fillRect(5, -10, 5, 5);
      
      // Barra HP
      ctx.fillStyle = '#f00';
      ctx.fillRect(-20, -30, 40, 5);
      ctx.fillStyle = '#0f0';
      ctx.fillRect(-20, -30, (40 * bear.hp) / 3, 5);
      
      ctx.restore();
    };

    const updateGame = () => {
      if (!gameStarted || gameOver) return;

      // Muovi player
      if (state.keys['ArrowLeft'] || state.keys['a']) {
        state.player.x = Math.max(0, state.player.x - state.player.speed);
      }
      if (state.keys['ArrowRight'] || state.keys['d']) {
        state.player.x = Math.min(canvas.width - state.player.width, state.player.x + state.player.speed);
      }
      if (state.keys['ArrowUp'] || state.keys['w']) {
        state.player.y = Math.max(0, state.player.y - state.player.speed);
      }
      if (state.keys['ArrowDown'] || state.keys['s']) {
        state.player.y = Math.min(canvas.height - state.player.height, state.player.y + state.player.speed);
      }

      // Muovi proiettili
      state.bullets = state.bullets.filter(bullet => {
        bullet.x += bullet.vx;
        bullet.y += bullet.vy;
        return bullet.x > 0 && bullet.x < canvas.width && bullet.y > 0 && bullet.y < canvas.height;
      });

      // Muovi orsi verso il player
      state.bears.forEach(bear => {
        const dx = state.player.x - bear.x;
        const dy = state.player.y - bear.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        bear.x += (dx / distance) * bear.speed;
        bear.y += (dy / distance) * bear.speed;
      });

      // Collisioni proiettili-orsi
      state.bullets = state.bullets.filter(bullet => {
        let hit = false;
        state.bears = state.bears.filter(bear => {
          const bulletHitsBear = 
            bullet.x > bear.x && 
            bullet.x < bear.x + bear.width &&
            bullet.y > bear.y && 
            bullet.y < bear.y + bear.height;
          
          if (bulletHitsBear) {
            bear.hp--;
            hit = true;
            if (bear.hp <= 0) {
              state.score += 10;
              setScore(state.score);
              return false;
            }
          }
          return true;
        });
        return !hit;
      });

      // Collisioni player-orsi
      state.bears.forEach(bear => {
        const playerHitsBear =
          state.player.x < bear.x + bear.width &&
          state.player.x + state.player.width > bear.x &&
          state.player.y < bear.y + bear.height &&
          state.player.y + state.player.height > bear.y;
        
        if (playerHitsBear) {
          setGameOver(true);
        }
      });

      // Spawn orsi
      if (Math.random() < 0.02) {
        spawnBear();
      }

      // Draw
      ctx.fillStyle = '#1A1423';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Grid background
      ctx.strokeStyle = 'rgba(255, 107, 53, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      drawPlayer();
      state.bullets.forEach(drawBullet);
      state.bears.forEach(drawBear);

      // Score
      ctx.fillStyle = '#F7B801';
      ctx.font = 'bold 24px Orbitron';
      ctx.fillText(`Score: ${state.score}`, 10, 30);

      state.animationId = requestAnimationFrame(updateGame);
    };

    if (gameStarted && !gameOver) {
      updateGame();
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('click', handleClick);
      if (state.animationId) {
        cancelAnimationFrame(state.animationId);
      }
    };
  }, [gameStarted, gameOver]);

  const startGame = () => {
    const state = gameStateRef.current;
    state.player = { x: 400, y: 300, width: 40, height: 40, speed: 5 };
    state.bullets = [];
    state.bears = [];
    state.score = 0;
    setScore(0);
    setGameStarted(true);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="border-4 border-shell-primary rounded-lg shadow-2xl"
          style={{ background: '#1A1423' }}
        />
        {!gameStarted && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 rounded-lg">
            <button
              onClick={startGame}
              className="px-8 py-4 bg-shell-primary hover:bg-shell-accent text-white font-display text-2xl rounded-lg transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-shell-accent/50"
            >
              START GAME! 🦀
            </button>
          </div>
        )}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-90 rounded-lg gap-4">
            <h3 className="text-4xl font-display text-shell-primary glow-text">GAME OVER!</h3>
            <p className="text-2xl font-body text-shell-light">Final Score: {score}</p>
            <button
              onClick={startGame}
              className="px-8 py-4 bg-shell-primary hover:bg-shell-accent text-white font-display text-2xl rounded-lg transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-shell-accent/50"
            >
              PLAY AGAIN! 🦀
            </button>
          </div>
        )}
      </div>
      <div className="text-center font-body text-shell-light">
        <p className="text-lg mb-2">Controls: WASD or Arrow Keys to move, Click to shoot!</p>
        <p className="text-xl font-bold text-shell-accent">Current Score: {score}</p>
      </div>
    </div>
  );
}
