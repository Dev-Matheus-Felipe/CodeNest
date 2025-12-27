"use client"

import { SavedPostWithPost } from "@/lib/schemas/savedPostSchema";
import { PostComponent } from "../posts/postComponent";
import Image from "next/image";
import { useEffect, useState } from "react";

type SearchType = {
    input: string,
    filter: null | string,
    openFilter: boolean
}

export function Collection({savedPosts} : {savedPosts: SavedPostWithPost[]}){
    const [posts, setPosts] = useState<SavedPostWithPost[]>(savedPosts);
    const [search, setSearch] = useState<SearchType>({input: "", filter: "Select a filter", openFilter: false});

    const filters = ["Select a filter", "Date ↑", "Date ↓","Answered","Unanswered"];
    useEffect(() => {
        switch(search.filter){
            case "Answered":
                setPosts(savedPosts.filter((e) => e.post.responses.length > 0));
                break;
            
            case "Select a filter":
                setPosts(savedPosts);
                break;

            case "Date ↑":
                setPosts(
                    [...savedPosts].sort((a,b) =>  b.createdAt.getTime()-  a.createdAt.getTime())
                );
                break;

            case "Date ↓":
                setPosts(
                    [...savedPosts].sort((a,b) => a.createdAt.getTime() - b.createdAt.getTime())
                );
                break;

            case "Unanswered":
                setPosts(
                    savedPosts.filter((e) => e.post.responses.length === 0)
                );
                break;
        }

    },[search.filter]);

    return (
        <div className="w-full h-[calc(100vh-120px)] flex flex-col gap-7 p-[2%] items-center">
            <h1 className="text-2xl w-full px-4 border-b border-[#565656] pb-5 font-bold">Saved Questions</h1>
            <div className="w-full flex justify-between items-center gap-2">
                <form className=" w-[75%] h-11 relative flex items-center">
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
                        value={search.input}
                        onChange={(e) => setSearch(prev => ({...prev, input: e.target.value}))}
                        placeholder="Search for users here..." 
                        className={`w-full h-full border border-gray outline-0 border-(--secondary-button) text-xs pl-11
                        pr-5 rounded-md`} />
                </form>

                <div className="relative">
                    <button className={`bg-(--secondary-button) hover:bg-(--secondary-button-hover) w-28 h-11 cursor-pointer 
                    rounded-md flex justify-center gap-2 items-center `} 
                    onClick={() => setSearch((prev: SearchType) => ({...prev, openFilter: !prev.openFilter}))}>

                        <p className="text-xs">
                            {search.filter}
                        </p>

                        <Image 
                            src="/icons/general/select.svg" 
                            alt="Search Icon" 
                            width={13}
                            height={13} />
                    </button>

                        {
                            search.openFilter &&
                            <div className={`absolute z-10 top-full left-full -translate-x-full h-70 w-28
                            bg-(--codeEdit-tag) translate-y-1.5  rounded-md p-3 text-xs flex flex-col gap-5 overflow-auto`}>
                                {
                                    filters.map((e) => (
                                        <p 
                                            key={e} 
                                            className='border py-2 px-1 hover:text-orange-500 cursor-pointer rounded-sm'
                                            onClick={()=> {setSearch(prev => ({...prev, openFilter: false, filter: e}))} }>
                                            {e}
                                        </p>
                                    ))
                                }
                            </div>
                        }
                </div>
            </div>

            <div className="w-full overflow-y-auto">
                {
                    posts.length <= 0
                        ? <p className="text-sm">No posts saved yet...</p>
                        : posts.filter(e => e.post.title.toLowerCase().includes(search.input.toLowerCase())).map((savedPost) => (
                            <PostComponent post={savedPost.post} key={savedPost.id} />
                        ))

                }
            </div>
        </div>
    )
}