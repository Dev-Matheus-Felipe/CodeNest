"use server"

import { responseSchema, ResponseSchemaType } from "../schemas/responseSchema";
import { refresh } from "next/cache";
import { prisma } from "../prisma";
import { auth } from "../auth";
import { Response } from "@/components/posts/responseForm";

export async function Responseform({data, post, type} : {data: ResponseSchemaType, post: string, type?: Response}){
    const session = await auth();

    if(!session?.user.id){
        return {
            success: false, 
            message: {update: "User not found"}
        };
    }

    const parsed = responseSchema.safeParse(data);

    if(parsed.error) return {success: false, message: {update: "Ivalidated Fields"}};

    const validatedData = parsed.data;

    try{
        if(!type){
            await prisma.response.create({
                data: {
                    content: validatedData.content, 
                    code: validatedData.code ?? "",
                    language: validatedData.language,
                    authorId: session.user.id,
                    postId: post
                }
            })

        }else {
            await prisma.response.update({
                where: {id: type.id, authorId: session.user.id},

                data: {
                    content: validatedData.content, 
                    code: validatedData.code ?? "",
                    language: validatedData.language,
                }
            })
        }

        refresh();
        return {success: true, message: {updated: `Response has been ${type? "updated" : "created" } successfully`}};

    }catch{
        return {success: false, message: {updated: "Something went wrong, Please try again later"}};
    }

}