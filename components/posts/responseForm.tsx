"use client"

import Image from "next/image";
import { useState } from "react";
import { User } from "next-auth";
import { toast } from "sonner";
import { codeEditTags } from "@/lib/tagsData";
import CodeEditor from '@uiw/react-textarea-code-editor';
import { Controller, useForm } from "react-hook-form";
import { responseSchema, ResponseSchemaType } from "@/lib/schemas/responseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Responseform } from "@/lib/actions/reponseForm";
import { ResponseType } from "@/lib/types/response";

type InitialState = {
    content: string,
    code: string,
    language: string
}

export function ResponseForm({user, post, response} : {user?: User, post: string, response?: ResponseType}){
    const inputStyle: string = "bg-(--secondary-button) h-11 mt-2  w-full rounded-sm outline-0 px-3 profile:text-xs text-[9px] ";
     const initialState: InitialState = {
        content: response?.content ?? "",
        code: response?.code ?? "",
        language: response?.language ?? "html",
    }

    const {
        register,
        reset,
        formState: {errors, isSubmitting, isDirty},
        control,
        handleSubmit,
        watch,
        setValue,
  
    } = useForm<ResponseSchemaType>({
        defaultValues: initialState,
        resolver: zodResolver(responseSchema)
    });


    const [editCodeTags, setEditCodeTags] = useState<boolean>(false);
    const [opened, setOpened] = useState<boolean>(response ? true : false);

    const language = watch("language");
    
    const openForm = () => {
        if(!user){
            toast.warning("Must be logged!");
            return;
        }

        setOpened(prev => !prev);
    }

    const formHandler = async(data: ResponseSchemaType) => {
        if(!isDirty && response){
            toast.warning("Nothing to update");
            return;
        }

        const loading = toast.loading("Saving...");
        const result = await Responseform({data: data, post: post, type: response});
        
        if(result.success){
            toast.success(result.message.updated as string, {id: loading});
            setOpened(false);
            if(!response) reset();
            
        }else
            toast.error(result.message.updated as string, {id: loading});

        window.scrollTo({top: 0, behavior: "smooth"});
    }

    return(
         <div className={`mt-10 bg-(--secondary-button-hover) hover:bg-(--secondary-button-hover) cursor-pointer rounded-md
         overflow-y-hidden ${opened && user ? "min-h-150" : "h-11.5"} duration-500 w-full h-10`}>
            <div className="flex justify-between px-3 h-11.5 items-center" onClick={()=> openForm()}>
                <h1 className="text-md">Write your answer here</h1>
                <Image src="/icons/general/arrow.svg" alt="Arrow icon" width={15} height={15} />
            </div>
            
            <form className="w-full flex flex-col gap-7 px-5 py-4" onSubmit={handleSubmit(formHandler)}>

                {/* TITLE */}
                <div>
                    <label htmlFor='content'>Answer content <span className="text-orange-500 pl-1 text-lg">*</span></label>
                    <input 
                        {...register("content")}
                        id='content' 
                        type="text" 
                        className={inputStyle} 
                        placeholder="Write your answer here..."/>

                         { (errors.content) &&
                            <p className="text-red-600 text-xs py-3">{errors.content.message}</p> }
                </div>
                


                {/* CODE */}
                <div className="flex justify-between items-center relative">
                    <label  htmlFor="code" className='mb-2'>Code (optional)</label>

                    <button className={`bg-(--secondary-button) hover:bg-(--secondary-button-hover)  cursor-pointer rounded-md 
                    text-xs flex items-center justify-around  w-25 py-3 px-3`} 
                    type='button' onClick={()=> setEditCodeTags(prev => !prev)}>
                        <p className="text-xs">{language}</p>
                        
                        <Image
                            src="/icons/general/select.svg" 
                            alt="Select Icon" 
                            width={13}
                            height={13}/>
                    </button>

                    {
                        editCodeTags &&
                        <div className={`absolute z-10 top-full left-full -translate-x-full h-60 w-25
                        bg-(--codeEdit-tag) translate-y-1.5  rounded-md p-3 text-xs flex flex-col gap-5 overflow-auto`}>
                            {
                                codeEditTags.map((e: string) => (
                                    <p 
                                        key={e} 
                                        className='border py-1 pl-2 hover:text-orange-500 cursor-pointer rounded-sm'
                                        onClick={()=>{ setValue("language", e); setEditCodeTags(false);  }}>
                                        {e}
                                    </p>
                                ))
                            }
                        </div>
                    }

                </div>

                <div className='mb-5 h-auto flex flex-col items-center gap-2 w-full'>
                    <Controller
                        name="code"
                        control={control}
                        render={({ field }) => (
                            <CodeEditor
                            value={field.value}                        
                            language={language}               
                            onChange={(e) => field.onChange(e.target.value)} 
                            padding={10}
                            id="code"
                            placeholder="Please write your code here if it is needed"
                            className="min-h-60 text-md! rounded-md w-full max-w-250 overflow-x-scroll bg-(--code-editor)"
                            />
                        )}
                    />
                </div>

                { (errors.code) &&
                    <p className="text-red-600 text-xs py-3">{errors.code.message}</p> }
                   
                <div className='w-full flex justify-end mt-5'>
                    
                    <button className={`text-white bg-linear-to-r from-(--primary-color-button) 
                    to-(--secondary-color-button) px-5 py-2 rounded-md cursor-pointer text-sm`} disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Save"} 
                    </button>
                </div>
            </form>
        </div>

    )
}