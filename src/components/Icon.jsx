import React from 'react';

const Icon = ({ title, icon: IconComponent, iconSrc, onOpen }) => {
    return (
        <div
            className="flex flex-col items-center justify-center w-20 h-20 m-4 cursor-pointer group"
            onClick={onOpen}
        >
            <div className="w-12 h-12 mb-1 flex items-center justify-center">
                {/* Retro icon style */}
                {iconSrc ? (
                    <img src={iconSrc} alt={title} className="w-full h-full object-contain drop-shadow-md" />
                ) : (
                    <div className="w-full h-full bg-white border-2 border-black flex items-center justify-center shadow-md group-hover:brightness-110">
                        {IconComponent && <IconComponent size={32} color="black" />}
                    </div>
                )}
            </div>
            <span className="text-black bg-white px-1 text-sm font-bold shadow-sm border border-black group-hover:bg-win-blue group-hover:text-white">
                {title}
            </span>
        </div>
    );
};

export default Icon;
