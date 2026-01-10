// src/app/api/erp/[...path]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    const pathString = path.join('/');
    const searchParams = request.nextUrl.searchParams.toString();
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://erp.slict.lk';

    const targetUrl = `${API_BASE}/${pathString}${searchParams ? `?${searchParams}` : ''}`;

    // CHECK: Is this a request that can be cached?
    // Config rarely changes - cache for 5 minutes to prevent 429 rate limiting
    const isConfig = pathString.includes('config');
    const isBrands = pathString.includes('brands');
    const isCategories = pathString.includes('categories');
    const isCacheable = isConfig || isBrands || isCategories;

    // Config/Brands/Categories: Revalidate every 300 seconds (5 mins)
    // Products/Others: No Store (Fresh every time)
    const fetchOptions: RequestInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        // SMART CACHING: Static data gets cached, dynamic data is always fresh
        cache: isCacheable ? 'force-cache' : 'no-store',
        next: isCacheable ? { revalidate: 300 } : undefined,
    };

    try {
        console.log(`[Proxy GET] ${targetUrl} | Cache: ${isCacheable ? 'CACHED (5m)' : 'NO-STORE'}`);

        const response = await fetch(targetUrl, fetchOptions);

        if (!response.ok) {
            console.error(`[Proxy Error] Status: ${response.status} | URL: ${targetUrl}`);

            // Handle rate limiting gracefully
            if (response.status === 429) {
                return NextResponse.json(
                    { error: 'System busy, please try again in a moment.' },
                    { status: 429 }
                );
            }

            return NextResponse.json(
                { error: `Backend Error: ${response.statusText}` },
                { status: response.status }
            );
        }

        const data = await response.json();

        // Set appropriate Browser Cache Headers
        const cacheHeader = isCacheable
            ? 'public, max-age=300, s-maxage=300, stale-while-revalidate=60'
            : 'no-store, max-age=0';

        return NextResponse.json(data, {
            status: 200,
            headers: {
                'Cache-Control': cacheHeader,
            },
        });

    } catch (error) {
        console.error('[Proxy Critical] GET request failed:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

// Handle POST requests (always fresh, no caching)
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    const pathString = path.join('/');
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://erp.slict.lk';
    const targetUrl = `${API_BASE}/${pathString}`;

    try {
        console.log(`[Proxy POST] ${targetUrl}`);
        const body = await request.json();

        const response = await fetch(targetUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            cache: 'no-store',
        });

        if (!response.ok) {
            console.error(`[Proxy Error] POST Status: ${response.status}`);
            const text = await response.text();
            return new NextResponse(text, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data, {
            headers: { 'Cache-Control': 'no-store, max-age=0' },
        });
    } catch (error) {
        console.error('[Proxy Critical] POST request failed:', error);
        return NextResponse.json({ error: 'Proxy failed' }, { status: 500 });
    }
}

// Handle PUT requests
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    const pathString = path.join('/');
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://erp.slict.lk';
    const targetUrl = `${API_BASE}/${pathString}`;

    try {
        console.log(`[Proxy PUT] ${targetUrl}`);
        const body = await request.json();

        const response = await fetch(targetUrl, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            cache: 'no-store',
        });

        if (!response.ok) {
            const text = await response.text();
            return new NextResponse(text, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data, {
            headers: { 'Cache-Control': 'no-store, max-age=0' },
        });
    } catch (error) {
        console.error('[Proxy Critical] PUT request failed:', error);
        return NextResponse.json({ error: 'Proxy failed' }, { status: 500 });
    }
}

// Handle DELETE requests
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    const pathString = path.join('/');
    const searchParams = request.nextUrl.searchParams.toString();
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://erp.slict.lk';
    const targetUrl = `${API_BASE}/${pathString}${searchParams ? `?${searchParams}` : ''}`;

    try {
        console.log(`[Proxy DELETE] ${targetUrl}`);

        const response = await fetch(targetUrl, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store',
        });

        if (!response.ok) {
            const text = await response.text();
            return new NextResponse(text, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data, {
            headers: { 'Cache-Control': 'no-store, max-age=0' },
        });
    } catch (error) {
        console.error('[Proxy Critical] DELETE request failed:', error);
        return NextResponse.json({ error: 'Proxy failed' }, { status: 500 });
    }
}
