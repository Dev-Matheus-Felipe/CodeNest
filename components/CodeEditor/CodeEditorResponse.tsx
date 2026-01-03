"use client"

import { ResponseGeneralType } from "@/lib/types/response";
import { CodeEditorComponent } from "./CodeEditorComponent"
import { useState } from "react"

export function CodeEditorResponse({response} : {response: ResponseGeneralType}){
    const [state, setState] = useState<boolean>(true);
    return  (
        <>
            <div className="profile:text-sm text-xs pt-3 flex justify-between ">
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

            { (response.code && !state)  &&
                <CodeEditorComponent post={response} /> }
        </>
    )
    
}