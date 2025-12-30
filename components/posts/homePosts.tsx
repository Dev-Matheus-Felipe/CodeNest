"use client"

import { PostComponent } from "./postComponent";
import { AskAQuestion } from "../buttons/askQuesion";
import Image from "next/image";
import { homePostSchema } from "@/lib/schemas/homePostSchema";
import { useState } from "react";

export  function HomePosts ({posts} : {posts: homePostSchema[]}){
    const [state, setState] = useState<{posts: homePostSchema[], input: string, type?: string}>({
        posts: posts, input: "", type: "All"
    });

    const tagStyles = (type: string) => 
        `text-xs text-(--username-color) bg-(--secondary-button) py-2 px-3 rounded-lg cursor-pointer
        ${state.type === type && "text-[#ff5e00]"}`;

    return (
        <div className="w-full h-[calc(100vh-120px)] p-[2%] pt-5 pr-10 grid grid-cols-1 grid-rows-[auto_1fr]">
            <div className="col-span-1 row-span-1">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold ">All Questions</h1>
                    <AskAQuestion />
                </div>

                <form 
                    className="w-full h-13 relative rounded-lg mt-10 mb-5 border border-(--secondary-button-hover)"
                    onSubmit={(e) =>  e.preventDefault()}>
                    <Image
                        src="/icons/general/search.svg" 
                        alt="Search Icon" 
                        width={16}
                        height={16} 
                        className="absolute top-1/2 left-4 -translate-y-1/2"/>

                    <input 
                        type="text" 
                        name="search"
                        id="search"
                        value={state.input}
                        onChange={(e) => setState(prev => ({...prev, input: e.target.value}))}
                        placeholder="Search for questions here" 
                        autoComplete="off"
                        className="w-full h-full px-11 text-xs outline-none" />
                </form>

                <div className="flex gap-5 mb-5">
                    <p className={tagStyles("All")} onClick={()=> setState(prev =>({...prev, posts: posts, type: "All"}))}>All</p>

                    <p className={tagStyles("Answered")} onClick={()=>{
                        const data = posts.filter(e => e.responses.length > 0);
                        setState(prev => ({...prev, posts: data, type: "Answered" }))
                    }}>Answered</p>

                    <p className={tagStyles("Unanswered")} onClick={()=>{
                        const data = posts.filter(e => e.responses.length === 0);
                        setState(prev => ({...prev, posts: data, type: "Unanswered" }))
                    }}>Unanswered</p>
                </div>
            </div>
            
            <div className="flex flex-col gap-4 overflow-y-auto">
                {
                    state.posts.length <= 0
                        ? <p className="text-sm">No posts added yet...</p>
                        : state.posts.filter(e => e.title.toLowerCase().includes(state.input.toLowerCase())).map((post) => (
                            <PostComponent post={post} key={post.id} />
                        ))

                }
            </div>
        </div>

    )
}