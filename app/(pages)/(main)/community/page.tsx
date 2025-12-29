import { CommunityContainer } from "@/components/generals/community";
import { prisma } from "@/lib/prisma"
export const dynamic = "force-dynamic";

export default async function Community(){
    const users = await prisma.user.findMany();
    return (
        <CommunityContainer users={users} />
    )
}