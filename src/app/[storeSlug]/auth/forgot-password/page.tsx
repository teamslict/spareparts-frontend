"use client";

import Link from 'next/link';
import { useTenant } from '@/lib/tenant-context';
import { Surface, Section } from '@/components/ui';

export default function ForgotPasswordPage() {
    const { tenant } = useTenant();
    const storeSlug = tenant?.subdomain || 'demo';

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <Section className="w-full max-w-lg">
                <Surface padding="lg" className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Forgot Password?</h1>
                    <p className="text-gray-600 mb-8">
                        This feature is coming soon. Please contact the store for password recovery assistance.
                    </p>
                    <Link
                        href={`/${storeSlug}/auth/login`}
                        className="inline-block px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        Back to Login
                    </Link>
                </Surface>
            </Section>
        </div>
    );
}
