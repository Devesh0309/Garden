import React, { useState } from 'react';
import { Heart, Lock, Flower2, Ghost, Sparkles, Moon } from 'lucide-react';

const Butterflies = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-fly"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${15 + Math.random() * 15}s`,
          }}
        >
          <div className="animate-flutter">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="text-red-500/40 fill-red-400/20"
            >
              <path d="M12 20c-2-4.5-8-3.5-8-8.5 0-2.5 2-4 3.5-4 1.5 0 2.5.5 4.5 3 2-2.5 3-3 4.5-3 1.5 0 3.5 1.5 3.5 4 0 5-6 4-8 8.5Z" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

const RoseDay = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [selectedRose, setSelectedRose] = useState(null);
  const [showLastRose, setShowLastRose] = useState(false);
  const [hoveredMessage, setHoveredMessage] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const pass = password.toLowerCase();
    if (pass === 'harshika' || pass === 'chicken' || pass === 'cheesecake') {
      setAuthenticated(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const roses = [
    {
      id: 'red',
      color: 'bg-red-500',
      shadow: 'shadow-red-500/50',
      label: 'Red Rose',
      icon: <Heart className="text-white" />,
      message: "Arz kiya hai...Arz kiya hai...ki Mana ki....ki mana ki yeh first flower hai but sequence meh open karo yeh zaruri nahi. Haha. "
    },
    {
      id: 'white',
      color: 'bg-stone-100',
      shadow: 'shadow-stone-200/50',
      label: 'White Rose',
      icon: <Flower2 className="text-stone-400" />,
      message: "White stands for truth and purity. And this is something I truly cherish about this relationship. We discuss. Smallest of things. Going with the flow? Woh kya hota hai? We create the flow. 💪"
    },
    {
      id: 'yellow',
      color: 'bg-yellow-400',
      shadow: 'shadow-yellow-400/50',
      label: 'Yellow Rose',
      icon: <Sparkles className="text-yellow-700" />,
      message: "This is how I imagine my future with you.💛 Bright yellow. Being away from you feels like a burden. All I want is your head as close to my chest as possible. "
    },
    {
      id: 'pink',
      color: 'bg-pink-300',
      shadow: 'shadow-pink-300/50',
      label: 'Pink Rose',
      icon: <Heart className="text-pink-600" fill="currentColor" />,
      message: "For the feelings that grew quietly, day by day. Not a storm, but a steady sunrise that eventually filled the whole sky. (If you simply read this Harshika Srivastava, I'll kill you. Imagine watching a sunrise with me.)"
    },
    {
      id: 'black',
      color: 'bg-zinc-900',
      shadow: 'shadow-zinc-700/50',
      label: 'Black Rose',
      icon: <Ghost className="text-zinc-400" />,
      message: "This flower is for the problems that we have in our lifes. They are a part of our beautiful garden giving it the perfect contrast that it needs. 🖤"
    }
  ];

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center p-6 text-stone-200 font-serif overflow-hidden">
        <Butterflies />
        <div className="max-w-md w-full text-center space-y-8 animate-in fade-in duration-1000 relative z-10">
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-red-900/20 blur-xl rounded-full"></div>
            <h1 className="text-3xl md:text-4xl font-light tracking-widest relative">
              🌹 A Rose Garden
            </h1>
          </div>
          
          <div className="space-y-4">
            <p className="italic text-stone-400">"Some things are meant to be seen by only one heart."</p>
            <div className="h-px w-24 bg-stone-800 mx-auto"></div>
          </div>

          <div className="bg-stone-900/50 border border-stone-800 p-8 rounded-2xl space-y-6 backdrop-blur-sm">
            <div className="space-y-2">
              <h2 className="flex items-center justify-center gap-2 text-xl">
                <Lock size={18} className="text-red-800" /> Private Entry
              </h2>
              <p className="text-sm text-stone-500">
                This garden opens for <strong>one person only</strong>.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Something that I can eat forever...😉"
                  className={`w-full bg-stone-950 border ${error ? 'border-red-900' : 'border-stone-800'} rounded-lg py-3 px-4 text-center focus:outline-none focus:border-red-800 transition-colors text-stone-300 placeholder:text-stone-700`}
                />
                {error && (
                  <p className="text-xs text-red-900 mt-2 absolute w-full text-center">That memory doesn't match...</p>
                )}
              </div>
              <button 
                type="submit"
                className="w-full bg-stone-100 text-stone-900 py-3 rounded-lg hover:bg-white transition-colors font-medium tracking-tight"
              >
                Enter the Garden
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-serif selection:bg-red-100 selection:text-red-900 relative">
      <Butterflies />

      {/* Garden Header */}
      <header className="relative z-10 max-w-3xl mx-auto pt-24 px-6 pb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6">🌸 The Garden</h1>
        <p className="text-stone-500 leading-relaxed max-w-xl mx-auto italic">
          Welcome to a quiet corner of the internet, where every rose holds a memory, 
          and every petal hides a feeling I never said out loud.
        </p>
        <p className="text-stone-400 mt-4 text-sm uppercase tracking-[0.2em]">Take your time. Nothing here is in a hurry.</p>
      </header>

      {/* Rose Grid */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-light mb-12 flex items-center gap-4">
          <span className="h-px flex-1 bg-stone-200"></span>
          🌹 The Roses
          <span className="h-px flex-1 bg-stone-200"></span>
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {roses.map((rose) => (
            <button
              key={rose.id}
              onClick={() => setSelectedRose(rose)}
              className="group flex flex-col items-center gap-4 transition-transform hover:-translate-y-2 focus:outline-none"
            >
              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full ${rose.color} shadow-lg ${rose.shadow} flex items-center justify-center transition-transform group-hover:scale-110 group-active:scale-95 border-4 border-white`}>
                {rose.icon}
              </div>
              <span className="text-xs uppercase tracking-widest text-stone-500 font-medium">{rose.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Hidden Messages */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 py-24 text-center">
        <h2 className="text-2xl font-light mb-8">✉️ Hidden Messages</h2>
        <div 
          onMouseEnter={() => setHoveredMessage(true)}
          onMouseLeave={() => setHoveredMessage(false)}
          className="relative h-32 flex items-center justify-center group cursor-default"
        >
          <div className={`transition-all duration-1000 ease-out text-lg italic ${hoveredMessage ? 'opacity-100 scale-100' : 'opacity-0 scale-95 blur-md'}`}>
            “Every rose out there will always remind me the way your face brightens up while crossing the IT building. The thought of seeing that smile lying right beside me on a random Saturday morning is something that keeps me going. ”
          </div>
          {!hoveredMessage && (
            <div className="absolute text-stone-300 animate-pulse text-sm tracking-widest uppercase">
              Hover to reveal...
            </div>
          )}
        </div>
      </section>

      {/* Note at the End */}
      <section className="relative z-10 max-w-2xl mx-auto px-6 py-32 text-center">
        <Moon className="mx-auto mb-8 text-stone-300" />
        <h2 className="text-3xl font-light mb-12">🌙 A Note at the End</h2>
        <div className="space-y-6 text-stone-600 leading-relaxed text-lg">
          <p>If you ever wonder</p>
          <p>whether you mattered,</p>
          <p>whether you were thought of,</p>
          <p>whether you were felt, </p>
          <p>and if you ever go into a crisis-</p>
          <p>remember that,</p>
          <p className="text-stone-900 font-medium">This garden exists.</p>
          <p className="text-stone-900 font-medium">And it always will.</p>
        </div>
      </section>

      {/* One Last Rose */}
      <section className="relative z-10 pb-48 px-6 text-center">
        <div className="h-px w-24 bg-stone-200 mx-auto mb-12"></div>
        <h2 className="text-2xl font-light mb-8 italic">🌹 One Last Rose</h2>
        <button
          onClick={() => setShowLastRose(true)}
          className="relative inline-block group"
        >
          <div className="absolute -inset-8 bg-stone-200/50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative w-20 h-20 rounded-full border-2 border-stone-200 flex items-center justify-center text-stone-300 transition-all group-hover:border-stone-400 group-hover:text-stone-400 group-active:scale-95">
              ?
          </div>
        </button>
        {showLastRose && (
          <div className="mt-12 animate-in zoom-in fade-in duration-1000 max-w-sm mx-auto p-8 rounded-2xl bg-white shadow-xl border border-stone-100">
             <p className="text-stone-600 italic leading-relaxed">
               This one doesn't have a color. Because some feelings are inexplicable.
             </p>
             <p className="mt-6 text-stone-900 font-medium">
               We will one day find it's meaning sitting on a beach in Mauritius.🥂
             </p>
          </div>
        )}
      </section>

      {/* Rose Modal */}
      {selectedRose && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-stone-950/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div 
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in slide-in-from-bottom-8 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`h-32 ${selectedRose.color} flex items-end justify-center pb-4`}>
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg transform translate-y-12">
                {React.cloneElement(selectedRose.icon, { size: 32 })}
              </div>
            </div>
            <div className="pt-16 pb-12 px-10 text-center">
              <h3 className="text-xs uppercase tracking-[0.3em] text-stone-400 mb-6">{selectedRose.label}</h3>
              <p className="text-lg italic text-stone-800 leading-relaxed">
                "{selectedRose.message}"
              </p>
              <button 
                onClick={() => setSelectedRose(null)}
                className="mt-12 text-sm text-stone-400 hover:text-stone-600 transition-colors uppercase tracking-widest"
              >
                Close Garden Entry
              </button>
            </div>
          </div>
          <div className="absolute inset-0 -z-10" onClick={() => setSelectedRose(null)}></div>
        </div>
      )}

      <footer className="py-12 text-center text-stone-300 text-xs tracking-widest uppercase relative z-10">
        Made with quiet intent &bull; February 2026
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes zoom-in { from { transform: scale(0.95); } to { transform: scale(1); } }
        @keyframes slide-up { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        
        @keyframes fly {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(100px, -50px) rotate(15deg); }
          50% { transform: translate(200px, 20px) rotate(-10deg); }
          75% { transform: translate(100px, 100px) rotate(5deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }

        @keyframes flutter {
          0%, 100% { transform: scaleX(1); }
          50% { transform: scaleX(0.3); }
        }

        .animate-in { animation: var(--duration, 300ms) ease-out forwards; }
        .fade-in { animation-name: fade-in; }
        .zoom-in { animation-name: zoom-in; }
        .slide-in-from-bottom-4 { animation-name: slide-up; --duration: 1000ms; }
        
        .animate-fly {
          animation: fly 20s infinite linear;
        }
        .animate-flutter {
          animation: flutter 0.3s infinite ease-in-out;
        }
      `}} />
    </div>
  );
};

export default RoseDay;