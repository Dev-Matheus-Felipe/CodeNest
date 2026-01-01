import { CommunityContainer } from "@/components/generals/community";
import { prisma } from "@/lib/prisma"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community – Code Nest",
  description:
    "Explore the developer community. Discover user profiles and see who is contributing answers and knowledge.",
  keywords: ["community", "developers", "profiles", "programming"],
};


export default async function Community(){
    const users = await prisma.user.findMany();
    
    return (
        <div className="h-[calc(100vh-115px)] w-full">
            <CommunityContainer users={users} />
        </div>
    )
}