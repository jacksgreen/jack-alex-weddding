const Events = () => (
  <div className="p-4 space-y-6 h-full overflow-y-auto">
    <div className="text-center space-y-2 mb-4">
      <h2 className="text-3xl font-serif tracking-tight">Wedding Events</h2>
      <p className="text-sm italic">June 2026</p>
      <div className="w-full h-px bg-black/20"></div>
    </div>

    <div className="space-y-6">
      {/* Friday Event */}
      <div>
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
          <span className="text-xl">🕯️</span> Friday, June 19
        </h3>
        <div className="bg-white border border-gray-500 p-3 shadow-win-in space-y-2">
          <h4 className="font-bold text-sm">Shabbat Dinner</h4>
          <div className="text-sm space-y-1">
            <div><span className="font-semibold">Time:</span> To be determined</div>
            <div><span className="font-semibold">Location:</span> Pinkhas Ben Ya'ir St 3, Tel Aviv-Yafo</div>
          </div>
          <p className="text-xs text-gray-600 pt-2 border-t border-gray-300">
            Join us for a warm Shabbat dinner to kick off the celebration weekend.
          </p>
        </div>
      </div>

      {/* Sunday Event */}
      <div>
        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
          <span className="text-xl">💒</span> Sunday, June 21
        </h3>
        <div className="bg-white border border-gray-500 p-3 shadow-win-in space-y-2">
          <h4 className="font-bold text-sm">Wedding Celebration</h4>
          <div className="text-sm space-y-1">
            <div><span className="font-semibold">Time:</span> To be determined</div>
            <div><span className="font-semibold">Location:</span> Beit Hanan, Israel</div>
          </div>
          <p className="text-xs text-gray-600 pt-2 border-t border-gray-300">
            Transportation details to follow soon. We can't wait to celebrate with you!
          </p>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 pt-4 pb-2">
        Save the dates!
      </div>
    </div>
  </div>
);

export default Events;
