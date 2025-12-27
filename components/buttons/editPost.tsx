"use client"

import Image from "next/image";
import { titleIconsCss } from "../posts/postComponent";
import { PostType } from "@/lib/types/post";
import { useRouter } from "next/navigation";

export function EditPost({post} : {post: PostType}){
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