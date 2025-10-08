
import { HeroCarousel } from '../components/home/hero-carousel/hero-carousel';
import { Collections } from '../components/home/collections';
import { GetInTouch } from '../components/home/getInTouch';
import { Welcome } from '../components/home/welcome';
import { ProductShowcase } from '../components/home/product-showcase';
import { Discover } from '../components/home/discover';
import { NotebookText } from "lucide-react";
import { Link } from "react-router";

export const Home = () => {
    return (
        <div className="flex flex-col overflow-hidden">
            <HeroCarousel />

            <Welcome />

            {/* Full-width image section */}
            <section className="w-full lg:my-6">
                <img
                    src="/machine.jpg"
                    alt="Machine"
                    className="w-full h-auto object-cover object-center"
                    style={{ maxHeight: '500px' }}
                />
            </section>

            <div className='w-full flex flex-col items-center text-center px-4'>
                <div className='max-w-4xl'>

                <p className=" text-lg text-foreground/70 leading-snug lg:py-5">
                    Since 1987, we've been crafting exceptional surface solutions. Our curated collection
                    of premium materials transforms spaces into masterpieces. Experience the perfect
                    blend of artistry and functionality, where each surface tells a story of elegance
                    and sophistication.
                </p>
                <div className="pt-4 pb-10 lg:pb-20">
                    <Link
                        to="/"
                        className="inline-flex items-center border border-foreground px-8 py-4 text-foreground hover:bg-foreground hover:text-white transition-colors group"
                    >
                        Visit Our Catalogue
                        <NotebookText className="ms-2" size={20} />
                    </Link>
                </div>
                </div>
            </div>

            <Collections />

            <ProductShowcase />

            <Discover />

            <GetInTouch />
        </div>
    );
};
