"use client";

import { useTenant } from '@/lib/tenant-context';
import { Phone, Mail, MessageCircle } from 'lucide-react';

import { Container } from '@/components/ui';

export function TopBar() {
    const { tenant } = useTenant();

    return (
        <div style={{ backgroundColor: tenant?.secondaryColor || '#1E3A5F' }} className="text-white text-sm py-2">
            <Container className="flex flex-wrap items-center justify-between gap-2">
                {/* Left side - Contact info (from tenant config) */}
                <div className="flex flex-wrap items-center gap-4">
                    {/* Phone */}
                    {tenant?.contactPhone && (
                        <a
                            href={`tel:${tenant.contactPhone}`}
                            className="flex items-center gap-2 hover:text-gray-300 transition-colors"
                        >
                            <Phone size={14} />
                            <span>{tenant.contactPhone}</span>
                        </a>
                    )}

                    {/* Secondary Phone */}
                    {tenant?.contactPhone2 && (
                        <a
                            href={`tel:${tenant.contactPhone2}`}
                            className="flex items-center gap-2 hover:text-gray-300 transition-colors"
                        >
                            <Phone size={14} />
                            <span>{tenant.contactPhone2}</span>
                        </a>
                    )}

                    {/* WhatsApp */}
                    {tenant?.whatsappNumber && (
                        <a
                            href={`https://wa.me/${tenant.whatsappNumber.replace(/[^0-9+]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-green-400 transition-colors"
                        >
                            <MessageCircle size={14} />
                            <span>WhatsApp</span>
                        </a>
                    )}

                    {/* Email */}
                    {tenant?.contactEmail && (
                        <a
                            href={`mailto:${tenant.contactEmail}`}
                            className="flex items-center gap-2 hover:text-gray-300 transition-colors"
                        >
                            <Mail size={14} />
                            <span>{tenant.contactEmail}</span>
                        </a>
                    )}
                </div>

                {/* Right side - Social icons (from tenant config) */}
                <div className="flex items-center gap-3">
                    {tenant?.facebookUrl && (
                        <a
                            href={tenant.facebookUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs hover:bg-blue-500 transition-colors"
                        >
                            f
                        </a>
                    )}
                    {tenant?.instagramUrl && (
                        <a
                            href={tenant.instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xs hover:opacity-80 transition-opacity"
                        >
                            📷
                        </a>
                    )}
                </div>
            </Container>
        </div>
    );
}
