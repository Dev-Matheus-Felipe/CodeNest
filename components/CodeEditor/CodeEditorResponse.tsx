"use client"

import { useState } from "react"
import { ResponseTpe } from "../posts/response"
import { CodeEditorComponent } from "./CodeEditorComponent"

export function CodeEditorResponse({response} : {response: ResponseTpe}){
    const [state, setState] = useState(false);
    return  (
        <>
            <div className="profile:text-[17px] text-xs pb-5 flex justify-between ">
                <h1>{response.content} </h1>
                {
                    response.code && 
                        <p 
                            onClick={() => setState(prev => !prev)} 
                            className="text-md bg-(--secondary-button) w-7 h-7 rounded-md flex items-center justify-center">
                            {state ? "+" : "-"}
                        </p>
                }
            </div> 
            {
                (response.code && !state)  &&
                    <CodeEditorComponent post={response} />
            }
        </>
    )
    
}