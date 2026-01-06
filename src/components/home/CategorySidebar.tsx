"use client";

import Link from 'next/link';
import { ChevronRight, Menu, Grid } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTenant } from '@/lib/tenant-context';

// Default categories - will be fetched from API
const defaultCategories = [
    { name: 'TOYOTA', slug: 'toyota', hasSubmenu: true, icon: '🚗' },
    { name: 'NISSAN', slug: 'nissan', hasSubmenu: true, icon: '🚙' },
    { name: 'MITSUBISHI', slug: 'mitsubishi', hasSubmenu: true, icon: '🏎️' },
    { name: 'CHERY', slug: 'chery', hasSubmenu: true, icon: '🚐' },
    { name: 'ZOTYE', slug: 'zotye', hasSubmenu: true, icon: '🚛' },
    { name: 'DFSK', slug: 'dfsk', hasSubmenu: true, icon: '🚌' },
    { name: 'FOTON', slug: 'foton', hasSubmenu: true, icon: '🚚' },
    { name: 'PERODUA', slug: 'perodua', hasSubmenu: true, icon: '🚕' },
    { name: 'LAND ROVER', slug: 'land-rover', hasSubmenu: true, icon: '🚙' },
    { name: 'HONDA', slug: 'honda', hasSubmenu: true, icon: '🚗' },
    { name: 'SUZUKI', slug: 'suzuki', hasSubmenu: true, icon: '🏎️' },
    { name: 'MAZDA', slug: 'mazda', hasSubmenu: true, icon: '🚐' },
];

export function CategorySidebar() {
    const [showAll, setShowAll] = useState(false);
    const { tenant } = useTenant();

    const [categories, setCategories] = useState<any[]>([]);

    useEffect(() => {
        async function fetchBrands() {
            if (!tenant) return;
            try {
                const { api } = await import('@/lib/api');
                const brands = await api.getBrands(tenant.subdomain);
                const mapped = brands.map(b => ({
                    name: b.name,
                    slug: b.name.toLowerCase().replace(/\s+/g, '-'),
                    hasSubmenu: false,
                    icon: '🔧' // Default icon
                }));
                // If API returns empty (no data yet), fall back to defaults or show empty
                if (mapped.length > 0) {
                    setCategories(mapped);
                } else {
                    // fall back to default for demo if empty
                    setCategories(defaultCategories);
                }
            } catch (e) {
                setCategories(defaultCategories);
            }
        }
        fetchBrands();
    }, [tenant]);

    const displayedCategories = showAll ? categories : categories.slice(0, 10);

    return (
        <div className="w-full lg:w-72 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col h-full">
            {/* Header */}
            <div
                className="px-5 py-4 flex items-center gap-3 text-white"
                style={{ backgroundColor: tenant?.secondaryColor || '#1E3A5F' }}
            >
                <div className="p-1 rounded bg-white/10">
                    <Menu size={20} />
                </div>
                <span className="font-bold text-lg tracking-wide">Browse Categories</span>
            </div>

            {/* Category List */}
            <div className="py-2 flex-1 flex flex-col">
                {displayedCategories.map((category) => (
                    <Link
                        key={category.slug}
                        href={`/brand/${category.slug}`}
                        className="group flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-all border-b border-gray-50 last:border-none"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-700 group-hover:text-red-600 transition-colors">
                                {category.name}
                            </span>
                        </div>
                        {category.hasSubmenu && (
                            <ChevronRight
                                size={16}
                                className="text-gray-400 group-hover:text-red-500 group-hover:translate-x-1 transition-all"
                            />
                        )}
                    </Link>
                ))}

                {/* More Categories Button */}
                {!showAll && categories.length > 10 && (
                    <button
                        onClick={() => setShowAll(true)}
                        className="mt-auto w-full px-5 py-3 text-sm font-medium text-center text-gray-500 hover:text-red-600 hover:bg-gray-50 transition-colors border-t border-gray-100 flex items-center justify-center gap-2"
                    >
                        <Grid size={16} />
                        <span>View All Categories</span>
                    </button>
                )}
            </div>
        </div>
    );
}
