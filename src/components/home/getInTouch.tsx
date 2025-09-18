import { LucidePhone } from "lucide-react";
import { Link } from "react-router";

export const GetInTouch = () => {
    return (
        <section className="py-18 px-4 sm:px-6 md:px-8 bg-white flex justify-center">
            <div className="app-container">
                <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Left Side - Text Content */}
                    <div className="space-y-6 max-w-xl w-full">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light font-playfair mb-14">
                            Get in Touch
                        </h2>
                        <p className="text-base sm:text-lg text-foreground/70">
                            Schedule a consultation with our expert team. Whether you're looking to enhance your
                            space with marble, artificial stone, or quartzite, we're here to guide you through
                            the selection process.
                        </p>
                        <div className="pt-4">
                            <Link
                                to="#"
                                className="inline-flex items-center border border-foreground px-6 sm:px-8 py-3 sm:py-4 text-foreground hover:bg-foreground hover:text-white transition-colors group w-full sm:w-auto justify-center"
                            >
                                <LucidePhone className="me-2" size={20} />
                                Contact Us
                            </Link>
                        </div>
                    </div>

                    {/* Right Side - Images */}
                    <div className="hidden md:grid grid-cols-2 gap-2 sm:gap-4 h-full w-full max-w-xs sm:max-w-md md:max-w-none mx-auto">
                        <div className="aspect-[3/4]">
                            <img
                                src="https://plus.unsplash.com/premium_photo-1681449856420-66f536b9aa40?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBob25lJTIwb24lMjB0YWJsZXxlbnwwfHwwfHx8MA%3D%3D"
                                alt="Surface Sample"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="aspect-[3/4] flex items-end">
                            <img
                                src="https://images.unsplash.com/photo-1654289586293-d1a10366b916?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291bnRlcnRvcCUyMG1hcmJsZXxlbnwwfHwwfHx8MA%3D%3D"
                                alt="Consultation"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
