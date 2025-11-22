import { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="flex flex-col h-full bg-gray-200 p-2">
            <div className="bg-black h-24 mb-2 border-2 border-gray-500 inset-shadow flex items-center justify-center">
                <div className="text-green-500 font-mono text-sm animate-pulse">
                    {isPlaying ? 'PLAYING: POOLSUITE FM' : 'READY'}
                </div>
            </div>

            <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-bold">00:00</div>
                <div className="h-1 bg-gray-400 flex-1 mx-2 relative">
                    <div className="absolute top-0 left-0 h-full bg-win-blue w-0"></div>
                </div>
                <div className="text-xs font-bold">03:45</div>
            </div>

            <div className="flex justify-center space-x-4 mb-4">
                <button className="p-1 border border-gray-500 active:bg-gray-400"><SkipBack size={16} /></button>
                <button
                    className="p-1 border border-gray-500 active:bg-gray-400 w-8 flex justify-center"
                    onClick={() => setIsPlaying(!isPlaying)}
                >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <button className="p-1 border border-gray-500 active:bg-gray-400"><SkipForward size={16} /></button>
            </div>

            <div className="mt-auto flex items-center space-x-2">
                <Volume2 size={14} />
                <input type="range" className="w-full h-1 bg-gray-400 appearance-none" />
            </div>
        </div>
    );
};

export default MusicPlayer;
