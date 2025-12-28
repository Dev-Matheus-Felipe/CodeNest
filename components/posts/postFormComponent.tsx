"use client"

import { postFormType, PostFormType } from '@/lib/schemas/postFormSchema';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Post } from '@/src/generated/prisma/client';
import { codeEditTags, tags } from '@/lib/tagsData';
import { PostForm } from '@/lib/actions/postForm';
import { useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';

export  function PostFormComponent({post} : {post?: Post}){
    const inputStyle = "bg-(--secondary-button) h-11 mt-2  w-full rounded-sm outline-0 px-3 profile:text-xs text-[9px] ";

    const initialValues = {
        title: post?.title ?? "",
        description:  post?.description ?? "",
        code:  post?.code ?? "",
        language:  post?.language ?? "html",
        tagsSelected: post?.tags.split(",") ?? [],
    }

    const {
        register,
        reset,
        watch,
        setValue,
        handleSubmit,
        control,
        formState: {errors, isSubmitting, isDirty}

    } = useForm<PostFormType>({
        resolver: zodResolver(postFormType),
        defaultValues: initialValues
    });

    const [searchTags, setSearchTags] = useState("");
    const [editCodeTags, setEditCodeTags] = useState<boolean>(false);

    const tagsSelected = watch("tagsSelected");
    const language = watch("language");


    const filteredTags: string[] = tags.filter(tag =>
        tag.name.toLowerCase().includes(searchTags.toLowerCase()) && !tagsSelected.includes(tag.name)
    ).map(e => e.name);

    const onSubmit = async(data : PostFormType) => {
        if(isDirty && post){
            toast.warning("nothing to update");
            return;
        }

        const loading = toast.loading("Saving...");
        const result = await PostForm({data: data, type: post?.id});

        if(result.success){
            toast.success(result.message.updated as string, {id: loading});
            if(!post) reset();
            
        }else
            toast.error(result.message.updated as string, {id: loading});

        window.scrollTo({top: 0, behavior: "smooth"});
    }

    return (
        <div className="p-[2%] h-full m-auto w-full pt-5">
            <h1 className="text-2xl pb-7 font-bold">{post ? "Edit Post" : "Ask a question"}</h1>
            <form className="w-full flex flex-col gap-7" onSubmit={handleSubmit(onSubmit)}>

                {/* TITLE */}
                <div>
                    <label htmlFor='title'>Question title <span className="text-orange-500 pl-1 text-lg">*</span></label>
                    <input 
                        {...register("title")}
                        id='title' 
                        type="text" 
                        className={inputStyle} 
                        placeholder="Be specific and image you asking a question to another person"/>

                        { (errors.title) &&
                            <p className="text-red-600 text-xs py-3">{errors.title.message}</p> }
                </div>


                {/* DESCRIPTION */}
                <div>
                    <label htmlFor='description'>Question description<span className="text-orange-500 pl-1 text-lg">*</span></label>
                    <input 
                        {...register("description")}
                        id='description' 
                        type="text"
                        className={inputStyle} 
                        placeholder="Describre your problem here" />

                    { (errors.description) &&
                        <p className="text-red-600 text-xs py-3">{errors.description.message}</p> }
                </div>


                {/* TAGS */}
                <div>
                    <div className='w-full h-auto relative'>
                        <label htmlFor="tags">Tags<span className="text-orange-500 pl-1 text-lg ">*</span></label>
                        <input 
                            id='tags' 
                            type="text"
                            value={searchTags}
                            onChange={(e) => setSearchTags(e.target.value)}
                            className={`${inputStyle} mb-4!`}
                            autoComplete='off'
                            placeholder="Add tags (max: 3)" />
                            
                        <div className={`w-[98%] left-[50%] -translate-x-[50%] max-h-50 absolute rounded-md bg-(--tags) z-10 
                        flex ${filteredTags.length > 0 && searchTags ? "py-2" : "py-0"}`}>
                            
                            <div className='w-[99%] max-h-50 overflow-y-auto flex flex-col pl-2'>
                                { 
                                    searchTags && filteredTags.map((e, index) => (
                                        <p 
                                            className={`text-xs w-[99%] cursor-pointer hover:text-orange-500 border 
                                            border-transparent hover:border-(--primary-color-button) pl-3 py-3`} 
                                            key={index} 
                                            onClick={() => {
                                                if (!tagsSelected.includes(e) && tagsSelected.length < 3) {
                                                    setValue("tagsSelected", [...tagsSelected, e]);
                                                    setSearchTags("");
                                                }
                                            }}>
                                            {e}
                                        </p>
                                    ))
                                }
                            </div>
                        </div>
                            
                        
                    </div>

                    <div className="flex w-full items-center gap-2">
                        {   
                            tagsSelected.map((e) => (
                                <p 
                                    key={e} 
                                    onClick={() => setValue("tagsSelected", tagsSelected.filter(t => t !== e))}
                                    className={`text-[10px] text-(--username-color) bg-(--secondary-button) py-2 px-4 
                                    rounded-2xl cursor-pointer`} >
                                    {e}
                                </p>
                            ))
                        }
                        
                        { (errors.tagsSelected) &&
                            <p className="text-red-600 text-xs py-3">{errors.tagsSelected.message}</p> }
                    </div>
                </div>

                {/* CODE */}
                <div className="flex justify-between items-center relative">
                    <label htmlFor='code'  className='mb-2'>Code (optional)</label>

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
                                codeEditTags.map((e) => (
                                    <p 
                                        key={e} 
                                        className='border py-1 pl-2 hover:text-orange-500 cursor-pointer rounded-sm'
                                        onClick={()=> {setValue("language", e), setEditCodeTags(false)} }>
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

                    { (errors.code) &&
                        <p className="text-red-600 text-xs py-3">{errors.code.message}</p> }
                </div>
                   
                            
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