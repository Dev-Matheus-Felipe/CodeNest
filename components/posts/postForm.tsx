"use client"

import Image from "next/image";
import { useActionState, useReducer, useState } from "react";
import { User } from "next-auth";
import { toast } from "sonner";
import { codeEditTags } from "@/lib/tagsData";
import CodeEditor from '@uiw/react-textarea-code-editor';
import { AnswerForm } from "@/lib/actions/answerForm";

 type State = {
    content: string,
    code: string,
    language: string,
    message: Record<string,string>
}

type Action = 
    | {type: "content", content: string}
    | {type: "code", code: string}
    | {type: "language", language: string}
    | {type: "message", message: Record<string,string>}
    | {type: "reset", initialState: State}


function reducer(state: State, action: Action){
    switch(action.type){
        case "content":
            return {...state, content: action.content};
        
        case "code":
            return {...state, code: action.code};

        case "language":
            return {...state, language: action.language};
        
        case "message":
            return {...state, message: action.message};

        case "reset":
            return action.initialState;

        default: 
            return state;
    }

}

export function PostForm({user, post} : {user?: User, post: string}){
    const inputStyle = "bg-(--secondary-button) h-11 mt-2  w-full rounded-sm outline-0 px-3 profile:text-xs text-[9px] ";
     const initialState: State = {
        content: "",
        code: "",
        language: "html",
        message: {}
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const [editCodeTags, setEditCodeTags] = useState<boolean>(false);
    const [opened, setOpened] = useState(false);
    
    const [formState, action, isLoading] = useActionState(AnswerForm,{success: false, message: {}});
    
    const openForm = () => {
        if(!user){
            toast.warning("Must be logged!");
            return;
        }

        setOpened(prev => !prev);
    }

    const formHandler = async(formData: FormData) => {
        const loading = toast.loading("Saving...");
        const result = await AnswerForm(null,formData);

        if(result.success){
            toast.success("Answer has created successfully", {id: loading});
            dispatch({type: "reset", initialState: initialState});
            setOpened(false);
        }else
            toast.error(result.message.updated as string, {id: loading});

        dispatch({type: "message", message: result.message});
    }

    return(
         <div className={`mt-10 bg-(--secondary-button-hover) hover:bg-(--secondary-button-hover) cursor-pointer rounded-md
         overflow-y-hidden ${opened && user ? "min-h-150 h-150" : "h-11.5"} duration-500`}>
            <div className="flex justify-between px-3 h-11.5 items-center" onClick={()=> openForm()}>
                <h1 className="text-md">Write your answer here</h1>
                <Image src="/icons/general/arrow.svg" alt="Arrow icon" width={15} height={15} />
            </div>
            
            <form className="w-full flex flex-col gap-7 px-5 py-4" action={formHandler}>

                {/* TITLE */}
                <div>
                    <label htmlFor='content'>Answer content <span className="text-orange-500 pl-1 text-lg">*</span></label>
                    <input 
                        id='content' 
                        name='content' 
                        type="text" 
                        value={state.content}
                        onChange={(e) => dispatch({type: "content", content: e.target.value})}
                        className={inputStyle} 
                        placeholder="Write your answer here..."/>

                    { (!formState.success && state.message["content"]) &&
                            <p className="text-red-600 text-xs py-3">{state.message["content"]}</p> }
                </div>
                




                {/* CODE */}
                <div className="flex justify-between items-center relative">
                    <label  htmlFor="code" className='mb-2'>Code (optional)</label>

                    <button className={`bg-(--secondary-button) hover:bg-(--secondary-button-hover)  cursor-pointer rounded-md 
                    text-xs flex items-center justify-around  w-25 py-3 px-3`} 
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
                        <div className={`absolute z-10 top-full left-full -translate-x-full h-60 w-25
                        bg-(--codeEdit-tag) translate-y-1.5  rounded-md p-3 text-xs flex flex-col gap-5 overflow-auto`}>
                            {
                                codeEditTags.map((e) => (
                                    <p 
                                        key={e} 
                                        className='border py-1 pl-2 hover:text-orange-500 cursor-pointer rounded-sm'
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
                        id="code"
                        name="code"
                        placeholder="Please write your code here if it is needed"
                        className='min-h-60 text-sm! rounded-md w-full max-w-250 overflow-x-scroll! bg-(--code-editor)!' />

                    <input type='hidden' value={state.code} id='code' name='code' />

                </div>
                    {(!formState.success && state.message["code"]) &&
                            <p className="text-red-600 text-xs py-3">{state.message["code"]}</p> }
                            
                <input type='hidden' value={post} id='post' name='post' />
                <div className='w-full flex justify-end mt-5'>
                    
                    <button className={`text-white bg-linear-to-r from-(--primary-color-button) 
                    to-(--secondary-color-button) px-5 py-2 rounded-md cursor-pointer text-sm`} >Confirm</button>
                </div>
            </form>
        </div>

    )
}