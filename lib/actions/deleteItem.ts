"use server"

import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { PostType } from "../types/post";
import { Response } from "@/components/posts/responseForm";

export async function DeleteItem({itemType, item} : {itemType: "post" | "response", item: Response | PostType}){
    if(itemType === "post")
        await prisma.post.delete({where: {id: item.id}});

    else if(itemType === "response")
        await prisma.response.delete({where: {id: item.id}});

    revalidatePath("/profile");
}