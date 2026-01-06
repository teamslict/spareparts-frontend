"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTenant } from '@/lib/tenant-context';

const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/about', label: 'ABOUT' },
    { href: '/services', label: 'SERVICES' },
    { href: '/contact', label: 'CONTACT' },
];

export function Navigation() {
    const pathname = usePathname();
    const { tenant } = useTenant();

    return (
        <nav
            className="text-white py-3"
            style={{ backgroundColor: tenant?.primaryColor || '#C8102E' }}
        >
            <div className="container-custom">
                <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`px-4 py-2 font-semibold text-sm sm:text-base transition-all duration-200 rounded ${pathname === link.href
                                    ? 'bg-white/20'
                                    : 'hover:bg-white/10'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/auth/login"
                        className={`px-4 py-2 font-semibold text-sm sm:text-base transition-all duration-200 rounded flex items-center gap-1 ${pathname.startsWith('/auth')
                                ? 'bg-white/20'
                                : 'hover:bg-white/10'
                            }`}
                    >
                        LOGIN & REGISTER
                    </Link>
                </div>
            </div>
        </nav>
    );
}
