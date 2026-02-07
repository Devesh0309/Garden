import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, 
  Package, 
  Truck, 
  MessageCircle, 
  MapPin, 
  User, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle, 
  Play, 
  RefreshCcw,
  Sparkles,
  ShieldCheck,
  Zap,
  Star
} from 'lucide-react';

// --- Sub-Component: Game ---
const LogisticsGame = ({ onWin }) => {
  const [gameState, setGameState] = useState('START'); // START, PLAYING, WON, CRASHED
  const [score, setScore] = useState(0);
  const canvasRef = useRef(null);
  const requestRef = useRef();
  
  const GRAVITY = 0.35;
  const JUMP_FORCE = -11;
  const TRUCK_WIDTH = 70;
  const TRUCK_HEIGHT = 45;
  const BOULDER_SIZE = 45;
  const WIN_SCORE = 800; 

  const truckPos = useRef({ x: 50, y: 150, vy: 0, isJumping: false });
  const boulders = useRef([]);
  const distance = useRef(0);
  const stars = useRef([]); // Background particles

  const resetGame = () => {
    truckPos.current = { x: 50, y: 150, vy: 0, isJumping: false };
    boulders.current = [];
    distance.current = 0;
    stars.current = Array.from({ length: 20 }, () => ({
      x: Math.random() * 600,
      y: Math.random() * 200,
      s: Math.random() * 2 + 1
    }));
    setScore(0);
    setGameState('PLAYING');
  };

  const jump = () => {
    if (!truckPos.current.isJumping && gameState === 'PLAYING') {
      truckPos.current.vy = JUMP_FORCE;
      truckPos.current.isJumping = true;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.code === 'Space') jump(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  const update = (time) => {
    if (gameState !== 'PLAYING') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    truckPos.current.vy += GRAVITY;
    truckPos.current.y += truckPos.current.vy;

    const groundY = canvas.height - TRUCK_HEIGHT - 30;
    if (truckPos.current.y > groundY) {
      truckPos.current.y = groundY;
      truckPos.current.vy = 0;
      truckPos.current.isJumping = false;
    }

    // Spawn Logic
    if (Math.random() < 0.015 && boulders.current.length < 2 && distance.current < WIN_SCORE - 200) {
      boulders.current.push({ x: canvas.width, y: canvas.height - 75 });
    }

    boulders.current = boulders.current.map(b => ({ ...b, x: b.x - 4 }));
    boulders.current = boulders.current.filter(b => b.x > -50);

    boulders.current.forEach(b => {
      const hitX = truckPos.current.x + 15 < b.x + BOULDER_SIZE - 10 && truckPos.current.x + TRUCK_WIDTH - 15 > b.x + 10;
      const hitY = truckPos.current.y + TRUCK_HEIGHT - 10 > b.y + 10;
      if (hitX && hitY) setGameState('CRASHED');
    });

    distance.current += 2;
    setScore(Math.floor(distance.current));

    if (distance.current >= WIN_SCORE) setGameState('WON');

    // Drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Stars/Sparkles BG
    stars.current.forEach(s => {
      ctx.fillStyle = '#fee2e2';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.s, 0, Math.PI * 2);
      ctx.fill();
      s.x -= 0.5;
      if (s.x < 0) s.x = canvas.width;
    });

    // Ground
    ctx.strokeStyle = '#fecaca';
    ctx.setLineDash([10, 5]);
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 30);
    ctx.lineTo(canvas.width, canvas.height - 30);
    ctx.stroke();
    ctx.setLineDash([]);

    // Truck
    ctx.fillStyle = '#e11d48';
    ctx.beginPath();
    ctx.roundRect(truckPos.current.x, truckPos.current.y, TRUCK_WIDTH, TRUCK_HEIGHT - 10, 12);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('LOVE EXP', truckPos.current.x + TRUCK_WIDTH/2, truckPos.current.y + 22);
    
    ctx.fillStyle = '#1f2937';
    ctx.beginPath();
    ctx.arc(truckPos.current.x + 18, truckPos.current.y + TRUCK_HEIGHT - 10, 9, 0, Math.PI * 2);
    ctx.arc(truckPos.current.x + 52, truckPos.current.y + TRUCK_HEIGHT - 10, 9, 0, Math.PI * 2);
    ctx.fill();

    // Boulders (The "Distractions")
    boulders.current.forEach(b => {
      ctx.fillStyle = '#4b5563';
      ctx.beginPath();
      ctx.moveTo(b.x, b.y + BOULDER_SIZE);
      ctx.lineTo(b.x + BOULDER_SIZE / 2, b.y);
      ctx.lineTo(b.x + BOULDER_SIZE, b.y + BOULDER_SIZE);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#f3f4f6';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText('LDR', b.x + BOULDER_SIZE/2, b.y + BOULDER_SIZE - 5);
    });

    // The Goal
    if (distance.current > WIN_SCORE - 300) {
      const progress = (distance.current - (WIN_SCORE - 300)) / 300;
      const targetX = canvas.width - (progress * 450);
      ctx.font = '50px serif';
      ctx.fillText('💖', targetX, canvas.height - 60);
      ctx.fillStyle = '#e11d48';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('YOUR HEART', targetX, canvas.height - 110);
    }

    requestRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameState]);

  return (
    <div className="relative w-full max-w-2xl mx-auto bg-rose-50 rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl" onClick={jump}>
      <div className="absolute top-6 left-6 z-10">
        <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest block mb-1">Transit to Forever</span>
        <div className="w-32 h-1.5 bg-rose-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-rose-500 transition-all duration-300" 
            style={{ width: `${Math.min(100, (score / WIN_SCORE) * 100)}%` }}
          />
        </div>
      </div>

      <canvas 
        ref={canvasRef} 
        width={600} 
        height={300} 
        className="w-full block bg-white cursor-pointer"
      />

      {gameState === 'START' && (
        <div className="absolute inset-0 bg-rose-900/10 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl mb-4 animate-pulse">
            <Heart className="w-10 h-10 text-rose-500 fill-current" />
          </div>
          <h3 className="text-2xl font-black text-rose-900 mb-2 italic font-serif">The Final Mile</h3>
          <p className="text-rose-800/80 mb-6 text-sm">Every barrier is worth jumping over if you're at the end of the road.<br/><b>Tap</b> to navigate our path.</p>
          <button 
            onClick={(e) => { e.stopPropagation(); resetGame(); }}
            className="bg-rose-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-rose-700 transition flex items-center gap-2"
          >
            Start Journey
          </button>
        </div>
      )}

      {gameState === 'CRASHED' && (
        <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center text-white">
          <Sparkles className="w-12 h-12 text-rose-400 mb-4" />
          <h3 className="text-2xl font-black mb-2">A Minor Turbulence</h3>
          <p className="text-rose-200/70 mb-6 text-sm">Even the strongest supply chains face storms. <br/>But I'm not giving up on the delivery.</p>
          <button 
            onClick={(e) => { e.stopPropagation(); resetGame(); }}
            className="bg-rose-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-rose-600 transition flex items-center gap-2"
          >
            <RefreshCcw size={18} /> Try Again
          </button>
        </div>
      )}

      {gameState === 'WON' && (
        <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-6 text-center">
          <div className="relative">
             <div className="absolute inset-0 animate-ping rounded-full bg-rose-200"></div>
             <div className="relative w-24 h-24 bg-rose-600 rounded-full flex items-center justify-center text-white shadow-2xl">
                <Heart size={48} fill="currentColor" />
             </div>
          </div>
          <h3 className="text-3xl font-black text-rose-900 mt-8 mb-4 italic font-serif">Mission Accomplished</h3>
          <p className="text-rose-700/80 mb-8 text-lg leading-relaxed">
            I’ve arrived. Your heart is my favorite destination, <br/>and I plan on staying for the long haul.
          </p>
          <button 
            onClick={(e) => { e.stopPropagation(); window.location.reload(); }}
            className="bg-rose-600 text-white px-10 py-4 rounded-full font-black shadow-xl hover:bg-rose-700 transition"
          >
            Unlock Forever Access
          </button>
        </div>
      )}
    </div>
  );
};

// --- Main App Component ---
export default function PurposeDay({ onBack }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showGame, setShowGame] = useState(false);

  return (
    <div className="min-h-screen bg-[#fffafa] text-slate-900 font-sans selection:bg-rose-100 selection:text-rose-600">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-xl border-b border-rose-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="text-slate-500 hover:text-rose-600 transition font-black text-sm uppercase tracking-widest"
          >
            ← Back
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-rose-200 rotate-3">
              <Heart className="text-white w-6 h-6 fill-current" />
            </div>
            <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Us™</span>
          </div>
          
          <div className="hidden md:flex gap-10 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
            <a href="#philosophy" className="hover:text-rose-500 transition">Philosophy</a>
            <a href="#logistics" className="hover:text-rose-500 transition">Logistics</a>
            <a href="#commitment" className="hover:text-rose-500 transition">Commitment</a>
          </div>

          <button 
            onClick={() => document.getElementById('manifesto')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-rose-600 text-white px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-rose-700 transition shadow-xl shadow-rose-100 active:scale-95"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-44 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-100/40 via-transparent to-transparent"></div>
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 border border-rose-100 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-10">
            <Sparkles size={14} className="animate-spin-slow" /> Optimizing Your Happiness Since Day One
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-10 tracking-tight leading-[1.05] text-slate-900">
            High-Performance <br/>
            <span className="italic font-serif text-rose-600">Soul Logistics.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 mb-16 max-w-2xl mx-auto leading-relaxed font-medium">
            Forget 10-minute grocery delivery. We specialize in 100-year emotional security, engineered for 100% last-mile devotion.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8">
            <div className="group bg-white p-6 rounded-[2.5rem] shadow-xl shadow-rose-100/50 border border-rose-50 flex items-center gap-5 transition-transform hover:-translate-y-1">
                <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-600 transition-colors group-hover:bg-rose-600 group-hover:text-white">
                  <ShieldCheck size={28} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black text-rose-300 uppercase tracking-widest">Bond Security</p>
                  <p className="font-black text-slate-800 text-lg">Unbreakable SLA</p>
                </div>
            </div>
            <div className="group bg-white p-6 rounded-[2.5rem] shadow-xl shadow-rose-100/50 border border-rose-50 flex items-center gap-5 transition-transform hover:-translate-y-1">
                <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-600 transition-colors group-hover:bg-rose-600 group-hover:text-white">
                  <Zap size={28} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black text-rose-300 uppercase tracking-widest">Response Time</p>
                  <p className="font-black text-slate-800 text-lg">Instant Adoration</p>
                </div>
            </div>
          </div>
        </div>
      </header>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-32 bg-slate-900 text-white rounded-[4rem] mx-4 md:mx-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-10">
            <Heart size={400} />
        </div>
        <div className="max-w-6xl mx-auto px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-10 leading-tight italic font-serif">Our Emotional <br/>Architecture</h2>
              <p className="text-slate-400 text-lg mb-12 leading-relaxed">
                Logistics is usually about moving things from A to B. We’re about keeping things at A—the center of my world—and ensuring the supply of love never hits a bottleneck.
              </p>
              <div className="space-y-4">
                {[
                  { q: 'What is the "Lead Time" on a hug?', a: 'Zero seconds. We maintain localized inventory for immediate distribution.' },
                  { q: 'How do you handle "Damaged Goods"?', a: 'Every bad day is processed through our 5-stage healing protocol with 100% restoration guarantee.' },
                  { q: 'Is there a "Return Policy"?', a: 'Section 4.2: All investments in our future are non-refundable and compounding.' }
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
                    <h4 className="font-bold text-rose-400 mb-2">{item.q}</h4>
                    <p className="text-sm text-slate-300">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
                <div className="bg-gradient-to-br from-rose-500 to-pink-600 p-12 rounded-[4rem] shadow-2xl">
                    <div className="text-center mb-10">
                        <Star className="mx-auto mb-4 text-white/50" fill="currentColor" />
                        <h3 className="text-2xl font-black">Performance Dashboard</h3>
                    </div>
                    <div className="space-y-8">
                        {[
                          { label: 'Attention Span', pct: '100%' },
                          { label: 'Memory strength', pct: '99.9%' },
                          { label: 'Desire to see you', pct: '∞%' }
                        ].map((s, i) => (
                          <div key={i}>
                            <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-3">
                                <span>{s.label}</span>
                                <span>{s.pct}</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/20 rounded-full">
                                <div className="h-full bg-white rounded-full" style={{ width: s.pct === '∞%' ? '100%' : s.pct }}></div>
                            </div>
                          </div>
                        ))}
                    </div>
                    <p className="mt-12 text-center text-xs font-medium text-white/40 italic">Data synchronized across all emotional nodes.</p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section id="manifesto" className="py-40 px-6">
        <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl font-black mb-10 tracking-tight italic font-serif">The Forever Manifesto</h2>
            <div className="space-y-12">
                <div className="p-12 bg-white rounded-[3.5rem] shadow-2xl shadow-rose-100 border border-rose-50 relative">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-rose-600 text-white rounded-full flex items-center justify-center font-black">1</div>
                    <p className="text-2xl font-bold text-slate-700 leading-snug">
                        "Your laughter is our most critical SKU. If stocks are low, we initiate emergency protocol: Ice cream, bad jokes, and long drives."
                    </p>
                </div>
                <div className="p-12 bg-white rounded-[3.5rem] shadow-2xl shadow-rose-100 border border-rose-50 relative">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-rose-600 text-white rounded-full flex items-center justify-center font-black">2</div>
                    <p className="text-2xl font-bold text-slate-700 leading-snug">
                        "Distance is just a logistical variable. Whether it's 2km or 2,000km, the last-mile delivery of my heart is always guaranteed."
                    </p>
                </div>
                <div className="p-12 bg-white rounded-[3.5rem] shadow-2xl shadow-rose-100 border border-rose-50 relative">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-rose-600 text-white rounded-full flex items-center justify-center font-black">3</div>
                    <p className="text-2xl font-bold text-slate-700 leading-snug">
                        "No returns. No cancellations. No outsourcing. Just one dedicated carrier, forever."
                    </p>
                </div>
            </div>

            <div className="mt-24">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="group bg-rose-600 text-white px-16 py-8 rounded-full text-2xl font-black shadow-3xl shadow-rose-200 hover:bg-rose-700 transition transform hover:scale-105 active:scale-95 flex items-center gap-4 mx-auto"
                >
                  Confirm Shipment 🚚
                  <ChevronRight size={32} className="group-hover:translate-x-2 transition-transform" />
                </button>
            </div>
        </div>
      </section>

      {/* Modal / Interaction */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="bg-white rounded-[4rem] p-10 max-w-2xl w-full relative z-10 shadow-3xl overflow-hidden border border-rose-50">
            {!showGame ? (
                <div className="text-center">
                    <div className="w-24 h-24 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                        <CheckCircle2 size={48} />
                    </div>
                    <h3 className="text-4xl font-black mb-4 italic font-serif">Shipment Verified</h3>
                    <p className="text-slate-500 mb-10 font-bold">Consignment ID: <span className="text-rose-600 font-mono tracking-tighter">SOULMATE-∞-2024</span></p>
                    
                    <div className="bg-rose-50/50 p-8 rounded-[2.5rem] mb-10 border border-rose-100 text-left space-y-6">
                        <div className="flex justify-between items-center text-xs font-black text-rose-300 uppercase tracking-widest">
                            <span>Origin: Gurgaon</span>
                            <div className="flex-1 border-b-2 border-dashed border-rose-200 mx-4"></div>
                            <span>Destination: Lucknow</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Carrier Name</p>
                                <p className="text-xl font-black text-slate-800 italic">Me (Always)</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Package Weight</p>
                                <p className="text-xl font-black text-slate-800 italic">Pure Love</p>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={() => setShowGame(true)}
                        className="w-full bg-slate-900 text-white font-black py-6 rounded-full hover:bg-black transition text-xl shadow-2xl active:scale-[0.98]"
                    >
                        Proceed to Handover
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <div className="mb-10 text-center">
                        <h3 className="text-3xl font-black italic font-serif">Handover Challenge</h3>
                        <p className="text-slate-500 font-medium mt-2">To reach your heart, I must navigate past the 'LDR' obstacles.</p>
                    </div>
                    <LogisticsGame />
                    <button 
                        onClick={() => setIsModalOpen(false)}
                        className="mt-8 text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-rose-600 transition"
                    >
                        Exit Logistics Terminal
                    </button>
                </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-20 border-t border-rose-50 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center">
              <Heart className="text-white w-4 h-4 fill-current" />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900">Us™</span>
          </div>
          <div className="flex gap-12 text-[10px] font-black text-rose-300 uppercase tracking-[0.3em]">
            <span>Est. Forever</span>
            <span>No Returns</span>
            <span>100% Personal</span>
          </div>
          <p className="mt-12 text-slate-400 text-sm font-medium">
            Designed for the most important delivery in the world.
          </p>
        </div>
      </footer>
    </div>
  );
}