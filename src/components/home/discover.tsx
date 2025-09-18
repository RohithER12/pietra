import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const Discover = () => {
    const [open, setOpen] = useState('sample');

    const toggle = (key: string) => {
        setOpen(prev => (prev === key ? '' : key));
    };

    return (
        <section className="flex flex-col md:flex-row w-full">
            {/* Left: Image (hidden on small screens) */}
            <div className="hidden md:block w-full md:w-1/2 h-[500px] md:h-auto">
                <img
                    // src="https://cdn.prod.website-files.com/62dbfeb613ffea804c16a1a2/6732604eaec256c95a7c4028_6552982612c1f908939d9b7f_Azure-Cosentino-Silestone-Le-Chic-Collection-Spec-Sheets-09.webp"
                    src='/pietra2.jpg'
                    alt="Person with countertop"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right: Content */}
            <div className="w-full md:w-1/2 bg-[#f8f6f3] px-6 sm:px-12 lg:px-20 py-16 space-y-8">
                <div>
                    <h2 className="text-3xl md:text-4xl font-playfair mb-4 leading-[2]">
                        See your countertops <br /> come to life
                    </h2>
                    <p className="text-gray-700 max-w-md">
                        Discover user-friendly tools that will help you browse our collections, samples and
                        visualize colors that arouse your curiosity, and select your perfect countertops.
                    </p>
                </div>

                {/* Accordions */}
                <div className="space-y-4">
                    {/* Accordion Item 1 */}
                    <div>
                        <button
                            onClick={() => toggle('view')}
                            className="flex justify-between w-full py-4 text-lg border-b border-gray-300 "
                        >
                            View in your room
                            <ChevronDown className="w-5 h-5" />
                        </button>
                        {open === 'view' && (
                            <div className="py-2 text-sm text-gray-600">AR tool coming soon.</div>
                        )}
                    </div>

                    {/* Accordion Item 2 */}
                    <div>
                        <button
                            onClick={() => toggle('buy')}
                            className="flex justify-between w-full py-4 text-lg border-b border-gray-300 "
                        >
                            Where to Buy
                            <ChevronDown className="w-5 h-5" />
                        </button>
                        {open === 'buy' && (
                            <div className="py-2 text-sm text-gray-600">Find local dealers and showrooms.</div>
                        )}
                    </div>

                    {/* Accordion Item 3 */}
                    <div>
                        <button
                            onClick={() => toggle('sample')}
                            className="flex justify-between w-full py-4 text-lg border-b border-gray-300 "
                        >
                            Order Sample
                            <ChevronUp className="w-5 h-5 text-orange-500" />
                        </button>
                        {open === 'sample' && (
                            <div className="py-4 space-y-4 text-gray-700 text-sm">
                                <p>
                                    Get a taste of your new countertop with our sample kit. Choose colors that suit
                                    your space and feel the texture firsthand.
                                </p>
                            </div>
                        )}
                    </div>

                    <button className="border border-black px-6 py-4 text-sm font-medium inline-flex items-center hover:bg-black hover:text-white transition">
                        Choose Color & Order
                        <span className="ml-2">→</span>
                    </button>
                </div>
            </div>
        </section>
    );
};
