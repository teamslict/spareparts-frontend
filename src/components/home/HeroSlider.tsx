"use client";

import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTenant } from '@/lib/tenant-context';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Fallback placeholder for missing hero images
// (placeholder currently handled via inline SVG fallback)

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

        // Subscribe before initial sync to avoid lint rule complaining about immediate setState in effect.
        emblaApi.on('select', onSelect);

        // Sync selected index on next tick.
        const t = setTimeout(() => onSelect(), 0);

        // Auto-play
        const autoplay = setInterval(() => {
            if (emblaApi.canScrollNext()) {
                emblaApi.scrollNext();
            } else {
                emblaApi.scrollTo(0);
            }
        }, 5000);

        return () => {
            clearTimeout(t);
            emblaApi.off('select', onSelect);
            clearInterval(autoplay);
        };
    }, [emblaApi, onSelect]);

    return (
        <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 group">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {slides.map((slide, idx) => (
                        <div
                            key={slide.id || idx}
                            className="flex-[0_0_100%] min-w-0"
                            style={{
                                background: `radial-gradient(1200px circle at 70% 40%, ${tenant?.primaryColor ? `${tenant.primaryColor}14` : '#ffe4e6'} 0%, #ffffff 55%, #f8fafc 100%)`
                            }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-6 sm:px-10 lg:px-12 py-10 sm:py-14 md:py-16 min-h-[360px] md:min-h-[420px]">
                                {/* Content */}
                                <div className="z-10 text-center md:text-left">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                    >
                                        <p className="font-bold text-xs uppercase tracking-[0.25em] mb-4 text-slate-600 bg-white/70 backdrop-blur-sm inline-block px-3 py-1.5 rounded-full border border-slate-100">
                                            {slide.title}
                                        </p>
                                    </motion.div>

                                    <motion.h2
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-[1.05] tracking-tight"
                                    >
                                        {slide.subtitle}
                                    </motion.h2>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.35 }}
                                    >
                                        <Link
                                            href={slide.buttonLink}
                                            className="group/btn relative inline-flex items-center justify-center px-7 py-3.5 text-white font-bold text-sm rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                                            style={{ backgroundColor: tenant?.primaryColor || '#C8102E' }}
                                        >
                                            <span className="absolute inset-0 w-full h-full bg-white/20 group-hover/btn:scale-[1.5] transition-transform duration-500 rounded-full origin-center -z-0 opacity-0 group-hover/btn:opacity-100" />
                                            <span className="relative z-10 flex items-center gap-2">
                                                {slide.buttonText}
                                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                            </span>
                                        </Link>
                                    </motion.div>
                                </div>

                                {/* Image */}
                                <div className="flex justify-center items-center relative">
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.08, 1],
                                            rotate: [0, 4, -4, 0],
                                            borderRadius: ["50%", "42% 58% 68% 32% / 44% 52% 58% 46%", "50%"]
                                        }}
                                        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
                                        className="absolute w-64 h-64 md:w-[420px] md:h-[420px] opacity-15 blur-3xl z-0"
                                        style={{ backgroundColor: tenant?.primaryColor || '#C8102E' }}
                                    />

                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9, x: 20 }}
                                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                                        transition={{ duration: 0.7, type: "spring" }}
                                        className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px] z-10"
                                    >
                                        {slide.imageUrl ? (
                                            <Image
                                                src={slide.imageUrl}
                                                alt={slide.subtitle}
                                                fill
                                                className="object-contain drop-shadow-[0_18px_45px_rgba(0,0,0,0.22)]"
                                                priority={idx === 0}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <motion.div
                                                    animate={{ y: [-8, 8, -8] }}
                                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                                >
                                                    <svg viewBox="0 0 200 200" className="w-full h-full opacity-80 drop-shadow-xl">
                                                        <defs>
                                                            <linearGradient id={`grad-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                                                <stop offset="0%" style={{ stopColor: tenant?.primaryColor || '#C8102E', stopOpacity: 0.85 }} />
                                                                <stop offset="100%" style={{ stopColor: tenant?.secondaryColor || '#1E3A5F', stopOpacity: 0.65 }} />
                                                            </linearGradient>
                                                        </defs>
                                                        <path d="M40 100 L80 140 L160 60" stroke={`url(#grad-${idx})`} strokeWidth="18" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                                        <circle cx="150" cy="150" r="18" fill={tenant?.primaryColor} opacity="0.45" />
                                                        <circle cx="50" cy="50" r="26" fill={tenant?.secondaryColor} opacity="0.25" />
                                                    </svg>
                                                </motion.div>
                                            </div>
                                        )}
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20 px-4 py-2 bg-white/40 backdrop-blur-md rounded-full border border-white/30">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={`transition-all duration-300 rounded-full ${index === selectedIndex
                            ? 'w-10 h-2'
                            : 'w-2 h-2 hover:bg-gray-800'
                            }`}
                        style={{
                            backgroundColor: index === selectedIndex
                                ? (tenant?.primaryColor || '#C8102E')
                                : 'rgba(15,23,42,0.28)'
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
