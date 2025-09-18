import { useCompare } from "./CompareContext";
import { useNavigate, useLocation } from "react-router";
import { LucideScale } from "lucide-react";
import { useEffect, useState } from "react";

export const CompareButton = () => {
    const { selected } = useCompare();
    const navigate = useNavigate();
    const location = useLocation();
    const canCompare = selected.length >= 2;
    const [isVisible, setIsVisible] = useState(false);
    const isHomePage = location.pathname === '/';
    const isAboutPage = location.pathname === '/about';

    useEffect(() => {
        if (isAboutPage) return;
        
        if (!isHomePage) {
            setIsVisible(true);
            return;
        }

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            setIsVisible(scrollY >= viewportHeight);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHomePage]);

    if (!isVisible || isAboutPage) return null;

    return (
        <div className="fixed bottom-6 right-0 z-50">
            <button
                className={`flex items-center gap-2 px-5 py-3  shadow-lg font-semibold text-base transition-all
          ${canCompare ? "bg-primary text-white hover:bg-primary/90 cursor-pointer" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
                disabled={!canCompare}
                onClick={() => canCompare && navigate("/compare")}
                aria-disabled={!canCompare}
            >
                <LucideScale size={20} />
                {canCompare ? "Compare" : null}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${canCompare ? "bg-white text-primary" : "bg-gray-300 text-gray-500"}`}>
                    {selected.length}
                </span>
            </button>
        </div>
    );
}; 