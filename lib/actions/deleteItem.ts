"use server"

import { Post, Response } from "@/src/generated/prisma/client";
import { prisma } from "../prisma";
import { refresh } from "next/cache";

export async function DeleteItem({itemType, item} : {itemType: "post" | "response", item: Response | Post}){
    if(itemType === "post")
        await prisma.post.delete({where: {id: item.id}});

    else 
        await prisma.response.delete({where: {id: item.id}});

    refresh();
}