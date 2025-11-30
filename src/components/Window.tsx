import { ReactNode, useEffect, useState } from "react";
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
  const { isOzMode } = useOzMode();
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
      onDrag={(_e, info) => {
        console.log(info.point.x, info.point.y);
      }}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      initial={initialPosition}
      className={`absolute shadow-win-out ${isActive ? "z-50" : "z-10"} ${
        isOzMode ? "bg-gray-800" : "bg-pool-mint"
      }`}
      onMouseDown={onFocus}
      style={{
        border: "2px solid",
        display: "grid",
        gridTemplateRows: "auto 1fr",
        width: isMobile ? "80vw" : "400px",
        height: "fit-content",
        minHeight: "200px",
        maxHeight: isMobile ? "60vh" : "600px",
      }}
    >
      {/* Title Bar */}
      <div
        className={`flex justify-between items-center p-1 border-b-2 select-none cursor-move ${
          isOzMode ? "bg-gray-700 border-gray-900" : "bg-pool-pink border-black"
        }`}
        onPointerDown={(e) => dragControls.start(e)}
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
    </motion.div>
  );
};

export default Window;
