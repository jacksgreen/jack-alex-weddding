import { useOzMode } from "@/contexts/OzModeContext";
import { motion } from "framer-motion";
import { useState } from "react";

const OzModeToggle = () => {
  const { isOzMode, toggleOzMode } = useOzMode();
  const [isHovered, setIsHovered] = useState(false);
  const ANIMATION_DELAY = 180; // 3 minutes in seconds

  return (
    <motion.button
      onClick={toggleOzMode}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ x: 200, opacity: 0, scale: 0.8 }}
      animate={{
        x: isHovered ? -54 : -20,
        opacity: 1,
        scale: 1,
      }}
      transition={{
        x: isHovered
          ? { duration: 0.3 }
          : {
              delay: ANIMATION_DELAY,
              duration: 0.8,
              type: "spring",
              stiffness: 200,
              damping: 15,
            },
        opacity: {
          delay: ANIMATION_DELAY,
          duration: 0.3,
        },
        scale: {
          delay: ANIMATION_DELAY,
          duration: 0.8,
          type: "spring",
          stiffness: 200,
          damping: 15,
        },
      }}
      className={`
        fixed bottom-[100px] md:bottom-24 right-[-50px]
        z-[100] border-[3px] rounded-lg p-3 font-bold
        ${
          isOzMode
            ? "bg-gray-800 border-gray-600 text-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.7)]"
            : "bg-white border-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
        }
      `}
      title={isOzMode ? "Exit Oz Mode" : "Enter Oz Mode"}
    >
      <img src="/oz.svg" alt="Oz" className="w-10 h-10" />
    </motion.button>
  );
};

export default OzModeToggle;
