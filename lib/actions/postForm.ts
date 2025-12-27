"use server"

import { postFormType, PostFormType } from "../schemas/postFormSchema";
import { refresh } from "next/cache";
import { prisma } from "../prisma";
import { auth } from "../auth";

export async function PostForm({data, type} : {data: PostFormType, type?: string}){
    const session = await auth();
    if(!session?.user.id) return {success: false, message: {updated: "User not found"}};

    const parsed = postFormType.safeParse(data);

    if(!parsed.success){
        return { 
            success: false, 
            message: {updated: "Invalidated Fields"}
        };
    }
    const validatedData = parsed.data;

    try{
        if(!type){
            await prisma.post.create({
                data: {
                    title: validatedData.title, 
                    description: validatedData.description,
                    code: validatedData.code ?? "",
                    language: validatedData.language,
                    tags: validatedData.tagsSelected.toString(),
                    authorId: session.user.id}
            })

        }else {
            await prisma.post.update({
                where: {id: type, authorId: session.user.id},

                data: {
                    title: validatedData.title, 
                    description: validatedData.description,
                    code: validatedData.code ?? "",
                    language: validatedData.language,
                    tags: validatedData.tagsSelected.toString(),
                    authorId: session.user.id}
            })
        }

        refresh();
        return {success: true, message: {updated: `Post has been ${type? "updated" : "created" } successfully`}};

    }catch{
        return {success: false, message: {updated: "Something went wrong, Please try again later"}};
    }
}