"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTenant } from '@/lib/tenant-context';
import { ChevronRight, ArrowLeft, Car, CheckCircle } from 'lucide-react';
import { api } from '@/lib/api';
import { getErrorMessage } from '@/lib/error-utils';

export default function AddVehiclePage() {
    const { tenant } = useTenant();
    const router = useRouter();
    const storeSlug = tenant?.subdomain || 'demo';

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        make: '',
        model: '',
        year: '',
        plateNumber: '',
        vin: ''
    });

    // Mock data for dropdowns (Ideally fetch from backend)
    const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(String);
    const makes = ["Toyota", "Nissan", "Honda", "Mitsubishi", "Mazda", "Suzuki", "Kia", "Hyundai", "BMW", "Mercedes"];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('spareparts_token');
        if (!token) {
            router.push(`/${storeSlug}/auth/login`);
            return;
        }

        setLoading(true);
        try {
            await api.addVehicle(storeSlug, token, formData);
            router.push(`/${storeSlug}/account/vehicles`);
        } catch (error: unknown) {
            console.error("Failed to add vehicle", error);
            alert(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="container-custom py-8">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <Link href={`/${storeSlug}/account`} className="hover:text-red-600">Account</Link>
                        <ChevronRight size={14} />
                        <Link href={`/${storeSlug}/account/vehicles`} className="hover:text-red-600">Garage</Link>
                        <ChevronRight size={14} />
                        <span className="text-gray-900">Add Vehicle</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href={`/${storeSlug}/account/vehicles`}
                            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                        >
                            <ArrowLeft size={20} className="text-gray-600" />
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">Add New Vehicle</h1>
                    </div>
                </div>
            </div>

            <div className="container-custom py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                                    <Car size={24} className="text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">Vehicle Details</h2>
                                    <p className="text-gray-400 text-sm">Enter you vehicle information for perfect part matching.</p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-2">Make <span className="text-red-600">*</span></label>
                                    <select
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-gray-50/50"
                                        value={formData.make}
                                        onChange={e => setFormData({ ...formData, make: e.target.value })}
                                    >
                                        <option value="">Select Make</option>
                                        {makes.map(m => <option key={m} value={m}>{m}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-2">Model <span className="text-red-600">*</span></label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Corolla, Civic"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-gray-50/50"
                                        value={formData.model}
                                        onChange={e => setFormData({ ...formData, model: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-2">Year <span className="text-red-600">*</span></label>
                                    <select
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-gray-50/50"
                                        value={formData.year}
                                        onChange={e => setFormData({ ...formData, year: e.target.value })}
                                    >
                                        <option value="">Select Year</option>
                                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-2">Plate Number (Optional)</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. CAB-1234"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-gray-50/50 uppercase"
                                        value={formData.plateNumber}
                                        onChange={e => setFormData({ ...formData, plateNumber: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">VIN / Chassis Number (Optional)</label>
                                <input
                                    type="text"
                                    placeholder="Enter VIN for exact matching"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-gray-50/50 uppercase"
                                    value={formData.vin}
                                    onChange={e => setFormData({ ...formData, vin: e.target.value })}
                                />
                                <p className="text-xs text-gray-500 mt-2">Recommended for ensuring 100% part compatibility.</p>
                            </div>

                            <div className="pt-6 border-t border-gray-100 flex gap-4">
                                <Link
                                    href={`/${storeSlug}/account/vehicles`}
                                    className="px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 px-6 py-3 bg-[#C8102E] text-white font-bold rounded-xl hover:bg-[#A60D24] transition-colors shadow-lg shadow-red-600/20 disabled:opacity-50"
                                >
                                    {loading ? 'Adding Vehicle...' : 'Save to Garage'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
