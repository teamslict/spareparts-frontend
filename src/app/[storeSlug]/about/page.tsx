"use client";

import { useTenant } from '@/lib/tenant-context';
import { Users, Award, Truck, HeadphonesIcon } from 'lucide-react';

export default function AboutPage() {
    const { tenant } = useTenant();

    return (
        <div className="bg-slate-50 min-h-screen pb-12">
            {/* Hero */}
            <section className="bg-slate-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">About {tenant?.storeName || 'Us'}</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Your trusted source for premium automotive parts and accessories. Driving quality and performance since our inception.
                    </p>
                </div>
            </section>

            {/* Story */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-slate-900 mb-8">Our Story</h2>
                        <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                            {tenant?.aboutUs?.story ? (
                                <p>{tenant.aboutUs.story}</p>
                            ) : (
                                <>
                                    <p>
                                        Welcome to {tenant?.storeName || 'our store'}, where passion for automobiles meets exceptional service.
                                        We established this business with a clear mission: to provide vehicle owners and enthusiasts with
                                        the highest quality spare parts and accessories available in the market.
                                    </p>
                                    <p>
                                        We understand that your vehicle is more than just a mode of transport—it&apos;s an investment and a passion.
                                        That&apos;s why we meticulously select our inventory, partnering with reputable manufacturers to ensure
                                        every part we sell meets rigorous standards of durability and performance.
                                    </p>
                                </>
                            )}

                            {tenant?.aboutUs?.mission && (
                                <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
                                    <h3 className="text-xl font-bold text-blue-900 mb-2">Our Mission</h3>
                                    <p className="text-blue-800">{tenant.aboutUs.mission}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-white border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {(tenant?.aboutUs?.stats || [
                            { label: 'Happy Customers', value: '10k+', icon: 'Users' },
                            { label: 'Quality Guarantee', value: '100%', icon: 'Award' },
                            { label: 'Island-wide Delivery', value: 'Fast', icon: 'Truck' },
                            { label: 'Expert Support', value: '24/7', icon: 'HeadphonesIcon' }
                        ]).map((stat, idx) => {
                            const icons: Record<string, React.ComponentType<{ className?: string }>> = { Users, Award, Truck, HeadphonesIcon };
                            const Icon = stat.icon ? (icons[stat.icon] || Award) : Award;

                            return (
                                <div key={idx} className="text-center group">
                                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                                        <Icon size={32} className="text-blue-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <p className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</p>
                                    <p className="text-slate-500 font-medium">{stat.label}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-slate-900 text-center mb-16">Why Choose Us?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {(tenant?.aboutUs?.values || [
                            {
                                title: "Quality You Can Trust",
                                desc: "We refuse to compromise on quality. Every product in our catalog is verified for authenticity and performance standards."
                            },
                            {
                                title: "Fair Pricing",
                                desc: "Premium parts shouldn't cost a fortune. We work directly with distributors to offer you the most competitive prices in the market."
                            },
                            {
                                title: "Technical Expertise",
                                desc: "Our team isn't just salespeople; we are automotive enthusiasts and experts who understand exactly what your vehicle needs."
                            }
                        ]).map((item, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
