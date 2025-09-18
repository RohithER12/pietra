import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="w-full py-20 h-[80vh] grid place-content-center text-center text-xl font-playfair font-light">
            <h1 className="text-5xl md:text-9xl mb-4">404</h1>
            Page not found.
            <button
                type="button"
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-2 text-base font-sans cursor-pointer text-primary rounded mx-auto py-6 hover:underline"
            >
                <ArrowLeft size={18} />
                Go to Home
            </button> 
        </div>
    );
}
