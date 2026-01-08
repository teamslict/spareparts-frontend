import { ReactNode } from 'react';

type StackGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface StackProps {
    children: ReactNode;
    gap?: StackGap;
    className?: string;
}

const gapMap: Record<StackGap, string> = {
    xs: 'space-y-2',   // 8px
    sm: 'space-y-4',   // 16px
    md: 'space-y-6',   // 24px
    lg: 'space-y-8',   // 32px
    xl: 'space-y-12',  // 48px
};

/**
 * Stack - Vertical spacing between sibling elements
 * Use: Lists of items, form fields, content blocks
 * Rule: Use instead of arbitrary mb-* on children
 */
export function Stack({ children, gap = 'md', className = '' }: StackProps) {
    return (
        <div className={`${gapMap[gap]} ${className}`}>
            {children}
        </div>
    );
}
