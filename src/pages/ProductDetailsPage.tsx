import { useParams, useSearchParams } from "react-router";
import productsData from "../data/products.json";
import comparisonData from "../data/comparison.json";
import { getProductImagePath } from "../utils/getProductImagePath";
import { LucideLayers, LucideRuler, LucideArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import NotFoundPage from "../components/common/404";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

export default function ProductDetailsPage() {
    const navigate = useNavigate();
    const { productId } = useParams();
    const [searchParams] = useSearchParams();
    const category = (searchParams.get("category")?.toLowerCase() || "marble") as string;
    const series = searchParams.get("series")!;

    // Find product existence (for marble/terrazzo: direct, for quartz: in series)
    let found = false;
    found = !!(productsData as any)[category]?.series[series]?.products?.includes(productId!);

    if (!found) {
        return <NotFoundPage />;
    }

    // Get image path
    const image = getProductImagePath(category, productId!, series);

    // Get comparison data
    const characteristics: string[] = comparisonData.characteristics;
    const comparisonRow: string[] | undefined = comparisonData.data[category as keyof typeof comparisonData.data];

    return (
        <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-8 px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto pt-28">
            {/* Image */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                <Zoom>
                    <img
                        src={image}
                        alt={productId}
                        className="shadow-lg max-w-xs w-full h-auto object-cover aspect-[3/4] bg-white border border-gray-200 cursor-zoom-in"
                    />
                </Zoom>
            </div>
            {/* Details */}
            <div className="w-full md:w-1/2 flex flex-col gap-6">
                {/* Back Button */}
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline w-fit mb-2"
                >
                    <LucideArrowLeft size={18} />
                    Back
                </button>
                <p className="text-xs text-gray-500 italic" >
                    Click the product image to view it in detail.
                </p>
                <h5 className="text-xl font-extrabold text-foreground mb-2 capitalize font-playfair ">{productId?.replace(/_/g, " ")}</h5>
                {/* Slab size and Thickness */}
                <div className="flex flex-col gap-2 sm:gap-6 text-base font-light text-foreground/80 mb-2">
                    <div>
                        <span className="font-semibold inline-flex items-center gap-1">Slab size <LucideRuler size={18} /></span>
                        <div className="flex flex-wrap gap-2 mt-1">
                            <span className="inline-block bg-gray-100 border border-gray-300 rounded-xs px-3 py-1 text-sm font-medium">324 cm x 162 cm</span>
                            <span className="inline-block bg-gray-100 border border-gray-300 rounded-xs px-3 py-1 text-sm font-medium">324 cm x 145 cm</span>
                            <span className="inline-block bg-gray-100 border border-gray-300 rounded-xs px-3 py-1 text-sm font-medium">324 cm x 195 cm</span>
                        </div>
                    </div>
                    <div>
                        <span className="font-semibold inline-flex items-center gap-1">Thickness <LucideLayers size={18} /></span>
                        <div className="flex flex-wrap gap-2 mt-1">
                            <span className="inline-block bg-gray-100 border border-gray-300 rounded-xs px-3 py-1 text-sm font-medium">2.0 cm</span>
                            <span className="inline-block bg-gray-100 border border-gray-300 rounded-xs px-3 py-1 text-sm font-medium">3.0 cm</span>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-[320px] w-full border border-gray-200 rounded-lg bg-white text-sm">
                        <thead>
                            <tr className="bg-gray-950/80 text-white">
                                <th className="p-2 text-left font-semibold">Characteristic</th>
                                <th className="p-2 text-left font-semibold bg-gray-400 text-gray-800">{category.charAt(0).toUpperCase() + category.slice(1)}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {characteristics.map((char, idx) => (
                                <tr key={char} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                    <td className="p-2 border-t border-gray-200 ">{char}</td>
                                    <td className="p-2 border-t border-gray-200 font-light">{comparisonRow ? comparisonRow[idx] : "-"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
