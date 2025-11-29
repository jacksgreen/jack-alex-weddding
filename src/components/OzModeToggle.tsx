import { useOzMode } from "@/contexts/OzModeContext";

const OzModeToggle = () => {
  const { isOzMode, toggleOzMode } = useOzMode();

  return (
    <button
      onClick={toggleOzMode}
      className={`fixed bottom-[100px] md:bottom-24 pr-6 pl-4 right-[-85px] md:right-[-110px] md:hover:right-0 z-[100] border-[3px] rounded-lg transition-all duration-300 p-3 flex items-center gap-3 font-bold ${
        isOzMode
          ? "bg-gray-800 border-gray-600 text-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.7)]"
          : "bg-white border-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
      }`}
      title={isOzMode ? "Exit Oz Mode" : "Enter Oz Mode"}
    >
      <img src="/oz.svg" alt="Oz" className="w-8 h-8" />
      <span className="text-sm">Oz mode</span>
    </button>
  );
};

export default OzModeToggle;
