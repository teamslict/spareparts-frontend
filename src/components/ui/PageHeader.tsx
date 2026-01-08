interface PageHeaderProps {
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
}

/**
 * PageHeader - Consistent page title treatment
 * Use: Top of every page
 * Rule: No additional mb-* on the h1 element
 */
export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
    return (
        <div className="mb-8 flex items-start justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1>
                {subtitle && (
                    <p className="mt-2 text-gray-600 max-w-2xl">{subtitle}</p>
                )}
            </div>
            {action && <div className="flex-shrink-0">{action}</div>}
        </div>
    );
}
