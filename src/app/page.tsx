import { redirect } from 'next/navigation';

// This is the Root Page "/"
// It redirects to the default store path so the proper layout (with Header/Footer) is applied.

export default function RootPage() {
    const defaultTenant = process.env.NEXT_PUBLIC_DEFAULT_TENANT || 'demo';
    redirect(`/${defaultTenant}`);
}
