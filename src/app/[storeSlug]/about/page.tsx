"use client";

import { useTenant } from '@/lib/tenant-context';
import { Users, Award, Truck, HeadphonesIcon, Target } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    const { tenant } = useTenant();

    const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
        Users, Award, Truck, HeadphonesIcon, Target
    };

    const stats = tenant?.aboutUs?.stats || [
        { label: 'Happy Customers', value: '1000+', icon: 'Users' },
        { label: 'Genuine Parts', value: '100%', icon: 'Award' },
        { label: 'Island-wide Delivery', value: 'Fast', icon: 'Truck' },
        { label: 'Expert Support', value: '24/7', icon: 'HeadphonesIcon' }
    ];

    const values = tenant?.aboutUs?.values || [
        {
            title: "Quality You Can Trust",
            desc: "We refuse to compromise on quality. Every product in our catalog is verified for authenticity and performance standards."
        },
        {
            title: "Fair Pricing",
            desc: "Premium parts shouldn't cost a fortune. We work directly with distributors to offer you the most competitive prices."
        },
        {
            title: "Technical Expertise",
            desc: "Our team isn't just salespeople; we are automotive enthusiasts and experts who understand what your vehicle needs."
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero */}
            <section
                className="py-12 text-white"
                style={{ backgroundColor: tenant?.primaryColor || '#C8102E' }}
            >
                <div className="container-custom text-center">
                    <h1 className="text-4xl font-bold mb-4">About {tenant?.storeName || 'Us'}</h1>
                    <p className="text-lg opacity-90 max-w-2xl mx-auto">
                        {tenant?.tagline || 'Quality Automotive Spare Parts'}
                    </p>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-12 bg-white">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                            Our Story
                        </span>
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">Who We Are</h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            {tenant?.aboutUs?.story || `Welcome to ${tenant?.storeName || 'our store'}, where passion for automobiles meets exceptional service. We established this business with a clear mission: to provide vehicle owners and enthusiasts with the highest quality spare parts and accessories available in the market.`}
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission */}
            {tenant?.aboutUs?.mission && (
                <section className="py-12 bg-gray-50">
                    <div className="container-custom">
                        <div className="max-w-3xl mx-auto">
                            <div
                                className="bg-white rounded-lg p-8 shadow-sm text-center"
                                style={{ borderLeft: `4px solid ${tenant?.primaryColor || '#C8102E'}` }}
                            >
                                <div className="flex items-center justify-center gap-2 mb-3">
                                    <Target size={24} style={{ color: tenant?.primaryColor || '#C8102E' }} />
                                    <h3 className="text-xl font-bold text-gray-800">Our Mission</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed">
                                    {tenant.aboutUs.mission}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Stats */}
            <section className="py-12 bg-slate-900">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => {
                            const Icon = stat.icon ? (iconMap[stat.icon] || Award) : Award;
                            return (
                                <div key={idx} className="text-center">
                                    <div
                                        className="w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4"
                                        style={{ backgroundColor: `${tenant?.primaryColor || '#C8102E'}30` }}
                                    >
                                        <Icon size={24} style={{ color: tenant?.primaryColor || '#C8102E' }} />
                                    </div>
                                    <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                                    <p className="text-gray-400 text-sm">{stat.label}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-12 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
                            Our Promise
                        </span>
                        <h2 className="text-3xl font-bold text-gray-800">Why Choose Us?</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {values.map((item, idx) => (
                            <div key={idx} className="bg-gray-50 p-8 rounded-lg text-center">
                                <div
                                    className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                                    style={{ backgroundColor: `${tenant?.primaryColor || '#C8102E'}15` }}
                                >
                                    <span
                                        className="text-xl font-bold"
                                        style={{ color: tenant?.primaryColor || '#C8102E' }}
                                    >
                                        {idx + 1}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-3">{item.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section
                className="py-12 md:py-16 text-white"
                style={{ backgroundColor: tenant?.primaryColor || '#C8102E' }}
            >
                <div className="container-custom text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Find the Perfect Parts?</h2>
                    <p className="text-lg mb-8 opacity-90 max-w-xl mx-auto">
                        Browse our catalog or contact our experts for personalized recommendations.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={`/${tenant?.subdomain}/products`}
                            className="inline-block px-8 py-3 bg-white text-gray-900 font-semibold rounded hover:bg-gray-100 transition-colors"
                        >
                            Browse Products
                        </Link>
                        <Link
                            href={`/${tenant?.subdomain}/contact`}
                            className="inline-block px-8 py-3 border-2 border-white text-white font-semibold rounded hover:bg-white/10 transition-colors"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
