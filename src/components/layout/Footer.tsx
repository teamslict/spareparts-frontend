"use client";

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { useTenant } from '@/lib/tenant-context';
import Image from 'next/image';

export function Footer() {
    const { tenant } = useTenant();

    const getLink = (path: string) => {
        const slug = tenant?.subdomain;
        if (!slug || slug === 'default' || slug === 'demo') return path;
        return `/${slug}${path}`;
    };

    return (
        <footer className="w-full bg-slate-900 text-slate-300 font-inter mt-auto">
            {/* Main Footer Content */}
            <div className="container-custom py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

                    {/* Brand Column (Span 4) */}
                    <div className="lg:col-span-4 space-y-6">
                        {tenant?.logoUrl ? (
                            <div className="relative h-10 w-40">
                                <Image
                                    src={tenant.logoUrl}
                                    alt={tenant.storeName}
                                    fill
                                    className="object-contain object-left"
                                />
                            </div>
                        ) : (
                            <div className="inline-flex items-center gap-2">
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-slate-900 font-bold text-xl">S</div>
                                <span className="text-xl font-bold text-white tracking-tight">{tenant?.storeName || 'Slict'}</span>
                            </div>
                        )}
                        <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
                            Your trusted partner for premium automotive parts. We combine quality products with expert support to keep you moving forward.
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                            {[
                                { icon: Facebook, href: tenant?.facebookUrl },
                                { icon: Twitter, href: '#' },
                                { icon: Instagram, href: tenant?.instagramUrl },
                                { icon: Linkedin, href: tenant?.linkedinUrl }
                            ].map((Social, idx) => (
                                <a
                                    key={idx}
                                    href={Social.href || '#'}
                                    className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center transition-all hover:bg-white hover:text-slate-900 hover:border-white"
                                >
                                    <Social.icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links (Span 2) */}
                    <div className="lg:col-span-2 lg:col-start-6">
                        <h3 className="text-xs font-bold text-white tracking-wider uppercase mb-6">Shop</h3>
                        <ul className="space-y-3">
                            {[
                                { label: 'New Arrivals', href: getLink('/products?sort=new') },
                                { label: 'Best Sellers', href: getLink('/products?sort=bestsellers') },
                                { label: 'Special Offers', href: getLink('/products?discounted=true') },
                                { label: 'All Categories', href: getLink('/categories') },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors inline-flex items-center group">
                                        {link.label}
                                        <ArrowRight size={12} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-white" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support (Span 2) */}
                    <div className="lg:col-span-2">
                        <h3 className="text-xs font-bold text-white tracking-wider uppercase mb-6">Support</h3>
                        <ul className="space-y-3">
                            {[
                                { label: 'Order Tracking', href: getLink('/track-order') },
                                { label: 'Return Policy', href: getLink('/returns') },
                                { label: 'Shipping Info', href: getLink('/shipping') },
                                { label: 'Help Center', href: getLink('/help') },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors inline-block">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact (Span 3) */}
                    <div className="lg:col-span-3">
                        <h3 className="text-xs font-bold text-white tracking-wider uppercase mb-6">Contact Us</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 group">
                                <div className="mt-0.5 w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 text-slate-400 group-hover:bg-slate-700 transition-colors">
                                    <MapPin size={16} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">Headquarters</p>
                                    <p className="text-sm text-slate-400 leading-relaxed mt-0.5">{tenant?.address || '123 Main Street, Colombo, Sri Lanka'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 group">
                                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 text-slate-400 group-hover:bg-slate-700 transition-colors">
                                    <Phone size={16} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-white">Phone Support</span>
                                    <span className="text-sm text-slate-400">{tenant?.contactPhone || '+94 77 123 4567'}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 group">
                                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 text-slate-400 group-hover:bg-slate-700 transition-colors">
                                    <Mail size={16} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-white">Email Us</span>
                                    <span className="text-sm text-slate-400">{tenant?.contactEmail || 'sales@slict.lk'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800 bg-slate-900/50">
                <div className="container-custom py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-500">
                        &copy; {new Date().getFullYear()} {tenant?.storeName || 'Slict'}. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href={getLink('/privacy')} className="text-xs text-slate-500 hover:text-white transition-colors font-medium">Privacy Policy</Link>
                        <Link href={getLink('/terms')} className="text-xs text-slate-500 hover:text-white transition-colors font-medium">Terms of Service</Link>
                        <Link href={getLink('/sitemap')} className="text-xs text-slate-500 hover:text-white transition-colors font-medium">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
