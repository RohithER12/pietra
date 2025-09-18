import { LucideUsers, LucideTarget, LucideAward, LucideGlobe } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function AboutPage() {
    const navigate = useNavigate();
    
    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-28">
            {/* Hero Section */}
            <div className="text-center mt-6">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground  font-playfair">
                    About Pietra Surfaces
                </h1>
                <p className="text-xl mt-14 text-foreground/70 max-w-3xl mx-auto leading-relaxed">
                    Since 1987, we've been crafting exceptional surface solutions that transform spaces into masterpieces.
                    Our commitment to quality, innovation, and timeless design has made us a trusted name in premium materials.
                </p>
            </div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-12 mb-20 mt-4">
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                        <LucideTarget className="w-8 h-8 text-primary" />
                        <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
                    </div>
                    <p className="text-foreground/80 leading-relaxed">
                        To provide architects, designers, and homeowners with the finest surface materials that combine
                        aesthetic excellence with functional durability. We believe every space deserves to be extraordinary.
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                        <LucideGlobe className="w-8 h-8 text-primary" />
                        <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
                    </div>
                    <p className="text-foreground/80 leading-relaxed">
                        To be the leading provider of premium surface solutions, setting industry standards for quality,
                        innovation, and customer satisfaction while maintaining our commitment to sustainable practices.
                    </p>
                </div>
            </div>

            {/* Company History */}
            <div className="mb-20">
                <h2 className="text-3xl font-bold text-foreground mb-8 text-center font-playfair">Our Journey</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                            <span className="text-2xl font-bold text-primary">1987</span>
                        </div>
                        <h3 className="text-xl font-semibold text-foreground">Foundation</h3>
                        <p className="text-foreground/70">
                            Pietra Surfaces was established with a vision to bring the world's finest natural and engineered
                            surfaces to discerning clients.
                        </p>
                    </div>

                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                            <span className="text-2xl font-bold text-primary">2005</span>
                        </div>
                        <h3 className="text-xl font-semibold text-foreground">Expansion</h3>
                        <p className="text-foreground/70">
                            Expanded our portfolio to include premium quartz and terrazzo surfaces, becoming a comprehensive
                            surface solutions provider.
                        </p>
                    </div>

                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                            <span className="text-2xl font-bold text-primary">Today</span>
                        </div>
                        <h3 className="text-xl font-semibold text-foreground">Innovation</h3>
                        <p className="text-foreground/70">
                            Leading the industry with cutting-edge designs, sustainable practices, and unmatched customer
                            service across all our product lines.
                        </p>
                    </div>
                </div>
            </div>

            {/* Values */}
            <div className="mb-20">
                <h2 className="text-3xl font-bold text-foreground mb-12 text-center font-playfair">Our Values</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="text-center space-y-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                            <LucideAward className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">Quality</h3>
                        <p className="text-sm text-foreground/70">
                            We never compromise on quality, ensuring every product meets our exacting standards.
                        </p>
                    </div>

                    <div className="text-center space-y-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                            <LucideUsers className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">Service</h3>
                        <p className="text-sm text-foreground/70">
                            Exceptional customer service is at the heart of everything we do.
                        </p>
                    </div>

                    <div className="text-center space-y-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                            <LucideTarget className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">Innovation</h3>
                        <p className="text-sm text-foreground/70">
                            We continuously innovate to bring you the latest in surface technology and design.
                        </p>
                    </div>

                    <div className="text-center space-y-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                            <LucideGlobe className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">Sustainability</h3>
                        <p className="text-sm text-foreground/70">
                            Committed to environmental responsibility in all our operations and product offerings.
                        </p>
                    </div>
                </div>
            </div>


            {/* CTA Section */}
            <div className="text-center bg-gray-50 rounded-lg p-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Transform Your Space?</h2>
                <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
                    Discover our extensive collection of premium surfaces and let us help you create
                    the perfect environment for your project.
                </p>
                <button
                    className="text-primary px-8 py-3 font-semibold hover:bg-black border border-accent cursor-pointer transition-colors"
                    onClick={()=>navigate("/products")}
                >
                    Explore Our Products
                </button>
            </div>
        </div>
    );
} 