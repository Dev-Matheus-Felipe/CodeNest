import { prisma } from "@/lib/prisma"
import { PostComponent } from "./postComponent";

export async function HomePosts (){
    const posts = await prisma.post.findMany({
        include: {author: true}
    });
    return (
        <div className="overflow-y-auto h-100">
            {
                posts.length <= 0
                    ?  <p>No posts added yet</p>
                    : posts.map((post, index) => (
                        <PostComponent post={post} key={index} home={true} />
                    ))

            }
        </div>
    )
}