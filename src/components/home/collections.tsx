import { useNavigate } from "react-router";

const categories = [
    {
        title: "Quartz",
        description:
            "Discover our collection of exquisite natural marble, featuring unique patterns and timeless elegance.",
        image: "/products/quartz/CENTODEICI SERIES/URBAN LUX/close.png",
    },
    {
        title: "Terrazzo",
        description:
            "Engineered for perfection, our artificial stone surfaces combine durability with consistent, sophisticated designs.",
        image: "/products/terrazzo/HARSBURG SERIES/DESERT HAZEL/close.png",
    },
    {
        title: "Marble",
        description:
            "Experience the rare beauty of exotic quartzite, offering unparalleled strength and natural sophistication.",
        image: "/products/marble/CARTIER SERIES/VELORA MIST/close.png",
    },
];

export const Collections = () => {
    const navigate = useNavigate();

    return (
        <section className="w-full flex justify-center">
            <div className="app-container py-12 px-4 sm:px-6 md:px-8 lg:px-0">
                {/* Section Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-medium font-playfair text-foreground mb-6">
                        Our Collections
                    </h2>
                    <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
                        Explore our curated selection of exceptional surfaces, each crafted
                        to elevate your space.
                    </p>
                </div>

                {/* Responsive Flex Layout */}
                <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(`/products?category=${category.title}`)}
                            className="group relative overflow-hidden shadow cursor-pointer h-[180px] xs:h-[220px] sm:h-[260px] md:h-[320px] lg:h-[360px] w-[180px] xs:w-[200px] sm:w-[240px] md:w-[320px] lg:w-[360px]"
                        >
                            {/* Image */}
                            <div className="relative h-full">
                                <div className="absolute inset-0 bg-black/40 transition-colors duration-500 z-10" />
                                <img
                                    src={category.image}
                                    alt={category.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            {/* Content */}
                            <div className="absolute inset-0 z-20 p-4 sm:p-8 flex flex-col justify-end">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-light text-white mb-2">
                                    {category.title}
                                </h3>
                                {category.description && (
                                    <p className="text-white/90 transition-transform duration-500 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 text-xs sm:text-base">
                                        {category.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
