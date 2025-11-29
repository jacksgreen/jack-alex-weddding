import { useState, useEffect } from "react";
import Desktop from "./components/Desktop";
import Window from "./components/Window";

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
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);

  const openWindow = (
    id: string,
    title: string,
    component: React.ReactNode
  ) => {
    if (windows.find((w) => w.id === id)) {
      setActiveWindowId(id);
      return;
    }
    // Random position within a safe area (20% to 60% of viewport)
    const maxX = window.innerWidth * 0.4;
    const maxY = window.innerHeight * 0.4;
    const minX = window.innerWidth * 0.05;
    const minY = window.innerHeight * 0.05;

    const newWindow = {
      id,
      title,
      component,
      x: minX + Math.random() * (maxX - minX),
      y: minY + Math.random() * (maxY - minY),
    };
    setWindows([...windows, newWindow]);
    setActiveWindowId(id);
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
  };

  useEffect(() => {
    if (!isLoading) {
      // Open About Us window on load after loading screen
      openWindow("about", "About Us", <AboutUs />);
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <OzModeProvider>
      <Desktop>
        {/* Windows Layer */}
        {windows.map((win) => (
          <Window
            key={win.id}
            id={win.id}
            title={win.title}
            onClose={closeWindow}
            isActive={activeWindowId === win.id}
            onFocus={() => focusWindow(win.id)}
            initialPosition={{ x: win.x, y: win.y }}
          >
            {win.component}
          </Window>
        ))}
      </Desktop>

      {/* Oz Mode Toggle Button - Outside Desktop to avoid dark filter */}
      <OzModeToggle />

      {/* Dock Layer - Outside Desktop to avoid dark filter */}
      <Dock>
        <DockItem
          title="About"
          iconSrc="/icons/about.png"
          iconClassName="w-12 h-12"
          onClick={() => openWindow("about", "About Us", <AboutUs />)}
        />
        <DockItem
          title="Events"
          iconSrc="/icons/events.png"
          onClick={() => openWindow("events", "Events", <Events />)}
        />
        <DockItem
          title="Recs"
          iconSrc="/icons/recs.png"
          onClick={() =>
            openWindow("recs", "Local Gems", <Recommendations />)
          }
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
        />
        <DockItem
          title="PoolFM"
          iconSrc="/icons/mixtapes.png"
          onClick={() => openWindow("music", "PoolFM", <MusicPlayer />)}
        />
      </Dock>
    </OzModeProvider>
  );
}

export default App;
