"use server"

import z4 from "zod/v4";
import { FormState } from "./editProfileForm";
import { auth } from "../auth";
import { prisma } from "../prisma";
import { refresh } from "next/cache";

const formSchema = z4.object({
    content: z4.string().min(5,"Min Length:5 ").max(250,"Max Length: 250").regex(/^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*/),
    language: z4.string(),
    code: z4.string().max(10000,"Caracter limits reached").optional(),

})

export async function AnswerForm(previousState: FormState | null, formData: FormData): Promise<FormState> {
    const code = formData.get("code") as string;
    const post = formData.get("post") as string;

    const data = {
        content: formData.get("content") as string,
        language: formData.get("language") as string,
        code: code.length === 0 ? undefined : code,
    }

    const result = formSchema.safeParse(data);
    
        if(result.success){
            const user = await auth();
            if(!user?.user.id) return {success: false, message: {updated: "User not found"}};
            
    
            try{
                await prisma.response.create({
                    data: {...data, authorId: user.user.id, postId: post}
                })
    
                refresh();
                return {success: true, message: {}};
            }catch{
                return {success: false, message: {updated: "Something went wrong, Please try again later"}};
            }
        
        }else{
            const message: Record<string, string> = {};
            result.error.issues.forEach(e => {
                message[e.path[0] as string] = e.message;
            });
    
            return { success: false, message: {updated: "Invalidated Fields", ...message}};
        }
}