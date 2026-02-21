import { useState, useEffect, useRef, FormEvent } from "react";
import { Play, Pause, SkipForward, SkipBack, Send } from "lucide-react";
import { useOzMode } from "@/contexts/OzModeContext";

const SOUND_CLOUD_PLAYLIST_URL =
  "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A2150567474&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true";

const MusicPlayer = () => {
  const { isOzMode } = useOzMode();
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackTitle, setTrackTitle] = useState("READY");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nameInput, setNameInput] = useState("");
  const [songInput, setSongInput] = useState("");
  const [songStatus, setSongStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    // Load SoundCloud Widget API
    const script = document.createElement("script");
    script.src = "https://w.soundcloud.com/player/api.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (iframeRef.current && (window as any).SC) {
        const widget = (window as any).SC.Widget(iframeRef.current);
        widgetRef.current = widget;

        // Listen to play/pause events
        widget.bind((window as any).SC.Widget.Events.PLAY, () => {
          setIsPlaying(true);
        });

        widget.bind((window as any).SC.Widget.Events.PAUSE, () => {
          setIsPlaying(false);
        });

        widget.bind((window as any).SC.Widget.Events.FINISH, () => {
          setIsPlaying(false);
        });

        // Listen to loading state changes
        widget.bind((window as any).SC.Widget.Events.LOAD_PROGRESS, () => {
          setIsLoading(true);
        });

        // Get current track info
        widget.bind((window as any).SC.Widget.Events.READY, () => {
          setIsLoading(false);
          widget.getCurrentSound((sound: any) => {
            if (sound) {
              setTrackTitle(sound.title);
            }
          });
        });

        widget.bind(
          (window as any).SC.Widget.Events.PLAY_PROGRESS,
          (event: any) => {
            setIsLoading(false);
            widget.getCurrentSound((sound: any) => {
              if (sound) {
                setTrackTitle(sound.title);
                setDuration(sound.duration);
              }
            });
            setCurrentTime(event.currentPosition);
          }
        );
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Enhanced CRT/VHS Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let resizeObserver: ResizeObserver;
    let scanlineOffset = 0;

    const drawNoise = () => {
      const w = canvas.width;
      const h = canvas.height;

      if (w === 0 || h === 0) return;

      // Clear canvas
      ctx.clearRect(0, 0, w, h);

      // Dynamic noise intensity based on playing state
      const noiseIntensity = isPlaying ? 0.15 : 0.08;
      const idata = ctx.createImageData(w, h);
      const buffer32 = new Uint32Array(idata.data.buffer);
      const len = buffer32.length;

      for (let i = 0; i < len; i++) {
        if (Math.random() < noiseIntensity) {
          // Brighter noise with more white for visibility
          const intensity = Math.random();
          const r = Math.floor(intensity * (isPlaying ? 220 : 150));
          const g = Math.floor(intensity * 255);
          const b = Math.floor(intensity * (isPlaying ? 220 : 180));
          const a = Math.floor(intensity * (isPlaying ? 180 : 80));
          buffer32[i] = (a << 24) | (b << 16) | (g << 8) | r;
        }
      }

      ctx.putImageData(idata, 0, 0);

      // Animated scanlines - slower movement
      scanlineOffset = (scanlineOffset + 0.3) % 6;
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      for (let i = Math.floor(scanlineOffset); i < h; i += 3) {
        ctx.fillRect(0, i, w, 1);
      }

      // Random glitch lines when playing - brighter and less frequent
      if (isPlaying && Math.random() < 0.02) {
        const glitchY = Math.floor(Math.random() * h);
        ctx.fillStyle = `rgba(200, 255, 220, ${Math.random() * 0.5 + 0.3})`;
        ctx.fillRect(0, glitchY, w, 2);
      }

      // Vignette effect
      const gradient = ctx.createRadialGradient(
        w / 2,
        h / 2,
        0,
        w / 2,
        h / 2,
        Math.max(w, h) * 0.7
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.4)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      animationFrameId = requestAnimationFrame(drawNoise);
    };

    const init = () => {
      if (canvas.parentElement) {
        resizeObserver = new ResizeObserver((entries) => {
          for (const entry of entries) {
            canvas.width = entry.contentRect.width;
            canvas.height = entry.contentRect.height;
          }
        });
        resizeObserver.observe(canvas.parentElement);

        // Force initial size
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
      drawNoise();
    };

    init();

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying]);

  const togglePlayPause = () => {
    if (widgetRef.current) {
      if (isPlaying) {
        widgetRef.current.pause();
      } else {
        widgetRef.current.play();
        // On mobile, sometimes play fails and needs a retry
        setTimeout(() => {
          if (widgetRef.current && !isPlaying) {
            widgetRef.current.play();
          }
        }, 100);
      }
    }
  };

  const skipForward = () => {
    if (widgetRef.current) {
      setIsLoading(true);
      setCurrentTime(0);
      setDuration(0);
      widgetRef.current.next();
      // Seek to beginning after a short delay to ensure track has loaded
      setTimeout(() => {
        if (widgetRef.current) {
          widgetRef.current.seekTo(0);
        }
      }, 100);
    }
  };

  const skipBack = () => {
    if (widgetRef.current) {
      setIsLoading(true);
      setCurrentTime(0);
      setDuration(0);
      // Go to previous track in playlist
      widgetRef.current.prev();
      // Seek to beginning after a short delay to ensure track has loaded
      setTimeout(() => {
        if (widgetRef.current) {
          widgetRef.current.seekTo(0);
        }
      }, 100);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!widgetRef.current || duration === 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const seekPosition = percentage * duration;

    widgetRef.current.seekTo(seekPosition);
  };

  const handleSongSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!songInput.trim() || !nameInput.trim() || songStatus === "submitting") return;

    setSongStatus("submitting");
    try {
      const res = await fetch("/api/song-suggestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nameInput.trim(), song: songInput.trim() }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSongStatus("success");
      setNameInput("");
      setSongInput("");
      setTimeout(() => setSongStatus("idle"), 2500);
    } catch {
      setSongStatus("error");
      setTimeout(() => setSongStatus("idle"), 2500);
    }
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col h-full p-2 gap-4">
      {/* Display Screen */}
      <div
        className="bg-gray-900 border-2 border-pastel-green shadow-win-in p-3 mb-2 relative overflow-hidden min-h-32 flex flex-col justify-center dark:border-purple-300"
        style={{
          boxShadow: isPlaying
            ? isOzMode
              ? "inset 0 0 40px rgba(200, 180, 255, 0.4), inset 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 50px rgba(220, 200, 255, 0.5), 0 0 80px rgba(200, 180, 255, 0.35), 0 0 120px rgba(190, 170, 255, 0.2)"
              : "inset 0 0 40px rgba(255, 250, 235, 0.8), inset 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 50px rgba(255, 245, 220, 0.9), 0 0 80px rgba(255, 240, 200, 0.6), 0 0 120px rgba(255, 235, 190, 0.4)"
            : "inset 2px 2px 4px rgba(0, 0, 0, 0.8)",
          transition: "box-shadow 0.3s ease",
        }}
      >
        {/* Noise Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />

        {/* CRT Glow overlay - brighter */}
        <div
          className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300"
          style={{
            background: isPlaying
              ? isOzMode
                ? "radial-gradient(ellipse at center, rgba(168, 85, 247, 0.3) 0%, rgba(147, 51, 234, 0.15) 50%, transparent 80%)"
                : "radial-gradient(ellipse at center, rgba(200, 255, 220, 0.25) 0%, rgba(0, 255, 100, 0.1) 50%, transparent 80%)"
              : isOzMode
              ? "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.12) 0%, transparent 70%)"
              : "radial-gradient(ellipse at center, rgba(150, 220, 255, 0.08) 0%, transparent 70%)",
            mixBlendMode: "screen",
          }}
        ></div>

        {/* Chromatic aberration effect - brighter text */}
        <div
          className="relative z-10 font-mono text-sm leading-relaxed text-center"
          style={{
            color: isPlaying
              ? isOzMode ? "#E0D0FF" : "#E0FFE0"
              : isOzMode ? "#C0B0FF" : "#A0D0FF",
            textShadow: isPlaying
              ? isOzMode
                ? "2px 0 4px rgba(168, 85, 247, 0.8), -2px 0 4px rgba(217, 70, 239, 0.8), 0 0 15px rgba(168, 85, 247, 1), 0 0 30px rgba(147, 51, 234, 0.6)"
                : "2px 0 4px rgba(255, 100, 150, 0.7), -2px 0 4px rgba(100, 255, 255, 0.7), 0 0 15px rgba(200, 255, 200, 0.9), 0 0 30px rgba(150, 255, 150, 0.5)"
              : isOzMode
              ? "1px 0 2px rgba(168, 85, 247, 0.6), -1px 0 2px rgba(217, 70, 239, 0.6), 0 0 10px rgba(139, 92, 246, 0.7)"
              : "1px 0 2px rgba(150, 220, 255, 0.5), -1px 0 2px rgba(220, 150, 255, 0.5), 0 0 10px rgba(180, 220, 255, 0.6)",
            transition: "all 0.3s ease",
          }}
        >
          {isPlaying && (
            <div
              className="text-xs mb-2"
              style={{
                color: isOzMode ? "#F0E0FF" : "#FFE0FF",
                textShadow: isOzMode
                  ? "2px 0 3px rgba(168, 85, 247, 0.9), -2px 0 3px rgba(217, 70, 239, 0.9), 0 0 12px rgba(192, 132, 252, 1), 0 0 20px rgba(168, 85, 247, 0.7)"
                  : "2px 0 3px rgba(255, 100, 150, 0.8), -2px 0 3px rgba(100, 255, 255, 0.8), 0 0 12px rgba(255, 200, 255, 1), 0 0 20px rgba(255, 150, 200, 0.6)",
                animation: "pulse 3s ease-in-out infinite",
              }}
            >
              ♪ Now playing ♪
            </div>
          )}
          <div className="whitespace-nowrap overflow-hidden px-4">
            {isLoading ? (
              <div
                className="font-bold tracking-widest animate-pulse"
                style={{
                  color: isOzMode ? "#E0D0FF" : "#FFE0A0",
                  textShadow: isOzMode
                    ? "2px 0 4px rgba(168, 85, 247, 0.9), -2px 0 4px rgba(192, 132, 252, 0.9), 0 0 15px rgba(168, 85, 247, 1), 0 0 25px rgba(147, 51, 234, 0.7)"
                    : "2px 0 4px rgba(255, 150, 100, 0.8), -2px 0 4px rgba(100, 200, 255, 0.8), 0 0 15px rgba(255, 220, 150, 1), 0 0 25px rgba(255, 200, 100, 0.6)",
                }}
              >
                LOADING...
              </div>
            ) : isPlaying ? (
              <div
                className="font-bold tracking-widest"
                style={{
                  color: isOzMode ? "#F0E0FF" : "#FFFFCC",
                  animation:
                    "pulse 2.5s ease-in-out infinite, flicker 0.4s infinite",
                  textShadow: isOzMode
                    ? "3px 0 5px rgba(168, 85, 247, 0.9), -3px 0 5px rgba(217, 70, 239, 0.9), 0 0 20px rgba(192, 132, 252, 1), 0 0 35px rgba(168, 85, 247, 0.8), 0 0 50px rgba(147, 51, 234, 0.5)"
                    : "3px 0 5px rgba(255, 100, 150, 0.8), -3px 0 5px rgba(100, 255, 255, 0.8), 0 0 20px rgba(255, 255, 200, 1), 0 0 35px rgba(255, 255, 150, 0.7), 0 0 50px rgba(255, 230, 100, 0.4)",
                }}
              >
                {trackTitle.length > 25
                  ? trackTitle.substring(0, 25) + "..."
                  : trackTitle}
              </div>
            ) : (
              <span className="animate-pulse">INSERT TAPE...</span>
            )}
          </div>
        </div>
      </div>

      <style>{`
                @keyframes flicker {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.95; }
                }
            `}</style>

      {/* Hidden SoundCloud iframe */}
      <iframe
        ref={iframeRef}
        width="100%"
        height="0"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={SOUND_CLOUD_PLAYLIST_URL}
        style={{ display: "none" }}
      />

      {/* Progress Bar */}
      <div className="px-2">
        <div className="flex justify-between text-[10px] text-pastel-pink font-mono mb-1 font-bold">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div
          className="h-3 bg-slate-100 border-2  shadow-win-in cursor-pointer relative overflow-hidden"
          onClick={handleSeek}
          title="Click to seek"
        >
          {/* Progress fill with retro styling */}
          <div
            className="h-full bg-gradient-to-r from-pastel-pink via-pastel-green to-pastel-yellow"
            style={{
              width: duration > 0 ? `${(currentTime / duration) * 100}%` : "0%",
              boxShadow: isPlaying
                ? "0 0 10px rgba(255, 150, 200, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.4)"
                : "inset 0 1px 0 rgba(255, 255, 255, 0.3)",
              transition: "none",
              borderRight:
                duration > 0 && currentTime > 0
                  ? "2px solid rgba(255, 255, 255, 0.7)"
                  : "none",
            }}
          ></div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center space-x-4">
        <button
          className="p-2 bg-pastel-cream border border-gray-400 shadow-win-out active:shadow-win-in active:translate-y-px rounded-sm"
          onClick={skipBack}
          title="Previous Track"
        >
          <SkipBack size={20} className="text-gray-800 fill-current" />
        </button>

        <button
          className="p-2 bg-pastel-cream border border-gray-400 shadow-win-out active:shadow-win-in active:translate-y-px w-12 flex justify-center rounded-sm"
          onClick={togglePlayPause}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause size={20} className="text-gray-800 fill-current" />
          ) : (
            <Play size={20} className="text-gray-800 fill-current" />
          )}
        </button>

        <button
          className="p-2 bg-pastel-cream border border-gray-400 shadow-win-out active:shadow-win-in active:translate-y-px rounded-sm"
          onClick={skipForward}
          title="Next Track"
        >
          <SkipForward size={20} className="text-gray-800 fill-current" />
        </button>
      </div>

      {/* Song Suggestion — cassette tape */}
      <div
        className="mx-1 mt-3 relative"
        style={{
          /* Plastic shell body */
          background: "linear-gradient(175deg, #f0e0c8 0%, #e8d8c0 30%, #e0d0b4 70%, #d8c8a8 100%)",
          borderRadius: 10,
          border: "2px solid #a89070",
          boxShadow: "0 3px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.08)",
          padding: "8px 8px 6px",
          /* Aspect ratio roughly 275:175 */
        }}
      >
        {/* Screw holes — 5 total: 4 corners + 1 center-top */}
        {[
          { top: 6, left: 6 },
          { top: 6, right: 6 },
          { bottom: 6, left: 6 },
          { bottom: 6, right: 6 },
          { top: 6, left: "50%", transform: "translateX(-50%)" },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              ...pos,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 35%, #d8c8a8 0%, #b8a080 50%, #a08868 100%)",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.35), 0 0.5px 0 rgba(255,255,255,0.3)",
            }}
          />
        ))}

        {/* ── LABEL STICKER ── upper ~60% of the tape */}
        <div
          style={{
            background: "linear-gradient(180deg, #FFF9E6 0%, #fff4d8 100%)",
            border: "1px solid #d0c0a0",
            borderRadius: 4,
            padding: "5px 8px 6px",
            position: "relative",
          }}
        >
          {/* Reel windows row + center label */}
          <div className="flex items-center gap-2">
            {/* Left reel window */}
            <div
              className="shrink-0 flex items-center justify-center"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "radial-gradient(circle, #28201a 0%, #1e180e 70%, #141008 100%)",
                border: "2.5px solid #c0a880",
                boxShadow: "inset 0 2px 8px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.15)",
              }}
            >
              {/* Tape spool — visible through window */}
              <div
                className="flex items-center justify-center"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  border: "1.5px solid rgba(80,65,45,0.5)",
                  background: "conic-gradient(from 0deg, #3a3020 0%, #2a2018 25%, #3a3020 50%, #2a2018 75%, #3a3020 100%)",
                }}
              >
                {/* Hub — hexagonal spindle */}
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "radial-gradient(circle at 40% 35%, #f0e4cc 0%, #d8c8a8 100%)",
                    border: "1.5px solid #a89070",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.4)",
                  }}
                />
              </div>
            </div>

            {/* Center text between reels */}
            <div className="flex-1 text-center min-w-0">
              <p
                className="font-mono uppercase leading-none"
                style={{ fontSize: 7, letterSpacing: "0.3em", color: "#b09870" }}
              >
                Side B
              </p>
              <p
                className="font-mono leading-tight mt-0.5"
                style={{ fontSize: 9, color: "#7a6a50", letterSpacing: "0.04em" }}
              >
                Request Line
              </p>
            </div>

            {/* Right reel window */}
            <div
              className="shrink-0 flex items-center justify-center"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "radial-gradient(circle, #28201a 0%, #1e180e 70%, #141008 100%)",
                border: "2.5px solid #c0a880",
                boxShadow: "inset 0 2px 8px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.15)",
              }}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  border: "1.5px solid rgba(80,65,45,0.5)",
                  background: "conic-gradient(from 30deg, #3a3020 0%, #2a2018 25%, #3a3020 50%, #2a2018 75%, #3a3020 100%)",
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "radial-gradient(circle at 40% 35%, #f0e4cc 0%, #d8c8a8 100%)",
                    border: "1.5px solid #a89070",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.4)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Thin printed rule */}
          <div className="my-1" style={{ borderTop: "0.5px solid #d8c8a8" }} />

          {/* Question + form on the label */}
          <p
            className="font-mono text-center mb-1"
            style={{ fontSize: 10, color: "#7a6a50", lineHeight: 1.3 }}
          >
            What&apos;s a song that gets you on the dancefloor?
          </p>

          <form onSubmit={handleSongSubmit}>
            <div className="flex items-baseline gap-1.5 mb-1">
              <label
                className="font-mono shrink-0 uppercase"
                style={{ fontSize: 8, letterSpacing: "0.1em", color: "#b0a088" }}
              >
                From:
              </label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Your name"
                disabled={songStatus === "submitting" || songStatus === "success"}
                className="flex-1 font-mono text-xs focus:outline-none disabled:opacity-50"
                style={{
                  background: "transparent",
                  borderBottom: "1px solid #d8c8a8",
                  padding: "1px 4px",
                  color: "#4a3c2e",
                }}
              />
            </div>

            <div
              style={{
                background: "#fffef8",
                border: "1px solid #d8ccb8",
                boxShadow: "inset 1px 1px 3px rgba(0,0,0,0.05)",
                backgroundImage:
                  "repeating-linear-gradient(transparent, transparent 19px, #ece4d8 19px, #ece4d8 20px)",
                backgroundPosition: "0 7px",
              }}
            >
              <textarea
                value={songInput}
                onChange={(e) => setSongInput(e.target.value)}
                placeholder={
                  songStatus === "success"
                    ? "Thanks! We'll add it to the list"
                    : songStatus === "error"
                    ? "Something went wrong, try again..."
                    : "e.g. Dancing Queen \u2013 ABBA"
                }
                disabled={songStatus === "submitting" || songStatus === "success"}
                rows={2}
                className="w-full bg-transparent font-mono text-xs focus:outline-none disabled:opacity-50 resize-none"
                style={{
                  padding: "8px 8px 4px 8px",
                  color: "#4a3c2e",
                  lineHeight: "20px",
                }}
              />
            </div>

            <div className="flex items-center justify-between mt-1">
              <span
                className="font-mono italic"
                style={{
                  fontSize: 9,
                  color: songStatus === "success" ? "#6b8a5e" : songStatus === "error" ? "#b85450" : "#b0a090",
                }}
              >
                {songStatus === "success"
                  ? "\u2713 Submitted!"
                  : songStatus === "submitting"
                  ? "Sending..."
                  : songStatus === "error"
                  ? "Failed \u2013 try again"
                  : ""}
              </span>
              <button
                type="submit"
                disabled={!songInput.trim() || !nameInput.trim() || songStatus === "submitting" || songStatus === "success"}
                className="flex items-center gap-1 font-mono uppercase bg-pastel-cream border border-gray-400 shadow-win-out active:shadow-win-in active:translate-y-px disabled:opacity-35 disabled:active:shadow-win-out disabled:active:translate-y-0"
                style={{
                  fontSize: 10,
                  letterSpacing: "0.08em",
                  padding: "2px 8px",
                  color: "#6b5c48",
                }}
              >
                <Send size={9} />
                <span>Send</span>
              </button>
            </div>
          </form>
        </div>

        {/* ── TAPE HEAD WINDOW ── bottom center, wide rounded rect */}
        <div
          className="relative mx-auto mt-1.5 overflow-hidden"
          style={{
            width: "65%",
            height: 18,
            borderRadius: "3px 3px 5px 5px",
            background: "linear-gradient(180deg, #1a140e 0%, #241c14 40%, #1a140e 100%)",
            border: "2px solid #a89070",
            boxShadow: "inset 0 2px 6px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.12)",
          }}
        >
          {/* Left guide reel */}
          <div
            className="absolute"
            style={{
              top: "50%",
              left: "12%",
              transform: "translateY(-50%)",
              width: 10,
              height: 10,
              borderRadius: "50%",
              border: "1.5px solid #4a3c28",
              background: "radial-gradient(circle, #3a3020 0%, #282018 100%)",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.4)",
            }}
          />
          {/* Right guide reel */}
          <div
            className="absolute"
            style={{
              top: "50%",
              right: "12%",
              transform: "translateY(-50%)",
              width: 10,
              height: 10,
              borderRadius: "50%",
              border: "1.5px solid #4a3c28",
              background: "radial-gradient(circle, #3a3020 0%, #282018 100%)",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.4)",
            }}
          />
          {/* Tape strip running between reels */}
          <div
            className="absolute"
            style={{
              top: "50%",
              left: "18%",
              right: "18%",
              height: 4,
              transform: "translateY(-50%)",
              background: "linear-gradient(180deg, #4a3828 0%, #2e2218 50%, #3a2c1e 100%)",
              boxShadow: "0 0 2px rgba(0,0,0,0.3)",
            }}
          />
          {/* Tape head opening — center notch */}
          <div
            className="absolute"
            style={{
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 14,
              height: 4,
              background: "#0a0806",
              borderRadius: "2px 2px 0 0",
            }}
          />
        </div>

        {/* ── BOTTOM EDGE — capstan & pinch roller openings ── */}
        <div className="flex justify-center gap-6 mt-1">
          {/* Left capstan hole */}
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "radial-gradient(circle, #b0a080 0%, #988868 100%)",
              boxShadow: "inset 0 1px 1px rgba(0,0,0,0.3)",
            }}
          />
          {/* Center alignment hole (rectangular) */}
          <div
            style={{
              width: 8,
              height: 4,
              borderRadius: 1,
              background: "#a89070",
              boxShadow: "inset 0 1px 1px rgba(0,0,0,0.25)",
            }}
          />
          {/* Right capstan hole */}
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "radial-gradient(circle, #b0a080 0%, #988868 100%)",
              boxShadow: "inset 0 1px 1px rgba(0,0,0,0.3)",
            }}
          />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="mt-2 border-t border-pastel-green pt-2 flex justify-between text-[10px] text-gray-500 font-mono">
        <span>STEREO SOUND</span>
        <span>HI-FI</span>
      </div>
    </div>
  );
};

export default MusicPlayer;
