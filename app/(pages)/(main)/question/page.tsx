"use client"

import { tags } from '@/lib/tagsData';
import CodeEditor from '@uiw/react-textarea-code-editor';
import Image from 'next/image';
import { useReducer } from 'react';
import { toast } from 'sonner';

type State = {
    code: string,
    language: string,
    input: string,
    tags: string[],
    tagsSelected: string[]
}

type Action = 
    | {type: "code", code: string}
    | {type: "language", language: string}
    | {type: "input", input: string}
    | {type: "selectTag", tagSelected: string}
    | {type: "removeTag", tag: string}

function reducer(state: State, action: Action){
    switch(action.type){
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

        default: 
            return state;
    }

}

export default function Question(){
    const [state, dispatch] = useReducer(reducer, {
        code: "",
        language: "js",
        input: "",
        tags: tags,
        tagsSelected: []

    });

    const inputStyle = "bg-(--secondary-button) h-11 mt-2 mb-10 w-full rounded-sm outline-0 px-3 profile:text-xs text-[9px] ";
    
    const filteredTags: string[] = state.tags.filter((g) =>
        g.toLowerCase().includes(state.input.toLowerCase())
    );

    const handleSelectTag = (tag: string) => {
        if(state.tagsSelected.length >= 3){
            toast.warning("Only 3 tags allowed.");
            return; // não chama o dispatch
        }
        dispatch({type:"selectTag", tagSelected: tag});
    }

    return (
        <div className="p-[2%] h-full m-auto w-[95%] pt-5">
            <h1 className="text-2xl pb-7 font-bold">Ask a question</h1>
            <form className="w-full flex flex-col">

                {/* TITLE */}
                <label htmlFor='title'>Question title <span className="text-orange-500 pl-1 text-lg">*</span></label>
                <input 
                id='title' 
                name='title' 
                type="text" 
                className={inputStyle} 
                placeholder="Be specific and image you asking a question to another person"/>

                {/* DESCRIPTION */}
                <label htmlFor='description'>Question description<span className="text-orange-500 pl-1 text-lg">*</span></label>
                <input 
                    type="text"
                    id='description' 
                    name='description' 
                    className={inputStyle} 
                    placeholder="Describre your problem here" />


                {/* TAGS */}
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
                            <p key={e} className={`text-[10px] text-(--username-color) bg-(--secondary-button) py-2 px-4 rounded-2xl 
                            cursor-pointer`} onClick={() => dispatch({type: "removeTag", tag: e})}>
                                {e}
                            </p>
                        ))
                    }

                </div>

                {/* CODE */}
                <div className="flex justify-between items-center py-5">
                    <label  className='mb-2'>Code (optional)</label>
                    <button className={`bg-(--secondary-button) hover:bg-(--secondary-button-hover) px-3 py-3 cursor-pointer rounded-md 
                    text-xs flex gap-2 items-center`} type='button' onClick={()=> dispatch({type: "language", language: "html"})}>
                        <p className="text-xs">{state.language}</p>
                        
                        <Image
                            src="/icons/general/select.svg" 
                            alt="Search Icon" 
                            width={13}
                            height={13}/>
                    </button>
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
                
                <div className='w-full flex justify-end mt-5'>
                    <button className={`text-white bg-linear-to-r from-(--primary-color-button) 
                    to-(--secondary-color-button) px-5 py-2 rounded-md cursor-pointer text-sm`}>Confirm</button>
                </div>
            </form>
        </div>
    )
}