import { BackProfileButton } from "@/components/profile/buttons/backProfile";
import { Form as ProfileForm } from "@/components/profile/form/form";
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profile – Code Nest",
  description: "Edit your profile information, bio, and preferences.",
  robots: {
    index: false,
    follow: false,
  },
};


export default async  function Edit(){    
    const session = await auth();
    if(!session?.user) return redirect("/");

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