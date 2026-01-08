"use client";

import { useState, useEffect } from 'react';
import { ProductCard, ProductCardProps } from '@/components/product/ProductCard';
import { Skeleton } from '@/components/ui';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTenant } from '@/lib/tenant-context';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
    { id: 'latest', label: 'Latest Parts' },
    { id: 'popular', label: 'Popular Parts' },
    { id: 'bestsellers', label: 'Best Sellers' },
];

export function ProductsSection() {
    const [activeTab, setActiveTab] = useState('latest');
    const { tenant } = useTenant();

    const [products, setProducts] = useState<ProductCardProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            if (!tenant) return;

            setLoading(true);
            try {
                const { api } = await import('@/lib/api');
                const res = await api.getProducts(tenant.subdomain, { limit: 10 });

                const mapped: ProductCardProps[] = res.data.map(p => ({
                    id: p.id,
                    name: p.name,
                    sku: p.sku,
                    price: p.salePrice || null,
                    image: p.images?.[0] || '',
                    category: p.category,
                    stockStatus: Number(p.stockQty) > 0 ? 'IN_STOCK' : 'OUT_OF_STOCK',
                    rating: 5,
                    slug: p.id,
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
            <div>
                <Skeleton className="h-8 w-52 mb-8" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
                    {[...Array(6)].map((_, i) => (
                        <Skeleton key={i} className="aspect-[3/4] bg-white rounded-2xl" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
                <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                        Products
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                        Fresh arrivals and best selling spare parts.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    {/* Tabs */}
                    <div className="inline-flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-2xl">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${activeTab === tab.id ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                                    }`}
                                type="button"
                            >
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 rounded-xl shadow-sm"
                                        style={{ backgroundColor: tenant?.primaryColor || '#dc2626' }}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                    />
                                )}
                                <span className="relative z-10">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Navigation Arrows (placeholder) */}
                    <div className="hidden md:flex items-center gap-2">
                        <button
                            className="w-10 h-10 border border-slate-200 bg-white rounded-xl flex items-center justify-center hover:bg-slate-50 transition-colors"
                            type="button"
                            aria-label="Previous"
                        >
                            <ChevronLeft size={20} className="text-slate-600" />
                        </button>
                        <button
                            className="w-10 h-10 border border-slate-200 bg-white rounded-xl flex items-center justify-center hover:bg-slate-50 transition-colors"
                            type="button"
                            aria-label="Next"
                        >
                            <ChevronRight size={20} className="text-slate-600" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6"
                >
                    {products.map((product, idx) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2, delay: idx * 0.03 }}
                        >
                            <ProductCard {...product} />
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
