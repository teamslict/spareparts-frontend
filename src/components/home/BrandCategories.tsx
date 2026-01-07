"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTenant } from '@/lib/tenant-context';

import { PLACEHOLDER_IMAGE } from '@/lib/constants';

// Brand placeholder SVG
const BRAND_PLACEHOLDER = PLACEHOLDER_IMAGE;

// Default brands - with demo logos
const defaultBrands = [
    { name: 'TOYOTA', slug: 'toyota', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Toyota_EU_2020.svg/1200px-Toyota_EU_2020.svg.png', categories: ['Oils & Fluids', 'Wipers', 'Filters', 'Batteries'] },
    { name: 'NISSAN', slug: 'nissan', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Nissan_logo.png/600px-Nissan_logo.png', categories: ['Oils & Fluids', 'Wipers', 'Filters', 'Batteries'] },
    { name: 'MITSUBISHI', slug: 'mitsubishi', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Mitsubishi_logo.svg/1200px-Mitsubishi_logo.svg.png', categories: ['Oils & Fluids', 'Wipers', 'Filters', 'Batteries'] },
    { name: 'CHERY', slug: 'chery', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/23/Chery_logo.svg/1200px-Chery_logo.svg.png', categories: ['Oils & Fluids', 'Wipers', 'Filters', 'Batteries'] },
    { name: 'DFSK', slug: 'dfsk', logoUrl: '', categories: ['Oils & Fluids', 'Wipers', 'Filters', 'Batteries'] }, // Keep empty to test fallback
    { name: 'HONDA', slug: 'honda', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Honda_Logo.svg/1200px-Honda_Logo.svg.png', categories: ['Oils & Fluids', 'Wipers', 'Filters', 'Batteries'] },
    { name: 'SUZUKI', slug: 'suzuki', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Suzuki_logo_2.svg/1200px-Suzuki_logo_2.svg.png', categories: ['Oils & Fluids', 'Wipers', 'Filters', 'Batteries'] },
    { name: 'MAZDA', slug: 'mazda', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Mazda_Logo.svg/1200px-Mazda_Logo.svg.png', categories: ['Oils & Fluids', 'Wipers', 'Filters', 'Batteries'] },
];

export function BrandCategories() {
    const { tenant } = useTenant();

    // TODO: Fetch brands from /api/public/spareparts/brands
    const brands = defaultBrands;

    return (
        <section className="py-12 bg-white">
            <div className="container-custom">
                {/* Header */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
                    Brand <span className="font-normal">Categories</span>
                </h2>

                {/* Brands Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {brands.map((brand) => (
                        <Link
                            key={brand.slug}
                            href={`/brand/${brand.slug}`}
                            className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border border-transparent hover:border-blue-100"
                        >
                            {/* Brand Logo */}
                            <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center bg-white rounded-lg border border-gray-200 overflow-hidden p-2 group-hover:border-blue-200 transition-colors">
                                {brand.logoUrl ? (
                                    <img
                                        src={brand.logoUrl}
                                        alt={brand.name}
                                        width={56}
                                        height={56}
                                        className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-80 group-hover:opacity-100"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none'; // Hide broken image
                                            target.nextElementSibling?.classList.remove('hidden'); // Show fallback
                                        }}
                                    />
                                ) : (
                                    // Premium Text Placeholder
                                    <span
                                        className="text-lg font-black tracking-tighter"
                                        style={{ color: tenant?.primaryColor || '#1E293B' }}
                                    >
                                        {brand.name.slice(0, 2)}
                                    </span>
                                )}
                            </div>

                            {/* Brand Info */}
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-800 mb-2 group-hover:text-gray-900">{brand.name}</h3>
                                <ul className="space-y-1 text-sm text-gray-500 mb-3">
                                    {brand.categories.slice(0, 4).map((cat) => (
                                        <li key={cat} className="truncate">{cat}</li>
                                    ))}
                                </ul>
                                <span
                                    className="text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                                    style={{ color: tenant?.primaryColor || '#C8102E' }}
                                >
                                    SHOP NOW
                                    <ArrowRight size={14} />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
