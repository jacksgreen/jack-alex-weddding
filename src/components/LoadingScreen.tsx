import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [textLines, setTextLines] = useState([
    "Initializing Wedding GuestOS...",
  ]);

  useEffect(() => {
    const totalTime = 2000; // 2 seconds total load time
    const intervalTime = 50;
    const steps = totalTime / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;

      // Non-linear progress with slowdown at 30% and pause at 70%
      let linearProgress = (currentStep / steps) * 100;
      let newProgress;

      if (linearProgress < 30) {
        // Normal speed up to 30%
        newProgress = linearProgress;
      } else if (linearProgress < 40) {
        // Slow down between 30-40% (takes 2x as long)
        newProgress = 30 + (linearProgress - 30) * 0.5;
      } else if (linearProgress < 70) {
        // Normal speed between 40-70%
        newProgress = 35 + (linearProgress - 40) * 1.33;
      } else if (linearProgress < 88) {
        // Pause at 75% between 70-88% (longer pause)
        newProgress = 75;
      } else {
        // Final push to 100%
        newProgress = 75 + (linearProgress - 88) * 2.08;
      }

      setProgress(Math.min(100, newProgress));

      // Add random boot messages
      if (currentStep % 15 === 0) {
        const messages = [
          "Applying sunscreen...",
          "Mixing cocktails...",
          "Inflating pool floats...",
          "Tuning radio frequencies...",
          "Loading wedding_vibes.exe...",
          "Checking UV index...",
          "Warming up the dance floor...",
        ];
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        setTextLines((prev) => [...prev.slice(-4), randomMsg]);
      }

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 500);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-pool-pink flex items-center justify-center z-[100] font-mono p-4">
      <div className="w-full max-w-[600px] h-auto max-md:max-w-full bg-[#e0f2f1] border-2 border-black rounded-lg p-2 flex max-md:flex-col gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        {/* Left Column - Image */}
        <div className="w-1/3 max-md:w-full max-md:h-96 h-[284px] max-md:min-h-0 border-2 border-black overflow-hidden relative">
          <img
            src="/loading-image.png"
            alt="Wedding Couple"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        </div>

        {/* Right Column - Content */}
        <div className="flex-1 flex flex-col relative min-h-0">
          {/* Header */}
          <div className="border-b-2 border-black pb-2 mb-2">
            <h1 className="text-5xl max-md:text-3xl font-serif tracking-tighter text-black mb-1">
              ALEX & JACK
            </h1>
            <div className="flex justify-between items-end">
              <span className="text-xs max-md:text-[10px] font-bold tracking-wider">
                WEDDING ENHANCER VERSION 1.0
              </span>
              {/* Sun icon placeholder - using CSS/SVG or just a div for now */}
              <div className="w-8 h-4 max-md:w-6 max-md:h-3 bg-black rounded-t-full" />
            </div>
          </div>

          {/* Credits/Info */}
          <div className="text-xs max-md:text-[10px] space-y-2 mb-auto text-gray-800 leading-relaxed max-md:space-y-1">
            <p>
              Jack Green, Alex Smith, Best Man, Maid of Honor, The Parents, The
              Dog, The Cat, The Venue Staff.
            </p>
            <p>Copyright 2025 Wedding Systems Ltd.</p>
          </div>

          {/* Loading Status */}
          <div className="mt-4 max-md:mt-3">
            <div className="flex justify-between text-xs max-md:text-[10px] font-bold mb-1">
              <span className="truncate pr-2">
                {textLines[textLines.length - 1] || "Loading..."}
              </span>
              <span className="flex-shrink-0">{Math.round(progress)}%</span>
            </div>

            {/* Segmented Progress Bar */}
            <div className="h-6 max-md:h-4 border-2 border-black p-0.5 flex gap-0.5 bg-white">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 transition-colors duration-150 ${
                    (i / 20) * 100 < progress
                      ? "bg-[#4fd1c5]"
                      : "bg-transparent"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
