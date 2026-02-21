import { useOzMode } from "@/contexts/OzModeContext";

const Events = () => {
  const { isOzMode } = useOzMode();

  return (
    <div className="p-4 space-y-6 h-full overflow-y-auto">
<div className="space-y-6">
        {/* Thursday Event */}
        {/* <div>
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
            <span className="text-xl">{isOzMode ? "🏛️" : "🏛️"}</span> Thursday,
            June 18
          </h3>
          <div
            className={`border p-3 shadow-win-in space-y-2 ${
              isOzMode
                ? "bg-gray-800 border-gray-600"
                : "bg-white border-gray-500"
            }`}
          >
            <h4 className="font-bold text-base">
              {isOzMode
                ? "Optional Excursion (I'm Not Invited)"
                : "Caesarea Tour"}
            </h4>
            <div className="text-base space-y-1">
              <div>
                <span className="font-semibold">Details:</span> To be determined
              </div>
            </div>
            <p
              className={`text-sm pt-2 border-t ${
                isOzMode
                  ? "text-gray-400 border-gray-600"
                  : "text-gray-600 border-gray-300"
              }`}
            >
              {isOzMode
                ? "Alex's parents are arranging this optional tour. I'll be at home, probably napping. You're welcome."
                : "Eilene and Jonathan are arranging an optional excursion to discover the beauty of Caesarea. Details to follow."}
            </p>
          </div>
        </div> */}

        {/* Friday Event */}
        <div>
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
            <span className="text-xl">{isOzMode ? "🍖" : "🕯️"}</span> Friday,
            June 19
          </h3>
          <div
            className={`border p-3 shadow-win-in space-y-2 ${
              isOzMode
                ? "bg-gray-800 border-gray-600"
                : "bg-white border-gray-500"
            }`}
          >
            <h4 className="font-bold text-base">
              {isOzMode ? "Dinner (Not For Dogs Apparently)" : "Shabbat Dinner"}
            </h4>
            <div className="text-base space-y-1">
              <div>
                <span className="font-semibold">Venue:</span> Sharabiya
              </div>
              <div>
                <span className="font-semibold">Location:</span> Pinkhas Ben
                Ya'ir St 3, Tel Aviv-Yafo
              </div>
              <div>
                <span className="font-semibold">Time:</span> 19:00
              </div>
            </div>
            <p
              className={`text-sm pt-2 border-t ${
                isOzMode
                  ? "text-gray-400 border-gray-600"
                  : "text-gray-600 border-gray-300"
              }`}
            >
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
          <div
            className={`border p-3 shadow-win-in space-y-2 ${
              isOzMode
                ? "bg-gray-800 border-gray-600"
                : "bg-white border-gray-500"
            }`}
          >
            <h4 className="font-bold text-base">
              {isOzMode
                ? "The Big Celebration (Fingers crossed for scraps)"
                : "Wedding Celebration"}
            </h4>
            <div className="text-base space-y-1">
              <div>
                <span className="font-semibold">Venue:</span> Hachuza
              </div>
              <div>
                <span className="font-semibold">Location:</span> Beit Hanan,
                Israel
              </div>
              <div>
                <span className="font-semibold">Reception:</span> 18:00
              </div>
              <div>
                <span className="font-semibold">Chuppah:</span> 19:00
              </div>
              <div>
                <span className="font-semibold">Dress code:</span> Cocktail
              </div>
            </div>
            <p
              className={`text-sm pt-2 border-t ${
                isOzMode
                  ? "text-gray-400 border-gray-600"
                  : "text-gray-600 border-gray-300"
              }`}
            >
              {isOzMode
                ? "They're getting married! About time. Also, I heard there's a buffet. Just saying, scraps are appreciated."
                : "Transportation details to follow soon. We can't wait to celebrate with you!"}
            </p>
          </div>
        </div>



        <div
          className={`text-center text-sm pt-4 pb-2 ${
            isOzMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {isOzMode
            ? "Remember: Guests who sneak me treats are my favorites."
            : "Save the dates!"}
        </div>
      </div>
    </div>
  );
};

export default Events;
