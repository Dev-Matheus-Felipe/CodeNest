"use server"

import { editProfileSchema, EditProfileSchemaType } from "../schemas/editProfileSchema";
import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import { auth } from "../auth";

export const EditProfileForm = async ({data} :  {data: EditProfileSchemaType}) => {
    const session = await auth();
    if(!session) return {success: false, message:{update: "User not found"} };

    const parsed = editProfileSchema.safeParse(data);
    if (!parsed.success) {
        return {
            success: false,
            message: { update: "Invalid Fields" }
        };
    }

    const validatedData = parsed.data;

    const userValidated = await prisma.user.findFirst({where: {username: validatedData.username}});

    if(userValidated && userValidated.id != session.user.id)
        return {success: false, message: {update: "Someone with that username already exists."}}

    try{
        await prisma.user.update({
            where: {
                id: session.user.id,
            },
            data: {
                ...validatedData,
            }
        })

        revalidatePath("/profile");
        return {success: true, message: {update: "User updated"}};
         
    }catch{
        return {success: false, message: {update: "Error updating user."}};
    }
}