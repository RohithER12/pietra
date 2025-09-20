interface CardProps {
    image: string;
    title: string;
    category?: string;
    onCompareToggle?: () => void;
    isCompared?: boolean;
    onClick?: () => void;
    className?: string;
}

export const Card = ({
    image,
    title,
    category,
    onCompareToggle,
    isCompared = false,
    onClick,
    className = '',
}: CardProps) => {


    return (
        <div
            onClick={onClick}
            className={`group relative bg-white cursor-pointer border border-gray-300 shadow ${className} overflow-clip`}
        >
            {/* Top Labels */}
            <div className="absolute top-4 right-4 z-20 flex justify-between">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onCompareToggle?.();
                    }}
                    className="flex items-center gap-2 text-sm text-foreground/70 bg-gray-800/30 p-2 hover:text-primary transition-colors"
                >
                    <div className={`w-5 h-5 border border-gray-400 ${isCompared ? 'bg-primary border-primary' : 'border-white/50'} flex items-center justify-center`}>
                        {isCompared && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </div>
                    <p className="text-white">Compare</p>
                </button>
            </div>

            {/* Image */}
            <div className="aspect-[3/4] min-h-[300px] md:min-h-[450px] relative max-w-full">
                <img
                    src={image}
                    alt={title}
                    className="h-full object-cover"
                />
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
