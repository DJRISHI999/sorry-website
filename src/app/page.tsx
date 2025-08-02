
"use client";
import { useEffect, useRef, useState } from "react";

// Animated rain of sorries background
function SorryRain() {
  const [drops, setDrops] = useState<Array<{
    left: string;
    top: string;
    delay: string;
    duration: string;
    fontSize: string;
    opacity: number;
    emoji: string;
  }>>([]);

  useEffect(() => {
    const emojis = ["🙏", "🥺", "😭", "💖", "🍍", "💔", "😢", "😔", "😳", "🤍"];
    const arr = Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      // Randomize initial top between -15vh and 0vh
      top: `${-15 + Math.random() * 15}vh`,
      delay: `${Math.random() * 5}s`,
      duration: `${4 + Math.random() * 5}s`,
      fontSize: `${2.2 + Math.random() * 2.8}rem`,
      opacity: 0.85 + Math.random() * 0.15,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setDrops(arr);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {drops.map((d, i) => (
        <span
          key={i}
          className="absolute animate-sorry-rain whitespace-nowrap select-none"
          style={{
            left: d.left,
            top: d.top,
            animationDelay: d.delay,
            animationDuration: d.duration,
            fontSize: d.fontSize,
            opacity: d.opacity,
            color: '#e11d48',
            fontWeight: 700,
            textShadow: '0 2px 12px #fff8',
          }}
        >
          Sorry {d.emoji}
        </span>
      ))}
    </div>
  );
}

function ForgivenessLetter() {
  // This is the correct definition of ForgivenessLetter
  const [noPos, setNoPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const btnRowRef = useRef<HTMLDivElement>(null);
  const [noTries, setNoTries] = useState(0);
  const [forgiven, setForgiven] = useState(false);
  const [showExtraSorry, setShowExtraSorry] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);

  // Move the No button to a random position within the letter area, always visible and not overlapping Yes
  const moveNo = () => {
    if (!btnRowRef.current) return;
    const rect = btnRowRef.current.getBoundingClientRect();
    const btnW = 90, btnH = 44;
    const padding = 8;
    const maxLeft = Math.max(0, rect.width - btnW - padding);
    const maxTop = Math.max(0, rect.height - btnH - padding);

    // Yes button is always centered horizontally, so avoid center
    const yesLeft = rect.width / 2 - btnW / 2;
    const yesTop = rect.height / 2 - btnH / 2;

    let left, top, tries = 0;
    do {
      left = padding + Math.random() * maxLeft;
      top = padding + Math.random() * maxTop;
      // Avoid overlap with Yes button (distance > 100px)
      const dist = Math.sqrt(Math.pow(left - yesLeft, 2) + Math.pow(top - yesTop, 2));
      if (dist > 100 || tries > 10) break;
      tries++;
    } while (true);

    setNoPos({ left, top });
    setNoTries((n) => n + 1);
    setShowExtraSorry(true);
  };

  return (
    <main
      ref={letterRef}
      className="bg-white/90 rounded-3xl shadow-2xl p-4 sm:p-10 w-full max-w-md sm:max-w-2xl flex flex-col items-center gap-8 border border-pink-200 backdrop-blur-md animate-fade-in z-30 relative min-h-[60vh] max-h-[90vh] sm:max-h-[80vh] overflow-auto"
    >
      <h1 className="text-4xl sm:text-5xl font-extrabold text-pink-600 text-center drop-shadow-lg animate-fade-in">Sorry, Pineapple <span className="inline-block animate-bounce">💖</span></h1>
      <div className="flex flex-col items-center gap-2">
        <span className="text-lg text-gray-700 text-center max-w-xl animate-fade-in delay-200">
          I know I messed up, and I want you to know how truly sorry I am. Our friendship means the world to me, and I never want to hurt you. Please forgive me and let&apos;s make more amazing memories together!
        </span>
        <div className="mt-6 flex flex-col items-center gap-1 animate-fade-in delay-300">
          <span className="text-pink-400 font-semibold text-lg">I owe you...</span>
          <AnimatedSorries count={1000} />
          <span className="text-pink-400 font-semibold text-lg">sorries!</span>
        </div>
      </div>
      {/* Forgiveness prompt */}
      {!forgiven && (
        <div className="flex flex-col items-center gap-4 mt-6 animate-fade-in delay-500 w-full">
          <span className="text-xl font-semibold text-pink-500">Will you forgive me? 🥺</span>
          <div ref={btnRowRef} className="relative w-full h-16 flex items-center justify-center">
            <button
              className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-full shadow-lg text-lg transition-all duration-200 z-10"
              onClick={() => setForgiven(true)}
            >
              Yes 😊
            </button>
            <button
              className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-6 rounded-full shadow-lg text-lg transition-all duration-200 absolute"
              style={{ left: noPos.left, top: noPos.top, position: 'absolute' }}
              onMouseEnter={moveNo}
              onClick={moveNo}
            >
              No 😢
            </button>
          </div>
          {showExtraSorry && (
            <div className="mt-4 text-center animate-fade-in delay-200">
              <span className="block text-pink-500 text-lg font-bold">Please, I am soooo sorry! 🙏🥺</span>
              <span className="block text-pink-400 text-base mt-1">I am so sorryyyyyyyyyy 😭💔</span>
              {noTries > 2 && <span className="block text-pink-400 text-base mt-1">I&apos;ll keep saying sorry until you forgive me! 😭🙏</span>}
            </div>
          )}
        </div>
      )}
      {/* Forgiven message */}
      {forgiven && (
        <div className="flex flex-col items-center gap-4 mt-6 animate-fade-in delay-500">
          <span className="text-2xl font-bold text-green-500 animate-bounce">Yay! Thank you for forgiving me! 🥰🍍</span>
          <span className="text-lg text-pink-500">You&apos;re the best, Pineapple! Let&apos;s make more sweet memories together! 💖</span>
        </div>
      )}
      <div className="flex flex-col gap-2 w-full mt-4 animate-fade-in delay-700">
        <span className="text-base text-gray-500 text-center">— from Dhruv</span>
      </div>
    </main>
  );
}

function HeartBackground() {
  // Animated floating hearts background, fixed for hydration
  const [hearts, setHearts] = useState<Array<{
    left: string;
    top: string;
    animationDelay: string;
    fontSize: string;
    color: string;
    opacity: number;
  }>>([]);

  useEffect(() => {
    const arr = Array.from({ length: 30 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      fontSize: `${Math.random() * 2 + 1.5}rem`,
      color: `hsl(${330 + Math.random() * 30}, 80%, 70%)`,
      opacity: 0.5 + Math.random() * 0.5,
    }));
    setHearts(arr);
  }, []);

  // Only render hearts on client after mount
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {hearts.map((h, i) => (
        <span
          key={i}
          className="absolute animate-float-heart"
          style={h}
        >
          ♥
        </span>
      ))}
    </div>
  );
}

function Envelope({ onOpen }: { onOpen: () => void }) {
  // Animated envelope that opens to reveal the letter
  const [opened, setOpened] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`relative w-40 h-28 cursor-pointer group select-none transition-transform duration-500 ${opened ? "scale-110" : "hover:scale-105"}`}
        onClick={() => { setOpened(true); setTimeout(onOpen, 800); }}
        aria-label="Open letter"
      >
        {/* Envelope base */}
        <div className="absolute w-full h-full bg-pink-200 rounded-b-2xl shadow-lg z-10" style={{ bottom: 0 }} />
        {/* Envelope flap */}
        <div className={`absolute w-full h-1/2 bg-pink-300 rounded-t-2xl z-20 transition-transform duration-700 origin-bottom ${opened ? "-rotate-x-75" : "rotate-x-0"}`} style={{ top: 0, transform: opened ? "rotateX(-75deg)" : "rotateX(0deg)" }} />
        {/* Heart seal */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
          <span className="text-3xl text-pink-500 animate-bounce">💌</span>
        </div>
      </div>
      <span className="mt-4 text-pink-400 font-semibold animate-fade-in">Tap the envelope to open your letter!</span>
    </div>
  );
}

function AnimatedSorries({ count = 1000 }) {
  // Animated counter for 1000 sorries
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    let n = 0;
    const step = Math.ceil(count / 100);
    const el = ref.current;
    if (!el) return;
    const interval = setInterval(() => {
      n += step;
      if (n >= count) {
        n = count;
        clearInterval(interval);
      }
      el.textContent = n.toLocaleString();
    }, 10);
    return () => clearInterval(interval);
  }, [count]);
  return (
    <span ref={ref} className="text-5xl font-extrabold text-pink-500 drop-shadow animate-pulse"></span>
  );
}

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  useEffect(() => {
    if (showWelcome) {
      const t = setTimeout(() => {
        setShowWelcome(false);
        setShowEnvelope(true);
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [showWelcome]);

  return (
    <>
      {/* Set the browser tab title */}
      <head>
        <title>Sorry, Pineapple</title>
      </head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 p-6 relative overflow-hidden">
        <HeartBackground />
        {/* Only show SorryRain when the letter is open */}
        {showLetter && <SorryRain />}
        {/* Welcome Animation */}
        {showWelcome && (
          <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-white/80 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-pink-500 drop-shadow mb-2 animate-bounce">Welcome, Pineapple! 🍍</h2>
            <span className="text-lg text-gray-600 animate-fade-in delay-200">You have a special letter waiting for you...</span>
          </div>
        )}
        {/* Envelope Animation */}
        {showEnvelope && !showLetter && (
          <div className="fixed inset-0 flex flex-col items-center justify-center z-40 bg-white/70 animate-fade-in">
            <Envelope onOpen={() => { setShowEnvelope(false); setShowLetter(true); }} />
          </div>
        )}
        {/* Letter Content */}
        {showLetter && (
          <div className="fixed inset-0 flex flex-col items-center justify-center z-30 animate-fade-in">
            <ForgivenessLetter />
          </div>
        )}
        {/* Footer always visible */}
        <footer className="mt-8 text-gray-400 text-sm text-center animate-fade-in delay-700 z-20">
          &copy; {new Date().getFullYear()} Sorry For My Bestie
        </footer>
        <style jsx global>{`
          @keyframes sorry-rain {
            0% { transform: translateY(-10vh); opacity: 0.7; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(110vh); opacity: 0; }
          }
          .animate-sorry-rain {
            animation: sorry-rain linear infinite;
          }
          @keyframes float-heart {
            0% { transform: translateY(0) scale(1); opacity: 0.7; }
            50% { opacity: 1; }
            100% { transform: translateY(-120vh) scale(1.2); opacity: 0; }
          }
          .animate-float-heart {
            animation: float-heart 7s linear infinite;
          }
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 1s cubic-bezier(0.4,0,0.2,1) both;
          }
          .delay-200 { animation-delay: 0.2s; }
          .delay-300 { animation-delay: 0.3s; }
          .delay-500 { animation-delay: 0.5s; }
          .delay-700 { animation-delay: 0.7s; }
          /* Envelope flap animation */
          .-rotate-x-75 { transform: rotateX(-75deg) !important; }
          .rotate-x-0 { transform: rotateX(0deg) !important; }
        `}</style>
      </div>
    </>
  );
}
