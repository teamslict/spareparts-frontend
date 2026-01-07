"use client";

import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTenant } from '@/lib/tenant-context';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-100/50 group">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {slides.map((slide, idx) => (
                        <div
                            key={slide.id || idx}
                            className="flex-[0_0_100%] min-w-0"
                            style={{
                                background: `linear-gradient(135deg, #f8f9fa 0%, ${tenant?.primaryColor ? `${tenant.primaryColor}0D` : '#fff0f0'} 100%)`
                            }}
                        >
                            <div className="flex flex-col md:flex-row items-center justify-between px-8 py-12 md:py-20 min-h-[380px] md:min-h-[480px]">
                                {/* Content */}
                                <div className="flex-1 z-10 mb-8 md:mb-0 text-center md:text-left relative pl-0 md:pl-8">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                    >
                                        <p className="font-bold text-sm uppercase tracking-[0.2em] mb-4 text-gray-500 bg-white/50 backdrop-blur-sm inline-block px-3 py-1 rounded-full border border-gray-100">
                                            {slide.title}
                                        </p>
                                    </motion.div>

                                    <motion.h2
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-[1.1] tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600"
                                    >
                                        {slide.subtitle}
                                    </motion.h2>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                    >
                                        <Link
                                            href={slide.buttonLink}
                                            className="group/btn relative inline-flex items-center justify-center px-8 py-4 text-white font-bold text-sm rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                                            style={{ backgroundColor: tenant?.primaryColor || '#C8102E' }}
                                        >
                                            <span className="absolute inset-0 w-full h-full bg-white/20 group-hover/btn:scale-[1.5] transition-transform duration-500 rounded-full origin-center -z-0 opacity-0 group-hover/btn:opacity-100"></span>
                                            <span className="relative z-10 flex items-center gap-2">
                                                {slide.buttonText}
                                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                            </span>
                                        </Link>
                                    </motion.div>
                                </div>

                                {/* Image */}
                                <div className="flex-1 flex justify-center items-center relative pr-0 md:pr-8">
                                    {/* Decorative Blob */}
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.1, 1],
                                            rotate: [0, 5, -5, 0],
                                            borderRadius: ["50%", "40% 60% 70% 30% / 40% 50% 60% 50%", "50%"]
                                        }}
                                        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
                                        className="absolute w-64 h-64 md:w-[500px] md:h-[500px] opacity-10 blur-3xl z-0"
                                        style={{ backgroundColor: tenant?.primaryColor || '#C8102E' }}
                                    />

                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8, x: 50 }}
                                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                                        transition={{ duration: 0.8, type: "spring" }}
                                        className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] z-10"
                                    >
                                        {slide.imageUrl ? (
                                            <Image
                                                src={slide.imageUrl}
                                                alt={slide.subtitle}
                                                fill
                                                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                                                priority={idx === 0}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <motion.div
                                                    animate={{ y: [-10, 10, -10] }}
                                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                                >
                                                    <svg viewBox="0 0 200 200" className="w-full h-full opacity-80 drop-shadow-2xl">
                                                        <defs>
                                                            <linearGradient id={`grad-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                                                <stop offset="0%" style={{ stopColor: tenant?.primaryColor || '#C8102E', stopOpacity: 0.8 }} />
                                                                <stop offset="100%" style={{ stopColor: tenant?.secondaryColor || '#1E3A5F', stopOpacity: 0.6 }} />
                                                            </linearGradient>
                                                        </defs>
                                                        <path d="M40 100 L80 140 L160 60" stroke="url(#grad-${idx})" strokeWidth="20" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                                        <circle cx="150" cy="150" r="20" fill={tenant?.primaryColor} opacity="0.5" />
                                                        <circle cx="50" cy="50" r="30" fill={tenant?.secondaryColor} opacity="0.3" />
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
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20 px-4 py-2 bg-white/30 backdrop-blur-md rounded-full border border-white/20">
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
                                : 'rgba(0,0,0,0.3)'
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
