import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from './lib/prisma';
import { auth } from './lib/auth';

const protectedPaths = ["/profile","profile/edit","/collections","/question"];

const verifyPath = (pathname : string) => {
    return (protectedPaths.some(e => e === pathname) ) ? true : false;
}

export async function proxy(request: NextRequest) {
    const session = await auth();

    if(session && request.nextUrl.pathname === "/login")
        return NextResponse.redirect(new URL("/",request.url ));

    const isProtected = verifyPath(request.nextUrl.pathname);

    if(!session) return (isProtected) 
        ? NextResponse.redirect(new URL("/",request.url )) 
        : NextResponse.next();
    
    
    const userFound = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { bannedAt: true }
    });

    if (userFound?.bannedAt) {
        return NextResponse.json(
            { message: 'You have been banned!' },
            { status: 403 }
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/:path*',
};
