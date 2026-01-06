"use client";

import { useState, useEffect } from 'react';
import { ProductCard, ProductCardProps } from '@/components/product/ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTenant } from '@/lib/tenant-context';

const tabs = [
    { id: 'latest', label: 'Latest Parts' },
    { id: 'popular', label: 'Popular Parts' },
    { id: 'bestsellers', label: 'Best Sellers' },
];

// Demo products removed


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
                // Determine category filter based on tab
                // In real scenario, tabs could map to specific categories or "featured" flags
                const category = activeTab === 'bestsellers' ? 'featured' : undefined; // Simplified logic

                const { api } = await import('@/lib/api');
                const res = await api.getProducts(tenant.subdomain, {
                    limit: 10,
                    // For now, we just fetch latest products for all tabs, 
                    // but in future backend should support 'sort' or 'featured' flags
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
        <section className="py-12 bg-gray-50">
            <div className="container-custom">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Our <span className="font-normal">Products</span>
                    </h2>

                    {/* Tabs */}
                    <div className="flex items-center gap-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`text-sm font-medium transition-all pb-1 border-b-2 ${activeTab === tab.id
                                    ? 'border-current'
                                    : 'text-gray-400 border-transparent hover:text-gray-600'
                                    }`}
                                style={activeTab === tab.id ? { color: tenant?.primaryColor || '#C8102E' } : {}}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex items-center gap-2">
                        <button
                            className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-800"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-800"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
