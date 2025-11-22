const Recommendations = () => (
    <div className="p-4 space-y-6 h-full overflow-y-auto">
        <div className="text-center space-y-2 mb-4">
            <h2 className="text-3xl font-bold tracking-tight">Tel Aviv Guide</h2>
            <p className="text-sm italic">June 2026</p>
            <div className="w-full h-px bg-black/20"></div>
        </div>

        <div className="space-y-6">
            {/* Intro */}
            <div className="bg-white p-3 border border-gray-400 shadow-win-in">
                <p className="text-sm leading-relaxed">
                    We are so looking forward to seeing you in Israel to celebrate Alex and Jack’s wedding!
                </p>
            </div>

            {/* Hotels */}
            <div>
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <span className="text-xl">🏨</span> Hotel Recommendations
                </h3>
                <div className="bg-white border border-gray-500 p-3 shadow-win-in space-y-2">
                    <p className="text-xs text-gray-500 mb-2">Excellent locations for the beach, restaurants and the city buzz.</p>
                    <ul className="text-sm space-y-1 list-disc pl-4">
                        <li>Royal Beach Tel Aviv</li>
                        <li>Elkonin</li>
                        <li>The Savoy Tel Aviv Sea Side</li>
                        <li>The Dan Tel Aviv</li>
                        <li>The Orchid</li>
                        <li>Ink Hotel</li>
                        <li>Hotel Rothschild</li>
                        <li>Lily & Bloom</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
);

export default Recommendations;
