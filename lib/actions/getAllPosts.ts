"use server"

import { prisma } from "../prisma";

export async function GetAllPosts(){
    const posts = await prisma.post.findMany({
        select: {
            id: true,
            title: true,
            tags: true,
            createdAt: true,
            likedBy: true,

            author: {
                select: {
                    name: true,
                    image: true
                }
            },

            responses: {
                select: {
                    id: true,
                    content: true,
                    likedBy: true,
                    createdAt: true
                }
            }
        }
    });

    return posts;
}