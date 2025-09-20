import { useQueryParam } from '../hooks/useQueryParam';
import { Card } from '../components/ui/card';
import productsData from '../data/products.json';
import { useNavigate } from 'react-router';
import { getProductImagePath } from '../utils/getProductImagePath';
import { useCompare } from '../components/common/CompareContext';

type ProductData = typeof productsData;
type Category = 'marble' | 'quartz' | 'terrazzo';

interface SeriesData {
    path: string;
    products: string[];
}

interface CategoryData {
    path: string;
    id: string;
    series: Record<string, SeriesData>;
}

export default function ProductsPage() {
    const category = (useQueryParam('category')?.toLowerCase() || 'quartz') as Category;
    const navigate = useNavigate();

    const categoryData = productsData[category] as CategoryData;

    if (!categoryData) {
        return <div className="app-container py-20 text-center text-xl">Category not found</div>;
    }

    const categories = [
        {
            title: "quartz",
            description: "Engineered perfection with consistent designs",
            image: "/products/quartz/CENTODEICI SERIES/URBAN LUX/close.png",
        },
        {
            title: 'terrazzo',
            description: "Contemporary style with timeless appeal",
            image: "/products/terrazzo/HARSBURG SERIES/DESERT HAZEL/close.png",
        },
        {
            title: 'marble',
            description: "Natural elegance with unique patterns",
            image: "/products/marble/CARTIER SERIES/VELORA MIST/close.png",
        },
    ];

    const { selected, addProduct, removeProduct, isSelected } = useCompare();

    // Helper to get Card props for compare
    const getCompareProps = (product: string, image: string, category: string, series?: string) => ({
        isCompared: isSelected(product),
        onCompareToggle: () => {
            if (isSelected(product)) {
                removeProduct(product);
            } else {
                addProduct({
                    id: product,
                    category,
                    series,
                    image,
                    name: product,
                });
            }
        },
    });

    return (
        <div className="w-full flex flex-col items-center px-4 sm:px-6 lg:px-8 py-10">

            {/* Category Selector */}
            <div className="w-full max-w-7xl mb-16 mt-20 font-amsterdam-one">
                <div className="flex flex-row gap-3 sm:gap-6 items-center justify-center px-4">
                    {categories.map((cat) => (
                        <div
                            key={cat.title}
                            onClick={() => navigate(`/products?category=${cat.title}`)}
                            className={`group relative overflow-hidden cursor-pointer
                                h-[80px] w-[100px] sm:h-[120px] sm:w-[240px] shadow-lg transition-transform duration-300 hover:scale-[1.02]
                                ${category === cat.title ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                        >
                            <div className="relative h-full">
                                <div className={`absolute inset-0 transition-colors duration-500 z-10 
                                    ${category === cat.title ? 'bg-black/30' : 'bg-black/50 group-hover:bg-black/40'}`}
                                />
                                <img
                                    src={cat.image}
                                    alt={cat.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute inset-0 z-20 p-2 sm:p-4 flex flex-col justify-center items-center text-center">
                                <h3 className="text-base sm:text-xl font-light text-white mb-0 sm:mb-1">{cat.title}</h3>
                                <p className="text-white/90 text-xs sm:text-sm font-light hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {cat.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Products Display */}
            <div className="max-w-7xl w-full ">
                {
                    <>
                        {Object.entries(categoryData.series).map(([seriesName, seriesData]) => (
                            <div key={seriesName} className="mb-12">
                                <h2 className="text-2xl font-bold mb-6 ">{seriesName}</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {seriesData.products.map((product: string) => (
                                        <Card
                                            key={product}
                                            image={getProductImagePath(category, product, seriesName)}
                                            title={product}
                                            category={seriesName}
                                            onClick={() =>
                                                navigate(`/products/${product}?category=${category}&series=${seriesName}`)
                                            }
                                            // Enable lens with custom settings
                                            enableLens={true}
                                            lensZoom={2.5}
                                            lensSize={120}
                                            {...getCompareProps(product, getProductImagePath(category, product, seriesName), category, seriesName)}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </>
                }
            </div>
        </div>
    );
}