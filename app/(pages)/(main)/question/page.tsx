import { PostFormComponent } from "@/components/posts/postFormComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ask a Question – Code Nest",
  description:
    "Create a new question and get help from the developer community.",
  robots: {
    index: false,
    follow: true,
  },
};


export default function Question(){
    
    return (
        <PostFormComponent />
    )
}