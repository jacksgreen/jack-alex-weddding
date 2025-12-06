import { ReactNode, useEffect, useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { X } from "lucide-react";

interface RSVPWindowProps {
  id: string;
  title: string;
  children: ReactNode;
  onClose: (id: string) => void;
  isActive: boolean;
  onFocus: () => void;
  initialPosition?: { x: number; y: number };
  width?: number;
  maxHeight?: number;
}

const RSVPWindow = ({
  id,
  title,
  children,
  onClose,
  isActive,
  onFocus,
  initialPosition = { x: 100, y: 100 },
  width = 350,
  maxHeight = 600,
}: RSVPWindowProps) => {
  const dragControls = useDragControls();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <motion.div
      drag={true}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      initial={initialPosition}
      className={`absolute ${isActive ? "z-50" : "z-10"}`}
      onMouseDown={onFocus}
      style={{
        border: "2px solid black",
        borderRadius: "12px",
        backgroundColor: "#faf4c6",
        display: "grid",
        gridTemplateRows: "auto 1fr",
        width: isMobile ? "80vw" : `${width}px`,
        height: "fit-content",
        minHeight: "200px",
        maxHeight: isMobile ? "60vh" : `${maxHeight}px`,
        boxShadow: "none",
        overflow: "hidden",
      }}
    >
      {/* Title Bar */}
      <div
        className="flex justify-between items-start p-1 select-none cursor-move"
        style={{
          touchAction: "none",
          backgroundColor: "#faf4c6",
        }}
        onPointerDown={(e) => {
          e.preventDefault();
          dragControls.start(e);
        }}
      >
        <div className="font-bold px-1 flex items-center gap-3 text-black text-6xl">
          <img
            src="/icons/rsvp.png"
            alt="RSVP"
            className="w-12 h-12 object-contain"
            style={{ imageRendering: "pixelated" }}
          />
          {title}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose(id);
          }}
          className="w-5 h-5 flex items-center justify-center bg-win-bg border border-win-bevel-light active:border-win-bevel-dark shadow-win-out active:shadow-win-in flex-shrink-0"
          style={{ marginTop: "2px" }}
        >
          <X size={14} color="black" />
        </button>
      </div>

      {/* Content Area */}
      <div className="p-1" style={{ minHeight: 0, overflow: "hidden" }}>
        <div
          className="p-2 text-black"
          style={{
            height: "100%",
            overflowY: "auto",
            backgroundColor: "#faf4c6",
            boxShadow: "none",
          }}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default RSVPWindow;

