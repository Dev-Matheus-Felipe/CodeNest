import { prisma } from "@/lib/prisma"
import Link from "next/link";

type RightSideBarPost = {
    id: string;
    createdAt: Date;
    code: string | null;
    language: string;
    likedBy: string[];
    authorId: string;
    title: string;
    description: string;
    tags: string;
}

export default async function RightSideBar(){ 
    const posts: RightSideBarPost[] = await prisma.post.findMany({});

    const tags = posts.flatMap(e => e.tags.split(","));

    const tagCount: Record<string,number> = {};

    for(const tag of tags)
        tagCount[tag] = (tagCount[tag] || 0) + 1;

    const topTags = Object.entries(tagCount)
        .sort((a,b) => b[1] - a[1])
        .slice(0,4)
        .map(([tag, count]) => ({tag, count}));


    const containeTag = "flex w-full justify-between items-center mt-5";
    const tagTitle = "text-[10px] text-(--username-color) bg-(--secondary-button) py-2 px-4 rounded-2xl cursor-pointer";

    return (
        <aside className="sidebar:flex flex-col gap-15 p-4 hidden col-span-1">
            <div className="flex flex-col">
                <h1 className="text-lg">Top Questions</h1>

                <Link 
                    href="/post/cmjwrow1x0001vyk8f66zm2l7" 
                    className="flex mt-10 gap-5 cursor-pointer h-auto w-full items-center">
                    <p className="xl:text-xs text-[10px] w-[75%]">When should i use server actions and API 
                    routes to get and post data in the backend?</p>
                    <p >{`>`}</p>
                </Link>

                <Link 
                    href="/post/cmk08szqn0001lb04jtyd6wf3" 
                    className="flex mt-10 gap-5 cursor-pointer h-auto w-full items-center">
                    <p className="xl:text-xs text-[10px] w-[75%]">How to choose bettwen react-hook-form and
                    useActionState form to handle forms?</p>
                    <p >{`>`}</p>
                </Link>


                <Link 
                    href="/post/cmk4qfxij0001vy4k87jvyy07" 
                    className="flex mt-10 gap-5 cursor-pointer h-auto w-full items-center">
                    <p className="xl:text-xs text-[10px] w-[75%]">Does anyone know a good roadmap to start 
                    learning Java Spring Boot?</p>
                    <p >{`>`}</p>
                </Link>

                <Link 
                    href="/post/cmjxdpua70001l7049op8hqs6" 
                    className="flex mt-10 gap-5 cursor-pointer h-auto w-full items-center">
                    <p className="xl:text-xs text-[10px] w-[75%]">Qual o melhor roadmap para aprender HTML?</p>
                    <p >{`>`}</p>
                </Link>
              
            </div>

            {
                topTags.length > 0 && 

                <div>
                    <h1>Popular Tags</h1>

                    {
                        topTags.map((e,index) => (
                            <div className={containeTag} key={index}>
                                <Link className={tagTitle} href={`/tags?tag=${e.tag}`}>
                                    {e.tag}
                                </Link>

                                <p className="w-[19%] text-sm">{e.count}</p>
                            </div>
                        ))
                    }
                </div>
            }
        </aside>
    )
}