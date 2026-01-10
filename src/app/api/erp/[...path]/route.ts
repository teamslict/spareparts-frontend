// src/app/api/erp/[...path]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs'; // Use nodejs runtime for stability

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    // 1. Reconstruct the destination URL
    const { path } = await params;
    const pathString = path.join('/');
    const searchParams = request.nextUrl.searchParams.toString();

    // Use the environment variable or fallback
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://erp.slict.lk';
    const targetUrl = `${API_BASE}/${pathString}${searchParams ? `?${searchParams}` : ''}`;

    try {
        console.log(`[Proxy] Forwarding GET to: ${targetUrl}`);

        // 2. Forward the request to the backend
        const response = await fetch(targetUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store', // CRITICAL: Prevent Next.js server caching
        });

        // 3. Handle Backend Errors gracefully
        if (!response.ok) {
            console.error(`[Proxy Error] Backend responded with ${response.status} for ${targetUrl}`);
            return NextResponse.json(
                { error: `Backend Error: ${response.statusText}` },
                { status: response.status }
            );
        }

        const data = await response.json();

        // 4. Return the response to the client
        return NextResponse.json(data, {
            status: 200,
            headers: {
                'Cache-Control': 'no-store, max-age=0', // Prevent Browser Caching
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

// Handle POST requests
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    const pathString = path.join('/');
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://erp.slict.lk';
    const targetUrl = `${API_BASE}/${pathString}`;

    try {
        console.log(`[Proxy] Forwarding POST to: ${targetUrl}`);
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
            console.error(`[Proxy Error] Backend responded with ${response.status} for ${targetUrl}`);
            const text = await response.text();
            return new NextResponse(text, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data, {
            headers: {
                'Cache-Control': 'no-store, max-age=0',
            },
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
        console.log(`[Proxy] Forwarding PUT to: ${targetUrl}`);
        const body = await request.json();

        const response = await fetch(targetUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            cache: 'no-store',
        });

        if (!response.ok) {
            const text = await response.text();
            return new NextResponse(text, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data, {
            headers: {
                'Cache-Control': 'no-store, max-age=0',
            },
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
        console.log(`[Proxy] Forwarding DELETE to: ${targetUrl}`);

        const response = await fetch(targetUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            const text = await response.text();
            return new NextResponse(text, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data, {
            headers: {
                'Cache-Control': 'no-store, max-age=0',
            },
        });
    } catch (error) {
        console.error('[Proxy Critical] DELETE request failed:', error);
        return NextResponse.json({ error: 'Proxy failed' }, { status: 500 });
    }
}
