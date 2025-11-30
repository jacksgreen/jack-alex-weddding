import { useOzMode } from "@/contexts/OzModeContext";

const Events = () => {
  const { isOzMode } = useOzMode();

  return (
    <div className="p-4 space-y-6 h-full overflow-y-auto">
      <div className="text-center space-y-2 mb-4">
        <h2 className="text-3xl font-serif tracking-tight">
          {isOzMode ? "Times When I Don't Get Fed On Schedule" : "Wedding Events"}
        </h2>
        <p className="text-sm italic">June 2026</p>
        <div className="w-full h-px bg-black/20"></div>
      </div>

      <div className="space-y-6">
        {/* Friday Event */}
        <div>
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
            <span className="text-xl">{isOzMode ? "🍖" : "🕯️"}</span> Friday,
            June 19
          </h3>
          <div className={`border p-3 shadow-win-in space-y-2 ${
            isOzMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-500"
          }`}>
            <h4 className="font-bold text-sm">
              {isOzMode ? "Dinner (Not For Dogs Apparently)" : "Shabbat Dinner"}
            </h4>
            <div className="text-sm space-y-1">
              <div>
                <span className="font-semibold">Time:</span> To be determined
              </div>
              <div>
                <span className="font-semibold">Location:</span> Pinkhas Ben
                Ya'ir St 3, Tel Aviv-Yafo
              </div>
            </div>
            <p className={`text-xs pt-2 border-t ${
              isOzMode ? "text-gray-400 border-gray-600" : "text-gray-600 border-gray-300"
            }`}>
              {isOzMode
                ? "Apparently I'm not invited. Something about 'dogs can't have challah' and 'you already ate.' The injustice."
                : "Join us for a warm Shabbat dinner to kick off the celebration weekend."}
            </p>
          </div>
        </div>

        {/* Sunday Event */}
        <div>
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
            <span className="text-xl">{isOzMode ? "🦴" : "💍"}</span> Sunday,
            June 21
          </h3>
          <div className={`border p-3 shadow-win-in space-y-2 ${
            isOzMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-500"
          }`}>
            <h4 className="font-bold text-sm">
              {isOzMode ? "The Big Celebration (Fingers crossed for scraps)" : "Wedding Celebration"}
            </h4>
            <div className="text-sm space-y-1">
              <div>
                <span className="font-semibold">Time:</span> To be determined
              </div>
              <div>
                <span className="font-semibold">Location:</span> Beit Hanan,
                Israel
              </div>
            </div>
            <p className={`text-xs pt-2 border-t ${
              isOzMode ? "text-gray-400 border-gray-600" : "text-gray-600 border-gray-300"
            }`}>
              {isOzMode
                ? "They're getting married! About time. Also, I heard there's a buffet. Just saying, scraps are appreciated."
                : "Transportation details to follow soon. We can't wait to celebrate with you!"}
            </p>
          </div>
        </div>

        <div className={`text-center text-xs pt-4 pb-2 ${
          isOzMode ? "text-gray-400" : "text-gray-500"
        }`}>
          {isOzMode
            ? "Remember: Guests who sneak me treats are my favorites."
            : "Save the dates!"}
        </div>
      </div>
    </div>
  );
};

export default Events;
