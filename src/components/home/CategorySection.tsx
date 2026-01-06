"use client";

import { ProductCard, ProductCardProps } from '@/components/product/ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTenant } from '@/lib/tenant-context';

interface CategorySectionProps {
    title: string;
    highlightWord: string;
    products: ProductCardProps[];
}

export function CategorySection({ title, highlightWord, products }: CategorySectionProps) {
    const { tenant } = useTenant();

    return (
        <section className="py-8 bg-white">
            <div className="container-custom">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                        {title.split(highlightWord)[0]}
                        <span className="font-normal">{highlightWord}</span>
                        {title.split(highlightWord)[1] || ''}
                    </h2>

                    {/* Navigation Arrows */}
                    <div className="flex items-center gap-2">
                        <button
                            className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-600"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                {/* Products Row */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.slice(0, 4).map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
