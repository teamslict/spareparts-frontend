"use client";

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useTenant } from '@/lib/tenant-context';

export default function CheckoutSuccessPage() {
    const { tenant } = useTenant();
    const searchParams = useSearchParams();
    const orderNumber = searchParams.get('order');
    const storeSlug = tenant?.subdomain || 'demo';

    return (
        <div className="container mx-auto px-4 py-16 text-center">
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
                {/* Success Icon */}
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h1>

                {orderNumber && (
                    <p className="text-gray-600 mb-6">
                        Your order number is: <span className="font-bold text-[#C8102E]">{orderNumber}</span>
                    </p>
                )}

                <p className="text-gray-500 text-sm mb-8">
                    We&apos;ll contact you shortly to confirm your order and arrange delivery.
                </p>

                <div className="space-y-3">
                    <Link
                        href={`/${storeSlug}/products`}
                        className="block w-full py-3 bg-[#C8102E] text-white font-semibold rounded-lg hover:bg-[#A60D24] transition-colors"
                    >
                        Continue Shopping
                    </Link>
                    <Link
                        href={`/${storeSlug}`}
                        className="block w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
