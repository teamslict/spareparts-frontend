"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTenant } from '@/lib/tenant-context';

import { PLACEHOLDER_IMAGE } from '@/lib/constants';

// Brand placeholder SVG
const BRAND_PLACEHOLDER = PLACEHOLDER_IMAGE;

// Default brands - will be fetched from API
const defaultBrands = [
    { name: 'TOYOTA', slug: 'toyota', logoUrl: '', categories: ['Oils & Fluids', 'Wipers', 'Filters', 'Batteries'] },
    { name: 'DFSK', slug: 'dfsk', logoUrl: '', categories: ['Oils & Fluids', 'Wipers', 'Filters', 'Batteries'] },
    { name: 'SUZUKI', slug: 'suzuki', logoUrl: '', categories: ['Oils & Fluids', 'Wipers', 'Filters', 'Batteries'] },
    { name: 'NISSAN', slug: 'nissan', logoUrl: '', categories: ['Oils & Fluids', 'Wipers', 'Filters', 'Batteries'] },
    { name: 'CHERY', slug: 'chery', logoUrl: '', categories: ['Oils & Fluids', 'Wipers', 'Filters', 'Batteries'] },
    { name: 'FOTON', slug: 'foton', logoUrl: '', categories: ['Oils & Fluids', 'Wipers', 'Filters', 'Batteries'] },
    { name: 'LAND ROVER', slug: 'land-rover', logoUrl: '', categories: ['Oils & Fluids', 'Wipers', 'Filters', 'Batteries'] },
    { name: 'HONDA', slug: 'honda', logoUrl: '', categories: ['Oils & Fluids', 'Wipers', 'Filters', 'Batteries'] },
    { name: 'MAZDA', slug: 'mazda', logoUrl: '', categories: ['Oils & Fluids', 'Wipers', 'Filters', 'Batteries'] },
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
                            className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl hover:bg-gray-100 hover:shadow-md transition-all duration-200 group"
                        >
                            {/* Brand Logo */}
                            <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center bg-white rounded-lg border border-gray-200 overflow-hidden">
                                {brand.logoUrl ? (
                                    <Image
                                        src={brand.logoUrl}
                                        alt={brand.name}
                                        width={56}
                                        height={56}
                                        className="object-contain"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = BRAND_PLACEHOLDER;
                                        }}
                                    />
                                ) : (
                                    // Text placeholder
                                    <span
                                        className="text-lg font-bold"
                                        style={{ color: tenant?.primaryColor || '#C8102E' }}
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
