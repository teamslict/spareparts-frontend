"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useTenant } from '@/lib/tenant-context';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { resolveImageUrl } from '@/lib/utils';
import type { FeaturedCategory } from '@/types/tenant';

export function CategoryGrid() {
    const { tenant } = useTenant();

    // Use featured categories from config, or fallback to empty
    const categories = tenant?.featuredCategories || [];

    if (!categories.length) return null;

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-white tracking-tight">Featured Categories</h2>
                    <Link href="/categories" className="group text-sm font-medium text-blue-500 hover:text-blue-400 flex items-center gap-1 transition-colors">
                        View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

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
                    className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
                >
                    {categories.map((cat: FeaturedCategory) => (
                        <motion.div
                            key={cat.id || cat.slug}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                show: { opacity: 1, y: 0 }
                            }}
                        >
                            <Link
                                href={`/category/${cat.slug}`}
                                className="group relative bg-[#0F172A] rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-blue-900/20 hover:-translate-y-2 transition-all duration-300 p-6 border border-white/5 flex flex-col items-center text-center overflow-hidden h-full justify-between"
                            >
                                <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/30 transition-all duration-500" />

                                <div className="relative w-28 h-28 mb-4 rounded-full bg-[#1E293B] p-4 group-hover:scale-110 transition-transform duration-500 flex items-center justify-center border border-white/5 shadow-inner">
                                    <div className="absolute inset-0 rounded-full bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                                    {cat.imageUrl ? (
                                        <Image
                                            src={resolveImageUrl(cat.imageUrl)}
                                            alt={cat.name}
                                            fill
                                            className="object-contain p-2 drop-shadow-md brightness-110"
                                        />
                                    ) : (
                                        <div className="text-4xl group-hover:rotate-12 transition-transform duration-300 grayscale group-hover:grayscale-0">
                                            🔧
                                        </div>
                                    )}
                                </div>

                                <h3 className="relative font-bold text-slate-200 group-hover:text-white transition-colors z-10 text-lg">
                                    {cat.name}
                                </h3>

                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
