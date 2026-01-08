import { useOzMode } from "@/contexts/OzModeContext";

const Recommendations = () => {
  const { isOzMode } = useOzMode();

  return (
    <div className="p-4 space-y-6 h-full overflow-y-auto">
        <div className="text-center space-y-2 mb-4">
        <h2 className="text-3xl font-retro tracking-tight">
              {isOzMode ? "Oz's Guide to Tel Aviv" : "Tel Aviv Guide"}
            </h2>
            <p className="text-base italic">June 2026</p>
            <div className="w-full h-px bg-black/20"></div>
        </div>

        <div className="space-y-6">
            {/* Intro */}
            <div className={`p-3 border shadow-win-in ${
                isOzMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-400"
            }`}>
                 <p className="text-base leading-relaxed">
                    {isOzMode
                      ? "Listen up, guests. You're coming to MY city for MY humans' wedding. Here's what you need to know."
                      : "We are so looking forward to seeing you in Israel to celebrate Alex and Jack's wedding!"}
                </p>
            </div>

            {/* Hotels */}
            <div>
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <span className="text-xl">{isOzMode ? "🐕" : "🏨"}</span>{" "}
                    {isOzMode ? "Places to Sleep (Not Dog-Friendly Enough)" : "Hotel Recommendations"}
                </h3>
                <div className={`border p-3 shadow-win-in space-y-2 ${
                    isOzMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-500"
                }`}>
                    <p className={`text-sm mb-2 ${isOzMode ? "text-gray-400" : "text-gray-500"}`}>
                      {isOzMode
                        ? "These hotels are near the beach where I do my morning business. You're welcome."
                        : "Excellent locations for the beach, restaurants and the city buzz."}
                    </p>
                    <ul className="text-base space-y-1 list-disc pl-4">
                        <li>Royal Beach Tel Aviv</li>
                        <li>Elkonin</li>
                        <li>The Savoy Tel Aviv Sea Side</li>
                        <li>The Dan Tel Aviv</li>
                        <li>The Orchid</li>
                        <li>Ink Hotel</li>
                        <li>Hotel Rothschild</li>
                        <li>Lily & Bloom</li>
                        <li>The Vera</li>
                    </ul>
                </div>
            </div>

            {/* Activities */}
            <div>
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                     <span className="text-xl">{isOzMode ? "🦮" : "🗺️"}</span>{" "}
                     {isOzMode ? "Things to Do (Bring Treats)" : "Activities"}
                </h3>
                <div className={`border p-3 shadow-win-in ${
                    isOzMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-500"
                }`}>
                    <p className="text-base mb-2">
                      {isOzMode
                        ? "Go to these places. Maybe you'll see me. Definitely bring treats if you do."
                        : "For some fun when you feel like exploring:"}
                    </p>
                    <a
                        href="https://tinyurl.com/35wt8a5m"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-base font-bold block hover:underline ${
                            isOzMode ? "text-blue-400" : "text-win-blue"
                        }`}
                    >
                        ↗ View Curated Activity List
                    </a>
                </div>
            </div>

            {/* Jerusalem Tour Guide */}
            <div>
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <span className="text-xl">{isOzMode ? "🏰" : "🏰"}</span>{" "}
                    {isOzMode ? "Tour Guide Recommendation" : "Tour Guide to Jerusalem"}
                </h3>
                <div className={`border p-3 shadow-win-in ${
                    isOzMode ? "bg-gray-800 border-gray-600" : "bg-white border-gray-500"
                }`}>
                    <p className={`text-base mb-2 ${isOzMode ? "text-gray-300" : "text-gray-700"}`}>
                      {isOzMode
                        ? "If you want to go to Jerusalem, arrange your own tour with Nicole Goldstein Strassman. She's a licensed tour guide. She's not my tour guide, but my humans say she's good."
                        : "Arrange your own tour to Jerusalem with Nicole Goldstein Strassman, Licensed Tour Guide."}
                    </p>
                    <div className={`text-base space-y-1 border-t pt-2 ${
                        isOzMode ? "border-gray-600" : "border-gray-400/30"
                    }`}>
                        <p>📞 +972-547486067</p>
                        <p>✉️ <a href="mailto:tourandexplorejerusalem@gmail.com" className={`hover:underline ${
                            isOzMode ? "text-blue-400" : "text-win-blue"
                        }`}>tourandexplorejerusalem@gmail.com</a></p>
                        <p>🌐 <a href="https://tourandexplorejerusalem.com" target="_blank" rel="noopener noreferrer" className={`hover:underline ${
                            isOzMode ? "text-blue-400" : "text-win-blue"
                        }`}>tourandexplorejerusalem.com</a></p>
                    </div>
                </div>
            </div>

            {/* Travel Agent */}
            <div>
                 <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                     <span className="text-xl">✈️</span> Travel Assistance
                </h3>
                <div className={`border p-3 shadow-win-in ${
                    isOzMode ? "bg-gray-700 border-gray-600" : "bg-pool-mint border-gray-500"
                }`}>
                    <p className="text-base mb-2">
                        {isOzMode
                          ? "Ariella helps humans with travel stuff. She's nice. I bet she'd pet me if she met me."
                          : "For help with bookings, we are working with"}{" "}
                        <strong>Ariella</strong>.
                    </p>
                    <div className={`text-base space-y-1 border-t pt-2 ${
                        isOzMode ? "border-gray-600" : "border-gray-400/30"
                    }`}>
                        <p>📞 +44 7813 177 379</p>
                        <p>✉️ <a href="mailto:ariellaescapes@hotmail.com" className={`hover:underline ${
                            isOzMode ? "text-blue-400" : "text-win-blue"
                        }`}>ariellaescapes@hotmail.com</a></p>
                        <p>🌐 <a href="https://ariellamandell.inteletravel.uk" target="_blank" rel="noopener noreferrer" className={`hover:underline ${
                            isOzMode ? "text-blue-400" : "text-win-blue"
                        }`}>ariellamandell.inteletravel.uk</a></p>
                    </div>
                </div>
            </div>

            <div className={`text-center text-sm pt-4 pb-2 ${
                isOzMode ? "text-gray-400" : "text-gray-500"
            }`}>
                {isOzMode
                  ? "Pro tip: The more you explore, the more likely you are to bump into me on a walk. Just saying."
                  : "Can't wait to celebrate with you!"}
            </div>
        </div>
    </div>
  );
};

export default Recommendations;
