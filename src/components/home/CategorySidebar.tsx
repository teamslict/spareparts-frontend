"use client";

import Link from 'next/link';
import { ChevronRight, Menu, Grid } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTenant } from '@/lib/tenant-context';
import { motion } from 'framer-motion';

interface Category {
    name: string;
    slug: string;
    hasSubmenu?: boolean;
    icon?: string;
}

// Default categories - will be fetched from API
const defaultCategories: Category[] = [
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

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        async function fetchBrands() {
            if (!tenant) return;
            try {
                const { api } = await import('@/lib/api');
                const brands = await api.getBrands(tenant.subdomain);
                const mapped: Category[] = brands.map(b => ({
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
        <div className="w-full lg:w-72 bg-[#0F172A] rounded-2xl shadow-xl border border-white/10 flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 flex items-center gap-3 text-white relative overflow-hidden bg-white/5 border-b border-white/5">
                <div className="p-2 rounded-lg bg-blue-600 shadow-lg shadow-blue-900/20">
                    <Grid size={20} className="text-white" />
                </div>
                <span className="font-bold text-lg tracking-wide uppercase">Categories</span>
            </div>

            {/* Category List */}
            <div className="py-2 flex-1 flex flex-col">
                {displayedCategories.map((category, idx) => (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        key={category.slug}
                    >
                        <Link
                            href={`/${tenant?.subdomain || 'default'}/products?brand=${category.slug}`}
                            className="group relative flex items-center justify-between px-6 py-3.5 hover:bg-white/5 transition-all border-l-[3px] border-transparent hover:border-blue-500"
                        >
                            <div className="flex items-center gap-3 relative z-10">
                                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                                    {category.name}
                                </span>
                            </div>
                            <ChevronRight
                                size={16}
                                className="text-slate-600 group-hover:text-blue-500 group-hover:translate-x-1 transition-all"
                            />
                        </Link>
                    </motion.div>
                ))}

                {/* More Categories Button */}
                {!showAll && categories.length > 10 && (
                    <button
                        onClick={() => setShowAll(true)}
                        className="mt-auto w-full px-5 py-4 text-sm font-medium text-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors border-t border-white/5 flex items-center justify-center gap-2 group"
                    >
                        <motion.span
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-2"
                        >
                            <span>View All Categories</span>
                        </motion.span>
                    </button>
                )}
            </div>
        </div>
    );
}
