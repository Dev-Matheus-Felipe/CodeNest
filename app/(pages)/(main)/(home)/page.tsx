import { AskAQuestion } from "@/components/buttons/askQuesion";
import { HomePosts } from "@/components/posts/homePosts";
import Image from "next/image";

export default  function Home() {
  const tagStyles = "text-xs text-(--username-color) bg-(--secondary-button) py-2 px-3 rounded-lg cursor-pointer";
  
  return (
    <div className="w-full h-[calc(100vh-120px)] p-[2%] pt-5 pr-10 grid grid-cols-1 grid-rows-[auto_1fr]">
      
        <div className=" col-span-1 row-span-1">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold ">All Questions</h1>
            <AskAQuestion />
          </div>

          <form className="w-full h-13 relative rounded-lg mt-10 mb-5 border border-(--secondary-button-hover)">
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
                  placeholder="Search for questions here" 
                  className="w-full h-full px-11 text-xs outline-none" />
          </form>

          <div className="flex gap-5 mb-5">
              <p className={tagStyles}>All</p>

              <p className={tagStyles}>Answered</p>

              <p className={tagStyles}>Unanswered</p>
          </div>
        </div>

        <div className="overflow-y-auto!">
          <HomePosts />
        </div>
    </div>
  );
}
