"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTenant } from '@/lib/tenant-context';
import { Container } from '@/components/ui';

export function Navigation() {
    const pathname = usePathname();
    const { tenant } = useTenant();

    const storeSlug = tenant?.subdomain || 'demo';
    const getLink = (path: string) => `/${storeSlug}${path}`;

    const navLinks = [
        { href: getLink('/'), label: 'Home' },
        { href: getLink('/products'), label: 'Products' },
        { href: getLink('/services'), label: 'Services' },
        { href: getLink('/about'), label: 'About' },
        { href: getLink('/contact'), label: 'Contact' },
    ];

    return (
        <nav
            className="text-white py-2"
            style={{ backgroundColor: tenant?.primaryColor || '#C8102E' }}
        >
            <Container>
                <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-3">
                    {navLinks.map((link) => {
                        const active = pathname === link.href || (link.href !== getLink('/') && pathname.startsWith(`${link.href}/`));
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-3 py-2 font-semibold text-sm transition-all duration-200 rounded-xl ${active
                                    ? 'bg-white/20'
                                    : 'hover:bg-white/10'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                    <Link
                        href={getLink('/auth/login')}
                        className={`px-3 py-2 font-semibold text-sm transition-all duration-200 rounded-xl ${pathname.startsWith(getLink('/auth'))
                            ? 'bg-white/20'
                            : 'hover:bg-white/10'
                            }`}
                    >
                        Login
                    </Link>
                </div>
            </Container>
        </nav>
    );
}
