export function MainLoading(){
    return (
         <div className="w-[90%] m-auto h-[calc(100vh-120px)] p-[2%] pt-5 px-10 grid grid-cols-1  bg-(--loading) rounded-md">
            <div className="w-full h-30 bg-(--loading-layer) rounded-md" />
            <div className="w-full h-100 bg-(--loading-layer) rounded-md" />
         </div>
    )
}