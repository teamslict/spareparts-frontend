"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useTenant } from '@/lib/tenant-context';
import { ArrowRight } from 'lucide-react';

export function CategoryGrid() {
    const { tenant } = useTenant();

    // Use featured categories from config, or fallback to empty
    const categories = tenant?.featuredCategories || [];

    if (!categories.length) return null;

    return (
        <section className="py-12 bg-gray-50/50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Featured Categories</h2>
                    <Link href="/categories" className="text-sm font-medium text-red-600 hover:text-red-700 flex items-center gap-1">
                        View All <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {categories.map((cat: any) => (
                        <Link
                            key={cat.id || cat.slug}
                            href={`/category/${cat.slug}`}
                            className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 border border-gray-100 flex flex-col items-center text-center"
                        >
                            <div className="relative w-24 h-24 mb-4 rounded-full bg-gray-50 p-2 group-hover:scale-110 transition-transform duration-300">
                                {cat.imageUrl ? (
                                    <Image
                                        src={cat.imageUrl}
                                        alt={cat.name}
                                        fill
                                        className="object-contain p-2"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-3xl">
                                        🔧
                                    </div>
                                )}
                            </div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                                {cat.name}
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
