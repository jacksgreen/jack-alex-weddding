import { useState } from "react";
import { Toaster } from "sonner";
import Desktop from "./components/Desktop";
import Window from "./components/Window";
import RSVPWindow from "./components/RSVPWindow";

import MusicPlayer from "./components/apps/MusicPlayer";
import AboutUs from "./components/apps/AboutUs";
import RSVP from "./components/apps/RSVP";
import Recommendations from "./components/apps/Recommendations";
import Events from "./components/apps/Events";
import Photos from "./components/apps/Photos";

import Dock, { DockItem } from "./components/Dock";

import LoadingScreen from "./components/LoadingScreen";
import { OzModeProvider } from "./contexts/OzModeContext";
import OzModeToggle from "./components/OzModeToggle";

interface WindowState {
  id: string;
  title: string;
  component: React.ReactNode;
  x: number;
  y: number;
  zIndex: number;
}

// Window size configuration for each window type
const getWindowSize = (id: string): { width: number; maxHeight: number } => {
  const sizes: Record<string, { width: number; maxHeight: number }> = {
    about: { width: 400, maxHeight: 600 },
    rsvp: { width: 350, maxHeight: 600 },
    events: { width: 400, maxHeight: 600 },
    photos: { width: 400, maxHeight: 600 },
    music: { width: 400, maxHeight: 600 },
    recs: { width: 360, maxHeight: 500 },
  };
  return sizes[id] || { width: 400, maxHeight: 600 };
};

// Helper to generate initial windows
const getInitialWindows = (): WindowState[] => {
  const aboutX = 0;
  const aboutY = 30;

  return [
    {
      id: "about",
      title: "About Us",
      component: <AboutUs />,
      x: aboutX,
      y: aboutY,
      zIndex: 1,
    },
  ];
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [windows, setWindows] = useState<WindowState[]>(getInitialWindows);
  const [activeWindowId, setActiveWindowId] = useState<string | null>("about");
  const [nextZIndex, setNextZIndex] = useState(2);

  const openWindow = (
    id: string,
    title: string,
    component: React.ReactNode,
    customPosition?: { x: number; y: number }
  ) => {
    if (windows.find((w) => w.id === id)) {
      setActiveWindowId(id);
      return;
    }

    let position;
    if (customPosition) {
      position = customPosition;
    } else {
      // Random position within a safe area, ensuring windows stay in top portion
      // to avoid overlapping with dock at bottom
      const maxX = window.innerWidth * 0.4;
      const minX = window.innerWidth * 0.05;

      // Keep all windows in the top 30% of the viewport to avoid dock
      const minY = window.innerHeight * 0.05;
      const maxY = window.innerHeight * 0.3;

      position = {
        x: minX + Math.random() * (maxX - minX),
        y: minY + Math.random() * (maxY - minY),
      };
    }

    const newWindow = {
      id,
      title,
      component,
      ...position,
      zIndex: nextZIndex,
    };
    setWindows([...windows, newWindow]);
    setActiveWindowId(id);
    setNextZIndex(nextZIndex + 1);
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter((w) => w.id !== id));
    if (activeWindowId === id) {
      setActiveWindowId(
        windows.length > 1 ? windows[windows.length - 2].id : null
      );
    }
  };

  const focusWindow = (id: string) => {
    setActiveWindowId(id);
    // Update z-index to bring this window to front
    setWindows((prevWindows) =>
      prevWindows.map((win) =>
        win.id === id ? { ...win, zIndex: nextZIndex } : win
      )
    );
    setNextZIndex(nextZIndex + 1);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <OzModeProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#fff0f3",
            border: "2px solid black",
            borderRadius: "12px",
            boxShadow: "6px 6px 0px rgba(0, 0, 0, 0.15)",
            fontFamily: "VT323, monospace",
            fontSize: "18px",
            padding: "16px",
          },
          className: "poolsuite-toast",
        }}
      />
      <Desktop>
        {/* Windows Layer */}
        {windows.map((win) => {
          const { width, maxHeight } = getWindowSize(win.id);
          if (win.id === "rsvp") {
            return (
              <RSVPWindow
                key={win.id}
                id={win.id}
                title={win.title}
                onClose={closeWindow}
                onFocus={() => focusWindow(win.id)}
                initialPosition={{ x: win.x, y: win.y }}
                width={width}
                maxHeight={maxHeight}
                zIndex={win.zIndex}
              >
                {win.component}
              </RSVPWindow>
            );
          }
          return (
            <Window
              key={win.id}
              id={win.id}
              title={win.title}
              onClose={closeWindow}
              onFocus={() => focusWindow(win.id)}
              initialPosition={{ x: win.x, y: win.y }}
              width={width}
              maxHeight={maxHeight}
              zIndex={win.zIndex}
            >
              {win.component}
            </Window>
          );
        })}
      </Desktop>

      {/* Oz Mode Toggle Button - Outside Desktop to avoid dark filter */}
      <OzModeToggle />

      {/* Dock Layer - Outside Desktop to avoid dark filter */}
      <Dock>
        <DockItem
          title="About"
          iconSrc="/icons/about.png"
          iconClassName="w-12 h-12"
          onClick={() => {
            const x = 50 + Math.random() * 100;
            const y = 50 + Math.random() * 100;
            openWindow("about", "About Us", <AboutUs />, { x, y });
          }}
        />
        <DockItem
          title="Events"
          iconSrc="/icons/events.png"
          onClick={() => openWindow("events", "Events", <Events />)}
        />
        <DockItem
          title="Recs"
          iconSrc="/icons/recs.png"
          onClick={() => openWindow("recs", "Local Gems", <Recommendations />)}
        />
        <DockItem
          title="Insta"
          iconSrc="/icons/photos.png"
          onClick={() => openWindow("photos", "Insta", <Photos />)}
        />
        <DockItem
          title="RSVP"
          iconSrc="/icons/rsvp.png"
          onClick={() => openWindow("rsvp", "RSVP", <RSVP />)}
          showBadge={true}
        />
        <DockItem
          title="Player"
          iconSrc="/icons/mixtapes.png"
          onClick={() => openWindow("music", "Player", <MusicPlayer />)}
        />
      </Dock>
    </OzModeProvider>
  );
}

export default App;
