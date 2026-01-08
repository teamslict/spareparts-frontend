import { ReactNode } from 'react';

type SurfacePadding = 'none' | 'sm' | 'md' | 'lg';

interface SurfaceProps {
    children: ReactNode;
    padding?: SurfacePadding;
    className?: string;
    as?: 'div' | 'article' | 'aside';
}

const paddingMap: Record<SurfacePadding, string> = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
};

/**
 * Surface - Consistent card/panel appearance
 * Use: ALL cards, panels, and boxed content
 * Rule: No custom border-radius or shadow variants
 */
export function Surface({
    children,
    padding = 'md',
    className = '',
    as: Component = 'div'
}: SurfaceProps) {
    return (
        <Component
            className={`bg-white rounded-xl border border-gray-200 ${paddingMap[padding]} ${className}`}
        >
            {children}
        </Component>
    );
}
