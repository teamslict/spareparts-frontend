"use client";

import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTenant } from '@/lib/tenant-context';

import { PLACEHOLDER_IMAGE } from '@/lib/constants';

// Fallback placeholder for missing hero images
const HERO_PLACEHOLDER = PLACEHOLDER_IMAGE;

export function HeroSlider() {
    const { tenant } = useTenant();
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Use slides from tenant config or fallback
    const slides = tenant?.heroSlides?.length ? tenant.heroSlides : [
        {
            id: '1',
            imageUrl: '',
            title: 'Top Quality',
            subtitle: 'Aftermarket Turbocharger Specialist',
            buttonText: 'SHOPPING NOW',
            buttonLink: '/products',
        },
        {
            id: '2',
            imageUrl: '',
            title: 'Best Prices',
            subtitle: 'Engine Parts & Accessories',
            buttonText: 'SHOP NOW',
            buttonLink: '/category/engine-parts',
        },
    ];

    const scrollTo = useCallback(
        (index: number) => emblaApi && emblaApi.scrollTo(index),
        [emblaApi]
    );

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);

        // Auto-play
        const autoplay = setInterval(() => {
            if (emblaApi.canScrollNext()) {
                emblaApi.scrollNext();
            } else {
                emblaApi.scrollTo(0);
            }
        }, 5000);

        return () => {
            emblaApi.off('select', onSelect);
            clearInterval(autoplay);
        };
    }, [emblaApi, onSelect]);

    return (
        <div className="relative bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {slides.map((slide, idx) => (
                        <div
                            key={slide.id || idx}
                            className="flex-[0_0_100%] min-w-0 bg-gradient-to-r from-gray-50 to-white"
                        >
                            <div className="flex flex-col md:flex-row items-center justify-between px-8 py-12 md:py-20 min-h-[320px] md:min-h-[420px]">
                                {/* Content */}
                                <div className="flex-1 z-10 mb-8 md:mb-0 text-center md:text-left relative">
                                    <p className="text-gray-500 font-semibold text-sm uppercase tracking-widest mb-3">{slide.title}</p>
                                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-8 leading-tight tracking-tight">
                                        {slide.subtitle}
                                    </h2>
                                    <Link
                                        href={slide.buttonLink}
                                        className="inline-block px-10 py-4 text-white font-bold text-sm rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                        style={{ backgroundColor: tenant?.primaryColor || '#C8102E' }}
                                    >
                                        {slide.buttonText}
                                    </Link>
                                </div>

                                {/* Image */}
                                <div className="flex-1 flex justify-center items-center relative">
                                    {/* Decorative circle */}
                                    <div
                                        className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full opacity-10 blur-3xl"
                                        style={{ backgroundColor: tenant?.primaryColor || '#C8102E' }}
                                    />

                                    <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-96 lg:h-96 z-10">
                                        {slide.imageUrl ? (
                                            <Image
                                                src={slide.imageUrl}
                                                alt={slide.subtitle}
                                                fill
                                                className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                                                priority={idx === 0}
                                            />
                                        ) : (
                                            // SVG placeholder when no image
                                            <div className="w-full h-full flex items-center justify-center">
                                                <svg viewBox="0 0 200 200" className="w-full h-full opacity-50 drop-shadow-xl">
                                                    <defs>
                                                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                                            <stop offset="0%" style={{ stopColor: tenant?.primaryColor || '#C8102E', stopOpacity: 0.2 }} />
                                                            <stop offset="100%" style={{ stopColor: tenant?.secondaryColor || '#1E3A5F', stopOpacity: 0.1 }} />
                                                        </linearGradient>
                                                    </defs>
                                                    <circle cx="100" cy="100" r="80" fill="url(#grad1)" />
                                                    <path d="M70 140 L100 80 L130 140 Z" fill={tenant?.primaryColor || '#C8102E'} opacity="0.1" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={`transition-all duration-300 rounded-full ${index === selectedIndex
                            ? 'w-8 h-2'
                            : 'w-2 h-2 hover:opacity-75'
                            }`}
                        style={{
                            backgroundColor: index === selectedIndex
                                ? (tenant?.primaryColor || '#C8102E')
                                : '#CBD5E1'
                        }}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
