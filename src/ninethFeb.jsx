import React, { useState, useEffect, useRef } from 'react';
import { Heart, Stars, Cloud, Moon, Coffee, ArrowLeft } from 'lucide-react';

export default function ChocolateDay({ onBack }) {
  const [addedIngredients, setAddedIngredients] = useState(new Set());
  const [pouringIngredient, setPouringIngredient] = useState(null);
  const [showNightScene, setShowNightScene] = useState(false);
  const [particles, setParticles] = useState([]);
  const [stars, setStars] = useState([]);
  const [snowflakes, setSnowflakes] = useState([]);
  
  const totalIngredients = 7;
  const snowflakeIntervalRef = useRef(null);

  const ingredients = [
    { id: 'growth', label: '2 cups\nGrowth', description: 'Every challenge we conquered', color: '#90EE90' },
    { id: 'hugs', label: '1 tbsp\nHugs', description: 'Warm embraces across distance', color: '#FFB6C1' },
    { id: 'ldr', label: 'Lots of\nLDR', description: 'Giving updates of every day', color: '#87CEEB' },
    { id: 'laughter', label: '3 cups\nLaughter', description: 'Silly jokes & funny moments', color: '#FFD700' },
    { id: 'trust', label: '2 tbsp\nTrust', description: 'Our foundation', color: '#9370DB' },
    { id: 'dreams', label: 'Handful\nDreams', description: 'Our shared future', color: '#FF69B4' },
    { id: 'love', label: 'Infinite\nPatience', description: 'The magic ingredient', color: '#FF0000' }
  ];

  useEffect(() => {
    if (showNightScene) {
      const newStars = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 60,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 3
      }));
      setStars(newStars);

      const initialSnowflakes = Array.from({ length: 40 }, (_, i) => ({
        id: Date.now() + i,
        left: Math.random() * 100,
        size: Math.random() * 15 + 10,
        duration: Math.random() * 5 + 5,
        opacity: Math.random() * 0.6 + 0.4
      }));
      setSnowflakes(initialSnowflakes);

      snowflakeIntervalRef.current = setInterval(() => {
        setSnowflakes(prev => [
          ...prev.filter(s => Date.now() - s.id < 10000),
          {
            id: Date.now(),
            left: Math.random() * 100,
            size: Math.random() * 15 + 10,
            duration: Math.random() * 5 + 5,
            opacity: Math.random() * 0.6 + 0.4
          }
        ]);
      }, 500);
    }

    return () => {
      if (snowflakeIntervalRef.current) clearInterval(snowflakeIntervalRef.current);
    };
  }, [showNightScene]);

  const handleIngredientClick = (ingredient) => {
    if (addedIngredients.has(ingredient.id) || pouringIngredient) return;

    setPouringIngredient(ingredient.id);

    // Create "Splash" particles after pouring finishes
    setTimeout(() => {
      const newParticles = Array.from({ length: 15 }, (_, i) => ({
        id: Date.now() + i,
        color: ingredient.color,
        left: 45 + Math.random() * 10, // Around the center of the bowl
        delay: Math.random() * 200
      }));
      setParticles(newParticles);
      setTimeout(() => setParticles([]), 800);
    }, 1200);

    // Add ingredient state
    setTimeout(() => {
      setAddedIngredients(prev => new Set([...prev, ingredient.id]));
      setPouringIngredient(null);
    }, 1800);
  };

  const percentage = (addedIngredients.size / totalIngredients) * 100;
  const isComplete = addedIngredients.size === totalIngredients;

  return (
    <div className="min-h-screen select-none overflow-x-hidden font-serif bg-[#fdf2f0]">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100 px-6 py-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-amber-900 hover:text-rose-600 transition font-bold uppercase tracking-widest text-sm"
        >
          <ArrowLeft size={18} /> Back
        </button>
      </nav>
      {!showNightScene ? (
        <div className="flex flex-col items-center justify-center p-6 min-h-screen">
          <div className="max-w-4xl w-full bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-pink-100">
            <header className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-2 drop-shadow-sm">Our Love Recipe</h1>
              <p className="text-amber-700/70 italic text-lg flex items-center justify-center gap-2">
                <Heart size={18} fill="currentColor" /> A Chocolate Made from Our Journey <Heart size={18} fill="currentColor" />
              </p>
            </header>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 mb-16 relative">
              {ingredients.map((ingredient) => {
                const isPouring = pouringIngredient === ingredient.id;
                const isAdded = addedIngredients.has(ingredient.id);
                
                return (
                  <div
                    key={ingredient.id}
                    onClick={() => handleIngredientClick(ingredient)}
                    className={`flex flex-col items-center transition-all duration-500 cursor-pointer
                      ${isAdded ? 'opacity-30 scale-90 pointer-events-none' : 'hover:scale-105'}
                      ${isPouring ? 'z-50' : 'z-10'}
                    `}
                  >
                    <div className={`relative w-16 h-20 transition-all duration-[1200ms] ease-in-out
                      ${isPouring ? 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-48 rotate-[-110deg]' : ''}
                    `}>
                      {/* Jar Lid */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-3 bg-amber-800 rounded-t-sm shadow-sm z-20" />
                      
                      {/* Jar Body */}
                      <div className="absolute top-2 left-0 w-full h-16 bg-white/40 border-2 border-amber-900/20 rounded-lg overflow-hidden backdrop-blur-sm shadow-lg flex flex-col justify-end">
                        <div 
                          className="w-full transition-all duration-300" 
                          style={{ height: '70%', background: ingredient.color }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white text-center px-1 leading-tight drop-shadow-md">
                          {ingredient.label}
                        </div>
                      </div>

                      {/* Pouring Stream */}
                      {isPouring && (
                        <div className="absolute top-4 -left-20 w-40 h-2 origin-right animate-pour-stream"
                             style={{ backgroundColor: ingredient.color }}>
                          <div className="absolute inset-0 animate-stream-flow opacity-50 bg-white/30" />
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] mt-2 text-amber-800 font-semibold text-center leading-tight">
                      {ingredient.description}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Improved Mixing Bowl */}
            <div className="relative w-64 h-48 mx-auto mt-20">
              {/* Bowl Back Edge */}
              <div className="absolute top-0 w-full h-12 bg-amber-900/20 rounded-[100%] border-t-2 border-amber-900/10" />
              
              {/* Bowl Main Body */}
              <div className="absolute top-6 w-full h-40 bg-gradient-to-b from-slate-100 to-slate-300 rounded-b-[120px] shadow-2xl overflow-hidden border-x border-b border-slate-400">
                {/* Liquid Inside */}
                <div 
                  className="absolute bottom-0 w-full transition-all duration-700 ease-out"
                  style={{ 
                    height: `${Math.max(15, percentage)}%`,
                    background: 'linear-gradient(to top, #3d2817 0%, #5c3d2e 100%)'
                  }}
                >
                  {/* Wave Effect */}
                  <div className="absolute -top-3 left-0 w-[200%] h-8 bg-[#5c3d2e] rounded-[100%] animate-liquid-wave opacity-90" />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/40 font-bold text-xl drop-shadow-md">
                      {addedIngredients.size} / {totalIngredients}
                    </span>
                  </div>
                </div>

                {/* Inner Bowl Shadow */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_20px_40px_rgba(0,0,0,0.2)]" />
              </div>

              {/* Bowl Front Rim */}
              <div className="absolute top-4 w-full h-12 border-[6px] border-slate-200 rounded-[100%] shadow-md pointer-events-none" />

              {/* Splash Particles */}
              {particles.map(p => (
                <div
                  key={p.id}
                  className="absolute bottom-20 w-2 h-2 rounded-full animate-splash pointer-events-none"
                  style={{ 
                    backgroundColor: p.color,
                    left: `${p.left}%`,
                    animationDelay: `${p.delay}ms`
                  }}
                />
              ))}
            </div>

            {isComplete && (
              <div className="mt-12 text-center animate-bounce">
                <button
                  onClick={() => setShowNightScene(true)}
                  className="px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-full text-xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto"
                >
                  <Stars className="text-yellow-200" /> Share Our Chocolate <Stars className="text-yellow-200" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="h-screen w-screen relative overflow-hidden bg-slate-950 transition-all duration-1000">
          {/* Night Sky */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1128] via-[#1a2332] to-[#2d3e50]">
            {stars.map(star => (
              <div
                key={star.id}
                className="absolute bg-white rounded-full animate-twinkle"
                style={{
                  left: `${star.left}%`,
                  top: `${star.top}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  animationDelay: `${star.delay}s`
                }}
              />
            ))}
          </div>

          {/* Glowing Moon */}
          <div className="absolute top-12 right-12 w-24 h-24 rounded-full bg-yellow-50 shadow-[0_0_80px_rgba(255,255,255,0.4)] flex items-center justify-center opacity-90">
             <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-100 to-white" />
          </div>

          {/* Distant Mountains */}
          <div className="absolute bottom-0 w-full h-1/3 bg-[#111827] clip-path-mountains opacity-40" />

          {/* Cozy Room Container */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[450px] bg-gradient-to-t from-amber-950 to-amber-900/80 rounded-t-[40px] shadow-2xl p-8 border-t border-white/10 backdrop-blur-sm">
            
            {/* Window */}
            <div className="absolute top-10 right-10 w-32 h-40 bg-slate-900 border-4 border-amber-950 rounded-md overflow-hidden shadow-inner">
               <div className="absolute inset-0 bg-blue-400/10" />
               <div className="w-full h-1 bg-amber-950 absolute top-1/2 -translate-y-1/2" />
               <div className="h-full w-1 bg-amber-950 absolute left-1/2 -translate-x-1/2" />
               {snowflakes.slice(0, 10).map(s => (
                 <div key={s.id} className="absolute text-white/40 text-[10px] animate-fall" style={{ left: `${s.left % 100}%`, top: '-10px' }}>❄</div>
               ))}
            </div>

            {/* The Bed */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-48 bg-amber-800 rounded-t-2xl shadow-2xl flex flex-col items-center">
              {/* Blankets */}
              <div className="absolute inset-0 bg-gradient-to-b from-rose-800 to-amber-900 rounded-t-2xl" />
              
              {/* Pillows */}
              <div className="flex gap-12 -mt-6">
                <div className="w-24 h-12 bg-stone-100 rounded-full shadow-md" />
                <div className="w-24 h-12 bg-stone-100 rounded-full shadow-md" />
              </div>

              {/* Characters - Now closer together */}
              <div className="flex justify-center gap-6 w-full mt-4 relative z-10">
                {/* Boy */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-amber-200 rounded-full border-b-4 border-amber-300 relative overflow-hidden">
                    <div className="absolute top-0 w-full h-4 bg-stone-800 rounded-full" />
                  </div>
                  <div className="w-16 h-20 bg-blue-700 rounded-t-xl mt-1 flex items-center justify-center">
                    <div className="bg-amber-900 p-1 rounded shadow-lg animate-pulse text-lg">🍫</div>
                  </div>
                </div>

                {/* Girl */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-pink-100 rounded-full border-b-4 border-pink-200 relative overflow-hidden">
                    <div className="absolute top-0 w-full h-6 bg-stone-700 rounded-full" />
                  </div>
                  <div className="w-16 h-20 bg-pink-400 rounded-t-xl mt-1" />
                </div>
              </div>
            </div>

            {/* Forever Message */}
            <div className="absolute top-12 left-10 animate-fade-in">
              <h2 className="text-white text-3xl font-bold tracking-widest drop-shadow-lg">Forever & Always</h2>
              <div className="flex gap-2 mt-2">
                <Heart className="text-rose-500 animate-pulse" fill="currentColor" size={20} />
                <Heart className="text-rose-400 animate-pulse delay-75" fill="currentColor" size={20} />
                <Heart className="text-rose-300 animate-pulse delay-150" fill="currentColor" size={20} />
              </div>
            </div>
          </div>

          {/* Falling Snowflakes (Global) */}
          {snowflakes.map(s => (
            <div
              key={s.id}
              className="absolute text-white animate-fall pointer-events-none"
              style={{
                left: `${s.left}%`,
                top: '-20px',
                fontSize: `${s.size}px`,
                opacity: s.opacity,
                animationDuration: `${s.duration}s`
              }}
            >
              ❄
            </div>
          ))}
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pour-stream {
          0% { width: 0; opacity: 0; transform: scaleY(0); }
          20% { width: 300px; opacity: 1; transform: scaleY(1); }
          80% { width: 300px; opacity: 1; transform: scaleY(1); }
          100% { width: 300px; opacity: 0; transform: scaleY(0); }
        }

        @keyframes stream-flow {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 0%; }
        }

        @keyframes splash {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          50% { transform: translateY(-40px) scale(1.2); opacity: 0.8; }
          100% { transform: translateY(10px) scale(0.5); opacity: 0; }
        }

        @keyframes liquid-wave {
          0%, 100% { transform: translateX(-25%) translateY(0) rotate(0deg); }
          50% { transform: translateX(-25%) translateY(-2px) rotate(1deg); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes fall {
          from { transform: translateY(0) rotate(0deg); }
          to { transform: translateY(100vh) rotate(360deg); }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .clip-path-mountains {
          clip-path: polygon(0% 100%, 0% 70%, 15% 50%, 30% 75%, 45% 40%, 60% 80%, 75% 30%, 85% 60%, 100% 40%, 100% 100%);
        }

        .animate-fall {
          animation: fall linear forwards;
        }

        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
        }

        .animate-splash {
          animation: splash 0.8s ease-out forwards;
        }

        .animate-liquid-wave {
          animation: liquid-wave 3s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 2s ease-out forwards;
        }
      `}} />
    </div>
  );
}