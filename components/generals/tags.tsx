"use client"

import { PostType } from "@/lib/types/post"
import Image from "next/image"
import { useState } from "react"
import { PostComponent } from "../posts/postComponent"

type Result  = {
    description: string,
    posts: PostType[],
    tag: string,
}

export function TagsContainer({result} : {result: Result[]}){
    const [posts, setPosts] = useState<Result | null>(null);
    const [search, setSearch] = useState<string>("");
 
    return (
         <div className="w-full h-[calc(100vh-120px)] flex flex-col gap-7 p-[2%] items-center">

            {
                posts === null
                ? <>
                    <h1 className="text-2xl w-full font-bold pl-1">Tags</h1>
                    <div className="w-full flex justify-between items-center gap-2 mb-5">
                        <form className=" w-full h-11 relative flex items-center" onSubmit={(e) => e.preventDefault()}>
                            <Image
                                src="/icons/general/search.svg" 
                                alt="Search Icon" 
                                width={15}
                                height={15} 
                                className="absolute top-1/2 left-4 -translate-y-1/2"/>

                            <input 
                                type="text" 
                                name="search"
                                id="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search for tags here..." 
                                className={`w-full h-full border border-gray outline-0 border-(--secondary-button) text-xs pl-11
                                pr-5 rounded-md`} />
                        </form>
                    </div>
                    <div className={`grid profile:grid-cols-[repeat(auto-fill,min(210px))] grid-cols-[repeat(auto-fill,min(150px))] 
                        gap-1 w-full overflow-y-auto justify-center gap-y-10`}>
                        {
                            result.filter((e) => e.tag.toLowerCase().includes(search.toLowerCase())).map((e, index) => (
                                <div 
                                    key={index} 
                                    className="flex flex-col gap-3 max-w-45 cursor-pointer" 
                                    onClick={() => setPosts(e)}>
                                    <h1 className="px-5 py-2 text-sm bg-(--secondary-button) w-fit rounded-sm font-bold">{e.tag}</h1>
                                    <p className="text-sm w-full">{e.description}</p>
                                    <p className="text-xs"><span className="text-[#ff5e00]">{e.posts.length}</span> Questions</p>
                                </div>  
                            ))
                        }
                    </div>
                </>

                : 
                    <div className="w-full h-[calc(100vh-120px)] p-[2%] gap-7 grid grid-cols-1 grid-rows-[auto_1fr]">
                        <div className="col-span-1 row-span-1 flex flex-col gap-5">
                            <div className="flex justify-between">
                                <h1 className="text-2xl font-bold">{posts.tag}</h1>
                                <button 
                                    className={`bg-(--secondary-button) px-4 py-2 rounded-md cursor-pointer 
                                    hover:bg-(--secondary-button-hover)`} 
                                    onClick={()=> setPosts(null)}>
                                    Back
                                </button>
                            </div>  

                            <div className="w-full flex justify-between  gap-2 mb-5">
                                <form className=" w-full h-11 relative flex items-center" onSubmit={(e) => e.preventDefault()}>
                                    <Image
                                        src="/icons/general/search.svg" 
                                        alt="Search Icon" 
                                        width={15}
                                        height={15} 
                                        className="absolute top-1/2 left-4 -translate-y-1/2"/>

                                    <input 
                                        type="text" 
                                        name="search"
                                        id="search"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search for posts here..." 
                                        className={`w-full h-full border border-gray outline-0 border-(--secondary-button) text-xs pl-11
                                        pr-5 rounded-md`} />
                                </form>
                            </div>
                        </div>

                        <div className="overflow-y-auto! w-full h-full">
                            {
                                posts.posts.length > 0
                                    ? posts.posts.filter((e) => e.title.toLowerCase().includes(search.toLowerCase())).map(post => (
                                        <PostComponent post={post} key={post.id} /> ))
                                    : <p>No posts with this tag yet...</p>
                            }
                        </div>
                    </div>
            }
    </div>
    )
}