import { ReactNode } from 'react';
import { useOzMode } from "@/contexts/OzModeContext";

interface DesktopProps {
    children: ReactNode;
}

const Desktop = ({ children }: DesktopProps) => {
    const { isOzMode } = useOzMode();

    return (
        <div
            className={`h-screen w-screen bg-cover bg-center flex flex-col overflow-hidden font-retro text-lg transition-all duration-500 ${
                isOzMode
                    ? "bg-gray-900 brightness-[0.6] contrast-110 saturate-75"
                    : "bg-pool-pink"
            }`}
            style={{ backgroundImage: `url('${isOzMode ? '/bg-israel-dark.png' : '/bg-israel.png'}')` }}
        >
            <div className="flex-1 relative p-4">
                {children}
            </div>
        </div>
    );
};

export default Desktop;
