"use client";

import { useTenant } from '@/lib/tenant-context';
import Link from 'next/link';
import { ArrowRight, Box, Info, Phone, ShieldCheck, Truck, Wrench } from 'lucide-react';

export default function SitemapPage() {
    const { tenant } = useTenant();
    const subdomain = tenant?.subdomain || 'demo';

    const sections = [
        {
            title: "Shop",
            icon: Box,
            links: [
                { label: "All Products", href: `/${subdomain}/products` },
                { label: "New Arrivals", href: `/${subdomain}/products?sort=new` },
                { label: "Best Sellers", href: `/${subdomain}/products?sort=bestsellers` },
                { label: "Categories", href: `/${subdomain}/categories` }, // Assuming this exists or redirects
            ]
        },
        {
            title: "Information",
            icon: Info,
            links: [
                { label: "About Us", href: `/${subdomain}/about` },
                { label: "Our Services", href: `/${subdomain}/services` },
                { label: "Blog", href: `/${subdomain}/blog` }, // Placeholder if not active
            ]
        },
        {
            title: "Customer Service",
            icon: Phone,
            links: [
                { label: "Contact Us", href: `/${subdomain}/contact` },
                { label: "Track Order", href: `/${subdomain}/track-order` },
                { label: "Shipping Policy", href: `/${subdomain}/shipping` },
                { label: "Return Policy", href: `/${subdomain}/returns` },
            ]
        },
        {
            title: "Legal",
            icon: ShieldCheck,
            links: [
                { label: "Privacy Policy", href: `/${subdomain}/privacy` },
                { label: "Terms of Service", href: `/${subdomain}/terms` },
            ]
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen">
            <section className="bg-slate-900 text-white py-12 md:py-16">
                <div className="container-custom text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Sitemap</h1>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Overview of {tenant?.storeName || 'our store'}&apos;s structure and content.
                    </p>
                </div>
            </section>

            <div className="container-custom py-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {sections.map((section, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-50">
                                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <section.icon size={20} />
                                </div>
                                <h2 className="font-bold text-slate-900">{section.title}</h2>
                            </div>
                            <ul className="space-y-3">
                                {section.links.map((link, linkIdx) => (
                                    <li key={linkIdx}>
                                        <Link
                                            href={link.href}
                                            className="group flex items-center justify-between text-slate-600 hover:text-blue-600 transition-colors text-sm font-medium"
                                        >
                                            {link.label}
                                            <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-400" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
