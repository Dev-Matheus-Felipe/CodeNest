import { UserType } from "../profile/functions/getUser";
import { PostType } from "@/lib/types/post";
import { askedTimeAgo } from "./postInfo";
import Image from "next/image";
import Link from "next/link";

export function PostComponent({post, user} : {post: PostType, user?: UserType}){
    const titleIconsCss = "w-auto min-w-8 h-auto hover:bg-(--secondary-button-hover) rounded-full p-2 flex justify-center items-center";
    const tags = post.tags.split(",");

    return (
        <Link className={`flex flex-col w-[98%] py-3 mb-5 rounded-sm cursor-pointer relative gap-2
        hover:bg-[rgba(255,255,255,0.02)] px-4`} href={`/post/${post.id}`}>
            <div className="flex justify-between">

                {/* TITLE */}
                <h1 className="profile:text-lg text-[15px] font-bold pr-13 pb-1">
                    {post.title}
                </h1>

                
                {   /* TITLE ICONS */
                    (user?.id) &&
                    <div className="flex gap-1 p-2 absolute left-full -translate-x-full top-1">
                        <div className={titleIconsCss}>
                            <Image src={`/icons/general/trash.svg`} alt="trash icon" width={15} height={15}/>
                        </div>

                        <div className={titleIconsCss}>
                            <Image src={`/icons/general/edit.svg`} alt="edit icon" width={15} height={15}/>
                        </div>
                    </div>
                }
            </div>

            {/* TAGS */}
            <div className="flex gap-2">
                {
                    tags.map((e, index) => (
                        <p className={`text-[10px] text-(--username-color) bg-(--secondary-button) py-2 px-3 rounded-2xl 
                        cursor-pointer`} key={index}>{e}</p>
                    ))
                }
            </div>

            {/* AUTHOR INFO */}
            <div className="pt-4 flex justify-between">
                <div className="flex gap-2 items-center">

                    <Image 
                        src={post.author.image ?? "/icons/general/user.svg"} 
                        alt="Profile Picture" 
                        width={22} 
                        height={22} 
                        className="rounded-full"/>
                        
                    <p className="profile:text-xs text-[10px] pr-2">
                        {post.author.name}
                    </p>
                    
                    <Image src="/icons/general/time.svg" alt="Time icon" width={15} height={15} />
                    <p className="profile:text-xs text-[10px]">
                        {`asked ${askedTimeAgo(post.createdAt)}`}
                    </p>

                </div>

                <div className="flex gap-4">
                    <div className="flex gap-2 items-center">
                        <Image src="/icons/general/like.svg" alt="Like icon" width={20} height={20} />

                        <p className="profile:text-xs text-[10px]">
                            Likes {post.likedBy.length}
                        </p>
                    </div>

                    <div className="flex gap-2 items-center">
                        <Image src="/icons/general/message.svg" alt="Like icon" width={20} height={20} />

                        <p className="profile:text-xs text-[10px]">
                            Answers {post.responses.length}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}