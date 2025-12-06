import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface DockProps {
  children: ReactNode;
}

const Dock = ({ children }: DockProps) => {
  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center pb-4 pointer-events-none z-50 max-md:pb-2">
      <div className="bg-pastel-cream border-2 border-black flex pointer-events-auto shadow-win-out max-md:overflow-x-auto max-md:w-full max-md:max-w-full max-md:justify-center">
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
  showBadge?: boolean;
}

export const DockItem = ({
  title,
  iconSrc,
  icon: IconComponent,
  onClick,
  iconClassName = "w-8 h-8",
  showBadge = false,
}: DockItemProps) => {
  return (
    <div
      className="flex flex-col items-center justify-center w-20 h-20 max-md:w-16 max-md:h-16 cursor-pointer hover:bg-pastel-peach active:bg-pastel-pink border-r-2 border-black last:border-r-0 transition-colors flex-shrink-0 relative"
      onClick={onClick}
    >
      <div
        className={`${iconClassName} max-md:w-6 max-md:h-6 mb-1 flex items-center justify-center relative`}
      >
        {iconSrc ? (
          <img
            src={iconSrc}
            alt={title}
            className="w-full h-full object-contain"
          />
        ) : IconComponent ? (
          <IconComponent size={24} color="black" />
        ) : null}
        {showBadge && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 border-2 border-black rounded-full flex items-center justify-center animate-bounce">
            <span className="text-white text-xs font-bold">!</span>
          </div>
        )}
      </div>
      <span className="text-black text-xs max-md:text-[10px] font-bold font-retro uppercase tracking-wide">
        {title}
      </span>
    </div>
  );
};

export default Dock;
