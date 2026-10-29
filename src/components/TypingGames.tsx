import React, { useState, useEffect, useRef } from 'react';
import {
  Gamepad2,
  Zap,
  Target,
  Play,
  RotateCcw,
  Award,
  Flame,
  Rocket,
  Bomb,
  EyeOff,
  Volume2,
  Trophy,
  ShieldAlert,
  Sparkles,
  Skull,
  Shield,
  Swords,
  Crosshair,
  Heart,
  Terminal,
  Radio,
} from 'lucide-react';
import { soundManager } from '../utils/sound';

interface TypingGamesProps {
  onStartSprint: () => void;
  onStartAccuracyChallenge: () => void;
}

type ActiveGame = 'nitro' | 'zombie' | 'boxing' | 'hacker' | 'meteor' | 'space' | 'skydrop' | 'bomb' | 'ghost';

const COMMON_WORDS = [
  'speed', 'master', 'focus', 'accuracy', 'keyboard', 'keystroke', 'bangla', 'english',
  'rapid', 'agility', 'muscle', 'rhythm', 'digital', 'champion', 'finger', 'practice',
  'growth', 'learning', 'fluent', 'instant', 'victory', 'zenith', 'dynamic', 'future',
  'turbo', 'plasma', 'velocity', 'matrix', 'stream', 'engine', 'quantum', 'lightning',
  'circuit', 'glory', 'reflex', 'precision', 'zen', 'spark', 'cosmic', 'legend',
];

export const TypingGames: React.FC<TypingGamesProps> = ({
  onStartSprint,
  onStartAccuracyChallenge,
}) => {
  const [selectedGame, setSelectedGame] = useState<ActiveGame>('nitro');

  // ==========================================
  // GAME 1: NITRO RACER (2D Racetrack)
  // ==========================================
  const [racerStarted, setRacerStarted] = useState(false);
  const [racerFinished, setRacerFinished] = useState(false);
  const [racerTargetWords, setRacerTargetWords] = useState<string[]>([]);
  const [racerWordIndex, setRacerWordIndex] = useState(0);
  const [racerInput, setRacerInput] = useState('');
  const [playerDistance, setPlayerDistance] = useState(0);
  const [ai1Distance, setAi1Distance] = useState(0);
  const [ai2Distance, setAi2Distance] = useState(0);
  const [raceStartTime, setRaceStartTime] = useState(0);
  const [raceElapsedSec, setRaceElapsedSec] = useState(0);
  const racerInputRef = useRef<HTMLInputElement>(null);

  const startNitroRacer = () => {
    // Generate 12 words to complete race track
    const words: string[] = [];
    for (let i = 0; i < 12; i++) {
      words.push(COMMON_WORDS[Math.floor(Math.random() * COMMON_WORDS.length)]);
    }
    setRacerTargetWords(words);
    setRacerWordIndex(0);
    setRacerInput('');
    setPlayerDistance(0);
    setAi1Distance(0);
    setAi2Distance(0);
    setRacerFinished(false);
    setRacerStarted(true);
    setRaceStartTime(Date.now());
    setTimeout(() => racerInputRef.current?.focus(), 80);
  };

  // AI opponents movement loop
  useEffect(() => {
    if (!racerStarted || racerFinished) return;

    const interval = setInterval(() => {
      setRaceElapsedSec(Math.round((Date.now() - raceStartTime) / 1000));

      setAi1Distance((prev) => {
        const next = prev + 0.65 + Math.random() * 0.45;
        if (next >= 100 && playerDistance < 100) {
          // AI won
        }
        return Math.min(100, next);
      });

      setAi2Distance((prev) => {
        const next = prev + 0.55 + Math.random() * 0.4;
        return Math.min(100, next);
      });
    }, 150);

    return () => clearInterval(interval);
  }, [racerStarted, racerFinished, raceStartTime, playerDistance]);

  const handleRacerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!racerStarted || racerFinished) return;
    const val = e.target.value;
    const targetWord = racerTargetWords[racerWordIndex];

    if (!targetWord) return;

    if (val.trim().toLowerCase() === targetWord.toLowerCase()) {
      soundManager.playSuccess();
      const nextIdx = racerWordIndex + 1;
      const progress = Math.min(100, Math.round((nextIdx / racerTargetWords.length) * 100));
      setPlayerDistance(progress);
      setRacerWordIndex(nextIdx);
      setRacerInput('');

      if (nextIdx >= racerTargetWords.length) {
        setRacerFinished(true);
        soundManager.playSuccess();
      }
    } else {
      soundManager.playKeyClick();
      setRacerInput(val);
    }
  };

  // ==========================================
  // GAME 2: SPACE INVADERS (Cosmic Alien Blaster)
  // ==========================================
  const [spaceStarted, setSpaceStarted] = useState(false);
  const [spaceOver, setSpaceOver] = useState(false);
  const [spaceScore, setSpaceScore] = useState(0);
  const [spaceWave, setSpaceWave] = useState(1);
  const [invaders, setInvaders] = useState<{ id: number; word: string; x: number; y: number }[]>([]);
  const [spaceInput, setSpaceInput] = useState('');
  const [laserBeam, setLaserBeam] = useState<{ active: boolean; targetX: number; targetY: number } | null>(null);
  const spaceInputRef = useRef<HTMLInputElement>(null);

  const startSpaceGame = () => {
    setSpaceStarted(true);
    setSpaceOver(false);
    setSpaceScore(0);
    setSpaceWave(1);
    setSpaceInput('');
    setInvaders([
      { id: 1, word: COMMON_WORDS[Math.floor(Math.random() * 15)], x: 25, y: 15 },
      { id: 2, word: COMMON_WORDS[Math.floor(Math.random() * 15) + 15], x: 70, y: 10 },
    ]);
    setTimeout(() => spaceInputRef.current?.focus(), 80);
  };

  // Invaders descent ticker
  useEffect(() => {
    if (!spaceStarted || spaceOver) return;

    const interval = setInterval(() => {
      setInvaders((prev) => {
        let hitBottom = false;
        const updated = prev.map((inv) => {
          const nextY = inv.y + 1.2;
          if (nextY >= 82) hitBottom = true;
          return { ...inv, y: nextY };
        });

        if (hitBottom) {
          soundManager.playError();
          setSpaceOver(true);
          return [];
        }

        // Auto spawn new invader if count low
        if (updated.length < 3 && Math.random() < 0.25) {
          const newWord = COMMON_WORDS[Math.floor(Math.random() * COMMON_WORDS.length)];
          const newX = 15 + Math.floor(Math.random() * 70);
          return [...updated, { id: Date.now(), word: newWord, x: newX, y: 5 }];
        }

        return updated;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [spaceStarted, spaceOver]);

  const handleSpaceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim().toLowerCase();
    setSpaceInput(e.target.value);

    const hitIdx = invaders.findIndex((inv) => inv.word.toLowerCase() === val);
    if (hitIdx !== -1) {
      const hitInvader = invaders[hitIdx];
      soundManager.playSuccess();
      setLaserBeam({ active: true, targetX: hitInvader.x, targetY: hitInvader.y });
      setTimeout(() => setLaserBeam(null), 250);

      setSpaceScore((s) => s + 25);
      setInvaders((prev) => prev.filter((_, i) => i !== hitIdx));
      setSpaceInput('');

      // Wave advancement check
      if (spaceScore > 0 && spaceScore % 100 === 0) {
        setSpaceWave((w) => w + 1);
      }
    } else {
      soundManager.playKeyClick();
    }
  };

  // ==========================================
  // GAME 3: SKY DROP (Word Rush)
  // ==========================================
  const [playingRush, setPlayingRush] = useState(false);
  const [rushScore, setRushScore] = useState(0);
  const [rushLives, setRushLives] = useState(3);
  const [rushTarget, setRushTarget] = useState('');
  const [rushInput, setRushInput] = useState('');
  const [fallProgress, setFallProgress] = useState(0);
  const [rushOver, setRushOver] = useState(false);
  const rushInputRef = useRef<HTMLInputElement>(null);

  const startRush = () => {
    setPlayingRush(true);
    setRushOver(false);
    setRushScore(0);
    setRushLives(3);
    setFallProgress(0);
    setRushInput('');
    spawnNextRushWord();
    setTimeout(() => rushInputRef.current?.focus(), 80);
  };

  const spawnNextRushWord = () => {
    const randomWord = COMMON_WORDS[Math.floor(Math.random() * COMMON_WORDS.length)];
    setRushTarget(randomWord);
    setFallProgress(0);
    setRushInput('');
  };

  useEffect(() => {
    if (!playingRush || rushOver) return;

    const interval = setInterval(() => {
      setFallProgress((prev) => {
        if (prev >= 100) {
          soundManager.playError();
          setRushLives((l) => {
            if (l <= 1) {
              setRushOver(true);
              setPlayingRush(false);
              return 0;
            }
            return l - 1;
          });
          spawnNextRushWord();
          return 0;
        }
        return prev + 2.2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [playingRush, rushOver]);

  const handleRushInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setRushInput(val);

    if (val.trim().toLowerCase() === rushTarget.toLowerCase()) {
      soundManager.playSuccess();
      setRushScore((s) => s + 15);
      spawnNextRushWord();
    } else {
      soundManager.playKeyClick();
    }
  };

  // ==========================================
  // GAME 4: TIME BOMB DEFUSAL (Panic Timer)
  // ==========================================
  const [bombStarted, setBombStarted] = useState(false);
  const [bombOver, setBombOver] = useState(false);
  const [bombStreak, setBombStreak] = useState(0);
  const [bombTimeLeft, setBombTimeLeft] = useState(8);
  const [bombTarget, setBombTarget] = useState('');
  const [bombInput, setBombInput] = useState('');
  const bombInputRef = useRef<HTMLInputElement>(null);

  const startBombGame = () => {
    setBombStarted(true);
    setBombOver(false);
    setBombStreak(0);
    spawnNewBomb(8);
  };

  const spawnNewBomb = (timeLimit = 8) => {
    const word = COMMON_WORDS[Math.floor(Math.random() * COMMON_WORDS.length)];
    setBombTarget(word);
    setBombTimeLeft(timeLimit);
    setBombInput('');
    setTimeout(() => bombInputRef.current?.focus(), 80);
  };

  useEffect(() => {
    if (!bombStarted || bombOver) return;

    const timer = setInterval(() => {
      setBombTimeLeft((prev) => {
        if (prev <= 1) {
          soundManager.playError();
          setBombOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [bombStarted, bombOver]);

  const handleBombInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setBombInput(val);

    if (val.trim().toLowerCase() === bombTarget.toLowerCase()) {
      soundManager.playSuccess();
      const newStreak = bombStreak + 1;
      setBombStreak(newStreak);
      // As streak gets higher, time gets tighter (minimum 4s)
      const nextTime = Math.max(4, 8 - Math.floor(newStreak / 3));
      spawnNewBomb(nextTime);
    } else {
      soundManager.playKeyClick();
    }
  };

  // ==========================================
  // GAME 5: GHOST MEMORY (Flash & Blind Type)
  // ==========================================
  const [ghostStarted, setGhostStarted] = useState(false);
  const [ghostPhase, setGhostPhase] = useState<'memorize' | 'typing' | 'result'>('memorize');
  const [ghostTarget, setGhostTarget] = useState('');
  const [ghostInput, setGhostInput] = useState('');
  const [ghostStreak, setGhostStreak] = useState(0);
  const [ghostSuccess, setGhostSuccess] = useState<boolean | null>(null);
  const ghostInputRef = useRef<HTMLInputElement>(null);

  const startGhostGame = () => {
    setGhostStarted(true);
    setGhostStreak(0);
    nextGhostRound();
  };

  const nextGhostRound = () => {
    const word1 = COMMON_WORDS[Math.floor(Math.random() * COMMON_WORDS.length)];
    const word2 = COMMON_WORDS[Math.floor(Math.random() * COMMON_WORDS.length)];
    const phrase = `${word1} ${word2}`;
    setGhostTarget(phrase);
    setGhostInput('');
    setGhostSuccess(null);
    setGhostPhase('memorize');

    // Show for 2.2 seconds then hide
    setTimeout(() => {
      setGhostPhase('typing');
      setTimeout(() => ghostInputRef.current?.focus(), 80);
    }, 2200);
  };

  const handleGhostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correct = ghostInput.trim().toLowerCase() === ghostTarget.toLowerCase();
    setGhostSuccess(correct);
    setGhostPhase('result');

    if (correct) {
      soundManager.playSuccess();
      setGhostStreak((s) => s + 1);
    } else {
      soundManager.playError();
    }
  };

  // ==========================================
  // GAME 6: ZOMBIE RUSH (Survival Defense)
  // ==========================================
  interface ZombieEnemy {
    id: number;
    word: string;
    progress: number;
    speed: number;
    avatar: string;
    type: 'crawler' | 'walker' | 'runner' | 'boss';
  }

  const [zombieStarted, setZombieStarted] = useState(false);
  const [zombieGameOver, setZombieGameOver] = useState(false);
  const [zombieScore, setZombieScore] = useState(0);
  const [zombieKills, setZombieKills] = useState(0);
  const [zombieWave, setZombieWave] = useState(1);
  const [zombieWaveBanner, setZombieWaveBanner] = useState<string | null>(null);
  const [barricadeHp, setBarricadeHp] = useState(100);
  const [zombies, setZombies] = useState<ZombieEnemy[]>([]);
  const [zombieInput, setZombieInput] = useState('');
  const [zombieCombo, setZombieCombo] = useState(0);
  const [lastShotEffect, setLastShotEffect] = useState<{ word: string; x: number } | null>(null);
  const zombieInputRef = useRef<HTMLInputElement>(null);

  const ZOMBIE_POOL = [
    'brains', 'shotgun', 'zombie', 'apocalypse', 'infect', 'quarantine',
    'survival', 'shelter', 'barricade', 'toxic', 'outbreak', 'serum',
    'radiation', 'bunker', 'hazard', 'mutant', 'crawlers', 'nightmare',
    'undead', 'reloading', 'headshot', 'defense', 'creeper', 'plasma',
    'danger', 'scout', 'bite', 'curfew', 'biohazard', 'crossfire',
  ];

  const startZombieGame = () => {
    setZombieStarted(true);
    setZombieGameOver(false);
    setZombieScore(0);
    setZombieKills(0);
    setZombieWave(1);
    setBarricadeHp(100);
    setZombieCombo(0);
    setZombieInput('');
    setLastShotEffect(null);
    setZombieWaveBanner('⚡ WAVE 1: DEFEND BARRICADE!');
    setTimeout(() => setZombieWaveBanner(null), 2000);
    spawnZombieWave(1);
    setTimeout(() => zombieInputRef.current?.focus(), 100);
  };

  const spawnZombieWave = (wave: number) => {
    const avatars = ['🧟‍♂️', '🧟', '🧟‍♀️', '👹', '💀'];
    const count = 3 + wave;
    const newZombies: ZombieEnemy[] = [];
    const usedWords = new Set<string>();

    for (let i = 0; i < count; i++) {
      let word = ZOMBIE_POOL[Math.floor(Math.random() * ZOMBIE_POOL.length)];
      while (usedWords.has(word)) {
        word = ZOMBIE_POOL[Math.floor(Math.random() * ZOMBIE_POOL.length)];
      }
      usedWords.add(word);

      const isBoss = i === count - 1 && wave >= 2;
      newZombies.push({
        id: Date.now() + i * 100,
        word,
        // Start far right at 0% to 15% distance
        progress: Math.min(15, i * 3 + Math.random() * 2),
        // Gentle, steady speed tuned for comfortable typing across all waves
        speed: (0.16 + Math.min(0.18, (wave - 1) * 0.035) + Math.random() * 0.04) * (isBoss ? 0.6 : 1),
        avatar: isBoss ? '👹' : avatars[Math.floor(Math.random() * avatars.length)],
        type: isBoss ? 'boss' : i % 2 === 0 ? 'runner' : 'walker',
      });
    }
    setZombies(newZombies);
  };

  useEffect(() => {
    if (!zombieStarted || zombieGameOver) return;

    const interval = setInterval(() => {
      setZombies((prevZombies) => {
        let damageToBarricade = 0;
        const updated = prevZombies
          .map((z) => {
            const nextProgress = z.progress + z.speed;
            if (nextProgress >= 95) {
              damageToBarricade += z.type === 'boss' ? 25 : 15;
              soundManager.playError();
              return null;
            }
            return { ...z, progress: nextProgress };
          })
          .filter(Boolean) as ZombieEnemy[];

        if (damageToBarricade > 0) {
          setBarricadeHp((hp) => {
            const nextHp = Math.max(0, hp - damageToBarricade);
            if (nextHp <= 0) {
              setZombieGameOver(true);
            }
            return nextHp;
          });
          setZombieCombo(0);
        }

        if (updated.length === 0 && !zombieGameOver) {
          soundManager.playSuccess();
          setZombieWave((w) => {
            const nextWave = w + 1;
            setBarricadeHp((hp) => Math.min(100, hp + 25));
            setZombieScore((s) => s + 500 * w);
            setZombieWaveBanner(`⚡ WAVE ${nextWave} INCOMING! PREPARE DEFENSE...`);
            setTimeout(() => {
              setZombieWaveBanner(null);
              spawnZombieWave(nextWave);
            }, 2500);
            return nextWave;
          });
        }

        return updated;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [zombieStarted, zombieGameOver]);

  const handleZombieInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!zombieStarted || zombieGameOver) return;
    const val = e.target.value.toLowerCase().trim();
    setZombieInput(e.target.value);

    const matchedIdx = zombies.findIndex((z) => z.word.toLowerCase() === val);
    if (matchedIdx !== -1) {
      const killed = zombies[matchedIdx];
      soundManager.playSuccess();
      setLastShotEffect({ word: killed.word, x: killed.progress });
      setTimeout(() => setLastShotEffect(null), 600);

      const pts = (killed.type === 'boss' ? 300 : 100) * zombieWave;
      setZombieScore((s) => s + pts);
      setZombieKills((k) => k + 1);
      setZombieCombo((c) => c + 1);
      setZombieInput('');

      setZombies((prev) => prev.filter((_, idx) => idx !== matchedIdx));
    }
  };

  // ==========================================
  // GAME 7: KEYBOARD K.O. (Neon Boxing Ring)
  // ==========================================
  const BOXING_WORDS = [
    'jab', 'hook', 'cross', 'punch', 'combo', 'dodge', 'uppercut',
    'strike', 'counter', 'heavyweight', 'velocity', 'thunder',
    'impact', 'champion', 'blitz', 'stamina', 'clinch', 'haymaker',
    'dynamite', 'reflex', 'fighter', 'ringside', 'guard', 'knockout',
  ];

  const [boxingStarted, setBoxingStarted] = useState(false);
  const [boxingGameOver, setBoxingGameOver] = useState(false);
  const [boxingVictory, setBoxingVictory] = useState(false);
  const [playerHp, setPlayerHp] = useState(100);
  const [rivalHp, setRivalHp] = useState(100);
  const [boxingRound, setBoxingRound] = useState(1);
  const [boxingKoScore, setBoxingKoScore] = useState(0);
  const [boxingSuperMeter, setBoxingSuperMeter] = useState(0);
  const [currentPunchWord, setCurrentPunchWord] = useState('');
  const [boxingInput, setBoxingInput] = useState('');
  const [fighterAction, setFighterAction] = useState<'idle' | 'player_punch' | 'rival_punch' | 'super_ko'>('idle');
  const [rivalTimer, setRivalTimer] = useState(3.5);
  const boxingInputRef = useRef<HTMLInputElement>(null);

  const startBoxingGame = () => {
    setBoxingStarted(true);
    setBoxingGameOver(false);
    setBoxingVictory(false);
    setPlayerHp(100);
    setRivalHp(100);
    setBoxingRound(1);
    setBoxingKoScore(0);
    setBoxingSuperMeter(0);
    setBoxingInput('');
    setFighterAction('idle');
    setRivalTimer(3.5);
    pickNextPunchWord();
    setTimeout(() => boxingInputRef.current?.focus(), 100);
  };

  const pickNextPunchWord = () => {
    const nextWord = BOXING_WORDS[Math.floor(Math.random() * BOXING_WORDS.length)];
    setCurrentPunchWord(nextWord);
    setBoxingInput('');
    setRivalTimer(3.5);
  };

  useEffect(() => {
    if (!boxingStarted || boxingGameOver || boxingVictory) return;

    const interval = setInterval(() => {
      setRivalTimer((prev) => {
        if (prev <= 0.2) {
          soundManager.playError();
          setFighterAction('rival_punch');
          setTimeout(() => setFighterAction('idle'), 500);

          setPlayerHp((hp) => {
            const nextHp = Math.max(0, hp - 18);
            if (nextHp <= 0) {
              setBoxingGameOver(true);
            }
            return nextHp;
          });

          const nextWord = BOXING_WORDS[Math.floor(Math.random() * BOXING_WORDS.length)];
          setCurrentPunchWord(nextWord);
          setBoxingInput('');
          return 3.5;
        }
        return Math.max(0, +(prev - 0.1).toFixed(1));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [boxingStarted, boxingGameOver, boxingVictory]);

  const handleBoxingInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!boxingStarted || boxingGameOver || boxingVictory) return;
    const val = e.target.value;
    setBoxingInput(val);

    if (val.trim().toLowerCase() === currentPunchWord.toLowerCase()) {
      soundManager.playSuccess();
      const isSuper = boxingSuperMeter >= 100;
      const damage = isSuper ? 40 : 18;

      setFighterAction(isSuper ? 'super_ko' : 'player_punch');
      setTimeout(() => setFighterAction('idle'), 600);

      setBoxingSuperMeter((prev) => (isSuper ? 0 : Math.min(100, prev + 25)));
      setBoxingKoScore((s) => s + (isSuper ? 500 : 150));

      setRivalHp((rhp) => {
        const nextRivalHp = Math.max(0, rhp - damage);
        if (nextRivalHp <= 0) {
          if (boxingRound >= 3) {
            setBoxingVictory(true);
          } else {
            setBoxingRound((r) => r + 1);
            setPlayerHp(100);
            return 100;
          }
        }
        return nextRivalHp;
      });

      pickNextPunchWord();
    }
  };

  // ==========================================
  // GAME 8: CYBER HACKER (Matrix Code Breaker)
  // ==========================================
  const HACKER_TARGETS = [
    { node: 'GATEWAY FIREWALL', depth: 'LAYER 1/4', codeReq: 3, iceSpeed: 0.22, color: 'text-emerald-400' },
    { node: 'ENCRYPTION VAULT', depth: 'LAYER 2/4', codeReq: 4, iceSpeed: 0.28, color: 'text-cyan-400' },
    { node: 'QUANTUM NEURAL CORE', depth: 'LAYER 3/4', codeReq: 5, iceSpeed: 0.35, color: 'text-purple-400' },
    { node: 'AI MAINFRAME OVERRIDE', depth: 'FINAL BOSS LAYER', codeReq: 6, iceSpeed: 0.42, color: 'text-red-400' },
  ];

  const HACK_WORDS = [
    'bypass', 'cipher', 'decrypt', 'firewall', 'terminal', 'protocol', 'quantum',
    'override', 'payload', 'exploit', 'proxy', 'rootkit', 'backdoor', 'zeroday',
    'algorithm', 'blockchain', 'satellite', 'trojan', 'packet', 'subroutine',
    'kernel', 'buffer', 'socket', 'hexcode', 'crypto', 'firestorm', 'daemon'
  ];

  const [hackerStarted, setHackerStarted] = useState(false);
  const [hackerGameOver, setHackerGameOver] = useState(false);
  const [hackerVictory, setHackerVictory] = useState(false);
  const [hackerLayerIdx, setHackerLayerIdx] = useState(0);
  const [hackerCrackedCount, setHackerCrackedCount] = useState(0);
  const [hackerIceAlert, setHackerIceAlert] = useState(0);
  const [hackerScore, setHackerScore] = useState(0);
  const [currentHackWord, setCurrentHackWord] = useState('');
  const [hackerInput, setHackerInput] = useState('');
  const [hackerLogs, setHackerLogs] = useState<string[]>([]);
  const hackerInputRef = useRef<HTMLInputElement>(null);

  const startHackerGame = () => {
    setHackerStarted(true);
    setHackerGameOver(false);
    setHackerVictory(false);
    setHackerLayerIdx(0);
    setHackerCrackedCount(0);
    setHackerIceAlert(10);
    setHackerScore(0);
    setHackerLogs(['[SYS] Infiltrating host: 192.168.0.254', '[ICE] Security tracker initialized...']);
    pickNextHackWord();
    setTimeout(() => hackerInputRef.current?.focus(), 100);
  };

  const pickNextHackWord = () => {
    const word = HACK_WORDS[Math.floor(Math.random() * HACK_WORDS.length)];
    setCurrentHackWord(word);
    setHackerInput('');
  };

  useEffect(() => {
    if (!hackerStarted || hackerGameOver || hackerVictory) return;

    const layer = HACKER_TARGETS[hackerLayerIdx];
    const interval = setInterval(() => {
      setHackerIceAlert((prev) => {
        const next = prev + (layer?.iceSpeed || 0.25);
        if (next >= 100) {
          soundManager.playError();
          setHackerGameOver(true);
          return 100;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [hackerStarted, hackerGameOver, hackerVictory, hackerLayerIdx]);

  const handleHackerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hackerStarted || hackerGameOver || hackerVictory) return;
    const val = e.target.value;
    setHackerInput(val);

    if (val.trim().toLowerCase() === currentHackWord.toLowerCase()) {
      soundManager.playSuccess();
      const currentLayer = HACKER_TARGETS[hackerLayerIdx];
      const newCracked = hackerCrackedCount + 1;
      const pts = 250 * (hackerLayerIdx + 1);

      setHackerScore((s) => s + pts);
      setHackerIceAlert((ice) => Math.max(0, ice - 14));

      setHackerLogs((logs) => [
        `[AUTH_OK] Bypassed "${currentHackWord}" -> +${pts} pts`,
        ...logs.slice(0, 4),
      ]);

      if (newCracked >= currentLayer.codeReq) {
        if (hackerLayerIdx + 1 >= HACKER_TARGETS.length) {
          setHackerVictory(true);
        } else {
          setHackerLayerIdx((idx) => idx + 1);
          setHackerCrackedCount(0);
          setHackerLogs((logs) => [
            `[SYSTEM] LAYER BREACHED! Advancing to ${HACKER_TARGETS[hackerLayerIdx + 1].node}`,
            ...logs.slice(0, 4),
          ]);
        }
      } else {
        setHackerCrackedCount(newCracked);
      }

      pickNextHackWord();
    }
  };

  // ==========================================
  // GAME 9: METEOR SHIELD (City Missile Defense)
  // ==========================================
  interface MeteorItem {
    id: number;
    word: string;
    x: number;
    y: number;
    speed: number;
    size: 'small' | 'medium' | 'huge';
  }

  const METEOR_POOL = [
    'comet', 'impact', 'plasma', 'laser', 'shield', 'turret', 'orbit', 'gravity',
    'velocity', 'deflect', 'stellar', 'galaxy', 'defense', 'sector', 'energy',
    'missile', 'asteroid', 'barrier', 'quantum', 'beacon', 'blitz', 'supernova'
  ];

  const [meteorStarted, setMeteorStarted] = useState(false);
  const [meteorGameOver, setMeteorGameOver] = useState(false);
  const [cityHealth, setCityHealth] = useState(100);
  const [meteorScore, setMeteorScore] = useState(0);
  const [meteorsDestroyed, setMeteorsDestroyed] = useState(0);
  const [meteorWave, setMeteorWave] = useState(1);
  const [meteors, setMeteors] = useState<MeteorItem[]>([]);
  const [meteorInput, setMeteorInput] = useState('');
  const [laserBeamEffect, setLaserBeamEffect] = useState<{ x: number; y: number } | null>(null);
  const meteorInputRef = useRef<HTMLInputElement>(null);

  const startMeteorGame = () => {
    setMeteorStarted(true);
    setMeteorGameOver(false);
    setCityHealth(100);
    setMeteorScore(0);
    setMeteorsDestroyed(0);
    setMeteorWave(1);
    setMeteorInput('');
    setLaserBeamEffect(null);
    spawnMeteorShower(1);
    setTimeout(() => meteorInputRef.current?.focus(), 100);
  };

  const spawnMeteorShower = (wave: number) => {
    const count = 3 + wave;
    const newMeteors: MeteorItem[] = [];
    const usedWords = new Set<string>();

    for (let i = 0; i < count; i++) {
      let word = METEOR_POOL[Math.floor(Math.random() * METEOR_POOL.length)];
      while (usedWords.has(word)) {
        word = METEOR_POOL[Math.floor(Math.random() * METEOR_POOL.length)];
      }
      usedWords.add(word);

      newMeteors.push({
        id: Date.now() + i * 150,
        word,
        x: 12 + ((i * 22) % 76) + (Math.random() * 6 - 3),
        y: Math.min(18, i * 4 + Math.random() * 3),
        speed: 0.16 + Math.min(0.18, (wave - 1) * 0.035) + Math.random() * 0.04,
        size: i % 3 === 0 ? 'huge' : i % 2 === 0 ? 'medium' : 'small',
      });
    }
    setMeteors(newMeteors);
  };

  useEffect(() => {
    if (!meteorStarted || meteorGameOver) return;

    const interval = setInterval(() => {
      setMeteors((prev) => {
        let cityDamage = 0;
        const remaining = prev
          .map((m) => {
            const nextY = m.y + m.speed;
            if (nextY >= 88) {
              cityDamage += m.size === 'huge' ? 25 : 15;
              soundManager.playError();
              return null;
            }
            return { ...m, y: nextY };
          })
          .filter(Boolean) as MeteorItem[];

        if (cityDamage > 0) {
          setCityHealth((hp) => {
            const nextHp = Math.max(0, hp - cityDamage);
            if (nextHp <= 0) {
              setMeteorGameOver(true);
            }
            return nextHp;
          });
        }

        if (remaining.length === 0 && !meteorGameOver) {
          soundManager.playSuccess();
          setMeteorWave((w) => {
            const nextWave = w + 1;
            setCityHealth((hp) => Math.min(100, hp + 20));
            setMeteorScore((s) => s + 400 * w);
            setTimeout(() => spawnMeteorShower(nextWave), 1500);
            return nextWave;
          });
        }

        return remaining;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [meteorStarted, meteorGameOver]);

  const handleMeteorInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!meteorStarted || meteorGameOver) return;
    const val = e.target.value.toLowerCase().trim();
    setMeteorInput(e.target.value);

    const matchIdx = meteors.findIndex((m) => m.word.toLowerCase() === val);
    if (matchIdx !== -1) {
      const hit = meteors[matchIdx];
      soundManager.playSuccess();
      setLaserBeamEffect({ x: hit.x, y: hit.y });
      setTimeout(() => setLaserBeamEffect(null), 400);

      const pts = (hit.size === 'huge' ? 250 : 120) * meteorWave;
      setMeteorScore((s) => s + pts);
      setMeteorsDestroyed((k) => k + 1);
      setMeteorInput('');

      setMeteors((prev) => prev.filter((_, idx) => idx !== matchIdx));
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header Framed Closely by Floating Gaming Icons */}
      <div className="relative mx-auto w-full max-w-3xl px-2 sm:px-4">
        {/* Left Floating Gaming Icons (Tightly hugging the title text on md+ screens) */}
        <div
          className="pointer-events-none absolute -left-6 sm:-left-12 lg:-left-16 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-2.5 select-none"
          aria-hidden="true"
        >
          {/* Gamepad */}
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#d7ff64]/40 bg-[#161a12]/80 backdrop-blur-sm shadow-[0_0_18px_rgba(215,255,100,0.25)] animate-float-game-1">
            <Gamepad2 className="h-5 w-5 text-[#d7ff64]" />
          </div>
          {/* Rocket */}
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-500/40 bg-[#121c22]/80 backdrop-blur-sm shadow-[0_0_18px_rgba(6,182,212,0.25)] animate-float-game-2">
            <Rocket className="h-5 w-5 text-cyan-400" />
          </div>
          {/* Flame */}
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-500/40 bg-[#221912]/80 backdrop-blur-sm shadow-[0_0_18px_rgba(245,158,11,0.25)] animate-float-game-3">
            <Flame className="h-5 w-5 text-amber-400" />
          </div>
          {/* Keycap W */}
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-[#171914] shadow-[0_3px_0_rgba(255,255,255,0.08)] animate-float-game-1">
            <span className="font-mono text-xs font-black text-gray-300">W</span>
          </div>
        </div>

        {/* Right Floating Gaming Icons (Tightly hugging the title text on md+ screens) */}
        <div
          className="pointer-events-none absolute -right-6 sm:-right-12 lg:-right-16 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-2.5 select-none"
          aria-hidden="true"
        >
          {/* Trophy */}
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-purple-500/40 bg-[#1e1428]/80 backdrop-blur-sm shadow-[0_0_18px_rgba(168,85,247,0.25)] animate-float-game-1">
            <Trophy className="h-5 w-5 text-purple-400" />
          </div>
          {/* Bomb */}
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-rose-500/40 bg-[#241317]/80 backdrop-blur-sm shadow-[0_0_18px_rgba(244,63,94,0.25)] animate-float-game-2">
            <Bomb className="h-5 w-5 text-rose-400" />
          </div>
          {/* Zap */}
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-500/40 bg-[#102219]/80 backdrop-blur-sm shadow-[0_0_18px_rgba(160,85,247,0.25)] animate-float-game-3">
            <Zap className="h-5 w-5 text-emerald-400" />
          </div>
          {/* Keycap D */}
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-[#171914] shadow-[0_3px_0_rgba(255,255,255,0.08)] animate-float-game-2">
            <span className="font-mono text-xs font-black text-gray-300">D</span>
          </div>
        </div>

        {/* Header Text */}
        <section className="text-center">
          <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-[#d7ff64]/30 bg-[#d7ff64]/10 px-3.5 py-1 text-xs font-bold tracking-wide text-[#d7ff64]">
            <Gamepad2 className="h-3.5 w-3.5" />
            <span>ARCADE GAME ZONE</span>
          </div>
          <h2 className="text-2xl font-black text-white sm:text-4xl md:text-5xl">
            Level Up Your <span className="text-[#d7ff64]">Speed & Reflexes</span>
          </h2>
          <p className="mx-auto mt-2 sm:mt-3 max-w-2xl text-xs sm:text-base text-[#a4a69d]">
            Interactive games designed to make typing practice thrilling, competitive, and deeply rewarding.
          </p>
        </section>
      </div>

      {/* Game Selector Arcade Menu - Swipeable on mobile, centered wrap on tablet/desktop */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 pt-1 px-1 scrollbar-none sm:flex-wrap sm:justify-center">
        {[
          { id: 'nitro' as ActiveGame, label: '🏎️ Nitro Racer', badge: 'Popular' },
          { id: 'zombie' as ActiveGame, label: '🧟 Zombie Rush', badge: 'Survival' },
          { id: 'boxing' as ActiveGame, label: '🥊 Keyboard K.O.', badge: 'Combat' },
          { id: 'hacker' as ActiveGame, label: '💻 Cyber Hacker', badge: 'Matrix' },
          { id: 'meteor' as ActiveGame, label: '☄️ Meteor Shield', badge: 'Defense' },
          { id: 'space' as ActiveGame, label: '🚀 Cosmic Blaster', badge: 'Action' },
          { id: 'skydrop' as ActiveGame, label: '👾 Sky Drop', badge: 'Classic' },
          { id: 'bomb' as ActiveGame, label: '💣 Time Bomb', badge: 'Panic' },
          { id: 'ghost' as ActiveGame, label: '👻 Ghost Memory', badge: 'Brain' },
        ].map((game) => (
          <button
            key={game.id}
            onClick={() => setSelectedGame(game.id)}
            className={`flex flex-shrink-0 items-center gap-1.5 sm:gap-2 rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 text-xs font-bold transition whitespace-nowrap active:scale-95 sm:text-sm ${
              selectedGame === game.id
                ? 'bg-[#d7ff64] text-[#111310] shadow-[0_0_20px_rgba(215,255,100,0.35)]'
                : 'border border-white/10 bg-[#161814] text-gray-300 hover:border-white/20 hover:text-white'
            }`}
          >
            <span>{game.label}</span>
            <span
              className={`rounded-full px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] ${
                selectedGame === game.id
                  ? 'bg-[#111310] text-[#d7ff64]'
                  : 'bg-white/10 text-gray-400'
              }`}
            >
              {game.badge}
            </span>
          </button>
        ))}
      </div>

      {/* ========================================================= */}
      {/* GAME 1: NITRO RACER                                       */}
      {/* ========================================================= */}
      {selectedGame === 'nitro' && (
        <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-[#161814] p-3.5 sm:p-6 md:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3 sm:pb-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl bg-[#d7ff64]/10 text-xl sm:text-2xl shrink-0">
                🏎️
              </span>
              <div>
                <h3 className="text-base sm:text-xl font-black text-white">Nitro Typer Grand Prix</h3>
                <p className="text-[11px] sm:text-xs text-gray-400">Type words to inject Nitro boost and cross the finish line 1st!</p>
              </div>
            </div>

            {racerStarted && (
              <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4 text-xs font-bold w-full sm:w-auto">
                <span className="rounded-xl bg-[#111310] px-3 py-1.5 text-gray-300">
                  ⏱️ Time: {raceElapsedSec}s
                </span>
                <span className="rounded-xl bg-[#111310] px-3 py-1.5 text-[#d7ff64]">
                  🏁 Progress: {playerDistance}%
                </span>
              </div>
            )}
          </div>

          {/* Racetrack Visual Box */}
          <div className="relative my-4 sm:my-6 space-y-3 sm:space-y-4 rounded-xl sm:rounded-2xl border border-white/5 bg-[#111310] p-3 sm:p-5 select-none overflow-hidden">
            {/* Lane 1: Player (Lime Racer) */}
            <div>
              <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-gray-400 mb-1">
                <span className="text-[#d7ff64] flex items-center gap-1">
                  <Flame className="h-3 w-3" /> YOU (Lime Formula 1)
                </span>
                <span>{playerDistance}%</span>
              </div>
              <div className="relative h-9 sm:h-10 w-full rounded-xl bg-[#181a15] border border-white/5 flex items-center px-2">
                <div
                  style={{ left: `calc(${playerDistance}% * 0.85)` }}
                  className="absolute flex items-center gap-1 sm:gap-1.5 transition-all duration-200"
                >
                  <span className="text-xl sm:text-2xl filter drop-shadow-[0_0_8px_#d7ff64]">🏎️</span>
                  {playerDistance > 0 && <span className="text-xs text-amber-400 animate-pulse">🔥</span>}
                </div>
                {/* Finish flag */}
                <div className="absolute right-2 text-lg sm:text-xl">🏁</div>
              </div>
            </div>

            {/* Lane 2: AI Racer 1 (Red Turbo) */}
            <div>
              <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-gray-500 mb-1">
                <span>Cyber Red (AI)</span>
                <span>{Math.round(ai1Distance)}%</span>
              </div>
              <div className="relative h-8 w-full rounded-xl bg-[#151713] border border-white/5 flex items-center px-2">
                <div
                  style={{ left: `calc(${ai1Distance}% * 0.85)` }}
                  className="absolute flex items-center gap-1 transition-all duration-200"
                >
                  <span className="text-lg sm:text-xl">🚗</span>
                </div>
                <div className="absolute right-2 text-sm sm:text-base opacity-40">🏁</div>
              </div>
            </div>

            {/* Lane 3: AI Racer 2 (Blue Comet) */}
            <div>
              <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-gray-500 mb-1">
                <span>Speed Comet (AI)</span>
                <span>{Math.round(ai2Distance)}%</span>
              </div>
              <div className="relative h-8 w-full rounded-xl bg-[#151713] border border-white/5 flex items-center px-2">
                <div
                  style={{ left: `calc(${ai2Distance}% * 0.85)` }}
                  className="absolute flex items-center gap-1 transition-all duration-200"
                >
                  <span className="text-lg sm:text-xl">🚙</span>
                </div>
                <div className="absolute right-2 text-sm sm:text-base opacity-40">🏁</div>
              </div>
            </div>
          </div>

          {/* Interactive Controller */}
          {!racerStarted && !racerFinished && (
            <div className="text-center py-3 sm:py-4">
              <button
                onClick={startNitroRacer}
                className="flex items-center gap-2 mx-auto rounded-xl sm:rounded-2xl bg-[#d7ff64] px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-black text-[#111310] shadow-[0_0_20px_rgba(215,255,100,0.3)] transition hover:bg-[#e6ff8f] active:scale-95"
              >
                <Play className="h-4 w-4 fill-current" />
                <span>Start Race Championship</span>
              </button>
            </div>
          )}

          {racerStarted && !racerFinished && (
            <div className="space-y-3 sm:space-y-4">
              <div className="text-center">
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 font-bold">
                  Target Nitro Word ({racerWordIndex + 1}/{racerTargetWords.length})
                </span>
                <p className="mt-1 font-mono text-2xl sm:text-4xl font-black text-[#d7ff64]">
                  {racerTargetWords[racerWordIndex]}
                </p>
              </div>

              <div className="max-w-md mx-auto">
                <input
                  ref={racerInputRef}
                  type="text"
                  value={racerInput}
                  onChange={handleRacerInput}
                  placeholder="Type word to fire nitro..."
                  className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-[#111310] p-3 sm:p-4 text-center font-mono text-base sm:text-lg text-white outline-none focus:border-[#d7ff64] focus:ring-1 focus:ring-[#d7ff64]"
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
            </div>
          )}

          {racerFinished && (
            <div className="text-center py-5 sm:py-6 animate-in zoom-in-95">
              <Trophy className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-[#d7ff64] animate-bounce" />
              <h4 className="mt-2 text-xl sm:text-2xl font-black text-white">
                {playerDistance >= 100 && playerDistance >= ai1Distance
                  ? '🏆 1st Place Champion!'
                  : '🏁 Race Finished!'}
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-gray-400">
                Completed 12 Nitro words in {raceElapsedSec} seconds!
              </p>
              <button
                onClick={startNitroRacer}
                className="mt-4 sm:mt-5 flex items-center gap-2 mx-auto rounded-xl bg-[#d7ff64] px-5 sm:px-6 py-2.5 text-xs font-bold text-[#111310]"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Race Again</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* GAME 2: ZOMBIE RUSH (Survival Barricade Defense)           */}
      {/* ========================================================= */}
      {selectedGame === 'zombie' && (
        <div className="rounded-2xl sm:rounded-3xl border border-red-500/20 bg-gradient-to-b from-[#181214] to-[#121411] p-3.5 sm:p-6 md:p-8 shadow-2xl relative overflow-hidden">
          {/* Blood & Biohazard Neon Glow background */}
          <div
            className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full opacity-20 blur-[100px]"
            style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.8) 0%, transparent 70%)' }}
          />

          {/* Top Bar: Title & Stats */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3 sm:pb-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl bg-red-500/10 text-xl sm:text-2xl border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.25)] shrink-0">
                🧟
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-xl font-black text-white">Zombie Rush: Survival</h3>
                  <span className="rounded-full bg-red-500/20 border border-red-500/40 px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-red-400 uppercase tracking-wider">
                    Wave {zombieWave}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-gray-400">Type floating words to fire shotgun blasts!</p>
              </div>
            </div>

            {zombieStarted && !zombieGameOver && (
              <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4 w-full sm:w-auto">
                <div className="text-left sm:text-right">
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-gray-400">Barricade Armor</span>
                  <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5">
                    <div className="w-20 sm:w-36 h-2 sm:h-2.5 rounded-full bg-black/50 border border-white/10 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          barricadeHp > 50 ? 'bg-[#d7ff64]' : barricadeHp > 25 ? 'bg-amber-400' : 'bg-red-500 animate-pulse'
                        }`}
                        style={{ width: `${barricadeHp}%` }}
                      />
                    </div>
                    <span className="font-mono text-[11px] sm:text-xs font-black text-white">{barricadeHp}%</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 bg-black/40 px-2.5 sm:px-3.5 py-1.5 rounded-xl sm:rounded-2xl border border-white/10">
                  <div className="text-center">
                    <span className="text-[8px] sm:text-[9px] text-gray-400 block uppercase">Kills</span>
                    <span className="font-mono text-xs sm:text-sm font-black text-red-400">{zombieKills} 💀</span>
                  </div>
                  <div className="h-5 sm:h-6 w-px bg-white/10" />
                  <div className="text-center">
                    <span className="text-[8px] sm:text-[9px] text-gray-400 block uppercase">Score</span>
                    <span className="font-mono text-xs sm:text-sm font-black text-[#d7ff64]">{zombieScore}</span>
                  </div>
                  {zombieCombo > 1 && (
                    <>
                      <div className="h-5 sm:h-6 w-px bg-white/10" />
                      <div className="text-center animate-bounce">
                        <span className="text-[8px] sm:text-[9px] text-amber-400 block uppercase">Combo</span>
                        <span className="font-mono text-[10px] sm:text-xs font-black text-amber-300">{zombieCombo}x 🔥</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Battlefield Area */}
          <div className="relative mt-4 sm:mt-5 h-64 sm:h-80 w-full overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-[#0e100c] shadow-inner flex flex-col justify-between p-3 sm:p-4">
            {/* Toxic Fog Grid */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Left Defense Barricade Wall */}
            <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-16 border-r-2 border-red-500/40 bg-gradient-to-r from-black/80 to-red-950/20 z-10 flex flex-col items-center justify-around py-3 sm:py-4">
              <span className="text-[9px] sm:text-xs font-black tracking-widest text-red-400/80 [writing-mode:vertical-lr] rotate-180 uppercase">
                🛡️ BARRICADE
              </span>
              <div className="h-8 sm:h-10 w-2 sm:w-2.5 rounded-full bg-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
              <div className="text-base sm:text-xl">🚪</div>
            </div>

            {/* Danger Zone Marker */}
            <div className="absolute right-0 top-2 px-2.5 py-1 bg-red-950/40 border border-red-500/20 rounded-lg text-[9px] sm:text-[10px] text-red-300 font-mono flex items-center gap-1.5 z-10">
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-red-500 animate-ping" />
              <span className="hidden xs:inline">OUTBREAK ZONE • </span>WAVE {zombieWave}
            </div>

            {/* Wave Notice Banner */}
            {zombieWaveBanner && (
              <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-none animate-in zoom-in-95">
                <div className="rounded-xl sm:rounded-2xl border-2 border-red-500 bg-red-950/95 px-4 sm:px-6 py-2.5 sm:py-3 text-center shadow-[0_0_35px_rgba(239,68,68,0.7)]">
                  <span className="font-mono text-xs sm:text-lg font-black text-white tracking-widest uppercase">
                    {zombieWaveBanner}
                  </span>
                </div>
              </div>
            )}

            {/* Shotgun Flash Effect */}
            {lastShotEffect && (
              <div
                className="absolute top-1/2 -translate-y-1/2 z-20 pointer-events-none animate-in fade-in zoom-in duration-150 flex items-center gap-1.5 sm:gap-2 bg-red-600/90 text-white font-black px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-[0_0_30px_rgba(239,68,68,0.8)] border border-yellow-300 text-xs sm:text-base"
                style={{ right: `${lastShotEffect.x}%` }}
              >
                <span>💥 HEADSHOT!</span>
                <span className="font-mono text-yellow-300">+{100 * zombieWave}</span>
              </div>
            )}

            {/* Active Zombies on the Battlefield */}
            <div className="relative h-full w-full pl-10 sm:pl-16">
              {zombies.map((z) => {
                const isTarget = zombieInput.length > 0 && z.word.toLowerCase().startsWith(zombieInput.trim().toLowerCase());
                return (
                  <div
                    key={z.id}
                    className="absolute transition-all duration-150 flex flex-col items-center"
                    style={{
                      right: `${Math.min(84, z.progress)}%`,
                      top: `${((z.id % 4) + 1) * 20}%`,
                    }}
                  >
                    <div
                      className={`mb-0.5 sm:mb-1 rounded-lg sm:rounded-xl px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-mono font-bold transition-all shadow-md max-w-[95px] sm:max-w-none truncate ${
                        isTarget
                          ? 'border-2 border-[#d7ff64] bg-[#111310] text-[#d7ff64] shadow-[0_0_15px_rgba(215,255,100,0.5)] scale-110'
                          : z.type === 'boss'
                          ? 'border border-red-500 bg-red-950/80 text-red-200'
                          : 'border border-white/20 bg-black/80 text-white'
                      }`}
                    >
                      {z.type === 'boss' && <span className="mr-0.5 text-red-400">⚠️</span>}
                      {z.word}
                    </div>

                    <div className="relative text-2xl sm:text-4xl animate-bounce duration-700">
                      <span>{z.avatar}</span>
                      {z.progress > 70 && (
                        <span className="absolute -top-1 -right-1 text-xs animate-ping">🩸</span>
                      )}
                    </div>
                  </div>
                );
              })}

              {!zombieStarted && !zombieGameOver && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3 sm:p-4">
                  <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-2xl sm:rounded-3xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-3xl sm:text-4xl shadow-[0_0_30px_rgba(239,68,68,0.3)] mb-2 sm:mb-3">
                    🧟‍♂️
                  </div>
                  <h4 className="text-lg sm:text-2xl font-black text-white">Zombie Defense Outbreak</h4>
                  <p className="max-w-md text-xs sm:text-sm text-gray-400 mt-1">
                    An undead swarm is marching towards your bunker! Type floating words to obliterate them before they tear down your barricade.
                  </p>
                  <button
                    onClick={startZombieGame}
                    className="mt-3 sm:mt-4 flex items-center gap-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-black text-white shadow-[0_0_25px_rgba(239,68,68,0.4)] transition hover:from-red-400 hover:to-rose-500 active:scale-95"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    <span>DEFEND BARRICADE (START)</span>
                  </button>
                </div>
              )}

              {zombieGameOver && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm z-30 animate-in zoom-in-95">
                  <div className="text-4xl sm:text-5xl animate-pulse">💀</div>
                  <h4 className="mt-1 sm:mt-2 text-xl sm:text-3xl font-black text-red-400">BARRICADE BREACHED!</h4>
                  <p className="text-xs sm:text-sm text-gray-300 mt-1">
                    You survived until <strong className="text-white">Wave {zombieWave}</strong> with <strong className="text-red-400">{zombieKills} Kills</strong> and score <strong className="text-[#d7ff64]">{zombieScore}</strong>!
                  </p>
                  <button
                    onClick={startZombieGame}
                    className="mt-3 sm:mt-4 flex items-center gap-2 rounded-xl bg-red-500 px-6 py-2.5 text-xs font-black text-white shadow-lg transition hover:bg-red-400 active:scale-95"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Try Again (Respawn)</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Aim & Shoot Input Console */}
          {zombieStarted && !zombieGameOver && (
            <div className="mt-3 sm:mt-4 max-w-lg mx-auto space-y-2">
              <div className="relative">
                <input
                  ref={zombieInputRef}
                  type="text"
                  value={zombieInput}
                  onChange={handleZombieInput}
                  placeholder="Target zombie word to fire shotgun blast..."
                  className="w-full rounded-xl sm:rounded-2xl border-2 border-red-500/40 bg-[#10120f] px-4 sm:px-5 py-2.5 sm:py-3.5 text-center font-mono text-base sm:text-lg font-bold text-white shadow-lg outline-none focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.35)]"
                  autoComplete="off"
                  spellCheck={false}
                />
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base sm:text-lg opacity-60">🎯</span>
              </div>
              <p className="text-center text-[10px] sm:text-[11px] text-gray-400">
                💡 Tip: Type any zombie's word on screen — matching letters highlight in neon lime!
              </p>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* GAME 3: KEYBOARD K.O. (Neon Boxing Arena)                 */}
      {/* ========================================================= */}
      {selectedGame === 'boxing' && (
        <div className="rounded-2xl sm:rounded-3xl border border-cyan-500/20 bg-gradient-to-b from-[#101722] to-[#121417] p-3.5 sm:p-6 md:p-8 shadow-2xl relative overflow-hidden">
          {/* Cyberpunk Blue & Orange Stadium Spotlight background */}
          <div
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-80 w-full max-w-2xl rounded-full opacity-20 blur-[120px]"
            style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.6) 0%, rgba(245,158,11,0.4) 60%, transparent 80%)' }}
          />

          {/* Top Bar: Title & Ring Stats */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3 sm:pb-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl bg-cyan-500/10 text-xl sm:text-2xl border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.25)] shrink-0">
                🥊
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-xl font-black text-white">Keyboard K.O. Fighter</h3>
                  <span className="rounded-full bg-cyan-500/20 border border-cyan-500/40 px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-cyan-300 uppercase tracking-wider">
                    Round {boxingRound} of 3
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-gray-400">Type combos before the opponent counter timer hits zero!</p>
              </div>
            </div>

            {boxingStarted && !boxingGameOver && !boxingVictory && (
              <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto bg-black/40 px-3.5 py-1.5 rounded-xl sm:rounded-2xl border border-white/10">
                <div className="text-left sm:text-center">
                  <span className="text-[8px] sm:text-[9px] text-gray-400 block uppercase">Rival Timer</span>
                  <span className={`font-mono text-xs sm:text-sm font-black ${rivalTimer < 1.2 ? 'text-red-400 animate-ping' : 'text-amber-400'}`}>
                    ⏱️ {rivalTimer.toFixed(1)}s
                  </span>
                </div>
                <div className="h-5 sm:h-6 w-px bg-white/10" />
                <div className="text-right sm:text-center">
                  <span className="text-[8px] sm:text-[9px] text-gray-400 block uppercase">Score</span>
                  <span className="font-mono text-xs sm:text-sm font-black text-[#d7ff64]">{boxingKoScore}</span>
                </div>
              </div>
            )}
          </div>

          {/* Dual Fighters Health & Ring Showcase */}
          <div className="mt-4 sm:mt-5 space-y-3 sm:space-y-4">
            {/* Health Bars Row */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              {/* Player Side */}
              <div className="rounded-xl sm:rounded-2xl border border-cyan-500/30 bg-black/40 p-2.5 sm:p-3.5 space-y-1.5 overflow-hidden">
                <div className="flex items-center justify-between text-[11px] sm:text-xs font-black">
                  <span className="text-cyan-400 flex items-center gap-1 truncate">
                    <span>🥷</span>
                    <span className="hidden sm:inline">YOU (BOXER)</span>
                    <span className="sm:hidden">YOU</span>
                  </span>
                  <span className="font-mono text-white text-[11px] sm:text-xs shrink-0">{playerHp} HP</span>
                </div>
                <div className="h-2.5 sm:h-3 w-full rounded-full bg-black/60 overflow-hidden border border-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                    style={{ width: `${playerHp}%` }}
                  />
                </div>
                {/* Super Finisher Meter */}
                <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-gray-400 font-bold pt-0.5">
                  <span className="truncate">⚡ SUPER METER</span>
                  <span className={boxingSuperMeter >= 100 ? 'text-[#d7ff64] font-black animate-pulse truncate' : 'text-gray-400 font-mono truncate'}>
                    {boxingSuperMeter >= 100 ? '🔥 READY!' : `${boxingSuperMeter}%`}
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      boxingSuperMeter >= 100 ? 'bg-[#d7ff64] shadow-[0_0_10px_#d7ff64]' : 'bg-purple-500'
                    }`}
                    style={{ width: `${boxingSuperMeter}%` }}
                  />
                </div>
              </div>

              {/* Rival Side */}
              <div className="rounded-xl sm:rounded-2xl border border-rose-500/30 bg-black/40 p-2.5 sm:p-3.5 space-y-1.5 overflow-hidden">
                <div className="flex items-center justify-between text-[11px] sm:text-xs font-black">
                  <span className="text-rose-400 flex items-center gap-1 truncate">
                    <span>🤖</span>
                    <span className="hidden sm:inline">TITAN SHADOW</span>
                    <span className="sm:hidden">RIVAL</span>
                  </span>
                  <span className="font-mono text-white text-[11px] sm:text-xs shrink-0">{rivalHp} HP</span>
                </div>
                <div className="h-2.5 sm:h-3 w-full rounded-full bg-black/60 overflow-hidden border border-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-rose-500 to-red-600 transition-all duration-300"
                    style={{ width: `${rivalHp}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-gray-400 font-bold pt-0.5">
                  <span className="truncate">ROUND PROGRESS</span>
                  <span className="text-rose-300 font-mono text-[9px] sm:text-[10px] truncate">{boxingRound} / 3</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-rose-500/70 transition-all duration-300"
                    style={{ width: `${(boxingRound / 3) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Boxing Ring Stage */}
            <div className="relative h-52 sm:h-72 w-full rounded-xl sm:rounded-2xl border border-white/10 bg-[#0d1017] flex items-center justify-between px-3 sm:px-16 overflow-hidden shadow-inner">
              {/* Ring ropes graphic */}
              <div className="absolute inset-x-0 top-10 sm:top-12 border-t border-cyan-500/20" />
              <div className="absolute inset-x-0 top-20 sm:top-24 border-t border-rose-500/20" />
              <div className="absolute inset-x-0 bottom-10 sm:bottom-12 border-t border-amber-500/20" />

              {/* Player Fighter Avatar */}
              <div
                className={`flex flex-col items-center transition-all duration-200 z-10 ${
                  fighterAction === 'player_punch' || fighterAction === 'super_ko'
                    ? 'translate-x-3 sm:translate-x-14 scale-110'
                    : fighterAction === 'rival_punch'
                    ? '-translate-x-2 sm:-translate-x-4 opacity-75'
                    : 'animate-bounce duration-1000'
                }`}
              >
                <div className="text-3xl sm:text-6xl">🥷</div>
                <span className="mt-1 sm:mt-2 text-[10px] sm:text-xs font-black text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 sm:px-2.5 py-0.5 rounded-full whitespace-nowrap">
                  {fighterAction === 'super_ko' ? '💥 SUPER!' : fighterAction === 'player_punch' ? '🥊 JAB!' : 'YOU'}
                </span>
              </div>

              {/* Center Combo & Target Word Display */}
              <div className="flex flex-col items-center justify-center text-center z-10 px-1 max-w-[170px] sm:max-w-none">
                {boxingStarted && !boxingGameOver && !boxingVictory && (
                  <>
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-amber-400 mb-1">
                      {boxingSuperMeter >= 100 ? '⚡ SUPER FINISHER' : '⚡ POWER STRIKE'}
                    </span>
                    <div className="rounded-xl sm:rounded-2xl border-2 border-white/20 bg-black/80 px-3.5 py-1.5 sm:px-6 sm:py-3 shadow-[0_0_25px_rgba(215,255,100,0.2)]">
                      <span className="font-mono text-lg sm:text-3xl font-black text-[#d7ff64] tracking-wide break-all">
                        {currentPunchWord}
                      </span>
                    </div>
                  </>
                )}

                {!boxingStarted && !boxingGameOver && !boxingVictory && (
                  <div className="text-center">
                    <div className="text-3xl sm:text-5xl mb-1 sm:mb-2">🥊</div>
                    <h4 className="text-base sm:text-2xl font-black text-white">Keyboard K.O. Arena</h4>
                    <p className="text-[11px] sm:text-xs text-gray-400 max-w-xs mt-1 hidden xs:block">
                      Knock out Titan Shadow in 3 rounds by typing rapid punch combos!
                    </p>
                    <button
                      onClick={startBoxingGame}
                      className="mt-2.5 sm:mt-4 flex items-center gap-1.5 sm:gap-2 mx-auto rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 sm:px-7 py-2 sm:py-3 text-xs font-black text-[#111310] shadow-[0_0_25px_rgba(6,182,212,0.4)] transition hover:from-cyan-300 hover:to-blue-400 active:scale-95"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                      <span>STEP INTO RING (START)</span>
                    </button>
                  </div>
                )}

                {boxingVictory && (
                  <div className="text-center animate-in zoom-in-95">
                    <div className="text-4xl sm:text-5xl animate-bounce">🏆</div>
                    <h4 className="mt-1 sm:mt-2 text-lg sm:text-2xl font-black text-[#d7ff64]">K.O.! CHAMPION!</h4>
                    <p className="text-xs text-gray-300 mt-1">
                      Knocked out Titan Shadow! Score: <strong className="text-[#d7ff64]">{boxingKoScore}</strong>
                    </p>
                    <button
                      onClick={startBoxingGame}
                      className="mt-3 sm:mt-4 flex items-center gap-2 mx-auto rounded-xl bg-[#d7ff64] px-5 py-2 text-xs font-bold text-[#111310] shadow-lg transition hover:bg-[#e6ff8f]"
                    >
                      <RotateCcw className="h-4 w-4" />
                      <span>Fight Next Match</span>
                    </button>
                  </div>
                )}

                {boxingGameOver && (
                  <div className="text-center animate-in zoom-in-95">
                    <div className="text-4xl sm:text-5xl animate-pulse">😵</div>
                    <h4 className="mt-1 sm:mt-2 text-lg sm:text-2xl font-black text-rose-400">KNOCKED DOWN!</h4>
                    <p className="text-xs text-gray-300 mt-1">
                      Titan Shadow defeated you in Round {boxingRound}.
                    </p>
                    <button
                      onClick={startBoxingGame}
                      className="mt-3 sm:mt-4 flex items-center gap-2 mx-auto rounded-xl bg-rose-500 px-5 py-2 text-xs font-bold text-white shadow-lg transition hover:bg-rose-400"
                    >
                      <RotateCcw className="h-4 w-4" />
                      <span>Rematch (Get Up)</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Rival Fighter Avatar */}
              <div
                className={`flex flex-col items-center transition-all duration-200 z-10 ${
                  fighterAction === 'rival_punch'
                    ? '-translate-x-3 sm:-translate-x-14 scale-110'
                    : fighterAction === 'player_punch' || fighterAction === 'super_ko'
                    ? 'translate-x-2 sm:translate-x-4 opacity-75'
                    : 'animate-bounce duration-1000'
                }`}
              >
                <div className="text-3xl sm:text-6xl">🤖</div>
                <span className="mt-1 sm:mt-2 text-[10px] sm:text-xs font-black text-rose-400 bg-rose-950/60 border border-rose-500/30 px-2 sm:px-2.5 py-0.5 rounded-full whitespace-nowrap">
                  {fighterAction === 'rival_punch' ? '💥 COUNTER!' : 'RIVAL'}
                </span>
              </div>
            </div>

            {/* Boxing Punch Typing Input */}
            {boxingStarted && !boxingGameOver && !boxingVictory && (
              <div className="max-w-md mx-auto space-y-2">
                <input
                  ref={boxingInputRef}
                  type="text"
                  value={boxingInput}
                  onChange={handleBoxingInput}
                  placeholder="Type strike word to throw punch..."
                  className="w-full rounded-xl sm:rounded-2xl border-2 border-cyan-500/40 bg-[#101217] px-4 sm:px-5 py-2.5 sm:py-3.5 text-center font-mono text-base sm:text-lg font-bold text-white shadow-lg outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(6,182,212,0.35)]"
                  autoComplete="off"
                  spellCheck={false}
                />
                <p className="text-center text-[10px] sm:text-[11px] text-gray-400">
                  ⚡ Type fast before rival timer hits 0.0s! Charge Super Meter for 40 DMG K.O.!
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* GAME 4: CYBER HACKER (Matrix Code Breaker)                 */}
      {/* ========================================================= */}
      {selectedGame === 'hacker' && (
        <div className="rounded-2xl sm:rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-[#0a140d] to-[#0c0e0b] p-3.5 sm:p-6 md:p-8 shadow-2xl relative overflow-hidden">
          {/* Matrix green glow aura */}
          <div
            className="pointer-events-none absolute -top-24 right-1/4 h-80 w-80 rounded-full opacity-20 blur-[120px]"
            style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.7) 0%, transparent 70%)' }}
          />

          {/* Top Bar: Title & Security Node Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3 sm:pb-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl bg-emerald-500/10 text-xl sm:text-2xl border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.25)] shrink-0">
                💻
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-xl font-black text-white">Cyber Hacker: Terminal</h3>
                  <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-emerald-400 uppercase tracking-wider font-mono">
                    {HACKER_TARGETS[hackerLayerIdx]?.depth || 'SYSTEM ROOT'}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-gray-400">Crack security cipher passwords before ICE Alert locks down!</p>
              </div>
            </div>

            {hackerStarted && !hackerGameOver && !hackerVictory && (
              <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4 w-full sm:w-auto">
                {/* ICE Security Alert Meter */}
                <div className="text-left sm:text-right">
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-gray-400 font-mono">
                    ICE Tracker Alert
                  </span>
                  <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5">
                    <div className="w-20 sm:w-36 h-2 sm:h-2.5 rounded-full bg-black/60 border border-white/10 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-200 ${
                          hackerIceAlert > 75
                            ? 'bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]'
                            : hackerIceAlert > 45
                            ? 'bg-amber-400'
                            : 'bg-emerald-400'
                        }`}
                        style={{ width: `${Math.min(100, hackerIceAlert)}%` }}
                      />
                    </div>
                    <span className="font-mono text-[11px] sm:text-xs font-black text-white">{Math.round(hackerIceAlert)}%</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 bg-black/50 px-2.5 sm:px-3.5 py-1.5 rounded-xl sm:rounded-2xl border border-white/10">
                  <div className="text-center">
                    <span className="text-[8px] sm:text-[9px] text-gray-400 block uppercase font-mono">Layer</span>
                    <span className="font-mono text-xs sm:text-sm font-black text-emerald-400">
                      {hackerLayerIdx + 1}/4
                    </span>
                  </div>
                  <div className="h-5 sm:h-6 w-px bg-white/10" />
                  <div className="text-center">
                    <span className="text-[8px] sm:text-[9px] text-gray-400 block uppercase font-mono">Score</span>
                    <span className="font-mono text-xs sm:text-sm font-black text-[#d7ff64]">{hackerScore}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Matrix Terminal Console Stage */}
          <div className="mt-4 sm:mt-5 space-y-3 sm:space-y-4">
            {/* Terminal Window Header */}
            <div className="rounded-xl sm:rounded-2xl border border-emerald-500/30 bg-[#090d0a] shadow-inner overflow-hidden font-mono">
              <div className="flex items-center justify-between border-b border-emerald-500/20 bg-emerald-950/40 px-3 sm:px-4 py-2 text-xs">
                <div className="flex items-center gap-2 truncate">
                  <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-red-500/80 inline-block shrink-0" />
                  <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-yellow-500/80 inline-block shrink-0" />
                  <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-500/80 inline-block shrink-0" />
                  <span className="text-emerald-400 font-bold ml-1 sm:ml-2 truncate max-w-[150px] sm:max-w-none">root@typemaster:~# /bin/infiltrate</span>
                </div>
                <div className="text-[9px] sm:text-[10px] text-emerald-500/70 hidden sm:block shrink-0">
                  SSL: 4096-BIT ENCRYPTED
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-3.5 sm:p-6 min-h-[200px] sm:min-h-[220px] flex flex-col justify-between relative">
                {/* Matrix Background Watermark */}
                <div className="absolute right-4 bottom-2 text-5xl sm:text-6xl opacity-5 select-none pointer-events-none font-mono text-emerald-400">
                  01101001 01100011
                </div>

                {!hackerStarted && !hackerGameOver && !hackerVictory && (
                  <div className="text-center py-4 sm:py-6">
                    <div className="text-4xl sm:text-5xl mb-2">💻</div>
                    <h4 className="text-lg sm:text-2xl font-black text-white">Cyber Infiltration Mission</h4>
                    <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1">
                      Infiltrate the MegaCorp AI mainframe across 4 security firewalls. Type encryption passwords before security ICE traces your IP!
                    </p>
                    <button
                      onClick={startHackerGame}
                      className="mt-3 sm:mt-4 flex items-center gap-2 mx-auto rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500 px-6 sm:px-7 py-2.5 sm:py-3 text-xs font-black text-[#111310] shadow-[0_0_20px_rgba(16,185,129,0.35)] transition hover:from-emerald-300 hover:to-teal-400 active:scale-95"
                    >
                      <Play className="h-4 w-4 fill-current" />
                      <span>INITIALIZE TERMINAL (START)</span>
                    </button>
                  </div>
                )}

                {hackerStarted && !hackerGameOver && !hackerVictory && (
                  <div className="space-y-3 sm:space-y-4">
                    {/* Security Node Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] sm:text-xs text-gray-400">TARGET NODE:</span>
                        <span className="text-xs sm:text-sm font-bold text-emerald-300">
                          {HACKER_TARGETS[hackerLayerIdx].node}
                        </span>
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-400">
                        PROGRESS: <strong className="text-[#d7ff64]">{hackerCrackedCount} / {HACKER_TARGETS[hackerLayerIdx].codeReq} Keys Cracked</strong>
                      </div>
                    </div>

                    {/* Target Password to Type */}
                    <div className="text-center py-2 sm:py-3">
                      <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-emerald-400/80 block mb-1">
                        🔑 DECRYPTION CIPHER KEY
                      </span>
                      <div className="inline-block rounded-xl sm:rounded-2xl border-2 border-emerald-500/50 bg-black/80 px-5 sm:px-8 py-2.5 sm:py-3.5 shadow-[0_0_30px_rgba(16,185,129,0.25)] max-w-full">
                        <span className="text-xl sm:text-4xl font-black text-white tracking-wider break-all">
                          {currentHackWord}
                        </span>
                      </div>
                    </div>

                    {/* Live Terminal Log Stream */}
                    <div className="rounded-xl bg-black/60 border border-white/5 p-2 sm:p-2.5 text-[10px] sm:text-[11px] space-y-1 text-emerald-400/80 max-h-24 overflow-y-auto">
                      {hackerLogs.map((log, i) => (
                        <div key={i} className="flex items-center gap-1.5 sm:gap-2">
                          <span className="opacity-40">&gt;</span>
                          <span className="truncate">{log}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {hackerVictory && (
                  <div className="text-center py-4 sm:py-6 animate-in zoom-in-95">
                    <div className="text-4xl sm:text-5xl animate-bounce">🔓</div>
                    <h4 className="mt-2 text-lg sm:text-2xl font-black text-[#d7ff64]">ACCESS GRANTED // MAINFRAME HACKED!</h4>
                    <p className="text-xs text-gray-300 mt-1">
                      You cracked all 4 security firewalls with score <strong className="text-[#d7ff64]">{hackerScore}</strong>!
                    </p>
                    <button
                      onClick={startHackerGame}
                      className="mt-3 sm:mt-4 flex items-center gap-2 mx-auto rounded-xl bg-[#d7ff64] px-5 sm:px-6 py-2.5 text-xs font-bold text-[#111310] shadow-lg transition hover:bg-[#e6ff8f]"
                    >
                      <RotateCcw className="h-4 w-4" />
                      <span>Hack Again</span>
                    </button>
                  </div>
                )}

                {hackerGameOver && (
                  <div className="text-center py-4 sm:py-6 animate-in zoom-in-95">
                    <div className="text-4xl sm:text-5xl animate-pulse">🚨</div>
                    <h4 className="mt-2 text-lg sm:text-2xl font-black text-red-400">TRACE COMPLETE // LOCKDOWN!</h4>
                    <p className="text-xs text-gray-300 mt-1">
                      ICE security defense intercepted your connection on Layer {hackerLayerIdx + 1}.
                    </p>
                    <button
                      onClick={startHackerGame}
                      className="mt-3 sm:mt-4 flex items-center gap-2 mx-auto rounded-xl bg-red-500 px-5 sm:px-6 py-2.5 text-xs font-bold text-white shadow-lg transition hover:bg-red-400"
                    >
                      <RotateCcw className="h-4 w-4" />
                      <span>Retry Infiltration</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Terminal Input Command Bar */}
            {hackerStarted && !hackerGameOver && !hackerVictory && (
              <div className="max-w-md mx-auto space-y-2">
                <div className="relative">
                  <input
                    ref={hackerInputRef}
                    type="text"
                    value={hackerInput}
                    onChange={handleHackerInput}
                    placeholder="Type cipher password to bypass firewall..."
                    className="w-full rounded-xl sm:rounded-2xl border-2 border-emerald-500/40 bg-[#080d09] px-4 sm:px-5 py-2.5 sm:py-3.5 text-center font-mono text-base sm:text-lg font-bold text-emerald-300 shadow-lg outline-none focus:border-emerald-400 focus:shadow-[0_0_20px_rgba(16,185,129,0.35)]"
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-mono text-emerald-500">$&gt;</span>
                </div>
                <p className="text-center text-[10px] sm:text-[11px] text-gray-400">
                  ⚡ Each successful password reduces ICE Alert by 14%! Type quickly to stay untraced!
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* GAME 5: METEOR SHIELD (City Missile Defense)               */}
      {/* ========================================================= */}
      {selectedGame === 'meteor' && (
        <div className="rounded-2xl sm:rounded-3xl border border-amber-500/20 bg-gradient-to-b from-[#18140f] to-[#12110e] p-3.5 sm:p-6 md:p-8 shadow-2xl relative overflow-hidden">
          {/* Fiery meteor glow background */}
          <div
            className="pointer-events-none absolute -top-20 left-1/3 h-80 w-80 rounded-full opacity-20 blur-[120px]"
            style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.7) 0%, transparent 70%)' }}
          />

          {/* Top Bar: Title & City Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3 sm:pb-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl bg-amber-500/10 text-xl sm:text-2xl border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.25)] shrink-0">
                ☄️
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-xl font-black text-white">Meteor Shield: City Defense</h3>
                  <span className="rounded-full bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                    Wave {meteorWave}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-gray-400">Type meteor words to launch anti-orbital laser interceptors!</p>
              </div>
            </div>

            {meteorStarted && !meteorGameOver && (
              <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4 w-full sm:w-auto">
                <div className="text-left sm:text-right">
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-gray-400">Metropolis Shield</span>
                  <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5">
                    <div className="w-20 sm:w-36 h-2 sm:h-2.5 rounded-full bg-black/60 border border-white/10 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          cityHealth > 50 ? 'bg-[#d7ff64]' : cityHealth > 25 ? 'bg-amber-400' : 'bg-red-500 animate-pulse'
                        }`}
                        style={{ width: `${cityHealth}%` }}
                      />
                    </div>
                    <span className="font-mono text-[11px] sm:text-xs font-black text-white">{cityHealth}%</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 bg-black/40 px-2.5 sm:px-3.5 py-1.5 rounded-xl sm:rounded-2xl border border-white/10">
                  <div className="text-center">
                    <span className="text-[8px] sm:text-[9px] text-gray-400 block uppercase">Destroyed</span>
                    <span className="font-mono text-xs sm:text-sm font-black text-amber-400">{meteorsDestroyed} 💥</span>
                  </div>
                  <div className="h-5 sm:h-6 w-px bg-white/10" />
                  <div className="text-center">
                    <span className="text-[8px] sm:text-[9px] text-gray-400 block uppercase">Score</span>
                    <span className="font-mono text-xs sm:text-sm font-black text-[#d7ff64]">{meteorScore}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sky & City Stage */}
          <div className="relative mt-4 sm:mt-5 h-64 sm:h-80 w-full overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-[#0d0f14] shadow-inner flex flex-col justify-between p-3 sm:p-4">
            {/* Stars background */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />

            {/* Bottom Cyberpunk City Skyline */}
            <div className="absolute inset-x-0 bottom-0 h-14 sm:h-16 bg-gradient-to-t from-black via-black/80 to-transparent flex items-end justify-around px-2 sm:px-4 z-10 border-b-2 border-cyan-500/30">
              <span className="text-xl sm:text-2xl opacity-60">🏙️</span>
              <span className="text-2xl sm:text-3xl opacity-70">🏢</span>
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl filter drop-shadow-[0_0_12px_#38bdf8]">🛰️</span>
                <span className="text-[8px] sm:text-[9px] font-black text-cyan-400 tracking-wider uppercase">TURRET</span>
              </div>
              <span className="text-2xl sm:text-3xl opacity-70">🏬</span>
              <span className="text-xl sm:text-2xl opacity-60">🏙️</span>
            </div>

            {/* Laser Beam Flash Animation */}
            {laserBeamEffect && (
              <div
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none animate-in fade-in zoom-in duration-100 flex items-center justify-center"
                style={{
                  height: `${100 - laserBeamEffect.y}%`,
                  width: '3px',
                  background: 'linear-gradient(to top, #38bdf8, #d7ff64)',
                  boxShadow: '0 0 15px #38bdf8',
                  transform: `rotate(${(laserBeamEffect.x - 50) * 0.7}deg)`,
                  transformOrigin: 'bottom center',
                }}
              />
            )}

            {/* Falling Meteors */}
            <div className="relative h-full w-full">
              {meteors.map((m) => {
                const isTarget = meteorInput.length > 0 && m.word.toLowerCase().startsWith(meteorInput.trim().toLowerCase());
                return (
                  <div
                    key={m.id}
                    className="absolute transition-all duration-150 flex flex-col items-center -translate-x-1/2"
                    style={{
                      left: `${m.x}%`,
                      top: `${m.y}%`,
                    }}
                  >
                    <div
                      className={`mb-0.5 sm:mb-1 rounded-lg sm:rounded-xl px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-mono font-bold transition-all shadow-md max-w-[100px] sm:max-w-none truncate ${
                        isTarget
                          ? 'border-2 border-[#d7ff64] bg-[#111310] text-[#d7ff64] shadow-[0_0_15px_rgba(215,255,100,0.5)] scale-110'
                          : m.size === 'huge'
                          ? 'border border-amber-500 bg-amber-950/80 text-amber-200'
                          : 'border border-white/20 bg-black/80 text-white'
                      }`}
                    >
                      {m.size === 'huge' && <span className="mr-0.5 text-amber-400">🔥</span>}
                      {m.word}
                    </div>

                    <div className="relative text-xl sm:text-3xl animate-pulse">
                      <span>{m.size === 'huge' ? '☄️' : '🔥'}</span>
                    </div>
                  </div>
                );
              })}

              {!meteorStarted && !meteorGameOver && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3 sm:p-4 z-20">
                  <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-2xl sm:rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-3xl sm:text-4xl shadow-[0_0_30px_rgba(245,158,11,0.3)] mb-2 sm:mb-3">
                    ☄️
                  </div>
                  <h4 className="text-lg sm:text-2xl font-black text-white">Meteor Defense Command</h4>
                  <p className="max-w-md text-xs sm:text-sm text-gray-400 mt-1">
                    An asteroid storm is plummeting toward the metropolis! Type meteor words to launch anti-orbital laser beams.
                  </p>
                  <button
                    onClick={startMeteorGame}
                    className="mt-3 sm:mt-4 flex items-center gap-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-black text-white shadow-[0_0_25px_rgba(245,158,11,0.4)] transition hover:from-amber-400 hover:to-orange-500 active:scale-95"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    <span>DEFEND METROPOLIS (START)</span>
                  </button>
                </div>
              )}

              {meteorGameOver && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm z-30 animate-in zoom-in-95">
                  <div className="text-4xl sm:text-5xl animate-pulse">💥</div>
                  <h4 className="mt-1 sm:mt-2 text-xl sm:text-3xl font-black text-amber-400">CITY SHIELD COLLAPSED!</h4>
                  <p className="text-xs sm:text-sm text-gray-300 mt-1">
                    You survived until <strong className="text-white">Wave {meteorWave}</strong> with <strong className="text-amber-400">{meteorsDestroyed} Meteors</strong> and score <strong className="text-[#d7ff64]">{meteorScore}</strong>!
                  </p>
                  <button
                    onClick={startMeteorGame}
                    className="mt-3 sm:mt-4 flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-2.5 text-xs font-black text-white shadow-lg transition hover:bg-amber-400 active:scale-95"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Re-engage Turrets</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Laser Input Console */}
          {meteorStarted && !meteorGameOver && (
            <div className="mt-3 sm:mt-4 max-w-lg mx-auto space-y-2">
              <div className="relative">
                <input
                  ref={meteorInputRef}
                  type="text"
                  value={meteorInput}
                  onChange={handleMeteorInput}
                  placeholder="Target falling meteor word to fire laser cannon..."
                  className="w-full rounded-xl sm:rounded-2xl border-2 border-amber-500/40 bg-[#14120e] px-4 sm:px-5 py-2.5 sm:py-3.5 text-center font-mono text-base sm:text-lg font-bold text-white shadow-lg outline-none focus:border-amber-400 focus:shadow-[0_0_20px_rgba(245,158,11,0.35)]"
                  autoComplete="off"
                  spellCheck={false}
                />
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base sm:text-lg opacity-60">🎯</span>
              </div>
              <p className="text-center text-[10px] sm:text-[11px] text-gray-400">
                💡 Tip: Prioritize meteors closest to the bottom skyline before they strike the city shield!
              </p>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* GAME 6: COSMIC ALIEN BLASTER                              */}
      {/* ========================================================= */}
      {selectedGame === 'space' && (
        <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-[#161814] p-3.5 sm:p-6 md:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3 sm:pb-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl bg-cyan-400/10 text-xl sm:text-2xl shrink-0">
                🚀
              </span>
              <div>
                <h3 className="text-base sm:text-xl font-black text-white">Cosmic Alien Blaster</h3>
                <p className="text-[11px] sm:text-xs text-gray-400">Type alien UFO words to fire laser cannons before they reach Earth!</p>
              </div>
            </div>

            {spaceStarted && (
              <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4 text-xs font-bold w-full sm:w-auto">
                <span className="rounded-xl bg-[#111310] px-3 py-1.5 text-cyan-400">
                  Wave: {spaceWave}
                </span>
                <span className="rounded-xl bg-[#111310] px-3 py-1.5 text-[#d7ff64]">
                  Score: {spaceScore} pts
                </span>
              </div>
            )}
          </div>

          {/* Deep Space Battle Screen */}
          <div className="relative my-4 sm:my-6 h-64 sm:h-72 rounded-xl sm:rounded-2xl border border-white/5 bg-[#0a0c09] p-3 sm:p-4 select-none overflow-hidden">
            {/* Stars background */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            {!spaceStarted && !spaceOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-400">Enemy starships descend from deep space.</p>
                <button
                  onClick={startSpaceGame}
                  className="mt-3 sm:mt-4 flex items-center gap-2 rounded-xl bg-cyan-400 px-5 sm:px-6 py-2.5 text-xs font-bold text-[#111310] shadow-[0_0_15px_rgba(34,211,238,0.4)] transition hover:bg-cyan-300 active:scale-95"
                >
                  <Play className="h-4 w-4 fill-current" />
                  <span>Launch Starfighter</span>
                </button>
              </div>
            )}

            {spaceOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/70 animate-in zoom-in-95 p-3 sm:p-4">
                <ShieldAlert className="h-8 w-8 sm:h-10 sm:w-10 text-red-400 mx-auto" />
                <h4 className="mt-1 sm:mt-2 text-lg sm:text-xl font-black text-white">Base Overrun!</h4>
                <p className="text-xs text-gray-400">You eliminated aliens for {spaceScore} points (Wave {spaceWave}).</p>
                <button
                  onClick={startSpaceGame}
                  className="mt-3 sm:mt-4 flex items-center gap-1.5 rounded-xl bg-cyan-400 px-5 py-2 text-xs font-bold text-[#111310]"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Try Again</span>
                </button>
              </div>
            )}

            {/* Descending UFOs */}
            {spaceStarted &&
              !spaceOver &&
              invaders.map((inv) => (
                <div
                  key={inv.id}
                  style={{ left: `${inv.x}%`, top: `${inv.y}%` }}
                  className="absolute -translate-x-1/2 flex flex-col items-center transition-all duration-100"
                >
                  <span className="text-lg sm:text-xl">🛸</span>
                  <span className="rounded-md border border-cyan-400/40 bg-black/80 px-1.5 sm:px-2 py-0.5 font-mono text-[10px] sm:text-xs font-bold text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                    {inv.word}
                  </span>
                </div>
              ))}

            {/* Laser Beam Effect */}
            {laserBeam && laserBeam.active && (
              <svg className="absolute inset-0 h-full w-full pointer-events-none">
                <line
                  x1="50%"
                  y1="90%"
                  x2={`${laserBeam.targetX}%`}
                  y2={`${laserBeam.targetY}%`}
                  stroke="#22d3ee"
                  strokeWidth="3"
                  strokeDasharray="4 2"
                  className="animate-pulse"
                />
              </svg>
            )}

            {/* Player Starfighter at bottom */}
            {spaceStarted && !spaceOver && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <span className="text-2xl sm:text-3xl filter drop-shadow-[0_0_10px_#22d3ee]">🚀</span>
              </div>
            )}
          </div>

          {/* Space Cannon Input */}
          {spaceStarted && !spaceOver && (
            <div className="max-w-md mx-auto">
              <input
                ref={spaceInputRef}
                type="text"
                value={spaceInput}
                onChange={handleSpaceInput}
                placeholder="Type UFO word to fire plasma cannon..."
                className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-[#111310] p-3 sm:p-4 text-center font-mono text-base sm:text-lg text-cyan-300 outline-none focus:border-cyan-400"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* GAME 7: SKY DROP (Word Rush)                               */}
      {/* ========================================================= */}
      {selectedGame === 'skydrop' && (
        <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-[#161814] p-3.5 sm:p-6 md:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3 sm:pb-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl bg-[#d7ff64]/10 text-xl sm:text-2xl shrink-0">
                👾
              </span>
              <div>
                <h3 className="text-base sm:text-xl font-black text-white">Sky Drop: Word Rush</h3>
                <p className="text-[11px] sm:text-xs text-gray-400">Words drop from the sky. Type them before they touch the laser floor!</p>
              </div>
            </div>

            {playingRush && (
              <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4 text-xs font-bold w-full sm:w-auto">
                <span className="rounded-xl bg-[#111310] px-3 py-1.5 text-gray-300">
                  Lives: {'❤️'.repeat(rushLives)}
                </span>
                <span className="rounded-xl bg-[#111310] px-3 py-1.5 text-[#d7ff64]">
                  Score: {rushScore} pts
                </span>
              </div>
            )}
          </div>

          {/* Falling Word Box */}
          <div className="relative my-4 sm:my-6 flex h-56 sm:h-64 flex-col items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl border border-white/5 bg-[#111310] p-3 sm:p-4 select-none">
            {!playingRush && !rushOver && (
              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-400">Test your reaction speed against gravity!</p>
                <button
                  onClick={startRush}
                  className="mt-3 sm:mt-4 rounded-xl bg-[#d7ff64] px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-[#111310] transition hover:bg-[#e6ff8f] active:scale-95"
                >
                  Start Sky Drop
                </button>
              </div>
            )}

            {rushOver && (
              <div className="text-center animate-in zoom-in-95">
                <Award className="mx-auto h-8 w-8 sm:h-10 sm:w-10 text-amber-400" />
                <h4 className="mt-1 sm:mt-2 text-lg sm:text-xl font-black text-white">Game Over!</h4>
                <p className="text-xs text-gray-400">Final Score: {rushScore} points</p>
                <button
                  onClick={startRush}
                  className="mt-3 sm:mt-4 flex items-center gap-1.5 mx-auto rounded-xl bg-[#d7ff64] px-5 py-2 text-xs font-bold text-[#111310]"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Play Again</span>
                </button>
              </div>
            )}

            {playingRush && (
              <div className="relative h-full w-full">
                <div
                  style={{ top: `${fallProgress}%` }}
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-linear"
                >
                  <span className="rounded-xl border border-[#d7ff64]/40 bg-[#d7ff64]/15 px-3 sm:px-4 py-1.5 sm:py-2 font-mono text-base sm:text-xl font-black text-[#d7ff64] shadow-[0_0_15px_rgba(215,255,100,0.3)]">
                    {rushTarget}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-500/70 shadow-[0_0_10px_red]" />
              </div>
            )}
          </div>

          {playingRush && (
            <div className="max-w-md mx-auto">
              <input
                ref={rushInputRef}
                type="text"
                value={rushInput}
                onChange={handleRushInput}
                placeholder="Type the falling word..."
                className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-[#111310] p-3 sm:p-4 text-center font-mono text-base sm:text-lg text-white outline-none focus:border-[#d7ff64]"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* GAME 8: TIME BOMB DEFUSAL (Panic Timer)                   */}
      {/* ========================================================= */}
      {selectedGame === 'bomb' && (
        <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-[#161814] p-3.5 sm:p-6 md:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3 sm:pb-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl bg-amber-400/10 text-xl sm:text-2xl shrink-0">
                💣
              </span>
              <div>
                <h3 className="text-base sm:text-xl font-black text-white">Time Bomb Defusal</h3>
                <p className="text-[11px] sm:text-xs text-gray-400">Type the passkey before the digital countdown reaches zero!</p>
              </div>
            </div>

            {bombStarted && (
              <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-bold w-full sm:w-auto">
                <span className="rounded-xl bg-[#111310] px-3.5 py-1.5 text-amber-400">
                  Defused: {bombStreak} bombs
                </span>
              </div>
            )}
          </div>

          <div className="my-4 sm:my-6 rounded-xl sm:rounded-2xl border border-white/5 bg-[#111310] p-4 sm:p-6 text-center select-none">
            {!bombStarted && !bombOver && (
              <div>
                <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">You have seconds to disarm each ticking bomb.</p>
                <button
                  onClick={startBombGame}
                  className="rounded-xl bg-amber-400 px-5 sm:px-6 py-2 sm:py-2.5 text-xs font-bold text-[#111310] transition hover:bg-amber-300 active:scale-95"
                >
                  Start Bomb Defusal
                </button>
              </div>
            )}

            {bombOver && (
              <div className="animate-in zoom-in-95">
                <span className="text-3xl sm:text-4xl">💥</span>
                <h4 className="mt-1 sm:mt-2 text-lg sm:text-xl font-black text-red-400">BOOM! Time Expired</h4>
                <p className="text-xs text-gray-400">You safely defused {bombStreak} bombs in a row.</p>
                <button
                  onClick={startBombGame}
                  className="mt-3 sm:mt-4 flex items-center gap-1.5 mx-auto rounded-xl bg-amber-400 px-5 py-2 text-xs font-bold text-[#111310]"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Try Again</span>
                </button>
              </div>
            )}

            {bombStarted && !bombOver && (
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <span className="font-mono text-3xl sm:text-4xl font-black text-red-400 animate-pulse">
                    00:0{bombTimeLeft}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 font-bold">
                    Defusal Code
                  </span>
                  <p className="mt-1 font-mono text-2xl sm:text-3xl font-black text-[#d7ff64] break-all">
                    {bombTarget}
                  </p>
                </div>
              </div>
            )}
          </div>

          {bombStarted && !bombOver && (
            <div className="max-w-md mx-auto">
              <input
                ref={bombInputRef}
                type="text"
                value={bombInput}
                onChange={handleBombInput}
                placeholder="Type the defusal code..."
                className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-[#111310] p-3 sm:p-4 text-center font-mono text-base sm:text-lg text-white outline-none focus:border-amber-400"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* GAME 9: GHOST MEMORY (Flash & Blind Type)                  */}
      {/* ========================================================= */}
      {selectedGame === 'ghost' && (
        <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-[#161814] p-3.5 sm:p-6 md:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3 sm:pb-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl bg-purple-400/10 text-xl sm:text-2xl shrink-0">
                👻
              </span>
              <div>
                <h3 className="text-base sm:text-xl font-black text-white">Ghost Memory Challenge</h3>
                <p className="text-[11px] sm:text-xs text-gray-400">Words flash for 2 seconds then disappear. Type them from memory!</p>
              </div>
            </div>

            {ghostStarted && (
              <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-bold w-full sm:w-auto">
                <span className="rounded-xl bg-[#111310] px-3.5 py-1.5 text-purple-300">
                  Memory Streak: {ghostStreak}
                </span>
              </div>
            )}
          </div>

          <div className="my-4 sm:my-6 rounded-xl sm:rounded-2xl border border-white/5 bg-[#111310] p-4 sm:p-8 text-center select-none">
            {!ghostStarted && (
              <div>
                <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">Strengthen cognitive memory and touch typing recall.</p>
                <button
                  onClick={startGhostGame}
                  className="rounded-xl bg-purple-400 px-5 sm:px-6 py-2 sm:py-2.5 text-xs font-bold text-[#111310] transition hover:bg-purple-300 active:scale-95"
                >
                  Start Ghost Challenge
                </button>
              </div>
            )}

            {ghostStarted && ghostPhase === 'memorize' && (
              <div className="space-y-2 sm:space-y-3 animate-in fade-in">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-400">
                  Memorize this phrase...
                </span>
                <p className="font-mono text-2xl sm:text-4xl font-black text-[#d7ff64] break-all">
                  {ghostTarget}
                </p>
              </div>
            )}

            {ghostStarted && ghostPhase === 'typing' && (
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold uppercase text-purple-300">
                  <EyeOff className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>Hidden in Ghost Mode! Type now:</span>
                </div>
                <form onSubmit={handleGhostSubmit} className="max-w-md mx-auto mt-3 sm:mt-4">
                  <input
                    ref={ghostInputRef}
                    type="text"
                    value={ghostInput}
                    onChange={(e) => setGhostInput(e.target.value)}
                    placeholder="Type what you memorized..."
                    className="w-full rounded-xl sm:rounded-2xl border border-white/10 bg-[#161814] p-3 sm:p-4 text-center font-mono text-base sm:text-lg text-white outline-none focus:border-purple-400"
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <button
                    type="submit"
                    className="mt-3 rounded-xl bg-purple-400 px-5 py-2 text-xs font-bold text-[#111310] active:scale-95"
                  >
                    Submit Guess
                  </button>
                </form>
              </div>
            )}

            {ghostStarted && ghostPhase === 'result' && (
              <div className="space-y-2 sm:space-y-3 animate-in zoom-in-95">
                <h4 className="text-lg sm:text-xl font-bold text-white">
                  {ghostSuccess ? '✅ Flawless Memory!' : '❌ Missed!'}
                </h4>
                <p className="text-xs text-gray-400">
                  Target: <strong className="text-[#d7ff64] font-mono">{ghostTarget}</strong>
                </p>
                <p className="text-xs text-gray-400">
                  You typed: <strong className="text-white font-mono">{ghostInput || '(empty)'}</strong>
                </p>
                <button
                  onClick={nextGhostRound}
                  className="mt-3 rounded-xl bg-[#d7ff64] px-5 py-2 text-xs font-bold text-[#111310] active:scale-95"
                >
                  Next Phrase →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Speed & Accuracy Quick Cards */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
        <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-[#161814] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="font-bold text-white text-sm sm:text-base">15-Second Speed Sprint</h4>
            <p className="text-xs text-gray-400 mt-0.5 sm:mt-1">High-intensity speed burst challenge</p>
          </div>
          <button
            onClick={onStartSprint}
            className="w-full sm:w-auto rounded-xl bg-[#d7ff64] px-4 py-2.5 sm:py-2 text-xs font-bold text-[#111310] hover:bg-[#e6ff8f] text-center active:scale-95"
          >
            Launch Sprint
          </button>
        </div>

        <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-[#161814] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="font-bold text-white text-sm sm:text-base">98% Accuracy Challenge</h4>
            <p className="text-xs text-gray-400 mt-0.5 sm:mt-1">Hone strict precision with zero typos</p>
          </div>
          <button
            onClick={onStartAccuracyChallenge}
            className="w-full sm:w-auto rounded-xl border border-cyan-400/50 bg-cyan-400/10 px-4 py-2.5 sm:py-2 text-xs font-bold text-cyan-300 hover:bg-cyan-400 hover:text-[#111310] text-center active:scale-95"
          >
            Launch Precision
          </button>
        </div>
      </div>
    </div>
  );
};
