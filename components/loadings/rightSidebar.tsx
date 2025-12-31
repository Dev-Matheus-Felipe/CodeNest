export default function RightSidebarLoading(){
    return(
        <div className="sidebar:flex flex-col m-5 mt-0 hidden col-span-1 bg-(--loading) items-center rounded-md p-5">
             <div className="w-full h-full bg-(--loading-layer) rounded-md" />
        </div>
    )
}