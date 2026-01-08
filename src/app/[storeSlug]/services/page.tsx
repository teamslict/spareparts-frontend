"use client";

import { useTenant } from '@/lib/tenant-context';
import { Wrench, Car, Search, PenTool } from 'lucide-react';
import { Section, Surface } from '@/components/ui';

export default function ServicesPage() {
    const { tenant } = useTenant();

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero */}
            <Section className="bg-slate-900 text-white text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                    More than just parts. We provide comprehensive automotive solutions.
                </p>
            </Section>

            <Section>
                <div className="grid md:grid-cols-2 gap-8">

                    <Surface padding="lg" className="flex gap-6 hover:shadow-xl transition-all duration-300 group">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <Search size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Parts Consultation</h3>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Not sure which part fits your vehicle? Our experts use official catalogs to verify compatibility using your chassis number, ensuring 100% fitment accuracy.
                            </p>
                            <span className="text-blue-600 font-bold text-sm uppercase tracking-wide">Free Service</span>
                        </div>
                    </Surface>

                    <Surface padding="lg" className="flex gap-6 hover:shadow-xl transition-all duration-300 group">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <Car size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Special Orders</h3>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Looking for a rare JDM part or a specific European component? We can special order directly from manufacturers in Japan, Thailand, and Europe.
                            </p>
                            <span className="text-blue-600 font-bold text-sm uppercase tracking-wide">Request Quote</span>
                        </div>
                    </Surface>

                    <Surface padding="lg" className="flex gap-6 hover:shadow-xl transition-all duration-300 group">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <Wrench size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Installation Support</h3>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                We partner with a network of trusted garages. Purchase parts from us and get recommended to certified mechanics for professional installation.
                            </p>
                            <span className="text-blue-600 font-bold text-sm uppercase tracking-wide">Ask Us</span>
                        </div>
                    </Surface>

                    <Surface padding="lg" className="flex gap-6 hover:shadow-xl transition-all duration-300 group">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <PenTool size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Wholesale Supply</h3>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Running a garage or fleet? We offer special B2B pricing and bulk supply agreements for continuous business partners.
                            </p>
                            <span className="text-blue-600 font-bold text-sm uppercase tracking-wide">Join Program</span>
                        </div>
                    </Surface>

                </div>
            </Section>
        </div>
    );
}
