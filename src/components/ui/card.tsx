import * as React from 'react';
import { Lens } from './lens';

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

export const Card: React.FC<CardProps> = ({
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
}) => {
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
                <h3 className="text-base sm:text-xl lowercase font-amsterdam-one font-light text-foreground">
                    {title}
                </h3>
                {category && (
                    <div className="mt-1 flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-surface text-xs">
                            {category}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};