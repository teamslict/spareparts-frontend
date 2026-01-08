import { useTenant } from '@/lib/tenant-context';
import { Users, Award, Truck, HeadphonesIcon } from 'lucide-react';
import { Section, Container, Grid, Surface } from '@/components/ui';

export default function AboutPage() {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero */}
            <Section className="bg-[#1E3A5F] text-white py-16">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">About Us</h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Your trusted source for quality automotive spare parts in Sri Lanka
                    </p>
                </div>
            </Section>

            {/* Story */}
            <Section>
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        With over years of experience in the automotive industry, we have established ourselves
                        as one of Sri Lanka&apos;s leading suppliers of quality spare parts. Our journey began with
                        a simple mission: to provide reliable, affordable parts to vehicle owners across the country.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        Today, we serve thousands of customers, from individual car owners to professional mechanics
                        and garages. Our extensive inventory covers parts for all major vehicle brands, ensuring
                        you find exactly what you need.
                    </p>
                </div>
            </Section>

            {/* Stats */}
            <Section className="bg-white">
                <Grid minWidth="200px" gap="lg">
                    <div className="text-center">
                        <Users size={40} className="mx-auto text-[#C8102E] mb-4" />
                        <p className="text-4xl font-bold text-gray-800 mb-2">10,000+</p>
                        <p className="text-gray-500">Happy Customers</p>
                    </div>
                    <div className="text-center">
                        <Award size={40} className="mx-auto text-[#C8102E] mb-4" />
                        <p className="text-4xl font-bold text-gray-800 mb-2">15+</p>
                        <p className="text-gray-500">Years Experience</p>
                    </div>
                    <div className="text-center">
                        <Truck size={40} className="mx-auto text-[#C8102E] mb-4" />
                        <p className="text-4xl font-bold text-gray-800 mb-2">50,000+</p>
                        <p className="text-gray-500">Products in Stock</p>
                    </div>
                    <div className="text-center">
                        <HeadphonesIcon size={40} className="mx-auto text-[#C8102E] mb-4" />
                        <p className="text-4xl font-bold text-gray-800 mb-2">24/7</p>
                        <p className="text-gray-500">Customer Support</p>
                    </div>
                </Grid>
            </Section>

            {/* Why Choose Us */}
            <Section>
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Why Choose Us?</h2>
                <Grid minWidth="300px" gap="lg">
                    <Surface>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Quality Guaranteed</h3>
                        <p className="text-gray-600">
                            We source our parts from trusted manufacturers and suppliers, ensuring every
                            product meets strict quality standards.
                        </p>
                    </Surface>
                    <Surface>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Competitive Prices</h3>
                        <p className="text-gray-600">
                            Get the best value for your money with our competitive pricing and regular
                            promotions on popular parts.
                        </p>
                    </Surface>
                    <Surface>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Expert Support</h3>
                        <p className="text-gray-600">
                            Our knowledgeable team is here to help you find the right parts for your
                            vehicle, every time.
                        </p>
                    </Surface>
                </Grid>
            </Section>
        </div>
    );
}
