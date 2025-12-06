import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from "react";
import { toast } from "sonner";

interface OzModeContextType {
  isOzMode: boolean;
  toggleOzMode: () => void;
  clickCount: number;
  incrementClickCount: () => void;
}

const OzModeContext = createContext<OzModeContextType | undefined>(undefined);

export const OzModeProvider = ({ children }: { children: ReactNode }) => {
  const [isOzMode, setIsOzMode] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const isTogglingRef = useRef(false);

  const toggleOzMode = () => {
    setIsOzMode((prev) => {
      const newMode = !prev;

      // Show toast notification when entering Oz mode
      if (newMode) {
        toast("🐾 Woof! You're seeing through MY eyes now!", {
          description:
            "This is how Oz (the dog) sees the world. Click my icon to switch back to boring human vision.",
          duration: 5000,
        });
      } else {
        toast("👋 Back to Human Mode", {
          description:
            "You've left Oz's perspective. Click the puppy icon to see through doggy eyes again!",
          duration: 3000,
        });
      }

      return newMode;
    });
  };

  // Toggle dark mode class on document element
  useEffect(() => {
    if (isOzMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isOzMode]);

  const incrementClickCount = () => {
    setClickCount((prev) => {
      const newCount = prev + 1;
      if (newCount === 3 && !isTogglingRef.current) {
        isTogglingRef.current = true;
        toggleOzMode();
        setTimeout(() => {
          setClickCount(0);
          isTogglingRef.current = false;
        }, 1000);
      }
      return newCount;
    });
  };

  return (
    <OzModeContext.Provider
      value={{ isOzMode, toggleOzMode, clickCount, incrementClickCount }}
    >
      {children}
    </OzModeContext.Provider>
  );
};

export const useOzMode = () => {
  const context = useContext(OzModeContext);
  if (context === undefined) {
    throw new Error("useOzMode must be used within an OzModeProvider");
  }
  return context;
};
