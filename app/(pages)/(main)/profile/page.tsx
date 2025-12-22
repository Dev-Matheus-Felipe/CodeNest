import { ProfileComponent } from "@/components/profile/profileComponent";
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation";

export default async function MyProfile(){
    const session = await auth();

    if(!session?.user)
        redirect("/");
    
    return (
        <ProfileComponent user={session.user} myProfile={true} />
    )
}