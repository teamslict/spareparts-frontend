"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, ChevronDown, Phone, X, Heart } from 'lucide-react';
import { useTenant } from '@/lib/tenant-context';
import { useCart } from '@/lib/cart-store';
import { useWishlist } from '@/lib/wishlist-store';
import { useState, useEffect } from 'react';

export function Header() {
    const { tenant } = useTenant();
    const { getItemCount: getCartCount } = useCart();
    const { getItemCount: getWishlistCount } = useWishlist();
    const [searchQuery, setSearchQuery] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Header scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
        }
    };

    // Helper to format links
    // If slug is 'default' or matches root logic, we can keep links relative or absolute
    // But for path-based, we must prefix. 
    // If subdomain is 'demo' or 'default', we assume root? Or standard path?
    // Let's rely on the URL or Config. 
    // Ideally, we want `/shop-x/products`. 
    // If the user visited `/`, slug is 'demo' (based on current logic). 
    // We should probably check if we are in a 'named' store path.

    const getLink = (path: string) => {
        // Current tenant.subdomain holds the slug (e.g., 'shop-x')
        const slug = tenant?.subdomain || 'demo';
        return `/${slug}${path}`;
    };

    const navLinks = [
        { href: getLink('/'), label: 'Home' },
        { href: getLink('/products'), label: 'Products' },
        { href: getLink('/services'), label: 'Services' },
        { href: getLink('/about'), label: 'About' },
        { href: getLink('/contact'), label: 'Contact' },
    ];

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white/95 border-b border-gray-100'
                }`}
        >
            <div className="container-custom h-20 flex items-center justify-between gap-4 md:gap-8">

                {/* 1. Logo */}
                <Link href={getLink('/')} className="flex-shrink-0 relative group">
                    {tenant?.logoUrl ? (
                        <div className="relative h-10 w-40 hover:opacity-90 transition-opacity">
                            <Image
                                src={tenant.logoUrl}
                                alt={tenant.storeName}
                                fill
                                className="object-contain object-left"
                            />
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl transform group-hover:scale-105 transition-transform"
                                style={{ backgroundColor: tenant?.primaryColor || '#dc2626' }}>
                                {tenant?.storeName?.charAt(0) || 'S'}
                            </div>
                            <span className="text-xl font-bold text-gray-900 tracking-tight group-hover:text-gray-700 transition-colors">
                                {tenant?.storeName || 'AutoParts'}
                            </span>
                        </div>
                    )}
                </Link>

                {/* 2. Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-6">
                    {navLinks.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-wider relative group"
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    ))}
                </nav>

                {/* 3. Search Bar (Centered/Wide) */}
                <div className="hidden md:flex flex-1 max-w-md mx-auto lg:mx-0 lg:ml-auto">
                    <form onSubmit={handleSearch} className="w-full relative group">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search parts, car models..."
                            className="w-full pl-5 pr-12 py-2.5 rounded-full bg-gray-100 border-2 border-transparent focus:bg-white focus:border-red-100 focus:outline-none focus:ring-2 focus:ring-red-100 transition-all text-sm group-hover:bg-white group-hover:shadow-sm"
                        />
                        <button
                            type="submit"
                            className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white text-gray-500 hover:text-red-600 hover:bg-gray-50 transition-colors"
                        >
                            <Search size={18} />
                        </button>
                    </form>
                </div>

                {/* 4. Utilities (Cart, Account, Mobile Menu) */}
                <div className="flex items-center gap-3 md:gap-5">

                    {/* Wishlist */}
                    <Link href={getLink('/account/wishlist')} className="hidden sm:flex items-center gap-2 group p-2 rounded-full hover:bg-gray-50 transition-colors relative">
                        <Heart size={20} className="text-gray-700 group-hover:text-red-600 transition-colors" />
                        <span className="text-xs font-medium text-gray-600 group-hover:text-red-600 hidden xl:block">Saved</span>
                        {getWishlistCount(tenant?.subdomain || 'demo') > 0 && (
                            <span className="absolute top-0 right-0 w-4 h-4 bg-red-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full animate-bounce-short">
                                {getWishlistCount(tenant?.subdomain || 'demo')}
                            </span>
                        )}
                    </Link>

                    {/* Account */}
                    <Link href={getLink('/account')} className="hidden sm:flex items-center gap-2 group p-2 rounded-full hover:bg-gray-50 transition-colors">
                        <User size={20} className="text-gray-700 group-hover:text-red-600 transition-colors" />
                        <span className="text-xs font-medium text-gray-600 group-hover:text-red-600 hidden xl:block">Account</span>
                    </Link>

                    {/* Cart */}
                    <Link href={getLink('/cart')} className="relative p-2 rounded-full hover:bg-gray-50 transition-colors group">
                        <ShoppingCart size={22} className="text-gray-700 group-hover:text-red-600 transition-colors" />
                        {getCartCount(tenant?.subdomain || 'demo') > 0 && (
                            <span className="absolute top-0 right-0 w-4 h-4 bg-red-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full animate-bounce-short">
                                {getCartCount(tenant?.subdomain || 'demo')}
                            </span>
                        )}
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-t border-gray-100 shadow-xl py-4 space-y-4 px-4 z-50">
                    <form onSubmit={handleSearch} className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search..."
                            className="w-full pl-4 pr-10 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-red-500"
                        />
                        <Search size={18} className="absolute right-3 top-2.5 text-gray-400" />
                    </form>
                    <nav className="flex flex-col space-y-2">
                        {navLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="block py-2 text-gray-700 font-medium hover:text-red-600 border-b border-gray-50 last:border-0"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
