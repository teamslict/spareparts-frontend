"use client";

import { useTenant } from '@/lib/tenant-context';
import { DynamicCategorySection } from './DynamicCategorySection';
import type { FeaturedCategory } from '@/types/tenant';

// Default categories to show if none configured
const defaultCategories: FeaturedCategory[] = [
    { name: 'Engine Parts', slug: 'engine-parts' },
    { name: 'Filters', slug: 'filters' },
    { name: 'Brakes', slug: 'brakes' },
];

export function FeaturedCategorySections() {
    const { tenant } = useTenant();

    // Use featured categories from tenant config, or fallback to defaults
    const categories = tenant?.featuredCategories && tenant.featuredCategories.length > 0
        ? tenant.featuredCategories
        : defaultCategories;

    return (
        <>
            {categories.map((category: FeaturedCategory) => (
                <DynamicCategorySection
                    key={category.slug}
                    title={category.name}
                    slug={category.slug}
                />
            ))}
        </>
    );
}
