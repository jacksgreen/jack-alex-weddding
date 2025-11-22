
export const AboutUs = () => (
    <div className="p-4 space-y-4">

        <div className="flex flex-col space-y-4">
            <div className="bg-gray-200 p-2 border border-gray-500">
                <img src="https://placehold.co/400x300/pink/white?text=Alex+and+Jack" alt="Couple" className="w-full h-48 object-cover mb-2 border border-gray-400" />
                <p className="text-sm italic text-center">"The day we met..."</p>
            </div>
            <p>
                Alex and Jack met in the summer of 2018 at a rooftop party in Brooklyn.
                Jack spilled his drink on Alex's shoes, and the rest is history.
                They share a love for vintage synthesizers, spicy noodles, and long walks on the beach (ironically).
            </p>
            <p>
                After 5 years of adventures, 3 apartments, and 1 cat named "Synth", they are finally tying the knot!
            </p>
        </div>
    </div>
);

export const Recommendations = () => (
    <div className="p-4 space-y-4">

        <div className="space-y-3">
            <div className="bg-white border border-gray-500 p-2 shadow-sm">
                <h3 className="font-bold text-win-blue">Joe's Pizza</h3>
                <p className="text-sm">Best slice in town. Open late!</p>
                <span className="text-xs bg-yellow-200 px-1 border border-gray-400">Food</span>
            </div>
            <div className="bg-white border border-gray-500 p-2 shadow-sm">
                <h3 className="font-bold text-win-blue">The Retro Arcade</h3>
                <p className="text-sm">Classic cabinets and pinball. Great for killing time.</p>
                <span className="text-xs bg-green-200 px-1 border border-gray-400">Activity</span>
            </div>
            <div className="bg-white border border-gray-500 p-2 shadow-sm">
                <h3 className="font-bold text-win-blue">Sunset Beach</h3>
                <p className="text-sm">Perfect spot for a morning swim.</p>
                <span className="text-xs bg-blue-200 px-1 border border-gray-400">Nature</span>
            </div>
        </div>
    </div>
);

export const Events = () => (
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

export const Photos = () => (
    <div className="p-2">

        <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square bg-gray-300 border border-gray-500 flex items-center justify-center hover:opacity-80 cursor-pointer">
                    <span className="text-xs text-gray-600">Photo {i}</span>
                </div>
            ))}
        </div>
    </div>
);

export const RSVP = () => (
    <div className="p-4">

        <form className="space-y-3">
            <div>
                <label className="block text-sm font-bold mb-1">Name</label>
                <input type="text" className="w-full border border-gray-500 p-1 bg-white" />
            </div>
            <div>
                <label className="block text-sm font-bold mb-1">Attending?</label>
                <select className="w-full border border-gray-500 p-1 bg-white">
                    <option>Yes, can't wait!</option>
                    <option>No, will celebrate from afar</option>
                </select>
            </div>
            <button className="px-4 py-1 bg-win-bg border-2 border-win-bevel-light border-b-win-bevel-dark border-r-win-bevel-dark active:border-win-bevel-dark active:border-b-win-bevel-light active:border-r-win-bevel-light">
                Submit
            </button>
        </form>
    </div>
);

