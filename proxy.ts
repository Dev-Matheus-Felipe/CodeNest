import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from './lib/prisma';
import { auth } from './lib/auth';

export async function proxy(request: NextRequest) {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.next();
    }

    const userFound = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { bannedAt: true }
    });

    if (userFound?.bannedAt) {
        return NextResponse.json(
            { message: 'You have banned!' },
            { status: 403 }
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/:path*',
};
