import { ProfileComponent } from "@/components/profile/profileComponent";
import { GetUser } from "@/components/profile/functions/getUser";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth"
import { FullUserType } from "@/lib/types/fullUser";

export default async function MyProfile(){
    const session = await auth();
    const username = session?.user.username;

    if(!username) redirect("/");

    const user:  FullUserType | null = await GetUser({username: username});

    if(!user) redirect("/");
    
    return <ProfileComponent user={user} myProfile={true} />;
}