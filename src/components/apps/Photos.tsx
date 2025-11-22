import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from '@/components/ui/dialog';

// Photo data from /public/photos folder
const mockPhotos = [
    { id: 1, url: '/photos/jack_1.jpeg', alt: 'Jack & Alex 1' },
    { id: 2, url: '/photos/jack_2.jpeg', alt: 'Jack & Alex 2' },
    { id: 3, url: '/photos/jack_3.jpeg', alt: 'Jack & Alex 3' },
    { id: 4, url: '/photos/jack_4.jpeg', alt: 'Jack & Alex 4' },
    { id: 5, url: '/photos/jack_5.jpeg', alt: 'Jack & Alex 5' },
    { id: 6, url: '/photos/jack_6.jpeg', alt: 'Jack & Alex 6' },
    { id: 7, url: '/photos/jack_7.jpeg', alt: 'Jack & Alex 7' },
    { id: 8, url: '/photos/jack_8.jpeg', alt: 'Jack & Alex 8' },
];

const Photos = () => {
    const [expandedPhoto, setExpandedPhoto] = useState<number | null>(null);
    const selectedPhoto = mockPhotos.find(p => p.id === expandedPhoto);

    // Keyboard navigation
    useEffect(() => {
        if (expandedPhoto === null) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            const currentIndex = mockPhotos.findIndex(p => p.id === expandedPhoto);

            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                // Go to next photo, wrap around to first if at end
                const nextIndex = (currentIndex + 1) % mockPhotos.length;
                setExpandedPhoto(mockPhotos[nextIndex].id);
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                // Go to previous photo, wrap around to last if at beginning
                const prevIndex = currentIndex === 0 ? mockPhotos.length - 1 : currentIndex - 1;
                setExpandedPhoto(mockPhotos[prevIndex].id);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [expandedPhoto]);

    return (
        <div className="p-2">
            <div className="grid grid-cols-2 gap-2">
                {mockPhotos.map((photo) => (
                    <Dialog key={photo.id} open={expandedPhoto === photo.id} onOpenChange={(open) => {
                        if (!open) setExpandedPhoto(null);
                    }}>
                        <DialogTrigger asChild>
                            <div
                                className="aspect-square bg-gray-300 border border-gray-500 overflow-hidden hover:opacity-80 cursor-pointer"
                                onClick={() => setExpandedPhoto(photo.id)}
                            >
                                <img
                                    src={photo.url}
                                    alt={photo.alt}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-6xl max-h-[90vh] bg-win-bg border-2 border-win-bevel-light shadow-win-out p-0">
                            {/* Title Bar */}
                            <div className="flex justify-between items-center p-1 bg-pool-pink border-b-2 border-black">
                                <div className="font-bold text-black px-1">
                                    {selectedPhoto?.alt}
                                </div>
                                <button
                                    onClick={() => setExpandedPhoto(null)}
                                    className="w-5 h-5 flex items-center justify-center bg-win-bg border border-win-bevel-light active:border-win-bevel-dark shadow-win-out active:shadow-win-in"
                                >
                                    <X size={14} color="black" />
                                </button>
                            </div>

                            {/* Content Layout: Main Photo + Thumbnail Grid */}
                            <div className="flex gap-2 p-2 bg-win-bg">
                                {/* Left: Main Photo */}
                                <div className="flex-1 flex items-center justify-center bg-white border-2 border-gray-500">
                                    <img
                                        src={selectedPhoto?.url}
                                        alt={selectedPhoto?.alt}
                                        className="max-w-full max-h-[75vh] object-contain"
                                    />
                                </div>

                                {/* Right: Thumbnail Grid */}
                                <div className="w-48 bg-white border-2 border-gray-500 p-2">
                                    <div className="grid grid-cols-2 gap-2 max-h-[75vh] overflow-y-auto">
                                        {mockPhotos.map((photo) => (
                                            <div
                                                key={photo.id}
                                                className={`aspect-square border-2 cursor-pointer overflow-hidden hover:opacity-80 transition-opacity ${
                                                    expandedPhoto === photo.id
                                                        ? 'border-win-blue border-4'
                                                        : 'border-gray-400'
                                                }`}
                                                onClick={() => setExpandedPhoto(photo.id)}
                                            >
                                                <img
                                                    src={photo.url}
                                                    alt={photo.alt}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                ))}
            </div>
        </div>
    );
};

export default Photos;
