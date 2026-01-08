"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useTenant } from '@/lib/tenant-context';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function CategoryGrid() {
    const { tenant } = useTenant();

    const categories = tenant?.featuredCategories || [];
    if (!categories.length) return null;

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-8">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                    Featured Categories
                </h2>
                <Link
                    href="/categories"
                    className="group text-sm font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 transition-colors"
                >
                    View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                    hidden: { opacity: 0 },
                    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
                }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6"
            >
                {categories.map((cat: any) => (
                    <motion.div
                        key={cat.id || cat.slug}
                        variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                    >
                        <Link
                            href={`/category/${cat.slug}`}
                            className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 border border-slate-200/70 flex flex-col items-center text-center overflow-hidden h-full justify-between"
                        >
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ background: `linear-gradient(135deg, ${tenant?.primaryColor || '#dc2626'}14 0%, transparent 60%)` }}
                            />

                            <div className="relative w-20 h-20 md:w-24 md:h-24 mb-3 rounded-2xl bg-slate-50 p-4 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center border border-slate-200/70">
                                {cat.imageUrl ? (
                                    <Image
                                        src={cat.imageUrl}
                                        alt={cat.name}
                                        fill
                                        className="object-contain p-2"
                                    />
                                ) : (
                                    <div className="text-3xl">🔧</div>
                                )}
                            </div>

                            <h3 className="relative font-bold text-slate-900 group-hover:text-slate-950 transition-colors z-10 text-sm md:text-base leading-tight">
                                {cat.name}
                            </h3>

                            <div
                                className="mt-3 h-1 w-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ backgroundColor: tenant?.primaryColor || '#dc2626' }}
                            />
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
