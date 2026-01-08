"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, Tag, User } from 'lucide-react';
import { useTenant } from '@/lib/tenant-context';

// Demo blog posts (would be fetched from API in production)
const demoPosts = [
    {
        id: '1',
        slug: 'how-to-change-your-oil',
        title: 'How to Change Your Engine Oil: A Complete Guide',
        excerpt: 'Learn the step-by-step process to change your engine oil at home and save money on maintenance.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
        category: 'Maintenance',
        author: 'Auto Expert',
        date: '2026-01-05',
        readTime: '5 min read',
    },
    {
        id: '2',
        slug: 'top-brake-pad-brands-2026',
        title: 'Top 5 Brake Pad Brands to Trust in 2026',
        excerpt: 'We review the best brake pad brands for performance, durability, and value for money.',
        image: 'https://images.unsplash.com/photo-1558618047-f4b511ccbb1f?auto=format&fit=crop&q=80&w=800',
        category: 'Reviews',
        author: 'Parts Reviewer',
        date: '2026-01-01',
        readTime: '8 min read',
    },
    {
        id: '3',
        slug: 'signs-you-need-new-spark-plugs',
        title: '5 Signs You Need to Replace Your Spark Plugs',
        excerpt: 'Ignoring worn spark plugs can lead to bigger problems. Here are the warning signs to watch for.',
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=800',
        category: 'Tips',
        author: 'Mechanic Mike',
        date: '2025-12-20',
        readTime: '4 min read',
    },
];

const categories = [
    { name: 'Maintenance', count: 12 },
    { name: 'Reviews', count: 8 },
    { name: 'Tips', count: 15 },
    { name: 'News', count: 6 },
];

export default function BlogPage() {
    const { tenant } = useTenant();
    const storeSlug = tenant?.subdomain || 'demo';

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero */}
            <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20"></div>
                <div className="container-custom relative z-10">
                    <div className="max-w-2xl">
                        <span className="inline-block px-3 py-1 bg-[#C8102E] text-white text-xs font-bold rounded-full uppercase tracking-wider mb-4">
                            Blog
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                            Auto Parts Tips & Guides
                        </h1>
                        <p className="text-gray-300 text-lg">
                            Expert advice, maintenance tips, and product reviews to keep your vehicle running smoothly.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container-custom py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Featured Post */}
                        <Link href={`/${storeSlug}/blog/${demoPosts[0].slug}`} className="block mb-12 group">
                            <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-xl">
                                <Image
                                    src={demoPosts[0].image}
                                    alt={demoPosts[0].title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <span className="inline-block px-3 py-1 bg-[#C8102E] text-white text-xs font-bold rounded-full mb-4">
                                        {demoPosts[0].category}
                                    </span>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-[#C8102E] transition-colors">
                                        {demoPosts[0].title}
                                    </h2>
                                    <p className="text-gray-300 text-sm max-w-lg">{demoPosts[0].excerpt}</p>
                                    <div className="flex items-center gap-4 mt-4 text-gray-400 text-sm">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={14} /> {demoPosts[0].date}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={14} /> {demoPosts[0].readTime}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {/* Post Grid */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {demoPosts.slice(1).map((post) => (
                                <Link key={post.id} href={`/${storeSlug}/blog/${post.slug}`} className="group">
                                    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                                        <div className="relative aspect-video overflow-hidden">
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold rounded-full">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#C8102E] transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-500 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
                                            <div className="flex items-center justify-between text-xs text-gray-400">
                                                <div className="flex items-center gap-3">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar size={12} /> {post.date}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock size={12} /> {post.readTime}
                                                    </span>
                                                </div>
                                                <span className="flex items-center gap-1 text-[#C8102E] font-medium group-hover:gap-2 transition-all">
                                                    Read <ArrowRight size={14} />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </main>

                    {/* Sidebar */}
                    <aside className="lg:w-80 space-y-8">
                        {/* Categories */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Tag size={18} className="text-[#C8102E]" />
                                Categories
                            </h3>
                            <div className="space-y-2">
                                {categories.map((cat) => (
                                    <Link
                                        key={cat.name}
                                        href={`/${storeSlug}/blog?category=${cat.name.toLowerCase()}`}
                                        className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="text-gray-700">{cat.name}</span>
                                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{cat.count}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter Signup */}
                        <div className="bg-gradient-to-br from-[#C8102E] to-[#991b1b] rounded-2xl p-6 text-white">
                            <h3 className="font-bold text-lg mb-2">Stay Updated</h3>
                            <p className="text-white/80 text-sm mb-4">Get the latest auto tips and deals delivered to your inbox.</p>
                            <form className="space-y-3">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                                />
                                <button className="w-full py-3 bg-white text-[#C8102E] font-bold rounded-xl hover:bg-gray-100 transition-colors">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
