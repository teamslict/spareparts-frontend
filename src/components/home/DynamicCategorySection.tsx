"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTenant } from '@/lib/tenant-context';
import { api, type Product } from '@/lib/api';
import { ProductCard } from '@/components/product/ProductCard';
import { motion } from 'framer-motion';

interface DynamicCategorySectionProps {
    title: string;
    slug: string;
}

export function DynamicCategorySection({ title, slug }: DynamicCategorySectionProps) {
    const { tenant } = useTenant();
    const storeSlug = tenant?.subdomain || 'demo';

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (storeSlug && slug) {
            api.getProducts(storeSlug, { category: slug, limit: 4 })
                .then(data => setProducts(data.data || []))
                .catch(err => console.error(`Failed to fetch products for ${slug}:`, err))
                .finally(() => setLoading(false));
        }
    }, [storeSlug, slug]);

    // Don't render if no products
    if (!loading && products.length === 0) return null;

    return (
        <section className="py-6">
            <div className="container-custom">
                {/* Section Header */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-white tracking-tight">{title}</h2>
                    <Link
                        href={`/${storeSlug}/category/${slug}`}
                        className="group text-sm font-medium text-blue-500 hover:text-blue-400 flex items-center gap-1 transition-colors"
                    >
                        View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Product Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-96 bg-[#0F172A] rounded-2xl animate-pulse border border-white/5" />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {products.map((product) => (
                            <motion.div
                                key={product.id}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    show: { opacity: 1, y: 0 }
                                }}
                            >
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    sku={product.sku}
                                    price={product.salePrice}
                                    image={product.images?.[0] || ''}
                                    category={product.category}
                                    stockStatus={product.stockQty > 0 ? 'IN_STOCK' : 'OUT_OF_STOCK'}
                                    rating={5}
                                    slug={product.slug || product.id}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
}
