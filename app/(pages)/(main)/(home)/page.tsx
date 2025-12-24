import { AskAQuestion } from "@/components/buttons/askQuesion";
import { HomePosts } from "@/components/posts/homePosts";
import Image from "next/image";

export default  function Home() {
  return (
    <div className="w-full h-full pt-5 pr-10 flex flex-col overflow-y-auto">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold ">All Questions</h1>

        <AskAQuestion />
      </div>

      <form className="w-full h-13 relative rounded-lg mt-10 mb-5 border border-gray-400">
          <Image
              src="/icons/general/search.svg" 
              alt="Search Icon" 
              width={16}
              height={16} 
              className="absolute top-1/2 left-4 -translate-y-1/2"/>

          <input 
              type="text" 
              placeholder="Search anything globally..." 
              className="w-full h-full px-11 text-xs outline-none" />
      </form>

      <div className="flex gap-5 mb-5">
        <p className={`text-xs text-(--username-color) bg-(--secondary-button) py-2 px-3 rounded-md
              cursor-pointer`}>All</p>

        <p className={`text-xs text-(--username-color) bg-(--secondary-button) py-2 px-3 rounded-md
              cursor-pointer`}>Answered</p>

         <p className={`text-xs text-(--username-color) bg-(--secondary-button) py-2 px-3 rounded-md
              cursor-pointer`}>Unanswered</p>
      </div>

      <HomePosts/>
    </div>
  );
}
