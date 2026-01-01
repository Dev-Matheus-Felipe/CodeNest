import { ProfileComponent } from "@/components/profile/profileComponent";
import { GetUser } from "@/components/profile/functions/getUser";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth"
import { FullUserType } from "@/lib/types/fullUser";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile – Code Nest",
  description: "Manage your profile, questions, answers, and activity.",
  robots: {
    index: false,
    follow: false,
  },
};


export default async function MyProfile(){
    const session = await auth();
    const username = session?.user.username;

    if(!username) redirect("/");

    const user:  FullUserType | null = await GetUser({username: username});

    if(!user) redirect("/");
    
    return <ProfileComponent user={user} myProfile={true} />;
}