"use client"

import { ResponseGeneralType } from '@/lib/types/response';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { UniquePost } from '@/lib/types/uniquePost';

export function CodeEditorComponent({post} : {post: UniquePost | ResponseGeneralType}){
    if(!post.code) return null;
    
    return (
        <div className='w-full min-h-100 bg-(--code-editor) flex items-center py-1'>
            <CodeEditor
                value={post.code}
                language={post.language}
                padding={20}
                className='h-full text-sm! rounded-md overflow-y-scroll! w-[99%] bg-(--code-editor)!' />
        </div>
    )
}