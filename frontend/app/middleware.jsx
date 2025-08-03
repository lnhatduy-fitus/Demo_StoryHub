import { NextResponse } from 'next/server';

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/admin')) {
        const token = request.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/home', request.url));
        }

        try {
            const cookieHeader = request.headers.get('cookie');

            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/verify/admin`, {
                method: 'POST',
                headers: {
                    Cookie: cookieHeader || '',
                },
                credentials: 'include',
                cache: 'default',
            });

            if (!res.ok) {
                console.log(res.status);
                return NextResponse.redirect(new URL('/home', request.url));
            }
        } catch (err) {
            console.error('Error verifying token:', err);
            return NextResponse.redirect(new URL('/home', request.url));
        }
    }

    if (pathname.startsWith('/upload')) {
        const token = request.cookies.get('token')?.value;
        if (!token) {
            return NextResponse.redirect(new URL('/home', request.url));
        }

        try {
            const cookieHeader = request.headers.get('cookie');

            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/verify/author`, {
                method: 'POST',
                headers: {
                    Cookie: cookieHeader || '',
                },
                credentials: 'include',
                cache: 'no-store',
            });

            if (!res.ok) {
                console.log(res.status);
                return NextResponse.redirect(new URL('/home', request.url));
            }
        } catch (err) {
            console.error('Error verifying token:', err);
            return NextResponse.redirect(new URL('/home', request.url));
        }
    }

    return NextResponse.next();
}
