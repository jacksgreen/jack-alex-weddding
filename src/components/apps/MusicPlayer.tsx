import { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackTitle, setTrackTitle] = useState('READY');
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const widgetRef = useRef<any>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // Load SoundCloud Widget API
        const script = document.createElement('script');
        script.src = 'https://w.soundcloud.com/player/api.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (iframeRef.current && (window as any).SC) {
                const widget = (window as any).SC.Widget(iframeRef.current);
                widgetRef.current = widget;

                // Listen to play/pause events
                widget.bind((window as any).SC.Widget.Events.PLAY, () => {
                    setIsPlaying(true);
                });

                widget.bind((window as any).SC.Widget.Events.PAUSE, () => {
                    setIsPlaying(false);
                });

                widget.bind((window as any).SC.Widget.Events.FINISH, () => {
                    setIsPlaying(false);
                });

                // Get current track info
                widget.bind((window as any).SC.Widget.Events.READY, () => {
                    widget.getCurrentSound((sound: any) => {
                        if (sound) {
                            setTrackTitle(sound.title);
                        }
                    });
                });

                widget.bind((window as any).SC.Widget.Events.PLAY_PROGRESS, () => {
                    widget.getCurrentSound((sound: any) => {
                        if (sound) {
                            setTrackTitle(sound.title);
                        }
                    });
                });
            }
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // Static Noise Effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let resizeObserver: ResizeObserver;

        const drawNoise = () => {
            const w = canvas.width;
            const h = canvas.height;
            
            if (w === 0 || h === 0) return;

            const idata = ctx.createImageData(w, h);
            const buffer32 = new Uint32Array(idata.data.buffer);
            const len = buffer32.length;

            for (let i = 0; i < len; i++) {
                if (Math.random() < 0.1) { 
                    // Stronger green noise
                    // Alpha(80) Blue(100) Green(255) Red(100) - Higher alpha (0x50)
                    buffer32[i] = 0x5064FF64; 
                }
            }

            ctx.putImageData(idata, 0, 0);
            
            // Add scanline effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            for (let i = 0; i < h; i += 3) {
                ctx.fillRect(0, i, w, 1);
            }

            animationFrameId = requestAnimationFrame(drawNoise);
        };

        const init = () => {
            if (canvas.parentElement) {
                resizeObserver = new ResizeObserver((entries) => {
                    for (const entry of entries) {
                        canvas.width = entry.contentRect.width;
                        canvas.height = entry.contentRect.height;
                    }
                });
                resizeObserver.observe(canvas.parentElement);
                
                // Force initial size
                canvas.width = canvas.parentElement.clientWidth;
                canvas.height = canvas.parentElement.clientHeight;
            }
            drawNoise();
        };

        init();

        return () => {
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const togglePlayPause = () => {
        if (widgetRef.current) {
            widgetRef.current.toggle();
        }
    };

    const skipForward = () => {
        if (widgetRef.current) {
            widgetRef.current.next();
        }
    };

    const skipBack = () => {
        if (widgetRef.current) {
            widgetRef.current.prev();
        }
    };

    return (
        <div className="flex flex-col h-full p-2 gap-4">
            {/* Display Screen */}
            <div className="bg-gray-900 border-2 border-pastel-green shadow-win-in p-3 mb-2 relative overflow-hidden h-32 flex flex-col justify-center">
                {/* Noise Canvas */}
                <canvas 
                    ref={canvasRef} 
                    className="absolute inset-0 w-full h-full pointer-events-none z-0"
                />
                
                <div className="absolute inset-0 bg-pastel-blue/5 pointer-events-none z-0"></div>
                
                <div className="relative z-10 text-pastel-blue font-mono text-sm leading-relaxed text-center">
                    {isPlaying && <div className="text-xs text-pastel-pink mb-2">Now playing</div>}
                    <div className="whitespace-nowrap overflow-hidden px-4">
                            {isPlaying ? (
                            <div className="animate-pulse text-pastel-yellow font-bold tracking-widest">
                                {trackTitle.length > 25 ? trackTitle.substring(0, 25) + '...' : trackTitle}
                            </div>
                        ) : (
                            <span className="animate-pulse">INSERT TAPE...</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Hidden SoundCloud iframe */}
            <iframe
                ref={iframeRef}
                width="100%"
                height="0"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/661426833&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false"
                style={{ display: 'none' }}
            />

            {/* Controls */}
            <div className="flex justify-center items-center space-x-4">
                <button
                    className="p-2 bg-pastel-cream border border-gray-400 shadow-win-out active:shadow-win-in active:translate-y-px rounded-sm"
                    onClick={skipBack}
                    title="Previous Track"
                >
                    <SkipBack size={20} className="text-gray-800 fill-current" />
                </button>
                
                <button
                    className="p-2 bg-pastel-cream border border-gray-400 shadow-win-out active:shadow-win-in active:translate-y-px w-12 flex justify-center rounded-sm"
                    onClick={togglePlayPause}
                    title={isPlaying ? "Pause" : "Play"}
                >
                    {isPlaying ? <Pause size={20} className="text-gray-800 fill-current" /> : <Play size={20} className="text-gray-800 fill-current" />}
                </button>
                
                <button
                    className="p-2 bg-pastel-cream border border-gray-400 shadow-win-out active:shadow-win-in active:translate-y-px rounded-sm"
                    onClick={skipForward}
                    title="Next Track"
                >
                    <SkipForward size={20} className="text-gray-800 fill-current" />
                </button>
            </div>

            {/* Decorative Elements */}
            <div className="mt-auto border-t border-pastel-green pt-2 flex justify-between text-[10px] text-gray-500 font-mono">
                <span>STEREO SOUND</span>
                <span>HI-FI</span>
            </div>
        </div>
    );
};

export default MusicPlayer;

