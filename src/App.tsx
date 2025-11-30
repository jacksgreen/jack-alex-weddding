import { useState } from "react";
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

// Helper to generate initial windows
const getInitialWindows = (): WindowState[] => {
  const aboutX = 50 + Math.random() * 80;
  const aboutY = 50 + Math.random() * 80;
  const rsvpX = aboutX + 450;
  const rsvpY = aboutY + 200 + (Math.random() * 60 - 30);

  return [
    {
      id: "rsvp",
      title: "RSVP",
      component: <RSVP />,
      x: rsvpX,
      y: rsvpY,
    },
    {
      id: "about",
      title: "About Us",
      component: <AboutUs />,
      x: aboutX,
      y: aboutY,
    },
  ];
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [windows, setWindows] = useState<WindowState[]>(getInitialWindows);
  const [activeWindowId, setActiveWindowId] = useState<string | null>("about");

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
      // Random position within a safe area (5% to 45% of viewport)
      const maxX = window.innerWidth * 0.4;
      const maxY = window.innerHeight * 0.4;
      const minX = window.innerWidth * 0.05;
      const minY = window.innerHeight * 0.05;
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
