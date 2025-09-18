import { useCompare } from '../components/common/CompareContext';
import comparisonData from '../data/comparison.json';
import { useNavigate } from 'react-router';
import { LucideArrowLeft, LucideHome, LucideX } from 'lucide-react';

// Custom comparison card component
const ComparisonCard = ({ product, onRemove }: { product: any; onRemove: () => void }) => (
    <div className="relative bg-white border border-gray-300 shadow overflow-clip w-40 md:w-48 flex-shrink-0">
        {/* Close Button */}
        <button
            className="absolute top-2 right-2 z-20 text-gray-400 hover:text-red-500 bg-white/80 rounded-full p-1"
            onClick={onRemove}
            title="Remove from comparison"
        >
            <LucideX size={16} />
        </button>

        {/* Image */}
        <div className="aspect-[3/4] min-h-[300px] relative max-w-full">
            <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
            />
        </div>

        {/* Content */}
        <div className="p-4">
            <h3 className="text-lg font-medium text-foreground capitalize">
                {product.name.replace(/_/g, ' ')}
            </h3>
            <div className="mt-1 flex items-center gap-2">
                <span className="px-2 py-0.5 bg-surface text-xs capitalize">
                    {product.category}
                </span>
            </div>
        </div>
    </div>
);

export default function ComparisonPage() {
    const { selected, removeProduct, clear } = useCompare();
    const navigate = useNavigate();
    const characteristics: string[] = comparisonData.characteristics;

    if (selected.length < 2) {
        return (
            <div className="w-full py-20 h-[80vh] grid place-content-center text-center text-xl font-playfair font-light">
                Select at least 2 products to compare.
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="inline-flex items-center gap-2 text-base font-sans cursor-pointer text-primary rounded mx-auto py-6 hover:underline"
                >
                    <LucideArrowLeft size={18} />
                    Go to Home
                </button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24 flex flex-col gap-8">
            <h1 className="text-3xl font-bold text-foreground mb-4 text-center font-playfair">Product Comparison</h1>
            {/* Product Cards Row */}
            <div className={`flex flex-row sm:justify-center gap-2 sm:gap-4 md:gap-6 mb-6 scrollbar-track-hide ${selected.length === 3 ? 'overflow-x-auto' : ''}`}>
                {selected.map((product) => (
                    <ComparisonCard
                        key={product.id}
                        product={product}
                        onRemove={() => removeProduct(product.id)}
                    />
                ))}
            </div>
            {/* Comparison Table */}
            <div className="overflow-x-auto">
                <table className="min-w-[400px] w-full border border-gray-200 rounded-lg bg-white text-sm">
                    <thead>
                        <tr className="bg-gray-950/80 text-white">
                            <th className="p-2 text-left font-semibold w-1/4">Characteristic</th>
                            {selected.map((product, index) => (
                                <th key={product.id} className="p-2 text-center font-semibold w-1/4 bg-gray-400 text-gray-800">{product.name.replace(/_/g, ' ')}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {characteristics.map((char, idx) => (
                            <tr key={char} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                <td className="p-2 border-t border-gray-200 font-medium">{char}</td>
                                {selected.map((product) => {
                                    // Use category to get the value from comparisonData
                                    const row = comparisonData.data[product.category];
                                    return (
                                        <td key={product.id} className="p-2 border-t border-gray-200 text-center font-light">{row ? row[idx] : '-'}</td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-6 gap-4">

                <button
                    type="button"
                    onClick={() => {
                        clear();
                        navigate(-1);
                    }}
                    className="inline-flex items-center gap-2 text-sm text-primary rounded px-5 py-2 cursor-pointer hover:underline"
                >
                    <LucideHome size={18} />
                    Clear results & Go Home
                </button>
            </div>
        </div>
    );
} 