"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTenant } from '@/lib/tenant-context';
import { ChevronRight, MapPin, Plus, Trash2, Edit2, X } from 'lucide-react';
import { api, Address } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { getErrorMessage } from '@/lib/error-utils';

export default function AddressesPage() {
    const { tenant } = useTenant();
    const storeSlug = tenant?.subdomain || 'demo';
    const router = useRouter();

    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Form State
    const [newAddress, setNewAddress] = useState({
        type: 'Home',
        name: '',
        address: '',
        city: '',
        postalCode: '',
        phone: '',
        isDefault: false
    });

    useEffect(() => {
        fetchAddresses();
    }, [storeSlug]);

    const fetchAddresses = () => {
        const token = localStorage.getItem('spareparts_token');
        if (!token) return;

        setLoading(true);
        api.getAddresses(storeSlug, token)
            .then(setAddresses)
            .catch(err => console.error("Failed to load addresses", err))
            .finally(() => setLoading(false));
    };

    const handleAddAddress = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('spareparts_token');
        if (!token) {
            router.push(`/${storeSlug}/auth/login`);
            return;
        }

        setSubmitting(true);
        try {
            await api.addAddress(storeSlug, token, newAddress);
            setIsModalOpen(false);
            setNewAddress({
                type: 'Home',
                name: '',
                address: '',
                city: '',
                postalCode: '',
                phone: '',
                isDefault: false
            });
            fetchAddresses(); // Refresh list
        } catch (error: unknown) {
            console.error("Failed to add address", error);
            alert(getErrorMessage(error));
        } finally {
            setSubmitting(false);
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
                        <span className="text-gray-900">Addresses</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-gray-900">Saved Addresses</h1>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-[#C8102E] text-white rounded-lg hover:bg-[#A60D24] transition-colors font-semibold text-sm"
                        >
                            <Plus size={18} />
                            Add New Address
                        </button>
                    </div>
                </div>
            </div>

            <div className="container-custom py-8">
                {loading ? (
                    <div className="grid md:grid-cols-2 gap-6 animate-pulse">
                        {[1, 2].map(i => (
                            <div key={i} className="h-40 bg-gray-200 rounded-2xl"></div>
                        ))}
                    </div>
                ) : addresses.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
                        <MapPin className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No addresses found</h3>
                        <p className="text-gray-500 mb-6">Add a shipping address to speed up checkout.</p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-[#C8102E] font-bold hover:underline"
                        >
                            Add Address Now
                        </button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {addresses.map((addr) => (
                            <div key={addr.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 relative group hover:border-red-100 transition-colors">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="text-gray-400" size={20} />
                                        <h3 className="font-bold text-gray-900">{addr.type}</h3>
                                        {addr.isDefault && (
                                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                                Default
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {/* Edit/Delete to be implemented */}
                                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                                            <Edit2 size={16} />
                                        </button>
                                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-1 text-gray-600 text-sm">
                                    <p className="font-medium text-gray-900">{addr.name}</p>
                                    <p>{addr.address}, {addr.city}</p>
                                    <p>{addr.postalCode}</p>
                                    <p>{addr.phone}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add Address Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h2 className="text-xl font-bold text-gray-900">Add New Address</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleAddAddress} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Label (e.g. Home)</label>
                                    <select
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                                        value={newAddress.type}
                                        onChange={e => setNewAddress({ ...newAddress, type: e.target.value })}
                                    >
                                        <option>Home</option>
                                        <option>Work</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                                        value={newAddress.name}
                                        onChange={e => setNewAddress({ ...newAddress, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                                    value={newAddress.address}
                                    onChange={e => setNewAddress({ ...newAddress, address: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                                        value={newAddress.city}
                                        onChange={e => setNewAddress({ ...newAddress, city: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                                        value={newAddress.postalCode}
                                        onChange={e => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                                    value={newAddress.phone}
                                    onChange={e => setNewAddress({ ...newAddress, phone: e.target.value })}
                                />
                            </div>

                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    type="checkbox"
                                    id="defaultAddr"
                                    className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
                                    checked={newAddress.isDefault}
                                    onChange={e => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                                />
                                <label htmlFor="defaultAddr" className="text-sm text-gray-700">Set as default address</label>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 px-4 py-3 bg-[#C8102E] text-white font-bold rounded-lg hover:bg-[#A60D24] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {submitting ? 'Saving...' : 'Save Address'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
