"use client";

import { useTenant } from '@/lib/tenant-context';
import { Facebook, Linkedin, MessageCircle } from 'lucide-react';

export function SocialButtons() {
    const { tenant } = useTenant();

    return (
        <div className="social-card">
            {/* Facebook */}
            <a
                href={tenant?.facebookUrl || '#'}
                className="social-link social-link-facebook text-gray-400"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
            >
                <Facebook size={20} fill="currentColor" className="text-gray-400 hover:text-white transition-colors" />
            </a>

            {/* WhatsApp */}
            <a
                href={`https://wa.me/${tenant?.whatsappNumber || ''}`}
                className="social-link social-link-whatsapp text-gray-400"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp"
            >
                <MessageCircle size={20} fill="currentColor" className="text-gray-400 hover:text-white transition-colors" />
            </a>

            {/* LinkedIn (Fallback to generic or tenant specific if available) */}
            <a
                href={tenant?.linkedinUrl || '#'}
                className="social-link social-link-linkedin text-gray-400"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
            >
                <Linkedin size={20} fill="currentColor" className="text-gray-400 hover:text-white transition-colors" />
            </a>
        </div>
    );
}
