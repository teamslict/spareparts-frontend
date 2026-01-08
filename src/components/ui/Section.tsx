import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    variant?: 'default' | 'narrow' | 'full';
    /**
     * Backwards-compatible sizing API used in some pages.
     * Prefer `variant` going forward.
     */
    size?: 'sm' | 'md' | 'lg';
}

export function Section({ children, className, variant = 'default', size, ...props }: SectionProps) {
    const verticalPadding = (() => {
        if (size) {
            if (size === 'sm') return 'py-8';
            if (size === 'lg') return 'py-16 md:py-20';
            return 'py-12 md:py-16';
        }

        return variant === 'narrow' ? 'py-8' : 'py-12 md:py-16';
    })();

    return (
        <section className={cn("w-full", verticalPadding, className)} {...props}>
            {variant === 'full' ? (
                children
            ) : (
                <Container>{children}</Container>
            )}
        </section>
    );
}
