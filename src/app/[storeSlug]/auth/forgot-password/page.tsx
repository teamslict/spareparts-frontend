"use client";

import Link from 'next/link';
import { useTenant } from '@/lib/tenant-context';

export default function ForgotPasswordPage() {
    const { tenant } = useTenant();
    const storeSlug = tenant?.subdomain || 'demo';

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Forgot Password?</h1>
                    <p className="text-gray-600 mb-8">
                        This feature is coming soon. Please contact the store for password recovery assistance.
                    </p>
                    <Link
                        href={`/${storeSlug}/auth/login`}
                        className="inline-block px-6 py-3 bg-[#C8102E] text-white font-semibold rounded-lg hover:bg-[#A60D24] transition-colors"
                    >
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
