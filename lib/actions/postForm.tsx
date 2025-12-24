"use server"

import z4 from "zod/v4";
import { prisma } from "../prisma";
import { auth } from "../auth";
import { FormState } from "./editProfileForm";



const formSchema = z4.object({
    title: z4.string().min(5,"Min Length: 20").max(35,"Max Length: 35").regex(/^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*/),
    description: z4.string().min(5,"Min Length: 20").max(200,"Max Length: 200").regex(/^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*/),
    language: z4.string(),
    code: z4.string().max(10000,"Caracter limits reached").optional(),
    tags: z4.string().min(1,"Tag Required"),

})

export async function PostForm(previousState: FormState | null, formData: FormData): Promise<FormState>{
    const code = formData.get("code") as string;
    
    const data = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        language: formData.get("language") as string,
        code: code.length === 0 ? undefined : code,
        tags: formData.get("tag") as string
    }

    const result = formSchema.safeParse(data);

    if(result.success){
        const user = await auth();
        if(!user?.user.id) return {success: false, message: {updated: "User not found"}};

        try{
            await prisma.post.create({
                data: {...data, authorId: user.user.id}
            })

            return {success: true, message: {}};
        }catch{
            return {success: false, message: {updated: "Something went wrong, Please try again later"}};
        }
    
    }else{
        const message: Record<string, string> = {};
        result.error.issues.forEach(e => {
            message[e.path[0] as string] = e.message;
        });

        return { success: false, message: {updated: "Invalidated Fields"}};
    }
}