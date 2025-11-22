import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

// Photo data from /public/photos folder
const mockPhotos = [
  { id: 1, url: "/photos/jack_1.jpeg", alt: "Jack & Alex 1" },
  { id: 2, url: "/photos/jack_2.jpeg", alt: "Jack & Alex 2" },
  { id: 3, url: "/photos/jack_3.jpeg", alt: "Jack & Alex 3" },
  { id: 4, url: "/photos/jack_4.jpeg", alt: "Jack & Alex 4" },
  { id: 5, url: "/photos/jack_5.jpeg", alt: "Jack & Alex 5" },
  { id: 6, url: "/photos/jack_6.jpeg", alt: "Jack & Alex 6" },
  { id: 7, url: "/photos/jack_7.jpeg", alt: "Jack & Alex 7" },
  { id: 8, url: "/photos/jack_8.jpeg", alt: "Jack & Alex 8" },
];

const Photos = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mainCarouselApi, setMainCarouselApi] = useState<CarouselApi>();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!mainCarouselApi || selectedPhotoIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        mainCarouselApi.scrollPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        mainCarouselApi.scrollNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mainCarouselApi, selectedPhotoIndex]);

  // Sync carousel index when it changes from swiping/keyboard
  useEffect(() => {
    if (!mainCarouselApi) return;

    const onSelect = () => {
      setSelectedPhotoIndex(mainCarouselApi.selectedScrollSnap());
    };

    mainCarouselApi.on("select", onSelect);
    return () => {
      mainCarouselApi.off("select", onSelect);
    };
  }, [mainCarouselApi]);

  const handlePhotoClick = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const handleThumbnailClick = (index: number) => {
    if (mainCarouselApi) {
      mainCarouselApi.scrollTo(index); // animated scroll for thumbnails
    }
  };

  const selectedPhoto =
    selectedPhotoIndex !== null ? mockPhotos[selectedPhotoIndex] : null;

  return (
    <div className="p-2">
      <div className="grid grid-cols-2 gap-2">
        {mockPhotos.map((photo, index) => (
          <Dialog
            key={photo.id}
            open={selectedPhotoIndex === index}
            onOpenChange={(open) => {
              if (!open) setSelectedPhotoIndex(null);
            }}
          >
            <DialogTrigger asChild>
              <div
                className="aspect-square bg-gray-300 border border-gray-500 overflow-hidden hover:opacity-80 cursor-pointer"
                onClick={() => handlePhotoClick(index)}
              >
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[90vh] bg-win-bg border-2 border-win-bevel-light shadow-win-out p-0 max-md:max-w-full max-md:!h-[90vh] flex flex-col">
              {/* Title Bar */}
              <div className="flex justify-between items-center p-1 bg-pool-pink border-b-2 border-black flex-shrink-0">
                <div className="font-bold text-black px-1">
                  {selectedPhoto?.alt}
                </div>
                <button
                  onClick={() => setSelectedPhotoIndex(null)}
                  className="w-5 h-5 flex items-center justify-center bg-win-bg border border-win-bevel-light active:border-win-bevel-dark shadow-win-out active:shadow-win-in"
                >
                  <X size={14} color="black" />
                </button>
              </div>

              {/* Content Layout */}
              {isMobile ? (
                // Mobile: Vertical layout
                <div className="flex flex-col gap-2 p-2 bg-win-bg flex-1 min-h-0">
                  {/* Main Photo Carousel */}
                  <div className="flex-1 min-h-0 bg-white border-2 border-gray-500 overflow-hidden">
                    <Carousel
                      setApi={setMainCarouselApi}
                      opts={{
                        loop: true,
                        startIndex: selectedPhotoIndex || 0,
                        duration: 30,
                      }}
                      className="h-full flex flex-col"
                      tabIndex={0}
                    >
                      <CarouselContent className="h-full grow flex items-center">
                        {mockPhotos.map((photo) => (
                          <CarouselItem
                            key={photo.id}
                            className="flex items-center justify-center "
                          >
                            <img
                              src={photo.url}
                              alt={photo.alt}
                              className="max-w-full max-h-full object-contain"
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>
                  </div>

                  {/* Thumbnail Carousel */}
                  <div className="h-20 bg-white border-2 border-gray-500 p-1 flex-shrink-0">
                    <Carousel
                      opts={{
                        align: "start",
                        loop: false,
                        dragFree: true,
                      }}
                      className="w-full"
                    >
                      <CarouselContent className="ml-0 gap-1">
                        {mockPhotos.map((photo, index) => (
                          <CarouselItem
                            key={photo.id}
                            className="basis-auto pl-0"
                          >
                            <div
                              className={`w-16 h-16 border-2 cursor-pointer overflow-hidden hover:opacity-80 transition-opacity flex-shrink-0 ${
                                selectedPhotoIndex === index
                                  ? "border-win-blue border-4"
                                  : "border-gray-400"
                              }`}
                              onClick={() => handleThumbnailClick(index)}
                            >
                              <img
                                src={photo.url}
                                alt={photo.alt}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>
                  </div>
                </div>
              ) : (
                // Desktop: Horizontal layout
                <div className="flex gap-2 p-2 bg-win-bg h-[75vh]">
                  {/* Main Photo Carousel */}
                  <div className="flex-1 bg-white border-2 border-gray-500 overflow-hidden flex items-center justify-center">
                    <Carousel
                      setApi={setMainCarouselApi}
                      opts={{
                        loop: true,
                        startIndex: selectedPhotoIndex || 0,
                        align: "center",
                        duration: 30,
                      }}
                      className="h-full w-full flex flex-col"
                      tabIndex={0}
                    >
                      <CarouselContent className="h-full ">
                        {mockPhotos.map((photo) => (
                          <CarouselItem
                            key={photo.id}
                            className="items-center justify-center  flex flex-col"
                          >
                            <img
                              src={photo.url}
                              alt={photo.alt}
                              className="object-contain max-w-full max-h-full"
                              style={{ maxHeight: "calc(75vh - 60px)" }}
                            />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>
                  </div>

                  {/* Thumbnail Grid */}
                  <div className="w-48 bg-white border-2 border-gray-500 p-2 flex-shrink-0 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-2">
                      {mockPhotos.map((photo, index) => (
                        <div
                          key={photo.id}
                          className={`aspect-square border-2 cursor-pointer overflow-hidden hover:opacity-80 transition-opacity ${
                            selectedPhotoIndex === index
                              ? "border-win-blue border-4"
                              : "border-gray-400"
                          }`}
                          onClick={() => handleThumbnailClick(index)}
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
              )}
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default Photos;
