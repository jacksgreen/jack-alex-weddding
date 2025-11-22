import { useState } from 'react';
import { X } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from '@/components/ui/dialog';

// Mock photo data - replace these URLs with real photos later
const mockPhotos = [
    { id: 1, url: 'https://placehold.co/600x600/FF6B9D/white?text=Photo+1', alt: 'Photo 1' },
    { id: 2, url: 'https://placehold.co/600x600/C44569/white?text=Photo+2', alt: 'Photo 2' },
    { id: 3, url: 'https://placehold.co/600x600/FFC7C7/white?text=Photo+3', alt: 'Photo 3' },
    { id: 4, url: 'https://placehold.co/600x600/8FCACA/white?text=Photo+4', alt: 'Photo 4' },
    { id: 5, url: 'https://placehold.co/600x600/FFE5B4/white?text=Photo+5', alt: 'Photo 5' },
    { id: 6, url: 'https://placehold.co/600x600/B4E7CE/white?text=Photo+6', alt: 'Photo 6' },
    { id: 7, url: 'https://placehold.co/600x600/A8E6CF/white?text=Photo+7', alt: 'Photo 7' },
    { id: 8, url: 'https://placehold.co/600x600/FFD3B6/white?text=Photo+8', alt: 'Photo 8' },
    { id: 9, url: 'https://placehold.co/600x600/FFAAA5/white?text=Photo+9', alt: 'Photo 9' },
    { id: 10, url: 'https://placehold.co/600x600/FF8B94/white?text=Photo+10', alt: 'Photo 10' },
    { id: 11, url: 'https://placehold.co/600x600/A2D5F2/white?text=Photo+11', alt: 'Photo 11' },
    { id: 12, url: 'https://placehold.co/600x600/BDB2FF/white?text=Photo+12', alt: 'Photo 12' },
    { id: 13, url: 'https://placehold.co/600x600/FFC6FF/white?text=Photo+13', alt: 'Photo 13' },
    { id: 14, url: 'https://placehold.co/600x600/E7C6FF/white?text=Photo+14', alt: 'Photo 14' },
    { id: 15, url: 'https://placehold.co/600x600/C7CEEA/white?text=Photo+15', alt: 'Photo 15' },
    { id: 16, url: 'https://placehold.co/600x600/FFDFD3/white?text=Photo+16', alt: 'Photo 16' },
    { id: 17, url: 'https://placehold.co/600x600/FEC8D8/white?text=Photo+17', alt: 'Photo 17' },
    { id: 18, url: 'https://placehold.co/600x600/D4F1F4/white?text=Photo+18', alt: 'Photo 18' },
    { id: 19, url: 'https://placehold.co/600x600/B5EAD7/white?text=Photo+19', alt: 'Photo 19' },
    { id: 20, url: 'https://placehold.co/600x600/C7CEEA/white?text=Photo+20', alt: 'Photo 20' },
];

const Photos = () => {
    const [expandedPhoto, setExpandedPhoto] = useState<number | null>(null);
    const selectedPhoto = mockPhotos.find(p => p.id === expandedPhoto);

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
                        <DialogContent className="max-w-4xl max-h-[90vh] bg-win-bg border-2 border-win-bevel-light shadow-win-out p-0">
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

                            {/* Photo Content */}
                            <div className="p-2 bg-win-bg">
                                <img
                                    src={selectedPhoto?.url}
                                    alt={selectedPhoto?.alt}
                                    className="max-w-full max-h-[80vh] object-contain border-2 border-gray-500"
                                />
                            </div>
                        </DialogContent>
                    </Dialog>
                ))}
            </div>
        </div>
    );
};

export default Photos;
