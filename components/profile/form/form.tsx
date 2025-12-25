"use client"

import { EditProfileForm } from "@/lib/actions/editProfileForm";
import { User } from "next-auth";
import { useActionState, useState } from "react";
import { toast } from "sonner";

type EditPage = {
    name: string,
    username: string,
    bio: string,
    portfolio: string,
}

export function Form({user} : {user: User}){  
    const [state, action, isLoading] = useActionState(EditProfileForm, {success: false, message: {}});
    const [message, setMessage] = useState<Record<string, string>>({});


    const inputStyle = "bg-(--secondary-button) h-11 mt-1 mb-4 w-full rounded-sm outline-0 px-3 text-xs";
    const inputsData = ["name","username","bio","portfolio"];

    const [data, setData] = useState<EditPage>({
        name: user.name ?? "",
        username: user.username ?? "",
        bio: user.bio ?? "",
        portfolio: user.portfolio ?? ""
    })

    const nameToLabel = (word: string) => {
        return `${word[0].toUpperCase()}${word.slice(1)}`
    }



    const onSubmit = async(formdata: FormData) => {
        const data = {
            name: formdata.get("name") as string,
            username: formdata.get("username") as string,
            bio: formdata.get("bio") as string,
            portfolio: formdata.get("portfolio") as string
        }

        const notHaveChanges =
            data.name == user.name &&
            data.username == user.username &&
            data.bio == (user.bio ?? "") &&
            data.portfolio === (user.portfolio ?? "")

        if(notHaveChanges){
            toast.warning("nothing to update");
            return;
        }

        
        const loadingID  = toast.loading("Saving...");
        const result = await EditProfileForm(null, formdata);

        if (result.success) 
            toast.success("Profile updated successfully",{id: loadingID});

        else
            toast.error("Error updating user",{id: loadingID});

        setMessage(result.message);
    }

    return( 
        <form className="flex flex-col" action={onSubmit}>
            {
                inputsData.map((input, index: number) => (
                    <div key={index}>
                        <label htmlFor={input}>
                            {nameToLabel(input)}

                            {(input === "name" || input === "username" ) && 
                                <span className="text-orange-500 pl-1 text-lg">*</span>}
                        </label>

                        <input 
                            className={inputStyle} 
                            type="text" 
                            id={input}
                            name={input} 
                            value={data[input as keyof EditPage]}

                            onChange={(e)=>{setData(o => ({
                                ...o, [input]: e.target.value
                            }))}}

                            autoComplete="off" />

                            {
                                (!state.success && message[input]) &&
                                    <p className="text-red-600 text-xs pb-3">{message[input]}</p>
                            }
                    </div>
                ))
            }
        
            <button className={`bg-(--confirm-button) h-10 w-25  rounded-md text-xs cursor-pointer 
            ${!isLoading && "hover:bg-orange-500"} text-white mt-3 `} type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Confirm"}
            </button>    
        </form>
    )
}