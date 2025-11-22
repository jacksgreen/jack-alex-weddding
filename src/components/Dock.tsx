import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface DockProps {
    children: ReactNode;
}

const Dock = ({ children }: DockProps) => {
    return (
        <div className="fixed bottom-0 left-0 w-full flex justify-center pb-4 pointer-events-none z-50">
            <div className="bg-pastel-cream border-2 border-black flex pointer-events-auto shadow-win-out">
                {children}
            </div>
        </div>
    );
};

interface DockItemProps {
    title: string;
    iconSrc?: string;
    icon?: LucideIcon;
    onClick: () => void;
    iconClassName?: string;
}

export const DockItem = ({ title, iconSrc, icon: IconComponent, onClick, iconClassName = "w-8 h-8" }: DockItemProps) => {
    return (
        <div
            className="flex flex-col items-center justify-center w-20 h-20 cursor-pointer hover:bg-pastel-peach active:bg-pastel-pink border-r-2 border-black last:border-r-0 transition-colors"
            onClick={onClick}
        >
            <div className={`${iconClassName} mb-1 flex items-center justify-center`}>
                {iconSrc ? (
                    <img src={iconSrc} alt={title} className="w-full h-full object-contain" />
                ) : IconComponent ? (
                    <IconComponent size={24} color="black" />
                ) : null}
            </div>
            <span className="text-black text-xs font-bold font-retro uppercase tracking-wide">
                {title}
            </span>
        </div>
    );
};

export default Dock;
