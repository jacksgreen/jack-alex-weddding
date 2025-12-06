import { ReactNode, useEffect, useState, useRef } from "react";
import { motion, useDragControls } from "framer-motion";
import { X } from "lucide-react";

interface RSVPWindowProps {
  id: string;
  title: string;
  children: ReactNode;
  onClose: (id: string) => void;
  onFocus: () => void;
  initialPosition?: { x: number; y: number };
  width?: number;
  maxHeight?: number;
  zIndex?: number;
}

const RSVPWindow = ({
  id,
  title,
  children,
  onClose,
  onFocus,
  initialPosition = { x: 100, y: 100 },
  width = 350,
  maxHeight = 600,
  zIndex = 10,
}: RSVPWindowProps) => {
  const dragControls = useDragControls();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [windowSize, setWindowSize] = useState({ width, height: maxHeight });
  const [isDraggable, setIsDraggable] = useState(true);
  const windowRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleResizeStart = (e: React.PointerEvent, direction: string) => {
    e.stopPropagation();
    e.preventDefault();
    isResizing.current = true;
    setIsDraggable(false);

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = windowSize.width;
    const startHeight = windowSize.height;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      if (!isResizing.current) return;

      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;

      if (direction.includes("e")) {
        newWidth = Math.max(300, startWidth + deltaX);
      }
      if (direction.includes("w")) {
        newWidth = Math.max(300, startWidth - deltaX);
      }
      if (direction.includes("s")) {
        newHeight = Math.max(200, startHeight + deltaY);
      }
      if (direction.includes("n")) {
        newHeight = Math.max(200, startHeight - deltaY);
      }

      setWindowSize({ width: newWidth, height: newHeight });
    };

    const handlePointerUp = () => {
      isResizing.current = false;
      setIsDraggable(true);
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    };

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
  };

  return (
    <motion.div
      ref={windowRef}
      drag={isDraggable}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      initial={initialPosition}
      className="absolute"
      onMouseDown={onFocus}
      style={{
        zIndex,
        border: "2px solid black",
        borderRadius: "12px",
        backgroundColor: "#faf4c6",
        display: "grid",
        gridTemplateRows: "auto 1fr",
        width: isMobile ? "80vw" : `${windowSize.width}px`,
        height: isMobile ? "fit-content" : `${windowSize.height}px`,
        minHeight: "200px",
        maxHeight: isMobile ? "60vh" : "none",
        boxShadow: "6px 6px 0px rgba(0, 0, 0, 0.15)",
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
          onFocus();
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

      {/* Resize Handles - Desktop Only */}
      {!isMobile && (
        <>
          <div
            onPointerDown={(e) => handleResizeStart(e, "se")}
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-10"
            style={{ touchAction: "none" }}
          />
          <div
            onPointerDown={(e) => handleResizeStart(e, "sw")}
            className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize z-10"
            style={{ touchAction: "none" }}
          />
          <div
            onPointerDown={(e) => handleResizeStart(e, "ne")}
            className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize z-10"
            style={{ touchAction: "none" }}
          />
          <div
            onPointerDown={(e) => handleResizeStart(e, "nw")}
            className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize z-10"
            style={{ touchAction: "none" }}
          />
        </>
      )}
    </motion.div>
  );
};

export default RSVPWindow;
