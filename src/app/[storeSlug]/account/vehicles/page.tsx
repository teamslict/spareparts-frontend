"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTenant } from '@/lib/tenant-context';
import { ChevronRight, Car, Plus, Trash2, Edit2 } from 'lucide-react';
import { api, Vehicle } from '@/lib/api';

export default function VehiclesPage() {
    const { tenant } = useTenant();
    const storeSlug = tenant?.subdomain || 'demo';

    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('spareparts_token');
        if (!storeSlug || !token) return;

        api.getVehicles(storeSlug, token)
            .then(setVehicles)
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [storeSlug]);

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="container-custom py-8">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <Link href={`/${storeSlug}/account`} className="hover:text-red-600">Account</Link>
                        <ChevronRight size={14} />
                        <span className="text-gray-900">Garage</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-gray-900">My Garage</h1>
                        <Link
                            href={`/${storeSlug}/account/vehicles/add`}
                            className="flex items-center gap-2 px-4 py-2 bg-[#C8102E] text-white rounded-lg hover:bg-[#A60D24] transition-colors font-semibold text-sm"
                        >
                            <Plus size={18} />
                            Add Vehicle
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container-custom py-8">
                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-40 bg-gray-200 rounded-2xl"></div>
                        ))}
                    </div>
                ) : vehicles.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Car className="h-10 w-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Your garage is empty</h3>
                        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                            Add your vehicle to find parts that fit perfectly without searching every time.
                        </p>
                        <Link
                            href={`/${storeSlug}/account/vehicles/add`}
                            className="inline-block px-8 py-3 bg-[#C8102E] text-white font-bold rounded-lg hover:bg-[#A60D24] transition-colors"
                        >
                            Add Your First Vehicle
                        </Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {vehicles.map((vehicle) => (
                            <div key={vehicle.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 relative group hover:border-red-100 transition-colors">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
                                        <Car className="text-gray-600" size={24} />
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">{vehicle.year}</p>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{vehicle.make} {vehicle.model}</h3>
                                    {vehicle.plateNumber && (
                                        <div className="inline-block px-2 py-1 bg-yellow-100 border border-yellow-200 rounded text-xs font-mono font-bold text-yellow-800 mt-2">
                                            {vehicle.plateNumber}
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                                    <Link href={`/${storeSlug}/products?make=${vehicle.make}&model=${vehicle.model}&year=${vehicle.year}`} className="text-sm font-bold text-blue-600 hover:text-blue-700">
                                        Shop Parts
                                    </Link>
                                    <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">Active</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
