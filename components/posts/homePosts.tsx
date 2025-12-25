import { prisma } from "@/lib/prisma"
import { PostComponent } from "./postComponent";

export async function HomePosts (){
    const posts = await prisma.post.findMany({
        include: {author: true}
    });

    return (
        <div className="flex flex-col gap-4">
            {
                posts.length <= 0
                    ? <p className="text-sm">No posts added yet...</p>
                    : posts.map((post, index) => (
                        <PostComponent post={post} key={index} />
                    ))

            }
        </div>
    )
}