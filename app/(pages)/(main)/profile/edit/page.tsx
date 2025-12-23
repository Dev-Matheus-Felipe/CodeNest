import { BackProfileButton } from "@/components/profile/buttons/backProfile/backProfile";
import { Form as ProfileForm } from "@/components/profile/form/form";
import { auth } from "@/lib/auth"




export default async  function Edit(){    
    const session = await auth();
    if(!session?.user) return null;

    
    return (
        <div className="p-[2%] flex flex-col justify-center w-[90%] m-auto portfolio:m-0 mt-5">
            <div className="flex justify-between">
                <h1 className="text-2xl mb-5">Edit Profile</h1>

                <BackProfileButton />   
            </div>

            <ProfileForm user={session.user} />
        </div>
    )
}