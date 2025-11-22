import { ReactNode } from "react";
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

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      initial={initialPosition}
      className={`absolute bg-pool-mint shadow-win-out w-[400px] ${
        isActive ? "z-50" : "z-10"
      }`}
      onMouseDown={onFocus}
      style={{
        border: "2px solid",
        borderColor: "#ffffff #808080 #808080 #ffffff",
        display: "grid",
        gridTemplateRows: "auto 1fr",
        height: "fit-content",
        minHeight: "200px",
        maxHeight: "600px",
      }}
    >
      {/* Title Bar */}
      <div
        className="flex justify-between items-center p-1 bg-pool-pink border-b-2 border-black cursor-move select-none"
        onPointerDown={(e) => dragControls.start(e)}
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
