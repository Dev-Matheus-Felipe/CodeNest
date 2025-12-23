"use server"

import z4  from "zod/v4";
import { prisma } from "../prisma";
import { auth } from "../auth";
import { refresh } from "next/cache";

export type FormState = {
  success: boolean;
  message: Record<string, string>;
};

const formSchema = z4.object({
    name: z4.string("Not a string")
        .min(3, "Min Length: 3")
        .max(20,"Max Length: 20")
        .regex(/^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/, "Name Invalidated"),

    username: z4
        .string("Not a string")
        .min(3, "Min Length: 3")
        .max(20,"Max Length: 20")
        .regex(/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/,"Username Invalidated"),
    
    bio: z4
        .string("Not a string")
        .max(255, "Max Length: 255")
        .optional(),
    
    portfolio: z4.string().url("Not a Http url").nullable().optional()

});

export const EditProfileForm = async (state: FormState | null, formdata: FormData): Promise<FormState> => {
    
    const data = {
        name: formdata.get("name") as string,
        username: formdata.get("username") as string,
        bio: formdata.get("bio") as string,
        portfolio:(formdata.get("portfolio") as string) || null
    }

    const result = formSchema.safeParse(data);

    if(!result.success){
        const message: Record<string, string> = {};
        result.error.issues.forEach(e => {
            message[e.path[0] as string] = e.message;
        });

        return { success: false, message};
    }

    const session = await auth();

    if(!session) return {success: false, message: {} };

    try{
        await prisma.user.update({
            where: {id: session.user.id},
            data: {
                name: data.name,
                username: data.username,
                bio: data.bio,
                portfolio: data.portfolio
            }
        })

        refresh();
        return {success: true, message: {update: "User updated"}};
         
    }catch{
        return {success: false, message: {update: "Error updating user."}};
    }
}



