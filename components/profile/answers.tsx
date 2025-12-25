import { prisma } from "@/lib/prisma";
import { User } from "next-auth";

export async function Answers({user} : {user: User}){
    const answers = await prisma.response.findMany({
        where: {authorId: user.id}
    })

    return (
        <div className="flex flex-col items-center text-[12px]">
            <p>{answers.length}</p>
            <p>Answers</p>
        </div>
    )
}