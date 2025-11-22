import React, { useState, useEffect } from 'react';
import Desktop from './components/Desktop';
import Window from './components/Window';

import { Heart, Music, Calendar, BookOpen, MapPin, Camera, Info } from 'lucide-react';
import MusicPlayer from './components/apps/MusicPlayer';
import { AboutUs, RSVP, Recommendations, Events, Photos } from './components/apps/WeddingApps';

import Dock, { DockItem } from './components/Dock';

import LoadingScreen from './components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);

  const openWindow = (id, title, component) => {
    if (windows.find((w) => w.id === id)) {
      setActiveWindowId(id);
      return;
    }
    const newWindow = { id, title, component, x: 50 + windows.length * 30, y: 50 + windows.length * 30 };
    setWindows([...windows, newWindow]);
    setActiveWindowId(id);
  };

  const closeWindow = (id) => {
    setWindows(windows.filter((w) => w.id !== id));
    if (activeWindowId === id) {
      setActiveWindowId(windows.length > 1 ? windows[windows.length - 2].id : null);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      // Open About Us window on load after loading screen
      openWindow('about', 'About Us', <AboutUs />);
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
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

      {/* Dock Layer */}
      <Dock>
        <DockItem title="About" iconSrc="/icons/poolsuite/guestbook.png" onClick={() => openWindow('about', 'About Us', <AboutUs />)} />
        <DockItem title="Events" iconSrc="/icons/poolsuite/events.png" onClick={() => openWindow('events', 'Events', <Events />)} />
        <DockItem title="Gems" iconSrc="/icons/poolsuite/vacation.png" onClick={() => openWindow('recs', 'Local Gems', <Recommendations />)} />
        <DockItem title="Photos" iconSrc="/icons/poolsuite/instagram.png" onClick={() => openWindow('photos', 'Gallery', <Photos />)} />
        <DockItem title="RSVP" iconSrc="/icons/poolsuite/newsroom.png" onClick={() => openWindow('rsvp', 'RSVP', <RSVP />)} />
        <DockItem title="PoolFM" iconSrc="/icons/poolsuite/player.png" onClick={() => openWindow('music', 'PoolFM', <MusicPlayer />)} />
      </Dock>
    </Desktop>
  );
}

export default App;
