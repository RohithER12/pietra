
import { useState, useEffect, useRef } from 'react';
import { CarouselSlide } from './carousel-slide';

const slides = [
    {
        image: 'https://www.bhg.com/thmb/EBW8T0mSn-hq1dWUhzaJzk_ddy4=/4000x0/filters:no_upscale():strip_icc()/CarenRideau_MeghanBobPhoto_KitchenOverallTight_r1_C66iYYPaacYBtOIqMkgLla-9723eb8004694c17b3a95acbdf96e46c.jpg',
        title: 'Modern Luxury Living',
        description: 'Transform your space with our exceptional stone craftsmanship.'
    },
    {
        image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.msisurfaces.com%2Fimages%2Fquartz-countertops%2Fproducts%2Froomscenes%2Fxl-large%2Fmystic-gray-quartz-countertop.jpg&f=1&nofb=1&ipt=3ea24353032d872e0a73935e8500f53e68d3765ddf979a9c154a2a4662e0ab21',
        title: 'Timeless Elegance in Stone',
        description: 'Discover our curated collection of premium marble and granite surfaces.'
    },
    
    {
        image: '/banner3.png',
        title: 'Nature\'s Finest Selection',
        description: 'Each piece tells a unique story of natural beauty and sophistication.'
    },
    {
        image: 'https://www.realsimple.com/thmb/hR-1Dx51eSvItw-AYCwQcY-AGVk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/lakedale-kitchen-design-001-24-db9d5d83c8b84337934db25d0d388623.jpg',
        title: 'Bespoke Surface Solutions',
        description: 'Tailored to your vision, crafted for lasting impressions.'
    }
];

export const HeroCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [progress, setProgress] = useState(0); // 0-100
    const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const duration = 5000; // ms
    const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const heroSectionRef = useRef<HTMLDivElement>(null);

    // Autoplay logic (never stops)
    useEffect(() => {
        setProgress(0);
        if (progressRef.current) clearInterval(progressRef.current);
        let start = Date.now();
        progressRef.current = setInterval(() => {
            const elapsed = Date.now() - start;
            setProgress(Math.min(100, (elapsed / duration) * 100));
            if (elapsed >= duration) {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
                start = Date.now();
                setProgress(0);
            }
        }, 30);
        return () => {
            if (progressRef.current) clearInterval(progressRef.current);
        };
    }, [currentSlide]);

    // Click on index: jump to slide, autoplay continues
    const handleIndexClick = (idx: number) => {
        setCurrentSlide(idx);
        setProgress(0);
    };

    return (
        <div className="relative h-screen" ref={heroSectionRef}>
            {/* Slides */}
            {slides.map((slide, index) => (
                <CarouselSlide
                    key={index}
                    active={currentSlide === index}
                    {...slide}
                />
            ))}

            {/* Glassmorphic Index Bar (full width, small height, flex row, no rounded corners) */}
            <div className="absolute bottom-0 left-0 z-30 w-full flex justify-center items-end px-0 pb-0">
                <div className="backdrop-blur-md bg-white/20 border-t divide-x-[1px] divide-white/40 border-white/20 shadow-lg flex flex-row w-full max-w-full h-20 overflow-x-auto scrollbar-hide md:overflow-x-visible">
                    {slides.map((slide, idx) => (
                        <button
                            key={idx}
                            ref={el => { btnRefs.current[idx] = el; }}
                            onClick={() => handleIndexClick(idx)}
                            className={`transition-all flex-shrink-0 h-full min-w-[200px] md:flex-1 px-4 py-2 text-center font-playfair text-base md:text-lg  ${currentSlide === idx ? 'bg-white/30 text-white font-bold shadow-lg' : 'text-white/80 hover:bg-white/10'}`}
                            style={{backdropFilter: 'blur(8px)', borderRadius: 0}}
                        >
                            <div className="truncate w-full ">{slide.title}</div>
                            {/* Progress bar for active */}
                            {currentSlide === idx && (
                                <div className="mt-2 h-1 w-full bg-white/30 overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-primary to-white transition-all"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
//
