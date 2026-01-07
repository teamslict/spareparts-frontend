"use client";

import { useState } from 'react';
import { Search, X, Car } from 'lucide-react';

// Common vehicle makes for spare parts
const MAKES = [
    'Toyota', 'Honda', 'Nissan', 'Suzuki', 'Mitsubishi',
    'Hyundai', 'Kia', 'Ford', 'Mazda', 'BMW',
    'Mercedes-Benz', 'Audi', 'Volkswagen', 'Peugeot', 'Isuzu'
];

// Generate years from current year back to 1990
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: currentYear - 1989 }, (_, i) => (currentYear - i).toString());

interface VehicleSelectorProps {
    onSelect: (vehicle: { make?: string; model?: string; year?: string }) => void;
    initialValues?: { make?: string; model?: string; year?: string };
}

export function VehicleSelector({ onSelect, initialValues = {} }: VehicleSelectorProps) {
    const [make, setMake] = useState(initialValues.make || '');
    const [model, setModel] = useState(initialValues.model || '');
    const [year, setYear] = useState(initialValues.year || '');
    const [isOpen, setIsOpen] = useState(false);

    const handleSearch = () => {
        onSelect({ make, model, year });
        setIsOpen(false);
    };

    const handleClear = () => {
        setMake('');
        setModel('');
        setYear('');
        onSelect({});
    };

    const hasSelection = make || model || year;

    return (
        <div className="relative">
            {/* Compact Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${hasSelection
                        ? 'bg-red-50 border-red-200 text-red-700'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-red-300'
                    }`}
            >
                <Car size={18} />
                <span className="text-sm font-medium">
                    {hasSelection ? `${make || ''} ${model || ''} ${year || ''}`.trim() : 'Select Vehicle'}
                </span>
                {hasSelection && (
                    <X
                        size={16}
                        className="ml-1 hover:text-red-900"
                        onClick={(e) => { e.stopPropagation(); handleClear(); }}
                    />
                )}
            </button>

            {/* Dropdown Panel */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Find Parts by Vehicle</h4>

                    <div className="space-y-3">
                        {/* Make */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Make</label>
                            <select
                                value={make}
                                onChange={(e) => setMake(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                <option value="">All Makes</option>
                                {MAKES.map(m => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                        </div>

                        {/* Model - Free text input */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Model</label>
                            <input
                                type="text"
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                placeholder="e.g. Corolla, Civic, Vezel"
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>

                        {/* Year */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Year</label>
                            <select
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                <option value="">All Years</option>
                                {YEARS.map(y => (
                                    <option key={y} value={y}>{y}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                        <button
                            onClick={handleSearch}
                            className="flex-1 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                        >
                            <Search size={16} />
                            Search Parts
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
