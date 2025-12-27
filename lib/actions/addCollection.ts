"use server"

import { auth } from "../auth";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";

export async function ActionCollection({post} : {post: string}){
    const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  const userId = session.user.id;


    const savedPost = await prisma.savedPost.findUnique({
        where: { 
            userId_postId: {
                userId: userId,
                postId: post 
            } 
        }
    });

    if (savedPost){
        await prisma.savedPost.delete({
            where: {id: savedPost.id}
        })
            
    }else {
        await prisma.savedPost.create({
            data:{
                userId: userId,
                postId: post
            }
        })
    }


  revalidatePath("/collections");
  return;
}