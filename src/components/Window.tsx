import { ReactNode, useEffect, useState, useRef } from "react";
import { motion, useDragControls } from "framer-motion";
import { X } from "lucide-react";
import { useOzMode } from "@/contexts/OzModeContext";

interface WindowProps {
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

const Window = ({
  id,
  title,
  children,
  onClose,
  isActive,
  onFocus,
  initialPosition = { x: 100, y: 100 },
  width = 400,
  maxHeight = 600,
}: WindowProps) => {
  const { isOzMode } = useOzMode();
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

      if (direction.includes('e')) {
        newWidth = Math.max(300, startWidth + deltaX);
      }
      if (direction.includes('w')) {
        newWidth = Math.max(300, startWidth - deltaX);
      }
      if (direction.includes('s')) {
        newHeight = Math.max(200, startHeight + deltaY);
      }
      if (direction.includes('n')) {
        newHeight = Math.max(200, startHeight - deltaY);
      }

      setWindowSize({ width: newWidth, height: newHeight });
    };

    const handlePointerUp = () => {
      isResizing.current = false;
      setIsDraggable(true);
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
  };

  return (
    <motion.div
      ref={windowRef}
      drag={isDraggable}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      initial={initialPosition}
      className={`absolute ${isActive ? "z-50" : "z-10"} ${
        isOzMode ? "bg-gray-800" : "bg-pool-mint"
      }`}
      onMouseDown={onFocus}
      style={{
        border: "2px solid black",
        borderRadius: "12px",
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
        className={`flex justify-between items-center p-1 border-b-2 select-none cursor-move ${
          isOzMode ? "bg-gray-700 border-gray-900" : "bg-pool-pink border-black"
        }`}
        style={{ touchAction: "none" }}
        onPointerDown={(e) => {
          e.preventDefault();
          onFocus();
          dragControls.start(e);
        }}
      >
        <div
          className={`font-bold px-1 flex items-center gap-2 ${
            isOzMode ? "text-gray-100" : "text-black"
          }`}
        >
          {isOzMode && (
            <span className="text-base brightness-150 contrast-125">🐾</span>
          )}
          {title}
          {isOzMode && (
            <span className="text-base brightness-150 contrast-125">🐾</span>
          )}
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
          className={`border shadow-win-in p-2 ${
            isOzMode
              ? "bg-gray-900 border-gray-700 text-gray-100"
              : "bg-white border-gray-500 text-black"
          }`}
          style={{ height: "100%", overflowY: "auto" }}
        >
          {children}
        </div>
      </div>

      {/* Resize Handles - Only Corners */}
      {!isMobile && (
        <>
          <div
            onPointerDown={(e) => handleResizeStart(e, 'se')}
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-10"
            style={{ touchAction: 'none' }}
          />
          <div
            onPointerDown={(e) => handleResizeStart(e, 'sw')}
            className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize z-10"
            style={{ touchAction: 'none' }}
          />
          <div
            onPointerDown={(e) => handleResizeStart(e, 'ne')}
            className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize z-10"
            style={{ touchAction: 'none' }}
          />
          <div
            onPointerDown={(e) => handleResizeStart(e, 'nw')}
            className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize z-10"
            style={{ touchAction: 'none' }}
          />
        </>
      )}
    </motion.div>
  );
};

export default Window;
