"use client";

import { useState } from 'react';
import { useTenant } from '@/lib/tenant-context';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { Section, Container, Grid, Surface } from '@/components/ui';

export default function ContactPage() {
    const { tenant } = useTenant();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In production, send to API
        console.log('Contact form submitted:', formData);
        alert('Thank you for your message! We will get back to you soon.');
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero */}
            <Section className="bg-[#1E3A5F] text-white py-16">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Have questions? We&apos;re here to help. Reach out to us anytime.
                    </p>
                </div>
            </Section>

            <Section>
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <div className="lg:col-span-1">
                        <Surface className="mb-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Get In Touch</h2>

                            <div className="space-y-4">
                                {tenant?.address && (
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <MapPin size={20} className="text-[#C8102E]" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-800">Address</h3>
                                            <p className="text-gray-600 text-sm">{tenant.address}</p>
                                        </div>
                                    </div>
                                )}

                                {tenant?.contactPhone && (
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Phone size={20} className="text-[#C8102E]" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-800">Phone</h3>
                                            <a href={`tel:${tenant.contactPhone}`} className="text-gray-600 text-sm hover:text-[#C8102E]">
                                                {tenant.contactPhone}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {tenant?.whatsappNumber && (
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <MessageCircle size={20} className="text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-800">WhatsApp</h3>
                                            <a
                                                href={`https://wa.me/${tenant.whatsappNumber.replace(/[^0-9]/g, '')}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-600 text-sm hover:text-green-600"
                                            >
                                                Chat with us
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {tenant?.contactEmail && (
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Mail size={20} className="text-[#C8102E]" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-800">Email</h3>
                                            <a href={`mailto:${tenant.contactEmail}`} className="text-gray-600 text-sm hover:text-[#C8102E]">
                                                {tenant.contactEmail}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Clock size={20} className="text-[#C8102E]" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">Business Hours</h3>
                                        <p className="text-gray-600 text-sm">Mon - Sat: 8:00 AM - 6:00 PM</p>
                                        <p className="text-gray-600 text-sm">Sunday: Closed</p>
                                    </div>
                                </div>
                            </div>
                        </Surface>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <Surface>
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Send Us a Message</h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                                        <input
                                            type="text"
                                            value={formData.subject}
                                            onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-[#C8102E] text-white font-semibold rounded hover:bg-[#A60D24] transition-colors"
                                >
                                    Send Message
                                </button>
                            </form>
                        </Surface>
                    </div>
                </div>
            </Section>
        </div>
    );
}
