import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { SearchIcon, X } from 'lucide-react';
import productsData from '../../data/products.json';
import { getProductImagePath } from '../../utils/getProductImagePath';

// Type definitions for products data
type SeriesData = {
    path: string;
    products: string[];
};

type CategoryData = {
    id: string;
    path: string;
    series: Record<string, SeriesData>;
};

type ProductData = {
    [key: string]: CategoryData;
};

// Flatten products from JSON data
function getFlattenedProducts() {
    const products: Array<{
        id: string;
        name: string;
        category: string;
        series?: string;
        image: string;
    }> = [];

    Object.entries(productsData as ProductData).forEach(([category, categoryData]) => {
        Object.entries(categoryData.series).forEach(([seriesName, seriesData]) => {
            seriesData.products.forEach((productName) => {
                products.push({
                    id: productName,
                    name: productName.replace(/_/g, ' '),
                    category,
                    series: seriesName,
                    image: getProductImagePath(category, productName, seriesName)
                });
            });
        });
    });

    return products;
}

const searchProducts = getFlattenedProducts();

// Fuzzy search function
function fuzzySearch(searchTerm: string, productName: string): boolean {
    const search = searchTerm.toLowerCase();
    const name = productName.toLowerCase();

    let searchIndex = 0;
    for (let i = 0; i < name.length && searchIndex < search.length; i++) {
        if (name[i] === search[searchIndex]) {
            searchIndex++;
        }
    }

    return searchIndex === search.length;
}

export const SearchBar = ({ isFocused, setIsFocused }: { isFocused: boolean, setIsFocused: (v: boolean) => void }) => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [results, setResults] = useState<typeof searchProducts>([]);
    const navigate = useNavigate();
    const searchRef = useRef<HTMLDivElement>(null);

    // Close search on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setIsFocused(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setIsFocused]);

    // Search functionality
    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }

        const filtered = searchProducts.filter(product =>
            fuzzySearch(query, product.name)
        ).slice(0, 6); // Limit to 6 results

        setResults(filtered);
    }, [query]);

    const handleProductClick = (product: typeof searchProducts[0]) => {
        const url = product.series
            ? `/products/${encodeURIComponent(product.id)}?category=${product.category}&series=${product.series}`
            : `/products/${encodeURIComponent(product.id)}?category=${product.category}`;

        navigate(url);
        setQuery('');
        setIsOpen(false);
        setIsFocused(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            setIsOpen(false);
            setQuery('');
            setIsFocused(false);
        }
    };

    return (
        <div ref={searchRef} className={`relative ${isFocused ? "max-w-72 w-full px-3 md:w-auto" : ""}  justify-end`}>
            <div className={`flex items-center md:border justify-center px-2 space-x-0 transition-all duration-300 ${isFocused ? 'md:w-auto w-full border' : 'w-fit md:w-auto'}`}>
                <SearchIcon size={20} className={`flex-shrink-0 cursor-pointer`}
                    onClick={() => {
                        setIsFocused(true);
                        setIsOpen(true);
                    }}
                />
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => {
                        setIsFocused(true);
                        setIsOpen(true);
                    }}
                    onBlur={() => {
                        setQuery("");
                        setIsFocused(false);
                    }}
                    onKeyDown={handleKeyDown}
                    className={`border-none inline-block py-2 text-sm outline-none transition-all duration-300 ${isFocused ? 'w-full px-4' : 'w-0 md:w-32'} overflow-hidden`}
                />
                {query && (
                    <button
                        onClick={() => {
                            setQuery('');
                            setResults([]);
                        }}
                        className="p-1 hover:bg-gray-100 rounded flex-shrink-0"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            {/* Search Results Dropdown */}
            {isOpen && (query.trim() !== '' || results.length > 0) && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 shadow-lg z-50 max-h-80 overflow-y-auto">
                    {results.length > 0 ? (
                        <div className="py-2">
                            {results.map((product) => (
                                <button
                                    key={product.id}
                                    onClick={() => handleProductClick(product)}
                                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left cursor-pointer"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-12 h-16 object-cover border border-gray-400"
                                    />
                                    <div className="flex-1">
                                        <div className="font-medium text-sm text-foreground">
                                            {product.name}
                                        </div>
                                        <div className="text-xs text-foreground/60 capitalize">
                                            {product.category}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : query.trim() !== '' ? (
                        <div className="px-4 py-3 text-sm text-foreground/60">
                            No products found
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
}; 