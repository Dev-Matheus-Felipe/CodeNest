import { prisma } from "@/lib/prisma";
import { PostComponent } from "./postComponent";
import { User } from "next-auth";

export async function PostContainer({user} : {user: User}){
    if(!user) return null;

    const posts = await prisma.post.findMany({
        where: {authorId: user.id},
        include: {author: true}
    })

    return (
        <div className="flex flex-col w-full overflow-y-auto flex-1">
            {
                posts.length > 0 
                    ? posts.map((e, index) => (
                        <PostComponent key={index} post={e} />  ))
                    :   <p className="p-5 text-xs">No posts added yet.</p>
            }
        </div>
    )
}