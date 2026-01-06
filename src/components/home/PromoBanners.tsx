"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useTenant } from '@/lib/tenant-context';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';

const defaultBanners = [
    {
        id: '1',
        title: 'Car Audio',
        subtitle: 'Super Natural Sound',
        imageUrl: '',
        link: '/category/audio',
        bgColor: '#1E3A5F',
    },
    {
        id: '2',
        title: 'All - New',
        subtitle: 'Performance Parts',
        imageUrl: '',
        link: '/category/performance',
        bgColor: '#F5F5F5',
    },
];

export function PromoBanners() {
    const { tenant } = useTenant();

    // Use banners from tenant config or defaults
    const banners = tenant?.promoBanners?.length ? tenant.promoBanners : defaultBanners;

    return (
        <section className="py-16 md:py-24 my-12">
            <div className="container-custom">
                <div className="grid md:grid-cols-2 gap-6">
                    {banners.map((banner) => {
                        const isDark = banner.bgColor.toLowerCase() !== '#f5f5f5' && banner.bgColor.toLowerCase() !== '#ffffff';

                        return (
                            <Link
                                key={banner.id}
                                href={banner.link}
                                className="relative overflow-hidden rounded-lg group min-h-[160px]"
                                style={{ backgroundColor: banner.bgColor }}
                            >
                                <div className="flex items-center justify-between p-6 h-full">
                                    {/* Content */}
                                    <div className={isDark ? 'text-white' : 'text-gray-800'}>
                                        <p className="text-sm mb-1 opacity-80">{banner.title}</p>
                                        <h3 className="text-2xl font-bold">{banner.subtitle}</h3>
                                    </div>

                                    {/* Image or placeholder */}
                                    <div className="relative w-28 h-28 md:w-32 md:h-32 transform group-hover:scale-110 transition-transform duration-300">
                                        <Image
                                            src={banner.imageUrl || PLACEHOLDER_IMAGE}
                                            alt={banner.subtitle}
                                            fill
                                            className="object-contain"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = PLACEHOLDER_IMAGE;
                                            }}
                                        />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
