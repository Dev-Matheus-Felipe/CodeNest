"use server"

import { Response } from "@prisma/client";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import { PostType } from "../types/post";

export async function DeleteItem({itemType, item} : {itemType: "post" | "response", item: Response | PostType}){
    if(itemType === "post")
        await prisma.post.delete({where: {id: item.id}});

    else if(itemType === "response")
        await prisma.response.delete({where: {id: item.id}});

    revalidatePath("/profile");
}