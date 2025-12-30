import { GetTags } from "../functions/getTags";
import { PostAnswers } from "./post-answers";
import { Answers } from "./answers";
import { FullUserType } from "@/lib/types/fullUser";

export async function ProfileContainer({user} : {user: FullUserType}){    
    const topTags = GetTags({posts: user.posts});

    return (
        <>
            <div className="flex gap-1 justify-between border-b border-gray-700 pb-2 px-1">
                <div className="flex flex-col gap-3 profile:w-40 w-auto mb-4">
                    <h1 className="text-lg">Stats</h1>

                    <div className="border border-gray-700 max-w-43 min-w-20 h-14 px-2 profile:px-0
                    flex items-center justify-center gap-5 rounded-md">
                        <div className="flex flex-col items-center text-[12px]">
                            <p>{user.posts.length}</p>
                            <p>Questions</p>
                        </div>

                        <Answers user={user} />
                    </div>
                </div>

                

                {   
                    topTags.length > 0 && 
                        <div className="flex flex-col gap-3">
                            <h1 className="text-lg w-40">Top Tags</h1>
                            <div className="w-40 h-18 flex flex-col gap-3 items-center justify-center rounded-md">
                                {
                                    topTags.map((tagObj: {tag: string, count: number}, index: number) => (
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
            <PostAnswers user={user} />
        </>
    )
}