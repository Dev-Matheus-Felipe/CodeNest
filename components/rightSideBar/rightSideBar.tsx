import { prisma } from "@/lib/prisma"

export default async function RightSideBar(){
    const posts = await prisma.post.findMany();

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

                <div className="flex mt-10 gap-5 cursor-pointer h-auto w-full items-center">
                    <p className="xl:text-xs text-[10px] w-[75%]">Best practing for fetching data in a 
                    Next.js application with Server Components</p>
                    <p >{`>`}</p>
                </div>

                <div className="flex mt-10 gap-5 cursor-pointer h-auto w-full items-center">
                    <p className="xl:text-xs text-[10px] w-[75%]">How does CacheComponents from Next.js 16 work?</p>
                    <p >{`>`}</p>
                </div>

                <div className="flex mt-10 gap-5 cursor-pointer h-auto w-full items-center">
                    <p className="xl:text-xs text-[10px] w-[75%]">Ways to cache data with Next.Js 16</p>
                    <p>{`>`}</p>
                </div>

                <div className="flex mt-10 gap-5 cursor-pointer h-auto w- items-center">
                    <p className="xl:text-xs text-[10px] w-[75%]">What exactly is React Compiler?</p>
                    <p >{`>`}</p>
                </div>
            </div>

            {
                topTags.length > 0 && 

                <div>
                    <h1>Popular Tags</h1>

                    {
                        topTags.map((e,index) => (
                            <div className={containeTag} key={index}>
                                <p className={tagTitle}>
                                    {e.tag}
                                </p>

                                <p className="w-[19%] text-sm">{e.count}</p>
                            </div>
                        ))
                    }
                </div>
            }
        </aside>
    )
}