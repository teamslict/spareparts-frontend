"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Home, Search, Package, ArrowLeft, HeartCrack } from 'lucide-react';
import { useTenant } from '@/lib/tenant-context';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
    const { tenant } = useTenant();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const storeSlug = tenant?.subdomain || 'demo';

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/${storeSlug}/products?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    // Popular categories for quick navigation
    const popularCategories = [
        { name: 'Engine Parts', slug: 'engine-parts', emoji: '🔧' },
        { name: 'Brakes', slug: 'brakes', emoji: '🛑' },
        { name: 'Filters', slug: 'filters', emoji: '🌀' },
        { name: 'Electrical', slug: 'electrical', emoji: '⚡' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex flex-col items-center justify-center p-6">
            <div className="max-w-2xl w-full text-center">
                {/* Animated 404 */}
                <div className="relative mb-8">
                    <div className="text-[180px] md:text-[240px] font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 leading-none select-none">
                        404
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-red-100 to-red-50 rounded-full flex items-center justify-center shadow-lg shadow-red-100/50 animate-bounce">
                            <HeartCrack size={48} className="text-red-400" />
                        </div>
                    </div>
                </div>

                {/* Message */}
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                    Oops! Page Not Found
                </h1>
                <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
                    The page you're looking for doesn't exist or has been moved.
                    Let's get you back on track.
                </p>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="max-w-md mx-auto mb-10">
                    <div className="relative group">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for parts..."
                            className="w-full pl-5 pr-14 py-4 rounded-2xl bg-white border-2 border-gray-200 focus:border-[#C8102E] focus:ring-4 focus:ring-red-100 focus:outline-none transition-all text-lg shadow-sm group-hover:shadow-md"
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-gradient-to-r from-[#C8102E] to-[#e91e3a] text-white hover:shadow-lg hover:shadow-red-500/25 transition-all"
                        >
                            <Search size={20} />
                        </button>
                    </div>
                </form>

                {/* Quick Actions */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    <Link
                        href={`/${storeSlug}`}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-medium transition-colors"
                    >
                        <Home size={18} />
                        Home
                    </Link>
                    <Link
                        href={`/${storeSlug}/products`}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#C8102E] to-[#e91e3a] text-white rounded-full font-medium shadow-lg shadow-red-500/25 hover:shadow-xl transition-all"
                    >
                        <Package size={18} />
                        Browse Products
                    </Link>
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-medium transition-colors"
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </button>
                </div>

                {/* Popular Categories */}
                <div className="mb-8">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                        Popular Categories
                    </h3>
                    <div className="flex flex-wrap justify-center gap-3">
                        {popularCategories.map((cat) => (
                            <Link
                                key={cat.slug}
                                href={`/${storeSlug}/products?category=${cat.slug}`}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:border-[#C8102E] hover:shadow-md transition-all"
                            >
                                <span className="text-lg">{cat.emoji}</span>
                                <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Store Branding */}
                <div className="pt-8 border-t border-gray-100">
                    <p className="text-sm text-gray-400">
                        Need help? Contact us at{' '}
                        {tenant?.contactPhone ? (
                            <a href={`tel:${tenant.contactPhone}`} className="text-[#C8102E] hover:underline font-medium">
                                {tenant.contactPhone}
                            </a>
                        ) : (
                            <span className="text-gray-500">our support line</span>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}
