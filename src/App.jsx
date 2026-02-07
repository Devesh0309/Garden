import React, { useState } from 'react';
import { Heart, Flower2, Sparkles, Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import RoseDay from './seventhFeb';
import PurposeDay from './eightthFeb';

// --- LOGIN COMPONENT ---
const Login = ({ onLoginSuccess }) => {
  const [upscAnswer, setUpscAnswer] = useState('');
  const [cmsAnswer, setCmsAnswer] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Logic: UPSC 2023/24 context: "Which one of the following is the best description of 'Mila', 'Sagar'..." 
    // Or a classic one: "What is the capital of Ukraine?" (Common in recent exams)
    // For this logic, let's use a specific recent UPSC-style question.
    const isUpscCorrect = upscAnswer.trim().toLowerCase() === 'hampi'; 
    const isCmsCorrect = cmsAnswer.trim().toLowerCase() === 'bakribazar';

    if (isUpscCorrect && isCmsCorrect) {
      onLoginSuccess();
    } else {
      setError('The keys to the heart are precise. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#fffafa] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white border border-rose-100 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 text-rose-50 opacity-50">
          <Heart size={200} fill="currentColor" />
        </div>
        
        <div className="relative">
          <div className="flex justify-center mb-8">
            <div className="bg-rose-50 p-4 rounded-3xl">
              <Lock className="text-rose-500" size={32} />
            </div>
          </div>

          <h2 className="text-3xl font-black text-slate-900 text-center tracking-tighter mb-2">
            Secure Access
          </h2>
          <p className="text-slate-500 text-center text-sm mb-8 font-medium">
            Prove your identity to unlock the collection.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* UPSC Question */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">
                UPSC PYQ: Site of Vijayanagara Empire?
              </label>
              <input 
                type="text"
                placeholder="Answer here..."
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all font-medium"
                value={upscAnswer}
                onChange={(e) => setUpscAnswer(e.target.value)}
              />
            </div>

            {/* Personal Question */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">
                Personal: What do I call CMS?
              </label>
              <input 
                type="text"
                placeholder="hehe.."
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all font-medium"
                value={cmsAnswer}
                onChange={(e) => setCmsAnswer(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-xs text-center font-bold animate-pulse">{error}</p>}

            <button 
              type="submit"
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-rose-600 transition-all group"
            >
              Verify Credentials <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---
const App = () => {
  const [view, setView] = useState('login'); // Start at login

  if (view === 'login') {
    return <Login onLoginSuccess={() => setView('hub')} />;
  }
  
  if (view === 'rose') return <RoseDay onBack={() => setView('hub')} />;
  if (view === 'purpose') return <PurposeDay onBack={() => setView('hub')} />;

  return (
    <div className="min-h-screen bg-[#fffafa] flex flex-col items-center justify-center p-6 font-sans">
      <div className="text-center mb-16 animate-in fade-in zoom-in duration-1000">
        <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
          <Sparkles size={12} /> The February Collection
        </div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
          Happy Valentine's Week, <span className="text-rose-600 italic font-serif">Harshika</span>
        </h1>
        <p className="text-slate-500 mt-4 font-medium">Pick a chapter to begin our journey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Rose Day Card */}
        <button 
          onClick={() => setView('rose')}
          className="group relative bg-white border border-rose-100 p-8 rounded-[3rem] shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all text-left overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Flower2 size={120} />
          </div>
          <div className="w-14 h-14 bg-stone-100 text-stone-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-500 group-hover:text-white transition-colors">
            <Flower2 size={28} />
          </div>
          <h2 className="text-2xl font-black text-slate-800">The Garden</h2>
          <p className="text-slate-400 text-sm mt-2 uppercase tracking-widest font-bold">February 7th • Rose Day</p>
          <p className="text-slate-500 mt-4 leading-relaxed">
            A private sanctuary of memories and flowers. Requires the special password.
          </p>
        </button>

        {/* Purpose Day Card */}
        <button 
          onClick={() => setView('purpose')}
          className="group relative bg-white border border-rose-100 p-8 rounded-[3rem] shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all text-left overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Heart size={120} />
          </div>
          <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-rose-600 group-hover:text-white transition-colors">
            <Heart size={28} />
          </div>
          <h2 className="text-2xl font-black text-slate-800">Soul Logistics</h2>
          <p className="text-rose-400 text-sm mt-2 uppercase tracking-widest font-bold">February 8th • Purpose Day</p>
          <p className="text-slate-500 mt-4 leading-relaxed">
            Navigating the obstacles of distance and time to deliver a heart.
          </p>
        </button>
      </div>

      <footer className="mt-20 text-[10px] font-black text-rose-300 uppercase tracking-[0.4em]">
        Handcrafted with Love for Harshika
      </footer>
    </div>
  );
};

export default App;