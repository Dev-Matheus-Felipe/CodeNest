"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import { auth } from "@/lib/auth";
import { User } from "next-auth";
import { Post, Response } from "@prisma/client";

export type LikeType = {
  id: string;
  content: "post" | "response";
  liked: boolean;
  user?: User
};

type LeaveLikeInput = {
  id: string;
  content: "post" | "response";
};

export async function leaveLike({ id, content }: LeaveLikeInput) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  const userId = session.user.id;

  if (content === "post") {
    const post = await prisma.post.findUnique({
      where: { id },
      select: { likedBy: true },
    });

    if (!post) return;

    const hasLiked = post.likedBy.includes(userId);

    await prisma.post.update({
      where: { id },
      data: {
        likedBy: {
          set: hasLiked
            ? post.likedBy.filter((uid: Post) => uid.id !== userId)
            : [...post.likedBy, userId],
        },
      },
    });
  } else {
    const response = await prisma.response.findUnique({
      where: { id },
      select: { likedBy: true },
    });

    if (!response) return;

    const hasLiked = response.likedBy.includes(userId);

    await prisma.response.update({
      where: { id },
      data: {
        likedBy: {
          set: hasLiked
            ? response.likedBy.filter((uid: Response) => uid.id !== userId)
            : [...response.likedBy, userId],
        },
      },
    });
  }

  revalidatePath("/");
}