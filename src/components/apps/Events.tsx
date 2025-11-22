const Events = () => (
    <div className="p-4 space-y-4">
        <div className="border-2 border-gray-400 p-3 bg-pink-50 shadow-win-in">
            <h3 className="font-bold text-lg mb-1">Friday Night Dinner</h3>
            <p className="font-bold text-win-blue">Friday, Oct 14th @ 7:00 PM</p>
            <p className="text-sm mb-2">The Golden Garden</p>
            <p className="text-sm">Casual attire. Come hungry for dumplings!</p>
        </div>

        <div className="border-2 border-gray-400 p-3 bg-white shadow-win-in">
            <h3 className="font-bold text-lg mb-1">The Wedding</h3>
            <p className="font-bold text-win-blue">Saturday, Oct 15th @ 4:00 PM</p>
            <p className="text-sm mb-2">The Grand Hotel</p>
            <p className="text-sm">Ceremony followed by cocktail hour and reception.</p>
            <p className="text-xs mt-2 text-gray-500">*Shuttles depart from hotel lobby at 3:30 PM</p>
        </div>
    </div>
);

export default Events;
