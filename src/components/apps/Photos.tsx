import { useState } from "react";
import {
  X,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import { photosFeed } from "./photosFeed";
import { useOzMode } from "@/contexts/OzModeContext";

const Photos = () => {
  const { incrementClickCount, isOzMode } = useOzMode();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null
  );
  const [liked, setLiked] = useState<boolean[]>(
    new Array(photosFeed.length).fill(false)
  );

  const handlePhotoClick = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const handleLike = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newLiked = [...liked];
    newLiked[index] = !newLiked[index];
    setLiked(newLiked);
  };

  const selectedPhoto =
    selectedPhotoIndex !== null ? photosFeed[selectedPhotoIndex] : null;

  return (
    <div
      className={`h-full overflow-y-auto px-6 pt-2 ${
        isOzMode ? "bg-black" : "bg-white"
      }`}
    >
      {photosFeed.map((photo, index) => (
        <div
          key={photo.id}
          className={`border-[3px] rounded-[12px] mb-8 overflow-hidden ${
            isOzMode
              ? "bg-gray-900 border-gray-700 shadow-[6px_6px_0px_0px_rgba(50,50,50,1)]"
              : "bg-white border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          }`}
        >
          {/* Post Header */}
          <div
            className={`flex items-center justify-between px-4 py-3 ${
              isOzMode ? "bg-gray-900" : "bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Profile Picture - Click 3 times for Oz Mode */}
              <button
                onClick={incrementClickCount}
                className={`w-11 h-11 rounded-full border-[3px] overflow-hidden cursor-pointer transition-colors ${
                  isOzMode
                    ? "border-gray-600 bg-gray-800 hover:border-gray-500"
                    : "border-black bg-white hover:border-[#FFB7B2]"
                }`}
              >
                <img
                  src="/oz.svg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </button>
              {/* Username */}
              <div
                className={`font-bold text-base ${
                  isOzMode ? "text-gray-100" : "text-black"
                }`}
              >
                Oz the dog
              </div>
            </div>
            <button
              className={`p-1 rounded ${
                isOzMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
              }`}
            >
              <MoreHorizontal
                size={24}
                strokeWidth={2.5}
                className={isOzMode ? "text-gray-300" : "text-black"}
              />
            </button>
          </div>

          {/* Photo */}
          <div
            className={`aspect-square cursor-pointer relative overflow-hidden border-t-[3px] border-b-[3px] ${
              isOzMode
                ? "bg-gray-800 border-gray-700"
                : "bg-gray-200 border-black"
            }`}
            onClick={() => handlePhotoClick(index)}
          >
            <img
              src={photo.url}
              alt={photo.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Action Buttons */}
          <div
            className={`flex items-center justify-between px-4 py-3 ${
              isOzMode ? "bg-gray-900" : "bg-white"
            }`}
          >
            <div className="flex items-center gap-4">
              <button
                onClick={(e) => handleLike(index, e)}
                className="hover:opacity-70 transition-opacity"
              >
                <Heart
                  size={28}
                  strokeWidth={2.5}
                  className={`${
                    liked[index]
                      ? "fill-red-500 stroke-red-500"
                      : isOzMode
                      ? "stroke-gray-300"
                      : "stroke-black"
                  }`}
                />
              </button>
              <button className="hover:opacity-70 transition-opacity">
                <MessageCircle
                  size={28}
                  strokeWidth={2.5}
                  className={isOzMode ? "stroke-gray-300" : "stroke-black"}
                />
              </button>
              <button className="hover:opacity-70 transition-opacity">
                <Send
                  size={28}
                  strokeWidth={2.5}
                  className={isOzMode ? "stroke-gray-300" : "stroke-black"}
                />
              </button>
            </div>
            <button className="hover:opacity-70 transition-opacity">
              <Bookmark
                size={28}
                strokeWidth={2.5}
                className={isOzMode ? "stroke-gray-300" : "stroke-black"}
              />
            </button>
          </div>

          {/* Likes and Caption */}
          <div className={`px-4 pb-4 ${isOzMode ? "bg-gray-900" : "bg-white"}`}>
            <div className="flex items-center gap-2 mb-2">
              <Heart
                size={16}
                className={
                  isOzMode
                    ? "fill-gray-300 stroke-gray-300"
                    : "fill-black stroke-black"
                }
              />
              <div
                className={`font-bold text-sm ${
                  isOzMode ? "text-gray-300" : "text-black"
                }`}
              >
                {liked[index]
                  ? `${(parseInt(photo.likes) + 1).toLocaleString()} likes`
                  : `${parseInt(photo.likes).toLocaleString()} likes`}
              </div>
              <MessageCircle
                size={16}
                className={`ml-2 ${
                  isOzMode
                    ? "fill-gray-300 stroke-gray-300"
                    : "fill-black stroke-black"
                }`}
              />
              <div
                className={`font-bold text-sm ${
                  isOzMode ? "text-gray-300" : "text-black"
                }`}
              >
                {parseInt(photo.comments).toLocaleString()} comments
              </div>
            </div>
            <div
              className={`text-sm leading-relaxed mb-2 ${
                isOzMode ? "text-gray-200" : "text-black"
              }`}
            >
              <span className="font-black">oz_the_dog</span>{" "}
              <span className="font-extralight">{photo.caption}</span>
            </div>
            <div className="text-xs text-gray-500 uppercase">
              {photo.timestamp}
            </div>
          </div>
        </div>
      ))}

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] bg-white border-[6px] border-black rounded-xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-4 right-4 bg-white border-2 border-black rounded p-2 hover:bg-gray-100 z-10"
            >
              <X size={24} className="text-black" />
            </button>
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.alt}
              className="w-full h-full object-contain max-h-[85vh]"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Photos;
