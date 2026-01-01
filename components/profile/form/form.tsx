"use client"

import { editProfileSchema, EditProfileSchemaType } from "@/lib/schemas/editProfileSchema";
import { EditProfileForm } from "@/lib/actions/editProfileForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { User } from "next-auth";
import { toast } from "sonner";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { refresh } from "next/cache";

type InitialValues = {
    name: string,
    username: string,
    bio: string,
    portfolio: string
}

export function Form({user} : {user: User}){  
    const initialValues: InitialValues = {
        name: user.name ?? "",
        username: user.username ?? "",
        bio: user.bio ?? "",
        portfolio: user.portfolio ?? "",
    }

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},

    } = useForm<EditProfileSchemaType>({
        resolver: zodResolver(editProfileSchema),
        defaultValues: initialValues
    });

    const inputStyle: string = "bg-(--secondary-button) h-11 mt-1 mb-4 w-full rounded-sm outline-0 px-3 text-xs";
    const inputsData: (keyof EditProfileSchemaType)[] = ["name","username","bio","portfolio"];

    const nameToLabel = (word: string) => {
        return `${word[0].toUpperCase()}${word.slice(1)}`
    }

    const onSubmit = async(data: EditProfileSchemaType) => {
        const hasChanges =
            data.name !== initialValues.name ||
            data.username !== initialValues.username ||
            data.bio !== initialValues.bio ||
            data.portfolio !== initialValues.portfolio;

        if (!hasChanges) {
            toast.warning("nothing to update");
            return;
        }

        const loadingID  = toast.loading("Saving...");
        const result = await EditProfileForm({data: data});

        if (result.success){
            toast.success("Profile updated successfully",{id: loadingID});
            refresh()
        }else
            toast.error(result.message.update ,{id: loadingID});
        
    }

    return( 
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            {
                inputsData.map((input, index: number) => (
                    <div key={index}>
                        <label htmlFor={input}>
                            {nameToLabel(input)}

                            {(input === "name" || input === "username" ) && 
                                <span className="text-orange-500 pl-1 text-lg">*</span>}
                        </label>

                        <input 
                            {...register(input)}
                            className={inputStyle} 
                            type="text" 
                            id={input}
                            autoComplete="off" />
                        {
                            errors[input] && (
                                <p className="text-red-500 text-[10px] -mt-3 mb-2">
                                    {errors[input]?.message as string}
                                </p>
                            )
                        }
                    </div>
                ))
            }
        
            <button className={`bg-(--confirm-button) h-10 w-20  rounded-md text-xs cursor-pointer hover:bg-orange-500
            text-white mt-3`} type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save"}
            </button>    
        </form>
    )
}