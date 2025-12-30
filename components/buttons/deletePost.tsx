"use client"

import { GeneralPostType } from "@/lib/types/generalPost";
import { titleIconsCss } from "../posts/postComponent";
import { DeleteItem } from "@/lib/actions/deleteItem";
import Image from "next/image";

export function DeletePost({post} : {post: GeneralPostType}){
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