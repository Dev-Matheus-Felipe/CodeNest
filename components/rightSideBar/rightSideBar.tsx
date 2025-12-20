export default function RightSideBar(){
    return (
        <aside className="sidebar:flex flex-col gap-15 p-4 hidden col-span-1">
            <div className="flex flex-col">
                <h1 className="text-lg">Top Questions</h1>

                <div className="flex mt-10 gap-5 cursor-pointer h-auto w-full items-center">
                    <p className="xl:text-xs text-[10px] w-[75%]">Best practing for fetching data in a Next.js application with Server Components</p>
                    <p >{`>`}</p>
                </div>

                <div className="flex mt-10 gap-5 cursor-pointer h-auto w-full items-center">
                    <p className="xl:text-xs text-[10px] w-[75%]">How does CacheComponents from Next.js 16 work?</p>
                    <p >{`>`}</p>
                </div>

                <div className="flex mt-10 gap-5 cursor-pointer h-auto w-full items-center">
                    <p className="xl:text-xs text-[10px] w-[75%]">Ways to cache data with Next.Js 16</p>
                    <p>{`>`}</p>
                </div>

                <div className="flex mt-10 gap-5 cursor-pointer h-auto w- items-center">
                    <p className="xl:text-xs text-[10px] w-[75%]">What exactly is React Compiler?</p>
                    <p >{`>`}</p>
                </div>
            </div>

            <div>
                <h1>Popular Tags</h1>

                <div className="flex w-full justify-between items-center mt-5">
                    <p className="text-[10px] text-(--username-color) bg-(--secondary-button) py-2 px-4 rounded-2xl cursor-pointer">
                        NEXT JS
                    </p>

                    <p className="w-[19%] text-sm">4</p>
                </div>

                <div className="flex w-full justify-between items-center mt-5">
                    <p className="text-[10px] text-(--username-color) bg-(--secondary-button) py-2 px-4 rounded-2xl cursor-pointer">
                        REACT JS
                    </p>

                    <p className="w-[19%] text-sm">2</p>
                </div>

                <div className="flex w-full justify-between items-center mt-5">
                    <p className="text-[10px] text-(--username-color) bg-(--secondary-button) py-2 px-4 rounded-2xl cursor-pointer">
                        JAVASCRPIT
                    </p>

                    <p className="w-[19%] text-sm">2</p>
                </div>

                <div className="flex w-full justify-between items-center mt-5">
                    <p className="text-[10px] text-(--username-color) bg-(--secondary-button) py-2 px-4 rounded-2xl cursor-pointer">
                        CSS
                    </p>

                    <p className="w-[19%] text-sm">1</p>
                </div>
                
            </div>
        </aside>
    )
}