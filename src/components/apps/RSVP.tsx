const RSVP = () => (
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

export default RSVP;
