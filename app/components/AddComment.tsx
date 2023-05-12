'use client'

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"

type PostProp={
    id?:string
}

type Comment={
    postId?:string
    title:string
}

export default function AddComment({ id }:PostProp ) {
    const [title,setTitle]=useState("")
    const [isDisabled,setIsDisabled]=useState(false)
    const queryClient = useQueryClient()
    let commentToastId: string
    
    const {mutate} = useMutation(
        async (data:Comment) => axios.post('/api/posts/addComment',{data}),
        {
            onSuccess: data => {
                setTitle("")
                setIsDisabled(false)
                queryClient.invalidateQueries(["detail-post"])
                toast.success("เพิ่มความคิดเห็นสำเร็จ",{id: commentToastId})
            },
            onError: (error) => {
                setIsDisabled(false)
                if (error instanceof AxiosError) {
                    toast.error(error?.response?.data.message, { id: commentToastId })
                  }
            }
        }
    )

    const submitComment = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsDisabled(true)
        commentToastId = toast.loading("เพิ่มความคิดเห็นของคุณ", {id: commentToastId})
        mutate({ title, postId: id })
      }
  
    return (
        <form onSubmit={submitComment} className="flex-1 px-8">
          <h3 className="text-sm font-bold px-1 text-black">เพิ่มความคิดเห็น</h3>
          <div className="flex flex-col my-2">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          name="title"
          className="w-full h-30 w-30 p-4 text-lg rounded-md my-2 bg-gray-300"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          disabled={isDisabled}
          className=" text-sm bg-orange-400 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit"
        >
          ส่ง
        </button>
        <p
          className={`font-bold text-sm  ${
            title.length > 250 ? "text-red-700" : "text-black"
          } `}
        >{`${title.length}/250`}</p>
      </div>
        </form>
      )
    }
    
