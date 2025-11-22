const Recommendations = () => (
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

export default Recommendations;
