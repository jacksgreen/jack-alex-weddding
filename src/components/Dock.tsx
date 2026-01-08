import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface DockProps {
  children: ReactNode;
}

const Dock = ({ children }: DockProps) => {
  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center pb-4 pointer-events-none z-50 max-md:pb-2">
      <div
        className="bg-pastel-cream border-2 border-[#2b2b2b] rounded-[10px] flex pointer-events-auto max-md:overflow-x-auto max-md:w-full max-md:max-w-full max-md:justify-center overflow-hidden"
        style={{
          boxShadow: '0 2px 0 rgba(0,0,0,.35), 0 8px 24px rgba(0,0,0,.15)',
        }}
      >
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
      className="flex flex-col items-center justify-center w-20 h-20 max-md:w-16 max-md:h-16 cursor-pointer transition-all flex-shrink-0 relative group border-r border-[#2b2b2b] last:border-r-0"
      style={{
        background: '#f8f2ea',
        boxShadow: 'inset 2px 2px 0 rgba(255,255,255,.9), inset -2px -2px 0 rgba(0,0,0,.25), 0 2px 0 rgba(0,0,0,.15)',
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#ffe8d6';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '#f8f2ea';
      }}
      onMouseDown={(e) => {
        // Pressed/sunken state - invert the bevel
        e.currentTarget.style.boxShadow = 'inset -2px -2px 0 rgba(255,255,255,.9), inset 2px 2px 0 rgba(0,0,0,.25)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.boxShadow = 'inset 2px 2px 0 rgba(255,255,255,.9), inset -2px -2px 0 rgba(0,0,0,.25), 0 2px 0 rgba(0,0,0,.15)';
      }}
    >
      {/* Highlight line for divider bevel effect */}
      <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/70 first:hidden" />

      <div
        className={`${iconClassName} max-md:w-6 max-md:h-6 mb-1 flex items-center justify-center relative`}
      >
        {iconSrc ? (
          <img
            src={iconSrc}
            alt={title}
            className="w-full h-full object-contain"
            style={{ imageRendering: 'pixelated' }}
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
      <span className="text-black text-xs max-md:text-xs font-bold font-retro tracking-wide">
        {title}
      </span>
    </div>
  );
};

export default Dock;
