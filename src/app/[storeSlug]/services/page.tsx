"use client";

import { useTenant } from '@/lib/tenant-context';
import { Wrench, Car, Search, PenTool } from 'lucide-react';

export default function ServicesPage() {
    const { tenant } = useTenant();
    const services = tenant?.services || [];

    // Map string icon names to Lucide components
    const getIcon = (iconName: string) => {
        const icons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = { Wrench, Car, Search, PenTool };
        const Icon = icons[iconName] || Wrench;
        return <Icon size={32} />;
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Hero */}
            <section className="bg-slate-900 text-white py-12 md:py-16">
                <div className="container-custom text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        More than just parts. We provide comprehensive automotive solutions.
                    </p>
                </div>
            </section>

            <section className="py-12">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex gap-6 hover:shadow-xl transition-all duration-300 group">
                                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    {getIcon(service.icon)}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
                                    <p className="text-slate-600 leading-relaxed mb-4">
                                        {service.description}
                                    </p>
                                    <a href={service.linkUrl || '#'} className="text-blue-600 font-bold text-sm uppercase tracking-wide">
                                        {service.linkText || 'Learn More'}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
