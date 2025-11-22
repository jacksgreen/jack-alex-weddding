

const Desktop = ({ children }) => {
    return (
        <div className="h-screen w-screen bg-pool-pink bg-cover bg-center flex flex-col overflow-hidden font-retro text-lg" style={{ backgroundImage: "url('/bg-israel.png')" }}>
        
            <div className="flex-1 relative p-4">
                {children}
            </div>
        </div>
    );
};

export default Desktop;
