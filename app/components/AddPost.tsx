"use client"

import {useState} from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { Axios, AxiosError } from "axios"
import toast from "react-hot-toast"


export default function CreatePost() {
    const [title, setTitle] = useState("")
    const [isDisabled , setIsDisabled] = useState(false)
    const QueryClient = useQueryClient()

    let toastPostID:string


    const {mutate} = useMutation(
    async(title:string)=> await axios.post("/api/posts/addPost", {title}),
    {
      onError:(error)=>{
        if(error instanceof AxiosError){
        toast.error(error?.response?.data.message,{id:toastPostID})
      }
        setIsDisabled(false)
        
      },
      onSuccess:(data)=>{
        toast.success("โพสต์สำเร็จ",{id:toastPostID})
        QueryClient.invalidateQueries(["posts"])
        setTitle("")
        setIsDisabled(false)
        
      },
    }
   )

    const submitPost = async(e:React.FormEvent)=>{
        e.preventDefault()
        toastPostID = toast.loading("กำลังโพสต์...",{duration:1000})
        setIsDisabled(true)
        mutate(title) 
  
    }

  return (
        <form onSubmit={submitPost} className="py-2 px-1  ">
        <div className="flex-1 py-5 px-5">
    <textarea
      onChange={(e) => setTitle(e.target.value)}
      name="title"
      value={title}
      placeholder="สื่อสารกันเถอะ..."
      className="w-full h-32 p-4 text-lg rounded-md my-2 bg-gray-300"
    ></textarea>
  </div>
  <div className="ml-9 flex justify-between gap-2">
    <p className={`font-bold text-sm ${
      title.length>250 ? "text-red-500":"text-gray-700"}`}
      >{`${title.length}/250`}</p>
    <button
      disabled={isDisabled}
      className="text-sm bg-orange-400 hover:bg-orange-200 mx- text-white py-2 px-10 rounded-xl disabled:opacity-25"
      type="submit"
      
    >
      โพสต์
    </button>
  </div>
</form>
    )
}
