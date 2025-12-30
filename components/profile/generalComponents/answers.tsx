import { prisma } from "@/lib/prisma";
import { User } from "next-auth";

type Answers = {
    id: string
}

export async function Answers({user} : {user: User}){
    const answers: Answers[] = await prisma.response.findMany({
        where: {authorId: user.id},
        select: {
            id: true
        }
    })

    return (
        <div className="flex flex-col items-center text-[12px]">
            <p>{answers.length}</p>
            <p>Answers</p>
        </div>
    )
}