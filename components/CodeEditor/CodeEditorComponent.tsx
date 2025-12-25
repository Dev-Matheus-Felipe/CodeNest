"use client"

import CodeEditor from '@uiw/react-textarea-code-editor';
import { PostType } from '../posts/postInfo';
import { ResponseTpe } from '../posts/response';

export function CodeEditorComponent({post} : {post: PostType | ResponseTpe}){
    if(!post.code) return null;
    
    return (
        <div className='w-full max-h-100 bg-(--code-editor) flex items-center py-1'>
            <CodeEditor
                value={post.code}
                language={post.language}
                padding={20}
                className='h-full text-sm! rounded-md overflow-y-scroll! w-[99%] bg-(--code-editor)!' />
        </div>
    )
}