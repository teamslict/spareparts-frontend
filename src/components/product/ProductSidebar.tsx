"use client";

import Link from 'next/link';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface SubItem {
    name: string;
    slug: string;
}

interface AccordionItem {
    name: string;
    slug: string;
    subItems?: SubItem[];
}

const sidebarItems: AccordionItem[] = [
    {
        name: 'TOYOTA',
        slug: 'toyota',
        subItems: [
            { name: 'Toyota Corolla', slug: 'toyota-corolla' },
            { name: 'Toyota Vitz', slug: 'toyota-vitz' },
            { name: 'Toyota Prius', slug: 'toyota-prius' },
        ]
    },
    {
        name: 'NISSAN',
        slug: 'nissan',
        subItems: [
            { name: 'Nissan March', slug: 'nissan-march' },
            { name: 'Nissan Sunny', slug: 'nissan-sunny' },
        ]
    },
    {
        name: 'MITSUBISHI',
        slug: 'mitsubishi',
        subItems: [
            { name: 'Lancer', slug: 'mitsubishi-lancer' },
        ]
    },
    {
        name: 'CHERY',
        slug: 'chery',
        subItems: [
            { name: 'CHERY QQ', slug: 'chery-qq' },
            { name: 'CHERY Tiggo', slug: 'chery-tiggo' },
        ]
    },
    { name: 'ZOTYE', slug: 'zotye' },
    { name: 'DFSK', slug: 'dfsk' },
    { name: 'FOTON', slug: 'foton' },
    { name: 'HONDA', slug: 'honda' },
    { name: 'SUZUKI', slug: 'suzuki' },
];

export function ProductSidebar() {
    const [openItems, setOpenItems] = useState<string[]>([]);

    const toggleItem = (slug: string) => {
        setOpenItems((prev) =>
            prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
        );
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {sidebarItems.map((item) => (
                <div key={item.slug} className="border-b border-gray-100 last:border-b-0">
                    <div
                        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => item.subItems && toggleItem(item.slug)}
                    >
                        <Link
                            href={`/brand/${item.slug}`}
                            onClick={(e) => item.subItems && e.preventDefault()}
                            className="font-medium text-gray-800 text-sm"
                        >
                            {item.name}
                        </Link>
                        {item.subItems && (
                            <ChevronDown
                                size={18}
                                className={`text-gray-400 transition-transform ${openItems.includes(item.slug) ? 'rotate-180' : ''
                                    }`}
                            />
                        )}
                    </div>

                    {/* Submenu */}
                    {item.subItems && openItems.includes(item.slug) && (
                        <div className="bg-gray-50 py-2">
                            {item.subItems.map((subItem) => (
                                <Link
                                    key={subItem.slug}
                                    href={`/brand/${item.slug}/${subItem.slug}`}
                                    className="block px-8 py-2 text-sm text-gray-600 hover:text-[#C8102E] transition-colors"
                                >
                                    {subItem.name}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
