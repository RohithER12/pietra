import { NotebookText } from "lucide-react";
import { Link } from "react-router";

export const Welcome = () => {
    return <section className="w-full py-24 flex justify-center bg-white">
        <div className="max-w-4xl px-4 text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-light font-playfair mb-14 leading-[2.25]">
                Welcome to Breta Surfaces<br />
                Where Luxury Meets Design
            </h2>


            <p className="text-lg text-foreground/70 leading-snug">
                Since 1987, we've been crafting exceptional surface solutions. Our curated collection
                of premium materials transforms spaces into masterpieces. Experience the perfect
                blend of artistry and functionality, where each surface tells a story of elegance
                and sophistication.
            </p>
            <div className="pt-4">
                <Link
                    to="/"
                    className="inline-flex items-center border border-foreground px-8 py-4 text-foreground hover:bg-foreground hover:text-white transition-colors group"
                >
                    Visit Our Catalogue
                    <NotebookText className="ms-2" size={20} />
                </Link>
            </div>
        </div>
    </section>;
}
