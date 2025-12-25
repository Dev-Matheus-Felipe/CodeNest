import { PostComponent } from "@/components/posts/postComponent";
import { prisma } from "@/lib/prisma";
import { User } from "next-auth";

export async function ProfileContainer({user} : {user: User}){
    if(!user) return null;
    
    const posts = await prisma.post.findMany({
        where: { authorId: user.id },
        include: { author: true },
    });

    const allTags = posts
        .flatMap(post => post.tags.split(","));

    const tagCount: Record<string, number> = {};

    for (const tag of allTags) 
        tagCount[tag] = (tagCount[tag] || 0) + 1;
    
    const topTags = Object.entries(tagCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(([tag, count]) => ({ tag, count }));


    return (
        <>
            <div className="flex gap-1 justify-between border-b border-gray-700 pb-2 px-1">
                <div className="flex flex-col gap-3 profile:w-40 w-auto mb-4">
                    <h1 className="text-lg">Stats</h1>

                    <div className="border border-gray-700 max-w-43 min-w-20 h-14 px-2 profile:px-0
                    flex items-center justify-center gap-5 rounded-md">
                        <div className="flex flex-col items-center text-[12px]">
                            <p>{posts.length}</p>
                            <p>Questions</p>
                        </div>

                        <div className="flex flex-col items-center text-[12px]">
                            <p>0</p>
                            <p>Answers</p>
                        </div>
                    </div>
                </div>

                

                {   
                    topTags.length > 0 && 
                        <div className="flex flex-col gap-3">
                            <h1 className="text-lg w-40">Top Tags</h1>
                            <div className="w-40 h-18 flex flex-col gap-3 items-center justify-center rounded-md">
                                {
                                    topTags.map((tagObj, index) => (
                                        <div className="flex w-full justify-between items-center" key={index}>
                                            <p className={`text-[10px] text-(--username-color) bg-(--secondary-button) py-1.5 px-3
                                            rounded-2xl cursor-pointer`}>{tagObj.tag}</p>
                                            <p className="w-[19%] text-[10px]">{tagObj.count}</p>
                                        </div> 
                                    ))
                                }
                            </div>
                        </div>
                }

            </div>

            {/* POSTS / ANSWERS */}
            <div className="flex flex-col overflow-auto w-full gap-5 flex-1">
                <div className="flex justify-center gap-3 bg-(--secondary-button) w-43 h-12 items-center text-xs 
                text-(--username-color) rounded-md">
                    <p className="text-orange-500 bg-(--secondary-button-hover) px-3 py-2 rounded-md">Top Posts</p>
                    <p className="px-3 py-2 rounded-md">Answers</p>
                </div>

                <div className="flex flex-col w-full overflow-y-auto flex-1">
                    {
                        posts.length > 0 
                            ? posts.map((post, index) => (
                                <PostComponent key={index} post={post} />  ))
                            :   <p className="p-5 text-xs">No posts added yet.</p>
                    }
                </div>
            </div>
        </>
    )
}