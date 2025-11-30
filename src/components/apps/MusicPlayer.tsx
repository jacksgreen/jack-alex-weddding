import { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackTitle, setTrackTitle] = useState('READY');
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const widgetRef = useRef<any>(null);

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
        <div className="flex flex-col h-full bg-gray-200 p-2">
            <div className="bg-black h-24 mb-2 border-2 border-gray-500 inset-shadow flex items-center justify-center overflow-hidden">
                <div className="text-green-500 font-mono text-xs px-2 text-center">
                    {isPlaying ? (
                        <div className="animate-pulse">
                            PLAYING: {trackTitle.toUpperCase()}
                        </div>
                    ) : (
                        'READY'
                    )}
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

            <div className="flex justify-center space-x-4 mb-4">
                <button
                    className="p-1 border border-gray-500 active:bg-gray-400"
                    onClick={skipBack}
                >
                    <SkipBack size={16} />
                </button>
                <button
                    className="p-1 border border-gray-500 active:bg-gray-400 w-8 flex justify-center"
                    onClick={togglePlayPause}
                >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <button
                    className="p-1 border border-gray-500 active:bg-gray-400"
                    onClick={skipForward}
                >
                    <SkipForward size={16} />
                </button>
            </div>
        </div>
    );
};

export default MusicPlayer;
