
"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShoppingCart, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { useTenant } from '@/lib/tenant-context';

interface AddToCartDialogProps {
    isOpen: boolean;
    onClose: () => void;
    product: {
        name: string;
        image: string;
        price: number;
        quantity: number;
    };
}

export function AddToCartDialog({ isOpen, onClose, product }: AddToCartDialogProps) {
    const { tenant } = useTenant();
    const currency = tenant?.currency || 'LKR';

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(onClose, 5000);
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    const storeSlug = tenant?.subdomain || 'demo';

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black z-[60]"
                    />

                    {/* Dialog */}
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-full max-w-md p-4"
                    >
                        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
                            {/* Header */}
                            <div className="bg-green-50 p-4 border-b border-green-100 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-green-700 font-semibold">
                                    <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center">
                                        <Check size={14} className="text-green-700" />
                                    </div>
                                    Added to Cart
                                </div>
                                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-6">
                                <div className="flex gap-4">
                                    <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            width={80}
                                            height={80}
                                            className="object-contain w-full h-full"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-800 line-clamp-2 mb-1">{product.name}</h3>
                                        <p className="text-sm text-gray-500 mb-2">Qty: {product.quantity}</p>
                                        <p className="font-bold" style={{ color: tenant?.primaryColor || '#C8102E' }}>
                                            {currency} {product.price.toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 flex gap-3">
                                    <button
                                        onClick={onClose}
                                        className="flex-1 py-2.5 px-4 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                    >
                                        Continue Shopping
                                    </button>
                                    <Link
                                        href={`/${storeSlug}/cart`}
                                        className="flex-1 py-2.5 px-4 rounded-lg text-white font-medium flex items-center justify-center gap-2 hover:brightness-90 transition-all shadow-md"
                                        style={{ backgroundColor: tenant?.primaryColor || '#C8102E' }}
                                    >
                                        <ShoppingCart size={18} />
                                        View Cart
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
