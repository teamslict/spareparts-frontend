"use client";

import Link from 'next/link';
import { Facebook, Instagram, MapPin, Phone, Mail } from 'lucide-react';
import { useTenant } from '@/lib/tenant-context';
import Image from 'next/image';
import { Container } from '@/components/ui';

export function Footer() {
    const { tenant } = useTenant();
    const storeSlug = tenant?.subdomain || 'demo';
    const getLink = (path: string) => `/${storeSlug}${path}`;

    return (
        <footer className="bg-gray-900 text-white">
            {/* Main Footer */}
            <Container className="py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            {tenant?.logoUrl ? (
                                <div className="relative h-8 w-32 brightness-0 invert">
                                    <Image
                                        src={tenant.logoUrl}
                                        alt={tenant.storeName}
                                        fill
                                        className="object-contain object-left"
                                    />
                                </div>
                            ) : (
                                <>
                                    <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                        {tenant?.storeName?.charAt(0) || 'S'}
                                    </div>
                                    <span className="text-lg font-bold">
                                        {tenant?.storeName || 'AutoParts'}
                                    </span>
                                </>
                            )}
                        </div>
                        <p className="text-sm text-gray-400 mb-4 max-w-xs">
                            Quality automotive parts for every vehicle. Fast shipping, expert support.
                        </p>
                        <div className="flex gap-2">
                            {[
                                { icon: Facebook, href: tenant?.facebookUrl || '#' },
                                { icon: Instagram, href: tenant?.instagramUrl || '#' },
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                                >
                                    <social.icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h4 className="text-sm font-semibold mb-4">Shop</h4>
                        <ul className="space-y-2">
                            {[
                                { label: 'All Products', href: getLink('/products') },
                                { label: 'New Arrivals', href: getLink('/products?sort=new') },
                                { label: 'Best Sellers', href: getLink('/products?sort=popular') },
                            ].map(link => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="text-sm font-semibold mb-4">Support</h4>
                        <ul className="space-y-2">
                            {[
                                { label: 'Track Order', href: getLink('/track-order') },
                                { label: 'Shipping', href: getLink('/shipping') },
                                { label: 'Returns', href: getLink('/returns') },
                                { label: 'Contact', href: getLink('/contact') },
                            ].map(link => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-sm font-semibold mb-4">Contact</h4>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <MapPin size={16} className="text-gray-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-400">
                                    {tenant?.address || 'Colombo, Sri Lanka'}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={16} className="text-gray-500 flex-shrink-0" />
                                <span className="text-sm text-gray-400">
                                    {tenant?.contactPhone || '+94 77 123 4567'}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={16} className="text-gray-500 flex-shrink-0" />
                                <span className="text-sm text-gray-400">
                                    {tenant?.contactEmail || 'sales@store.lk'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <Container className="py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-500">
                        © {new Date().getFullYear()} {tenant?.storeName || 'AutoParts'}. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link href={getLink('/privacy')} className="text-xs text-gray-500 hover:text-white transition-colors">
                            Privacy
                        </Link>
                        <Link href={getLink('/terms')} className="text-xs text-gray-500 hover:text-white transition-colors">
                            Terms
                        </Link>
                    </div>
                </Container>
            </div>
        </footer>
    );
}
