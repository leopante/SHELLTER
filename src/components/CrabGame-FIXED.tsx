'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface Player {
  x: number;
  y: number;
  angle: number;
  speed: number;
  width: number;
  height: number;
}

interface Bullet {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Bear {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  hp: number;
  maxHp: number;
}

interface Building {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'ruin' | 'bunker';
}

interface LeaderboardEntry {
  address: string;
  score: number;
  timestamp: number;
}

export default function CrabGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [wallet, setWallet] = useState<string | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(true);

  const gameStateRef = useRef({
    player: { x: 400, y: 300, angle: 0, width: 30, height: 30, speed: 4 } as Player,
    bullets: [] as Bullet[],
    bears: [] as Bear[],
    buildings: [] as Building[],
    keys: {} as Record<string, boolean>,
    score: 0,
    animationId: null as number | null,
    mouseX: 0,
    mouseY: 0,
    lastShot: 0,
  });

  const generateBuildings = useCallback(() => {
    const buildings: Building[] = [];
    const canvas = canvasRef.current;
    if (!canvas) return buildings;

    for (let i = 0; i < 8; i++) {
      const type = Math.random() > 0.5 ? 'ruin' : 'bunker';
      buildings.push({
        x: Math.random() * (canvas.width - 100) + 50,
        y: Math.random() * (canvas.height - 100) + 50,
        width: type === 'ruin' ? 80 : 60,
        height: type === 'ruin' ? 60 : 50,
        type,
      });
    }
    return buildings;
  }, []);

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        const address = accounts[0];
        setWallet(address);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const saveScore = useCallback((finalScore: number) => {
    if (!wallet) return;

    const newEntry: LeaderboardEntry = {
      address: wallet,
      score: finalScore,
      timestamp: Date.now(),
    };

    const stored = localStorage.getItem('shellter-leaderboard');
    const current: LeaderboardEntry[] = stored ? JSON.parse(stored) : [];
    
    const updated = [...current, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    
    localStorage.setItem('shellter-leaderboard', JSON.stringify(updated));
    setLeaderboard(updated);
  }, [wallet]);

  useEffect(() => {
    const stored = localStorage.getItem('shellter-leaderboard');
    if (stored) {
      setLeaderboard(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !gameStarted || gameOver) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 900;
    canvas.height = 600;

    const state = gameStateRef.current;

    if (state.buildings.length === 0) {
      state.buildings = generateBuildings();
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      state.mouseX = e.clientX - rect.left;
      state.mouseY = e.clientY - rect.top;

      const dx = state.mouseX - state.player.x;
      const dy = state.mouseY - state.player.y;
      state.player.angle = Math.atan2(dy, dx);
    };

    const handleClick = () => {
      const now = Date.now();
      if (now - state.lastShot < 200) return;
      state.lastShot = now;

      const dx = state.mouseX - state.player.x;
      const dy = state.mouseY - state.player.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = 12;
      
      state.bullets.push({
        x: state.player.x,
        y: state.player.y,
        vx: (dx / distance) * speed,
        vy: (dy / distance) * speed,
      });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      state.keys[e.key.toLowerCase()] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      state.keys[e.key.toLowerCase()] = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

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
        width: 40,
        height: 40,
        speed: 0.8 + Math.random() * 0.5,
        hp: 3,
        maxHp: 3,
      });
    };

    const checkCollision = (rect1: any, rect2: any) => {
      return rect1.x < rect2.x + rect2.width &&
             rect1.x + rect1.width > rect2.x &&
             rect1.y < rect2.y + rect2.height &&
             rect1.y + rect1.height > rect2.y;
    };

    const drawWasteland = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#2d1810');
      gradient.addColorStop(1, '#1a0f08');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#3d2810';
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

      state.buildings.forEach(building => {
        if (building.type === 'ruin') {
          ctx.fillStyle = '#4a3520';
          ctx.fillRect(building.x, building.y, building.width, building.height);
          ctx.strokeStyle = '#3a2510';
          ctx.lineWidth = 3;
          ctx.strokeRect(building.x, building.y, building.width, building.height);
          
          ctx.fillStyle = '#1a1510';
          ctx.fillRect(building.x + 10, building.y + 10, 15, 15);
          ctx.fillRect(building.x + building.width - 25, building.y + 10, 15, 15);
        } else {
          ctx.fillStyle = '#5a5a5a';
          ctx.fillRect(building.x, building.y, building.width, building.height);
          ctx.strokeStyle = '#3a3a3a';
          ctx.lineWidth = 2;
          ctx.strokeRect(building.x, building.y, building.width, building.height);
          
          ctx.fillStyle = '#2a2a2a';
          ctx.fillRect(building.x + building.width/2 - 10, building.y + building.height - 20, 20, 20);
        }
      });
    };

    const drawPlayer = () => {
      ctx.save();
      ctx.translate(state.player.x, state.player.y);
      ctx.rotate(state.player.angle);
      
      ctx.fillStyle = '#ff6b35';
      ctx.beginPath();
      ctx.ellipse(0, 0, 15, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#ff4500';
      ctx.fillRect(-20, -8, 10, 6);
      ctx.fillRect(10, -8, 10, 6);
      
      ctx.fillStyle = '#666';
      ctx.fillRect(10, -3, 18, 6);
      ctx.fillStyle = '#444';
      ctx.fillRect(28, -2, 4, 4);
      
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(-5, -5, 3, 0, Math.PI * 2);
      ctx.arc(5, -5, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(-5, -5, 1.5, 0, Math.PI * 2);
      ctx.arc(5, -5, 1.5, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    };

    const drawBullet = (bullet: Bullet) => {
      ctx.fillStyle = '#ffaa00';
      ctx.shadowColor = '#ffaa00';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(bullet.x, bullet.y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const drawBear = (bear: Bear) => {
      ctx.save();
      ctx.translate(bear.x + bear.width/2, bear.y + bear.height/2);
      
      ctx.fillStyle = '#5a3a2a';
      ctx.fillRect(-20, -20, 40, 40);
      
      ctx.beginPath();
      ctx.arc(-12, -20, 6, 0, Math.PI * 2);
      ctx.arc(12, -20, 6, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#ff0000';
      ctx.beginPath();
      ctx.arc(-8, -8, 3, 0, Math.PI * 2);
      ctx.arc(8, -8, 3, 0, Math.PI * 2);
      ctx.fill();
      
      const hpPercentage = bear.hp / bear.maxHp;
      ctx.fillStyle = '#ff0000';
      ctx.fillRect(-20, -28, 40, 4);
      ctx.fillStyle = hpPercentage > 0.5 ? '#00ff00' : hpPercentage > 0.2 ? '#ffaa00' : '#ff0000';
      ctx.fillRect(-20, -28, 40 * hpPercentage, 4);
      
      ctx.restore();
    };

    const updateGame = () => {
      if (!gameStarted || gameOver) return;

      let dx = 0, dy = 0;
      if (state.keys['a'] || state.keys['arrowleft']) dx -= state.player.speed;
      if (state.keys['d'] || state.keys['arrowright']) dx += state.player.speed;
      if (state.keys['w'] || state.keys['arrowup']) dy -= state.player.speed;
      if (state.keys['s'] || state.keys['arrowdown']) dy += state.player.speed;

      if (dx !== 0 && dy !== 0) {
        dx *= 0.707;
        dy *= 0.707;
      }

      const newX = state.player.x + dx;
      const newY = state.player.y + dy;

      let canMove = true;
      const testPlayerRect = { x: newX - 15, y: newY - 12, width: 30, height: 24 };
      for (const building of state.buildings) {
        if (checkCollision(testPlayerRect, building)) {
          canMove = false;
          break;
        }
      }

      if (canMove) {
        state.player.x = Math.max(20, Math.min(canvas.width - 20, newX));
        state.player.y = Math.max(20, Math.min(canvas.height - 20, newY));
      }

      state.bullets = state.bullets.filter(bullet => {
        bullet.x += bullet.vx;
        bullet.y += bullet.vy;
        
        for (const building of state.buildings) {
          if (bullet.x > building.x && bullet.x < building.x + building.width &&
              bullet.y > building.y && bullet.y < building.y + building.height) {
            return false;
          }
        }
        
        return bullet.x > 0 && bullet.x < canvas.width && 
               bullet.y > 0 && bullet.y < canvas.height;
      });

      state.bears.forEach(bear => {
        const dx = state.player.x - (bear.x + bear.width/2);
        const dy = state.player.y - (bear.y + bear.height/2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
          const moveX = (dx / distance) * bear.speed;
          const moveY = (dy / distance) * bear.speed;
          
          const newBearRect = {
            x: bear.x + moveX,
            y: bear.y + moveY,
            width: bear.width,
            height: bear.height
          };
          
          let bearCanMove = true;
          for (const building of state.buildings) {
            if (checkCollision(newBearRect, building)) {
              bearCanMove = false;
              break;
            }
          }
          
          if (bearCanMove) {
            bear.x += moveX;
            bear.y += moveY;
          }
        }
      });

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

      const finalPlayerRect = { 
        x: state.player.x - 15, 
        y: state.player.y - 12, 
        width: 30, 
        height: 24 
      };
      
      for (const bear of state.bears) {
        if (checkCollision(finalPlayerRect, bear)) {
          setGameOver(true);
          saveScore(state.score);
          return;
        }
      }

      if (Math.random() < 0.008) {
        spawnBear();
      }

      drawWasteland();
      drawPlayer();
      state.bullets.forEach(drawBullet);
      state.bears.forEach(drawBear);

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 20px Inter';
      ctx.fillText(`Score: ${state.score}`, 20, 30);
      
      ctx.fillStyle = '#ff6b35';
      ctx.font = '14px Inter';
      ctx.fillText(`Bears: ${state.bears.length}`, 20, 55);

      state.animationId = requestAnimationFrame(updateGame);
    };

    updateGame();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (state.animationId) {
        cancelAnimationFrame(state.animationId);
      }
    };
  }, [gameStarted, gameOver, generateBuildings, saveScore]);

  const startGame = () => {
    const state = gameStateRef.current;
    state.player = { x: 450, y: 300, angle: 0, width: 30, height: 30, speed: 4 };
    state.bullets = [];
    state.bears = [];
    state.buildings = [];
    state.score = 0;
    state.lastShot = 0;
    setScore(0);
    setGameStarted(true);
    setGameOver(false);
  };

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <div className="min-h-screen bg-shell-bg flex items-center justify-center p-8">
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="relative">
              <canvas
                ref={canvasRef}
                className="w-full border-2 border-shell-border rounded-lg shadow-2xl bg-[#1a0f08]"
                style={{ aspectRatio: '3/2' }}
              />
              
              {!gameStarted && !gameOver && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 rounded-lg backdrop-blur-sm">
                  <h3 className="text-4xl font-bold mb-4 text-white">Crab Wasteland</h3>
                  <p className="text-shell-muted mb-8 text-center max-w-md">
                    Survive the bear apocalypse. WASD to move, mouse to aim, click to shoot!
                  </p>
                  <button onClick={startGame} className="btn-primary text-lg px-12 py-4">
                    Start Game
                  </button>
                </div>
              )}

              {gameOver && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 rounded-lg backdrop-blur-sm">
                  <h3 className="text-5xl font-bold mb-2 text-shell-primary">Game Over</h3>
                  <p className="text-3xl font-bold mb-8 text-white">Score: {score}</p>
                  {wallet && (
                    <p className="text-sm text-shell-muted mb-4">Score saved to leaderboard!</p>
                  )}
                  <button onClick={startGame} className="btn-primary text-lg px-12 py-4">
                    Play Again
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between text-sm text-shell-muted">
              <div>Controls: WASD to move • Mouse to aim • Click to shoot</div>
              <div>Current Score: <span className="text-shell-primary font-bold">{score}</span></div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Connect Wallet</h3>
              {!wallet ? (
                <button onClick={connectWallet} className="btn-primary w-full">
                  Connect Wallet
                </button>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-shell-bg rounded-md">
                    <span className="text-sm text-shell-muted">Connected:</span>
                    <span className="text-sm font-mono text-shell-primary">{formatAddress(wallet)}</span>
                  </div>
                  <p className="text-xs text-shell-muted">
                    Your scores will be saved to the leaderboard!
                  </p>
                </div>
              )}
            </div>

            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Leaderboard</h3>
                <button 
                  onClick={() => setShowLeaderboard(!showLeaderboard)}
                  className="text-xs text-shell-muted hover:text-white"
                >
                  {showLeaderboard ? 'Hide' : 'Show'}
                </button>
              </div>
              
              {showLeaderboard && (
                <div className="space-y-2">
                  {leaderboard.length === 0 ? (
                    <p className="text-sm text-shell-muted text-center py-8">
                      No scores yet. Be the first!
                    </p>
                  ) : (
                    leaderboard.map((entry, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-3 bg-shell-bg rounded-md hover:bg-shell-border/50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <span className={`text-lg font-bold ${
                            index === 0 ? 'text-yellow-500' : 
                            index === 1 ? 'text-gray-400' : 
                            index === 2 ? 'text-amber-700' : 'text-shell-muted'
                          }`}>
                            #{index + 1}
                          </span>
                          <span className="text-sm font-mono text-shell-text">
                            {formatAddress(entry.address)}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-shell-primary">
                          {entry.score}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t border-shell-border">
                <p className="text-xs text-shell-muted">
                  🏆 Top player wins rewards from creator fees!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
