"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTenant } from '@/lib/tenant-context';
import { api, Brand } from '@/lib/api';
import { resolveImageUrl } from '@/lib/utils';

export function BrandCategories() {
    const { tenant } = useTenant();
    const storeSlug = tenant?.subdomain || 'demo';

    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (storeSlug) {
            api.getBrands(storeSlug)
                .then(setBrands)
                .catch(err => console.error("Failed to fetch brands", err))
                .finally(() => setLoading(false));
        }
    }, [storeSlug]);

    if (loading) {
        return (
            <section className="py-12 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-32 bg-gray-100 rounded-xl animate-pulse"></div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (brands.length === 0) return null;

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
                            key={brand.slug || brand.name}
                            href={`/${storeSlug}/products?brand=${brand.slug || brand.name}`}
                            className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border border-transparent hover:border-blue-100"
                        >
                            {/* Brand Logo */}
                            <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center bg-white rounded-lg border border-gray-200 overflow-hidden p-2 group-hover:border-blue-200 transition-colors">
                                {brand.logoUrl ? (
                                    <img
                                        src={resolveImageUrl(brand.logoUrl)}
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
                                        {brand.name.slice(0, 2).toUpperCase()}
                                    </span>
                                )}
                            </div>

                            {/* Brand Info */}
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-800 mb-2 group-hover:text-gray-900">{brand.name}</h3>
                                {brand.count !== undefined && brand.count > 0 && (
                                    <p className="text-sm text-gray-500 mb-3">{brand.count} Products</p>
                                )}
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
