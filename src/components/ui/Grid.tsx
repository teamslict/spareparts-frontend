import { ReactNode, CSSProperties } from 'react';

type GridGap = 'sm' | 'md' | 'lg';

interface GridProps {
    children: ReactNode;
    minWidth?: string;
    gap?: GridGap;
    className?: string;
}

const gapMap: Record<GridGap, string> = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
};

/**
 * Grid - Responsive grid layout using CSS auto-fill
 * Use: Product grids, category grids, any repeating content
 * Rule: Use instead of manual grid-cols-X media queries
 * 
 * @param minWidth - Minimum width of each item (default: 280px)
 */
export function Grid({
    children,
    minWidth = '280px',
    gap = 'md',
    className = ''
}: GridProps) {
    const style: CSSProperties = {
        gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}, 1fr))`
    };

    return (
        <div
            className={`grid ${gapMap[gap]} ${className}`}
            style={style}
        >
            {children}
        </div>
    );
}
