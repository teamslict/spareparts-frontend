"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useTenant } from '@/lib/tenant-context';
import { useCart } from '@/lib/cart-store';
import { useState, useEffect } from 'react';
import { Container } from '@/components/ui';
import { usePathname, useRouter } from 'next/navigation';

export function Header() {
    const { tenant } = useTenant();
    const { getItemCount } = useCart();
    const pathname = usePathname();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Header scroll effect
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const storeSlug = tenant?.subdomain || 'demo';
    const getLink = (path: string) => `/${storeSlug}${path}`;

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/${storeSlug}/products?search=${encodeURIComponent(searchQuery)}`);
            setIsMobileMenuOpen(false);
        }
    };

    const navLinks = [
        { href: getLink('/'), label: 'Home' },
        { href: getLink('/products'), label: 'Products' },
        { href: getLink('/services'), label: 'Services' },
        { href: getLink('/about'), label: 'About' },
        { href: getLink('/contact'), label: 'Contact' },
    ];

    const cartCount = getItemCount(storeSlug);

    const isActive = (href: string) => {
        if (href === getLink('/')) return pathname === href;
        return pathname === href || pathname.startsWith(`${href}/`);
    };

    return (
        <>
            <header
                className={`sticky top-0 z-50 transition-all duration-200 ${isScrolled
                        ? 'bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
                        : 'bg-white/95 border-b border-gray-100'
                    }`}
            >
                <Container className="h-16 flex items-center justify-between gap-3">
                    {/* Logo */}
                    <Link href={getLink('/')} className="flex-shrink-0 flex items-center gap-2">
                        {tenant?.logoUrl ? (
                            <div className="relative h-8 w-36">
                                <Image
                                    src={tenant.logoUrl}
                                    alt={tenant.storeName}
                                    fill
                                    className="object-contain object-left"
                                />
                            </div>
                        ) : (
                            <>
                                <div
                                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-extrabold text-sm shadow-sm"
                                    style={{ backgroundColor: tenant?.primaryColor || '#dc2626' }}
                                >
                                    {tenant?.storeName?.charAt(0) || 'S'}
                                </div>
                                <span className="text-lg font-extrabold tracking-tight text-gray-900 hidden sm:block">
                                    {tenant?.storeName || 'AutoParts'}
                                </span>
                            </>
                        )}
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map(link => {
                            const active = isActive(link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-3.5 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${active
                                            ? 'text-gray-900 bg-gray-100'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-md">
                        <form onSubmit={handleSearch} className="w-full relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search parts..."
                                className="w-full pl-4 pr-10 py-2.5 text-sm rounded-xl bg-gray-100/80 border border-transparent focus:bg-white focus:border-gray-200 focus:outline-none transition-all"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-white/60"
                                aria-label="Search"
                            >
                                <Search size={18} />
                            </button>
                        </form>
                    </div>

                    {/* Utilities */}
                    <div className="flex items-center gap-1">
                        {/* Account */}
                        <Link
                            href={getLink('/account')}
                            className="hidden sm:flex p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
                            aria-label="Account"
                        >
                            <User size={20} />
                        </Link>

                        {/* Cart */}
                        <Link
                            href={getLink('/cart')}
                            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
                            aria-label="Cart"
                        >
                            <ShoppingCart size={20} />
                            {cartCount > 0 && (
                                <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] bg-red-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full px-1">
                                    {cartCount > 99 ? '99+' : cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
                            aria-label="Toggle menu"
                            type="button"
                        >
                            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </Container>
            </header>

            {/* Mobile Menu Drawer */}
            {isMobileMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/25 backdrop-blur-sm z-40 lg:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    {/* Drawer */}
                    <div className="fixed top-16 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg z-50 lg:hidden">
                        <Container className="py-4">
                            {/* Mobile Search */}
                            <form onSubmit={handleSearch} className="mb-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search parts..."
                                        className="w-full pl-4 pr-10 py-3 text-sm rounded-xl bg-gray-100 border border-transparent focus:bg-white focus:border-gray-200 focus:outline-none"
                                    />
                                    <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                </div>
                            </form>

                            {/* Mobile Nav Links */}
                            <nav className="space-y-1">
                                {navLinks.map(link => {
                                    const active = isActive(link.href);
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={`block py-3 px-4 font-semibold rounded-xl transition-colors ${active
                                                    ? 'text-gray-900 bg-gray-100'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                    );
                                })}
                                <Link
                                    href={getLink('/account')}
                                    className={`block py-3 px-4 font-semibold rounded-xl transition-colors sm:hidden ${pathname.startsWith(getLink('/account'))
                                            ? 'text-gray-900 bg-gray-100'
                                            : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Account
                                </Link>
                            </nav>
                        </Container>
                    </div>
                </>
            )}
        </>
    );
}
