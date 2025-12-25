import { prisma } from "@/lib/prisma"
import { PostComponent } from "./postComponent";

export async function HomePosts (){
    const posts = await prisma.post.findMany({
        select: {
            id: true,
            title: true,
            tags: true,
            createdAt: true,
            likes: true,

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
                    likes: true,
                    createdAt: true
                }
            }
        }
    });

    return (
        <div className="flex flex-col gap-4">
            {
                posts.length <= 0
                    ? <p className="text-sm">No posts added yet...</p>
                    : posts.map((post) => (
                        <PostComponent post={post} key={post.id} />
                    ))

            }
        </div>
    )
}