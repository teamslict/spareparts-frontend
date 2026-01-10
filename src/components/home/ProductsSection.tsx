"use client";

import { useState, useEffect } from 'react';
import { ProductCard, ProductCardProps } from '@/components/product/ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTenant } from '@/lib/tenant-context';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
    { id: 'latest', label: 'Latest Parts' },
    { id: 'popular', label: 'Popular Parts' },
    { id: 'bestsellers', label: 'Best Sellers' },
];

// Demo products removed


export function ProductsSection() {
    const [activeTab, setActiveTab] = useState('latest');
    const { tenant } = useTenant();
    const storeSlug = tenant?.subdomain || 'demo';

    const [products, setProducts] = useState<ProductCardProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            if (!storeSlug) return;

            setLoading(true);
            try {
                const { api } = await import('@/lib/api');
                const res = await api.getProducts(storeSlug, {
                    limit: 10,
                    sort: activeTab // Pass 'latest', 'popular', or 'bestsellers' directly
                });

                const mapped: ProductCardProps[] = res.data.map(p => ({
                    id: p.id,
                    name: p.name,
                    sku: p.sku,
                    price: p.salePrice || null,
                    image: p.images?.[0] || '',
                    category: p.category,
                    stockStatus: Number(p.stockQty) > 0 ? 'IN_STOCK' : 'OUT_OF_STOCK',
                    rating: 5, // Default rating as backend doesn't have reviews yet
                    slug: p.id // using ID as slug for now, ideally backend provides slug
                }));

                setProducts(mapped);
            } catch (err) {
                console.error('Failed to load products', err);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, [tenant, activeTab]);

    if (loading) {
        return (
            <section className="py-12 bg-gray-50">
                <div className="container-custom">
                    <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-8" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="aspect-[3/4] bg-white rounded-lg animate-pulse" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-12">
            <div className="container-custom">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Products</span>
                    </h2>

                    {/* Tabs */}
                    <div className="flex items-center gap-2 p-1 bg-[#0F172A] border border-white/5 rounded-full">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative px-6 py-2 text-sm font-bold rounded-full transition-all duration-300 ${activeTab === tab.id ? 'text-white' : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 rounded-full shadow-lg shadow-blue-500/25 bg-blue-600"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <div className="hidden md:flex items-center gap-2">
                        <button
                            className="w-10 h-10 border border-white/10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-all hover:scale-110 active:scale-95 text-white"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            className="w-10 h-10 border border-white/10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-all hover:scale-110 active:scale-95 text-white"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Products Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-6"
                    >
                        {products.map((product, idx) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                            >
                                <ProductCard {...product} />
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
