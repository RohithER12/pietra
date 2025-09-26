import { useRef } from 'react';

export const HeroCarousel = () => {
    const heroSectionRef = useRef<HTMLDivElement>(null);

    return (
        <div className="relative mt-20 lg:mt-0 h-[230px] md:h-[430px] lg:h-screen overflow-hidden" ref={heroSectionRef}>
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full">
                <iframe
                    src="https://player.cloudinary.com/embed/?cloud_name=dzdd3tw0y&public_id=Ultra_Luxury_Modern_House_Tour_Drone_Cinematic_Walkthrough_in_8K_UHD_-_Limitless_Drive_1080p_h264_youtube_kkpdh1&profile=cld-default&autoplay=true&loop=true&muted=true&controls=false"
                    className="w-full h-full object-cover"
                    style={{ 
                        border: 'none',
                        width: '100%',
                        height: '100%',
                        minWidth: '100%',
                        minHeight: '100%'
                    }}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="Hero Video"
                />
            </div>

            {/* Optional Overlay Content */}
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10">
                <div className="text-center text-white max-w-4xl mx-auto px-4 pt-2 lg:pt-0">
                    <h1 className="text-2xl md:text-6xl lg:text-7xl font-bold mb-6 font-playfair">
                        Modern Luxury Living
                    </h1>
                    <p className="text-base font-light md:text-2xl mb-8 opacity-90 md:pt-7 lg:pt-10">
                        Transform your space with our exceptional stone craftsmanship
                    </p>
                    <button className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-5 lg:px-8 py-3 lg:py-4 text-sm lg:text-lg font-semibold hover:bg-white/30 transition-all duration-300">
                        Explore Our Collection
                    </button>
                </div>
            </div>
        </div>
    );
};