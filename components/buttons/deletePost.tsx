"use client"

import Image from "next/image";
import { titleIconsCss } from "../posts/postComponent";
import { PostType } from "@/lib/types/post";
import { DeleteItem } from "@/lib/actions/deleteItem";

export function DeletePost({post} : {post: PostType}){
    return (
        <button className={titleIconsCss} onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            DeleteItem({ item: post, itemType: "post" });
        }}>
            <Image src={`/icons/general/trash.svg`} alt="trash icon" width={15} height={15}/>
        </button>
    )
}