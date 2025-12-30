"use server"

import { GeneralPostType } from "../types/generalPost";
import { ResponseType } from "../types/response";
import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";

export async function DeleteItem({itemType, item} : {itemType: "post" | "response", item: ResponseType | GeneralPostType}){
    if(itemType === "post")
        await prisma.post.delete({where: {id: item.id}});

    else if(itemType === "response")
        await prisma.response.delete({where: {id: item.id}});

    revalidatePath("/profile");
}