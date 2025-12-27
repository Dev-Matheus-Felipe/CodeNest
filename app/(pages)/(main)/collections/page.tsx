import { Collection } from "@/components/generals/collection";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";


export default async function Collections(){
    const session = await auth();
    if(!session?.user.id) redirect("/");

    const savedPosts = await prisma.savedPost.findMany({
        where: {
            userId: session.user.id
        },
        include: {
            post: {
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
            }
        }
    })

    return (
        <Collection savedPosts={savedPosts} />
    )
}