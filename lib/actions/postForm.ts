"use server"

import { refresh } from "next/cache";
import { auth } from "../auth";
import { prisma } from "../prisma";
import { postFormType, PostFormType } from "../schemas/postProfileSchema";

export async function PostForm({data} : {data: PostFormType}){
    const session = await auth();
    if(!session?.user.id) return {success: false, message: {updated: "User not found"}};

    const parsed = postFormType.safeParse(data);

    if(!parsed.success){
        return { 
            success: false, 
            message: {updated: "Invalidated Fields"}
        };
    }

    const tags = data.tagsSelected.toString();
    const validatedData = parsed.data;
    try{
        await prisma.post.create({
            data: {
                title: validatedData.title, 
                description: validatedData.description,
                code: validatedData.code ?? "",
                language: validatedData.language,
                tags: validatedData.tagsSelected.toString(),
                authorId: session.user.id}
        })

        refresh();
        return {success: true, message: {updated: "Post has created successfully"}};
    }catch{
        return {success: false, message: {updated: "Something went wrong, Please try again later"}};
    }
}