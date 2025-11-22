import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
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
            const newProgress = Math.min(100, (currentStep / steps) * 100);
            setProgress(newProgress);

            // Add random boot messages
            if (currentStep % 15 === 0) {
                const messages = [
                    "Applying sunscreen...",
                    "Mixing cocktails...",
                    "Inflating pool floats...",
                    "Tuning radio frequencies...",
                    "Loading wedding_vibes.exe...",
                    "Checking UV index...",
                    "Warming up the dance floor..."
                ];
                const randomMsg = messages[Math.floor(Math.random() * messages.length)];
                setTextLines(prev => [...prev.slice(-4), randomMsg]);
            }

            if (currentStep >= steps) {
                clearInterval(timer);
                setTimeout(onComplete, 500);
            }
        }, intervalTime);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 bg-pool-pink flex items-center justify-center z-[100] font-mono">
            <div className="w-[600px] h-[300px] bg-[#e0f2f1] border-2 border-black rounded-lg p-2 flex gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                {/* Left Column - Image */}
                <div className="w-1/3 h-full border-2 border-black overflow-hidden relative">
                    <img
                        src="/bg-personal.png"
                        alt="Wedding Couple"
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                </div>

                {/* Right Column - Content */}
                <div className="flex-1 flex flex-col relative">
                    {/* Header */}
                    <div className="border-b-2 border-black pb-2 mb-2">
                        <h1 className="text-5xl font-serif tracking-tighter text-black mb-1">
                            ALEX & JACK
                        </h1>
                        <div className="flex justify-between items-end">
                            <span className="text-xs font-bold tracking-wider">WEDDING ENHANCER VERSION 1.0</span>
                            {/* Sun icon placeholder - using CSS/SVG or just a div for now */}
                            <div className="w-8 h-4 bg-black rounded-t-full" />
                        </div>
                    </div>

                    {/* Credits/Info */}
                    <div className="text-xs space-y-2 mb-auto text-gray-800 leading-relaxed">
                        <p>
                            Jack Green, Alex Smith, Best Man, Maid of Honor,
                            The Parents, The Dog, The Cat, The Venue Staff.
                        </p>
                        <p>
                            Copyright 2025 Wedding Systems Ltd.
                        </p>
                    </div>

                    {/* Loading Status */}
                    <div className="mt-4">
                        <div className="flex justify-between text-xs font-bold mb-1">
                            <span>{textLines[textLines.length - 1] || "Loading..."}</span>
                            <span>{Math.round(progress)}%</span>
                        </div>

                        {/* Segmented Progress Bar */}
                        <div className="h-6 border-2 border-black p-0.5 flex gap-0.5 bg-white">
                            {Array.from({ length: 20 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`flex-1 transition-colors duration-150 ${(i / 20) * 100 < progress ? 'bg-[#4fd1c5]' : 'bg-transparent'
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
