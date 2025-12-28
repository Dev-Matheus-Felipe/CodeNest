import { CommunityContainer } from "@/components/generals/community";
import { prisma } from "@/lib/prisma"

export default async function Community(){
    const users = await prisma.user.findMany();
    return (
        <CommunityContainer users={users} />
    )
}