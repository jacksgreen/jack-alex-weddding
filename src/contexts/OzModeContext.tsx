import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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

  const toggleOzMode = () => {
    setIsOzMode((prev) => !prev);
  };

  // Toggle dark mode class on document element
  useEffect(() => {
    if (isOzMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isOzMode]);

  const incrementClickCount = () => {
    setClickCount((prev) => {
      const newCount = prev + 1;
      if (newCount === 3) {
        toggleOzMode();
        setTimeout(() => setClickCount(0), 1000);
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
