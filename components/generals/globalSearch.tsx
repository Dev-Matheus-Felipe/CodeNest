import Image from "next/image";

export function GlobalSearch(){
    return (
        <form className="bg-(--secondary-button) w-110 h-11 relative rounded-lg hidden md:block">
            <Image
                src="/icons/general/search.svg" 
                alt="Search Icon" 
                width={16}
                height={16} 
                className="absolute top-1/2 left-4 -translate-y-1/2"/>

            <input 
                type="text" 
                name="search"
                id="search"
                placeholder="Search anything globally..." 
                className="w-full h-full px-11 text-xs outline-none" />
        </form>
    )
}