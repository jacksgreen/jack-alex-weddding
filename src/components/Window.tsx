import { ReactNode, useEffect, useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { X } from "lucide-react";

interface WindowProps {
  id: string;
  title: string;
  children: ReactNode;
  onClose: (id: string) => void;
  isActive: boolean;
  onFocus: () => void;
  initialPosition?: { x: number; y: number };
}

const Window = ({
  id,
  title,
  children,
  onClose,
  isActive,
  onFocus,
  initialPosition = { x: 100, y: 100 },
}: WindowProps) => {
  const dragControls = useDragControls();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      drag={!isMobile}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      initial={isMobile ? { x: 0, y: 0 } : initialPosition}
      animate={isMobile ? { x: 0, y: 0 } : undefined}
      className={`absolute bg-pool-mint shadow-win-out w-[400px] md:w-[400px] ${
        isActive ? "z-50" : "z-10"
      } max-md:!left-0 max-md:!right-0 max-md:!top-0 max-md:w-full max-md:!h-[calc(100vh-7rem)]`}
      onMouseDown={onFocus}
      style={{
        border: "2px solid",
        borderColor: "#ffffff #808080 #808080 #ffffff",
        display: "grid",
        gridTemplateRows: "auto 1fr",
        height: isMobile ? undefined : "fit-content",
        minHeight: isMobile ? undefined : "200px",
        maxHeight: isMobile ? undefined : "600px",
      }}
    >
      {/* Title Bar */}
      <div
        className={`flex justify-between items-center p-1 bg-pool-pink border-b-2 border-black select-none ${isMobile ? 'cursor-default' : 'cursor-move'}`}
        onPointerDown={(e) => !isMobile && dragControls.start(e)}
      >
        <div className="font-bold text-black px-1 flex items-center gap-2">
          {title}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose(id);
          }}
          className="w-5 h-5 flex items-center justify-center bg-win-bg border border-win-bevel-light active:border-win-bevel-dark shadow-win-out active:shadow-win-in"
        >
          <X size={14} color="black" />
        </button>
      </div>

      {/* Content Area */}
      <div className="p-1" style={{ minHeight: 0, overflow: "hidden" }}>
        <div
          className="bg-white border border-gray-500 shadow-win-in p-2 text-black"
          style={{ height: "100%", overflowY: "auto" }}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default Window;
