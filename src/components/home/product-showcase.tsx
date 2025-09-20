import { useRef } from 'react';
import { Card } from '../ui/card';
import { useNavigate } from 'react-router';
import { LucideArrowRight, LucideArrowLeft } from 'lucide-react';
import { useCompare } from '../common/CompareContext';

const products = [
    { id: 1, title: 'DYNASTY VIEN', category: 'quartz', image: '/products/quartz/LUMINAX SERIES/DYNASTY VIEN/close.png' },
    { id: 2, title: 'SAHARA BEIGE', category: 'marble', image: '/products/marble/CARTIER SERIES/SAHARA BEIGE/close.png' },
    { id: 3, title: 'EMBER BRONZE', category: 'terrazzo', image: '/products/terrazzo/HARSBURG SERIES/EMBER BRONZE/close.png' },
    { id: 4, title: 'COCOA TERRAIN', category: 'quartz', image: '/products/quartz/TOURBILLION SERIES/COCOA TERRAIN/close.png' },
    { id: 5, title: 'BIANCO HALO', category: 'marble', image: '/products/marble/BIANCO SERIES/BIANCO HALO/close.png' },
    { id: 6, title: 'SNOWCRETE', category: 'terrazzo', image: '/products/terrazzo/TERRAZO LUXIA SERIES/SNOWCRETE/close.png' },
    { id: 7, title: 'OCEAN NIGHT', category: 'quartz', image: '/products/quartz/CENTODEICI SERIES/OCEAN NIGHT/close.png' },
    { id: 8, title: 'FROST WHALE', category: 'marble', image: '/products/marble/LUX CARTIER SERIES/FROST WHALE/close.png' },
    { id: 9, title: 'VINTESSA BEIGE', category: 'marble', image: '/products/marble/CARTIER SERIES/VINTESSA BEIGE/close.png' },
    { id: 10, title: 'ELEGENTE BIANCO', category: 'terrazzo', image: '/products/terrazzo/TERRAZO ELEGANTA SERIES/ELEGENTE BIANCO/close.png' }
];

export const ProductShowcase = () => {
    const navigate = useNavigate();
    const { selected, addProduct, removeProduct, isSelected } = useCompare();
    const scrollContainerRef = useRef<HTMLDivElement>(null); // Specify HTMLDivElement type

    // Helper to get Card props for compare
    const getCompareProps = (product: { id: number; title: string; category: string; image: string }) => ({
        isCompared: isSelected(product.title.toUpperCase()),
        onCompareToggle: () => {
            const id = product.title.toUpperCase();
            if (isSelected(id)) {
                removeProduct(id);
            } else {
                addProduct({
                    id,
                    category: product.category,
                    image: product.image,
                    name: product.title,
                });
            }
        },
    });

    // Scroll functions
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -280, // Adjust based on card width
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 280, // Adjust based on card width
                behavior: 'smooth',
            });
        }
    };

    return (
        <section className="py-24 w-full flex justify-center">
            <div className="w-full app-container px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 text-center md:text-left">
                    <h2 className="text-3xl font-playfair mb-10 sm:mb-6">Latest Additions</h2>
                    <p className="text-foreground/60">Discover our newest surface innovations</p>
                </div>

                {/* Scrollable Row */}
                <div className="overflow-x-auto hide-scrollbar" ref={scrollContainerRef}>
                    <div className="flex gap-4 w-max">
                        {products.map((product) => (
                            <div key={product.id} className="flex-shrink-0 w-[180px] sm:w-[220px] md:w-[260px] lg:w-[280px]">
                                <Card
                                    {...product}
                                    onClick={() => navigate(`/products/${encodeURIComponent(product.title.toUpperCase())}?category=${product.category}&series=${product.image.split("/")[3]}`)}
                                    {...getCompareProps(product)}
                                />
                            </div>
                        ))}
                        <div
                            onClick={() => navigate("/products")}
                            className="group relative bg-slate-100 cursor-pointer border border-gray-300 shadow hover:shadow-lg transition overflow-clip flex flex-col items-center justify-center p-8 aspect-[3/4] min-h-[300px] md:min-h-[450px]"
                        >
                            <div className="flex flex-col items-center text-center gap-4">
                                <div className="bg-primary/10 text-primary p-4 rounded-full">
                                    <LucideArrowRight className="w-8 h-8" />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground">
                                    Browse all Products
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="w-full flex justify-end gap-x-5 mt-5">
                    <button
                        onClick={scrollLeft}
                        className="bg-[#f8f6f3] text-black p-4 hover:bg-black/20 transition flex items-center justify-center"
                        aria-label="Previous products"
                    >
                        <LucideArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={scrollRight}
                        className="bg-[#f8f6f3] text-black p-4 hover:bg-black/20 transition flex items-center justify-center"
                        aria-label="Next products"
                    >
                        <LucideArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
};