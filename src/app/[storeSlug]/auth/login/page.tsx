"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTenant } from '@/lib/tenant-context';

import { api } from '@/lib/api';
import { getErrorMessage } from '@/lib/error-utils';

export default function LoginPage() {
    const { tenant } = useTenant();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const storeSlug = tenant?.subdomain || 'demo';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const data = await api.loginCustomer(storeSlug, formData);

            // Store token in localStorage for now
            // In a real production app, this should be handled by httpOnly cookies or NextAuth
            localStorage.setItem('spareparts_token', data.token);
            localStorage.setItem('spareparts_user', JSON.stringify(data.user));

            console.log('Login success:', data.user.name);

            // Redirect to home or account
            router.push(`/${storeSlug}`);
            router.refresh(); // Refresh to update UI state if we had a user listener
        } catch (error: unknown) {
            console.error(error);
            alert(getErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h1>
                        <p className="text-gray-500">Sign in to your {tenant?.storeName || 'store'} account</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input type="checkbox" className="w-4 h-4 text-[#C8102E] border-gray-300 rounded" />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>
                            <Link href={`/${storeSlug}/auth/forgot-password`} className="text-sm text-[#C8102E] hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-[#C8102E] text-white font-semibold rounded-lg hover:bg-[#A60D24] transition-colors disabled:bg-gray-400"
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center">
                        <div className="flex-1 border-t border-gray-200"></div>
                        <span className="px-4 text-sm text-gray-400">or</span>
                        <div className="flex-1 border-t border-gray-200"></div>
                    </div>

                    {/* Register Link */}
                    <p className="text-center text-sm text-gray-600">
                        Don&apos;t have an account?{' '}
                        <Link href={`/${storeSlug}/auth/register`} className="text-[#C8102E] font-medium hover:underline">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
