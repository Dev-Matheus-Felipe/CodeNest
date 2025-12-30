"use client"

import { GeneralPostType } from "@/lib/types/generalPost";
import { titleIconsCss } from "../posts/postComponent";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function EditPost({post} : {post: GeneralPostType}){
    const router = useRouter();
    
    return (
        <button className={titleIconsCss} onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            router.push(`/post/edit/${post.id}`)
        }}>
            <Image src={`/icons/general/edit.svg`} alt="edit icon" width={15} height={15}/>
        </button>
    )
}