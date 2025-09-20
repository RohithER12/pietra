import * as React from 'react';
import  { useRef, useState, useEffect } from 'react';

// Lens Component
interface LensProps {
  children: React.ReactNode;
  zoomFactor?: number;
  lensSize?: number;
  isStatic?: boolean;
  ariaLabel?: string;
  className?: string;
}

const Lens = ({ 
  children, 
  zoomFactor = 2, 
  lensSize = 150, 
  isStatic = false, 
  ariaLabel = "Zoom Area",
  className = "" 
}: LensProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      setContainerRect(containerRef.current.getBoundingClientRect());
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
    
    if (containerRect?.width !== rect.width || containerRect?.height !== rect.height) {
      setContainerRect(rect);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const lensStyle = {
    width: lensSize,
    height: lensSize,
    left: mousePosition.x - lensSize / 2,
    top: mousePosition.y - lensSize / 2,
    backgroundImage: containerRef.current 
      ? `url(${(containerRef.current.querySelector('img') as HTMLImageElement)?.src})` 
      : 'none',
    backgroundSize: containerRect 
      ? `${containerRect.width * zoomFactor}px ${containerRect.height * zoomFactor}px`
      : 'cover',
    backgroundPosition: containerRect 
      ? `-${(mousePosition.x * zoomFactor) - (lensSize / 2)}px -${(mousePosition.y * zoomFactor) - (lensSize / 2)}px`
      : 'center',
  };

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={ariaLabel}
    >
      {children}
      
      {(isHovered || isStatic) && (
        <div
          className="absolute pointer-events-none border-2 border-white shadow-lg rounded-full z-50"
          style={lensStyle}
        />
      )}
    </div>
  );
};

// Enhanced Card Component
interface CardProps {
    image: string;
    title: string;
    category?: string;
    onCompareToggle?: () => void;
    isCompared?: boolean;
    onClick?: () => void;
    className?: string;
    // Lens-specific props
    enableLens?: boolean;
    lensZoom?: number;
    lensSize?: number;
}

export const Card = ({
    image,
    title,
    category,
    onCompareToggle,
    isCompared = false,
    onClick,
    className = '',
    enableLens = true,
    lensZoom = 2,
    lensSize = 120,
}: CardProps) => {
    const ImageComponent = () => (
        <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
        />
    );

    return (
        <div
            onClick={onClick}
            className={`group relative bg-white cursor-pointer border border-gray-300 shadow hover:shadow-lg transition-shadow duration-300 ${className} overflow-hidden`}
        >
            {/* Top Labels */}
            <div className="absolute top-4 right-4 z-30 flex justify-between">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onCompareToggle?.();
                    }}
                    className="flex items-center gap-2 text-sm text-foreground/70 bg-gray-800/30 p-2 hover:text-primary transition-colors rounded"
                >
                    <div className={`w-5 h-5 border border-gray-400 ${isCompared ? 'bg-blue-600 border-blue-600' : 'border-white/50'} flex items-center justify-center`}>
                        {isCompared && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </div>
                    <p className="text-white">Compare</p>
                </button>
            </div>

            {/* Image with optional Lens */}
            <div className="aspect-[3/4] min-h-[300px] md:min-h-[450px] relative max-w-full">
                {enableLens ? (
                    <Lens
                        zoomFactor={lensZoom}
                        lensSize={lensSize}
                        isStatic={false}
                        ariaLabel={`Zoom view of ${title}`}
                        className="h-full w-full"
                    >
                        <ImageComponent />
                    </Lens>
                ) : (
                    <ImageComponent />
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="text-base sm:text-xl lowercase font-light text-gray-900">
                    {title}
                </h3>
                {category && (
                    <div className="mt-1 flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-gray-100 text-xs text-gray-700 rounded">
                            {category}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

// Demo showing multiple cards with lens
export const CardGridDemo = () => {
    const sampleProducts = [
        {
            id: '1',
            title: 'URBAN LUX',
            category: 'CENTODEICI SERIES',
            image: 'https://images.unsplash.com/photo-1615870216519-2f9fa05696b0?q=80&w=1000&auto=format&fit=crop',
        },
        {
            id: '2',
            title: 'DESERT HAZEL',
            category: 'HARSBURG SERIES',
            image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1000&auto=format&fit=crop',
        },
        {
            id: '3',
            title: 'VELORA MIST',
            category: 'CARTIER SERIES',
            image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1000&auto=format&fit=crop',
        },
        {
            id: '4',
            title: 'COSMIC GREY',
            category: 'MODERN SERIES',
            image: 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?q=80&w=1000&auto=format&fit=crop',
        }
    ];

    const [comparedItems, setComparedItems] = useState<string[]>([]);

    const toggleCompare = (id: string) => {
        setComparedItems(prev => 
            prev.includes(id) 
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-8">Product Grid with Lens Zoom</h1>
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {sampleProducts.map((product) => (
                        <Card
                            key={product.id}
                            image={product.image}
                            title={product.title}
                            category={product.category}
                            isCompared={comparedItems.includes(product.id)}
                            onCompareToggle={() => toggleCompare(product.id)}
                            onClick={() => console.log(`Clicked on ${product.title}`)}
                            enableLens={true}
                            lensZoom={2.5}
                            lensSize={100}
                        />
                    ))}
                </div>
                {comparedItems.length > 0 && (
                    <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h3 className="font-semibold mb-2">Compared Items ({comparedItems.length})</h3>
                        <div className="flex flex-wrap gap-2">
                            {comparedItems.map(id => (
                                <span key={id} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                                    {sampleProducts.find(p => p.id === id)?.title}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};