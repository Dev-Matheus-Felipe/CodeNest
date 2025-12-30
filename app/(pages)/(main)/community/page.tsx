import { CommunityContainer } from "@/components/generals/community";
import { prisma } from "@/lib/prisma"

export default async function Community(){
    const users = await prisma.user.findMany();
    
    return (
        <div className="h-[calc(100vh-115px)] w-full">
            <CommunityContainer users={users} />
        </div>
    )
}