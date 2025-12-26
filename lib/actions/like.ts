"use server";

import { refresh, revalidatePath } from "next/cache";
import { prisma } from "../prisma";

export type LikeType = {
    id: string;
    content: "post" | "response"; // para maior segurança
};

export async function leaveLike({ id, content }: LikeType) {
    // Seleciona o modelo correto
    if(content === "post" ){
        await prisma.post.update({
            where: {id: id},
            data: {
                likes: {
                    increment: 1
                }
            }
        })
    
    }else{
        await prisma.response.update({
            where: {id: id},
            data: {
                likes: {
                    increment: 1
                }
            }
        })

    }

    refresh();
}
