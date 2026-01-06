"use client";

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';
import { useTenant } from '@/lib/tenant-context';
import Image from 'next/image';

export function Footer() {
    const { tenant } = useTenant();

    return (
        <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">

                    {/* 1. Brand & About */}
                    <div className="space-y-6">
                        {tenant?.logoUrl ? (
                            <div className="relative h-10 w-48 opacity-90 grayscale hover:grayscale-0 transition-all duration-500">
                                <Image
                                    src={tenant.logoUrl}
                                    alt={tenant.storeName}
                                    fill
                                    className="object-contain object-left"
                                />
                            </div>
                        ) : (
                            <h3 className="text-2xl font-bold text-white tracking-tight">{tenant?.storeName}</h3>
                        )}
                        <p className="text-sm leading-relaxed max-w-xs text-slate-500">
                            {tenant?.tagline || 'Your trusted partner for high-quality automotive spare parts and accessories.'}
                        </p>
                    </div>

                    {/* 2. Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-8">Quick Links</h4>
                        <ul className="space-y-4 text-sm">
                            {[
                                { label: 'About Us', href: '/about' },
                                { label: 'Shop Products', href: '/products' },
                                { label: 'Our Services', href: '/services' },
                                { label: 'Contact Support', href: '/contact' },
                                { label: 'Terms & Conditions', href: '/terms' },
                            ].map(link => (
                                <li key={link.href}>
                                    <Link href={link.href} className="hover:text-red-500 transition-colors flex items-center gap-2 group">
                                        <ArrowRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-red-500" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. Customer Care */}
                    <div>
                        <h4 className="text-white font-bold mb-8">Contact Us</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-4 group">
                                <MapPin size={20} className="mt-0.5 text-slate-600 group-hover:text-red-500 transition-colors" />
                                <span className="leading-relaxed">{tenant?.address || '123 Auto Parts St, Colombo, Sri Lanka'}</span>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <Phone size={20} className="text-slate-600 group-hover:text-red-500 transition-colors" />
                                <span>{tenant?.contactPhone || '+94 77 123 4567'}</span>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <Mail size={20} className="text-slate-600 group-hover:text-red-500 transition-colors" />
                                <span>{tenant?.contactEmail || 'support@slictauto.lk'}</span>
                            </li>
                        </ul>
                    </div>

                    {/* 4. Newsletter */}
                    <div>
                        <h4 className="text-white font-bold mb-8">Newsletter</h4>
                        <p className="text-sm text-slate-500 mb-6">Subscribe to receive updates, access to exclusive deals, and more.</p>
                        <form className="space-y-4">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 h-12 text-sm focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all placeholder:text-slate-600 text-white"
                                />
                            </div>
                            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-12 rounded-lg text-sm transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2">
                                Subscribe Now <Send size={14} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Row - Massive Separation */}
                <div className="mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Left Side: Social Icons */}
                    <div className="flex items-center gap-6">
                        {[
                            { icon: Facebook, href: tenant?.facebookUrl, color: 'hover:text-blue-500' },
                            { icon: Instagram, href: tenant?.instagramUrl, color: 'hover:text-pink-500' },
                            { icon: Linkedin, href: tenant?.linkedinUrl, color: 'hover:text-blue-400' },
                            { icon: Twitter, href: '#', color: 'hover:text-sky-400' }
                        ].map((Social, idx) => (
                            <a
                                key={idx}
                                href={Social.href || '#'}
                                className={`text-slate-500 transition-colors transform hover:scale-110 ${Social.color}`}
                            >
                                <Social.icon size={22} />
                            </a>
                        ))}
                    </div>

                    {/* Right Side: Copyright & Links */}
                    <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-slate-500">
                        <p>&copy; {new Date().getFullYear()} {tenant?.storeName || 'SLICT Auto Parts Web'}. All rights reserved.</p>
                        <div className="flex items-center gap-6">
                            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
