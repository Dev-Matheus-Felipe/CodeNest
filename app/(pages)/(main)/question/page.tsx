"use client"

import { PostForm } from '@/lib/actions/postForm';
import { codeEditTags, tags } from '@/lib/tagsData';
import CodeEditor from '@uiw/react-textarea-code-editor';
import Image from 'next/image';
import { useActionState, useReducer, useState } from 'react';
import { toast } from 'sonner';

type State = {
    title: string,
    description: string,
    code: string,
    language: string,
    input: string,
    tags: string[],
    tagsSelected: string[]
    message: Record<string,string>
}

type Action = 
    | {type: "title", title: string}
    | {type: "description", description: string}
    | {type: "code", code: string}
    | {type: "language", language: string}
    | {type: "input", input: string}
    | {type: "selectTag", tagSelected: string}
    | {type: "removeTag", tag: string}
    | {type: "message", message: Record<string,string>}


function reducer(state: State, action: Action){
    switch(action.type){
        case "title":
            return {...state, title: action.title};
        
        case "description":
            return {...state, description: action.description};

        case "code":
            return {...state, code: action.code};

        case "language":
            return {...state, language: action.language};
        
        case "input":
            return {...state, input: action.input};

        case "selectTag":
            const newTags = state.tags.filter(e => e !== action.tagSelected);
            return {...state, tags: newTags, tagsSelected: [...state.tagsSelected, action.tagSelected], input: ""};

        case "removeTag":
            const tagsFilted = state.tagsSelected.filter(e => e !== action.tag);
            return {...state, tags: [...state.tags, action.tag], tagsSelected: tagsFilted};

        case "message":
            return {...state, message: action.message};

        default: 
            return state;
    }

}

export default function Question(){
    const [formState, action, isLoading] = useActionState(PostForm,{success: false, message: {}});
    const [editCodeTags, setEditCodeTags] = useState<boolean>(false);
    const [state, dispatch] = useReducer(reducer, {
        title: "",
        description: "",
        code: "",
        language: "html",
        input: "",
        tags: tags,
        tagsSelected: [],
        message: {}
    });

    const inputStyle = "bg-(--secondary-button) h-11 mt-2  w-full rounded-sm outline-0 px-3 profile:text-xs text-[9px] ";
    
    const filteredTags: string[] = state.tags.filter((g) =>
        g.toLowerCase().includes(state.input.toLowerCase())
    );

    const handleSelectTag = (tag: string) => {
        if(state.tagsSelected.length >= 3){
            toast.warning("Only 3 tags allowed.");
            return;
        }
        dispatch({type:"selectTag", tagSelected: tag});
    }

    const formHandler = async(formData: FormData) => {
        const loading = toast.loading("Saving...");
        const result = await PostForm(null,formData);

        if(result.success)
            toast.success("Post has created successfully", {id: loading});
        
        else
            toast.error(result.message.updated as string, {id: loading});

        dispatch({type: "message", message: result.message})
    }

    return (
        <div className="p-[2%] h-full m-auto w-[95%] pt-5">
            <h1 className="text-2xl pb-7 font-bold">Ask a question</h1>
            <form className="w-full flex flex-col gap-7" action={formHandler}>

                {/* TITLE */}
                <div>
                    <label htmlFor='title'>Question title <span className="text-orange-500 pl-1 text-lg">*</span></label>
                    <input 
                        id='title' 
                        name='title' 
                        type="text" 
                        value={state.title}
                        onChange={(e) => dispatch({type: "title", title: e.target.value})}
                        className={inputStyle} 
                        placeholder="Be specific and image you asking a question to another person"/>

                    {
                        (!formState.success && state.message["title"]) &&
                            <p className="text-red-600 text-xs py-3">{state.message["title"]}</p>
                    }
                </div>
                

                {/* DESCRIPTION */}
                <div>
                    <label htmlFor='description'>Question description<span className="text-orange-500 pl-1 text-lg">*</span></label>
                    <input 
                        type="text"
                        value={state.description}
                        onChange={(e) => dispatch({type: "description", description: e.target.value})}
                        id='description' 
                        name='description' 
                        className={inputStyle} 
                        placeholder="Describre your problem here" />

                    {
                        (!formState.success && state.message["description"]) &&
                            <p className="text-red-600 text-xs py-3">{state.message["description"]}</p>
                    }
                </div>


                {/* TAGS */}
                <div>
                    <div className='w-full h-auto relative'>
                        <label htmlFor="tags">Tags<span className="text-orange-500 pl-1 text-lg ">*</span></label>
                        <input 
                            id='tags' 
                            name='tags' 
                            type="text" 
                            className={`${inputStyle} mb-4!`}
                            value={state.input}
                            onChange={(e) => {dispatch({type: "input", input: e.target.value})}}
                            autoComplete='off'
                            placeholder="Add tags (max: 3)" />

                        <div className={`w-[98%] left-[50%] -translate-x-[50%] max-h-50 absolute rounded-md bg-(--tags) z-10 flex 
                        ${filteredTags.length > 0 && state.input ? "py-2" : "py-0"}`}>
                        <div className='w-[99%] max-h-50 overflow-y-auto flex flex-col pl-2'>
                            {
                                state.input && filteredTags.map((e, index) => (
                                    <p className={`text-xs w-[99%] cursor-pointer hover:text-orange-500 border border-transparent
                                    hover:border-(--primary-color-button) pl-3 py-3`} 
                                    key={index} onClick={()=> handleSelectTag(e)}>{e}</p>
                                ))
                            }
                        </div>
                        </div>
                    </div>

                    <div className="flex w-full items-center gap-2">
                        {
                            state.tagsSelected.map((e) => (
                                <p key={e} className={`text-[10px] text-(--username-color) bg-(--secondary-button) py-2 px-4 
                                rounded-2xl cursor-pointer`} onClick={() => dispatch({type: "removeTag", tag: e})}>
                                    {e}
                                </p>
                            ))
                        }

                        <input type='hidden' value={state.tagsSelected.join(",")} id='tag' name='tag' />
                    </div>

                    {
                        (!formState.success && state.message["tags"]) &&
                            <p className="text-red-600 text-xs py-3">{state.message["tags"]}</p>
                    }
                </div>

                {/* CODE */}
                <div className="flex justify-between items-center relative">
                    <label  className='mb-2'>Code (optional)</label>

                    <button className={`bg-(--secondary-button) hover:bg-(--secondary-button-hover) w-25 py-3 cursor-pointer rounded-md 
                    text-xs flex items-center justify-center gap-1.5 px-2`} 
                    type='button' onClick={()=> setEditCodeTags(prev => !prev)}>
                        <p className="text-xs">{state.language}</p>
                        
                        <Image
                            src="/icons/general/select.svg" 
                            alt="Select Icon" 
                            width={13}
                            height={13}/>
                    </button>

                    {
                        editCodeTags &&
                        <div className={`absolute z-10 top-full left-full  -translate-x-full h-60 w-25
                        bg-(--codeEdit-tag) translate-y-1.5  rounded-md p-3 text-xs flex flex-col gap-5 overflow-auto`}>
                            {
                                codeEditTags.map((e) => (
                                    <p 
                                        key={e} 
                                        className='border py-1 pl-2 hover:text-orange-500 cursor-pointer'
                                        onClick={()=>{
                                             dispatch({type:"language", language: e});
                                             setEditCodeTags(false);
                                        }}>{e}</p>
                                ))
                            }
                        </div>
                    }

                     <input type='hidden' value={state.language} id='language' name='language' />
                </div>

                <div className='mb-5 h-auto flex flex-col items-center gap-2 w-full'>
                    <CodeEditor
                        value={state.code}
                        language={state.language}
                        onChange={(e) => {dispatch({type:"code", code: e.target.value})}}
                        padding={10}
                        placeholder="Please write your code here if it is needed"
                        className='min-h-60 text-sm! rounded-md w-full max-w-250 overflow-x-scroll! bg-(--code-editor)!' />

                    <input type='hidden' value={state.code} id='code' name='code' />

                </div>
                {
                    (!formState.success && state.message["code"]) &&
                        <p className="text-red-600 text-xs py-3">{state.message["code"]}</p>
                }
                <div className='w-full flex justify-end mt-5'>
                    <button className={`text-white bg-linear-to-r from-(--primary-color-button) 
                    to-(--secondary-color-button) px-5 py-2 rounded-md cursor-pointer text-sm`}>Confirm</button>
                </div>
            </form>
        </div>
    )
}