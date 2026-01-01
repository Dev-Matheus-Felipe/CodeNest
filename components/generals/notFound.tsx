import Image from "next/image";

export  function NotFound({data} : {data: string}){
    return (
        <div className="relative h-[calc(100vh-115px)] w-full">
            <Image 
                src="/generals/cloud.png" 
                alt="cloud icon" 
                width={350} 
                height={100} 
                className="absolute left-0 profile:top-30 top-60 profile:w-75 profile:h-100 w-50 h-70" />

            <Image 
                src="/generals/cat.png" 
                alt="cat icon" 
                width={350} 
                height={100} 
                className="absolute right-0 profile:-top-20 -top-10  profile:w-75 profile:h-100 w-65 h-75" />

            
            <p className={`absolute profile:top-[40%] top-[40%] left-[50%] translate-x-[-50%] text-orange-500 font-bold text-lg
            underline`}>
                {data}
            </p>
            
        </div>
    )
}