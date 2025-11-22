const Recommendations = () => (
    <div className="p-4 space-y-6 h-full overflow-y-auto">
        <div className="text-center space-y-2 mb-4">
            <h2 className="text-3xl font-serif tracking-tight">Tel Aviv Guide</h2>
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
                        <li>The Vera</li>
                    </ul>
                </div>
            </div>

            {/* Activities */}
            <div>
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                     <span className="text-xl">🗺️</span> Activities
                </h3>
                <div className="bg-white border border-gray-500 p-3 shadow-win-in">
                    <p className="text-sm mb-2">For some fun when you feel like exploring:</p>
                    <a
                        href="https://tinyurl.com/35wt8a5m"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-win-blue hover:underline text-sm font-bold block"
                    >
                        ↗ View Curated Activity List
                    </a>
                </div>
            </div>

            {/* Travel Agent */}
            <div>
                 <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                     <span className="text-xl">✈️</span> Travel Assistance
                </h3>
                <div className="bg-pool-mint border border-gray-500 p-3 shadow-win-in">
                    <p className="text-sm mb-2">
                        For help with bookings, we are working with <strong>Ariella</strong>.
                    </p>
                    <div className="text-sm space-y-1 border-t border-gray-400/30 pt-2">
                        <p>📞 +44 7813 177 379</p>
                        <p>✉️ <a href="mailto:ariellaescapes@hotmail.com" className="text-win-blue hover:underline">ariellaescapes@hotmail.com</a></p>
                        <p>🌐 <a href="https://ariellamandell.inteletravel.uk" target="_blank" rel="noopener noreferrer" className="text-win-blue hover:underline">ariellamandell.inteletravel.uk</a></p>
                    </div>
                </div>
            </div>

            <div className="text-center text-xs text-gray-500 pt-4 pb-2">
                Can't wait to celebrate with you!
            </div>
        </div>
    </div>
);

export default Recommendations;
