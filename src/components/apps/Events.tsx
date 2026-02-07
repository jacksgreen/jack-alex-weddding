import { useState } from "react";
import { useOzMode } from "@/contexts/OzModeContext";

type DressCodeLocale = "US" | "UK";

const DRESS_CODE_INTRO =
  "The wedding will be outdoors, so please dress for warm weather.";

const DRESS_CODE_US = {
  title: "Wedding dress code",
  level: "Dressy Summer",
  lines: [
    DRESS_CODE_INTRO,
    "Men: Dress pants and button-down shirt. Jacket and tie optional.",
    "Women: Dresses of any length.",
  ],
};

const DRESS_CODE_UK = {
  title: "Wedding dress code",
  level: "Dressy Summer",
  lines: [
    DRESS_CODE_INTRO,
    "Men: Smart trousers and a shirt. Jacket and tie optional.",
    "Women: Dresses of any length.",
  ],
};

const Events = () => {
  const { isOzMode } = useOzMode();
  const [dressCodeLocale, setDressCodeLocale] = useState<DressCodeLocale>("US");
  const dressCode = dressCodeLocale === "US" ? DRESS_CODE_US : DRESS_CODE_UK;

  return (
    <div className="p-4 space-y-6 h-full overflow-y-auto">
      <div className="text-center space-y-2 mb-2">
        <h2 className="text-3xl font-retro tracking-tight">
          {isOzMode
            ? "Times When I Don't Get Fed On Schedule"
            : "Wedding Events"}
        </h2>
        <p className="text-base italic">June 2026</p>
        <div className="w-full h-px bg-black/20"></div>
      </div>

      <div className="space-y-6">
        {/* Thursday Event */}
        <div>
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
        </div>

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
                <span className="font-semibold">Location:</span> Pinkhas Ben
                Ya'ir St 3, Tel Aviv-Yafo
              </div>
              <div>
                <span className="font-semibold">Time:</span> To be determined
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
                <span className="font-semibold">Location:</span> Beit Hanan,
                Israel
              </div>
              <div>
                <span className="font-semibold">Time:</span> To be determined
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

        {/* Dress code */}
        <div>
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
            <span className="text-xl">{isOzMode ? "👔" : "👗"}</span>{" "}
            {dressCode.title}
          </h3>
          <div
            className={`border p-3 shadow-win-in space-y-2 ${
              isOzMode
                ? "bg-gray-800 border-gray-600"
                : "bg-white border-gray-500"
            }`}
          >
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span
                className={`text-base font-semibold ${
                  isOzMode ? "text-gray-200" : "text-gray-800"
                }`}
              >
                {dressCode.level}
              </span>
              <div className="flex gap-1" role="group" aria-label="Dress code wording">
                <button
                  type="button"
                  onClick={() => setDressCodeLocale("US")}
                  className={`px-2 py-1 text-lg border rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                    dressCodeLocale === "US"
                      ? isOzMode
                        ? "bg-gray-600 border-gray-500 ring-gray-400"
                        : "bg-gray-200 border-gray-400 ring-gray-500"
                      : isOzMode
                        ? "bg-gray-800 border-gray-600 hover:bg-gray-700"
                        : "bg-white border-gray-400 hover:bg-gray-100"
                  }`}
                  title="US wording"
                >
                  🇺🇸
                </button>
                <button
                  type="button"
                  onClick={() => setDressCodeLocale("UK")}
                  className={`px-2 py-1 text-lg border rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                    dressCodeLocale === "UK"
                      ? isOzMode
                        ? "bg-gray-600 border-gray-500 ring-gray-400"
                        : "bg-gray-200 border-gray-400 ring-gray-500"
                      : isOzMode
                        ? "bg-gray-800 border-gray-600 hover:bg-gray-700"
                        : "bg-white border-gray-400 hover:bg-gray-100"
                  }`}
                  title="UK wording"
                >
                  🇬🇧
                </button>
              </div>
            </div>
            <div
              className={`text-sm space-y-2 ${
                isOzMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {dressCode.lines.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        </div>

        {/* More Events TBD */}
        <div>
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
            <span className="text-xl">{isOzMode ? "🤔" : "📅"}</span> More
            Events Coming Soon
          </h3>
          <div
            className={`border p-3 shadow-win-in ${
              isOzMode
                ? "bg-gray-800 border-gray-600"
                : "bg-white border-gray-500"
            }`}
          >
            <p
              className={`text-base ${
                isOzMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {isOzMode
                ? "My humans are still figuring out the full schedule. Check back for updates!"
                : "We're still finalizing the weekend schedule and may add more events. Check back for updates."}
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
