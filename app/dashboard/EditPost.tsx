"use client"

import Image from 'next/image'
import { useState } from 'react'
import Toggle from './Toggle'
import { useMutation, useQueryClient} from '@tanstack/react-query'
import axios from 'axios'
import  toast from 'react-hot-toast'

type EditProps = {
  id: string;
  avatar: string;
  name: string;
  title: string;
  comments?: {
    id: string;
    postId: string;
    userId: string;
  }[];
};

export default function EditPost({ avatar,name,title,comments,id 
}: EditProps) { 

  const [toggle,setToggle] = useState(false)
  let deleteToastID: string
  const queryClient = useQueryClient()


  const {mutate}= useMutation(
    async (id:string) => 
    await axios.delete("/api/posts/deletePost",{data:id}),
    {
      onError: (error) => {
        console.log(error)
        toast.error("ไม่สามารถลบโพสต์ได้",{id: deleteToastID})
    },
    onSuccess:(data)=>{
       toast.success("ลบโพสต์สำเร็จ",{id: deleteToastID})
       queryClient.invalidateQueries(["auth-posts"])
    },
   }
  )

  const deletePost = () => {
    deleteToastID = toast.loading("กำลังลบโพสต์...",{duration:1000})
    mutate(id)
  }
  return (
  <>
    <div className="bg-white my-8 p-8 rounded-lg">
      <div className="flex items-center gap-2">
        <Image className="rounded-full" width={40} height={40} src={avatar} alt="avatar" />
        <h3 className="font-bold text-black">{name}</h3>
      </div>
      <div className="h-32 p-4 text-sm/[16px] rounded-md my-2 bg-gray-200">
        <p className="break-all">{title}</p>
      </div>
      <div className="flex justify-between gap-4 cursor-pointer items-center">
        <p className="text-sm font-bold px-3 text-black">{comments?.length} ความคิดเห็น</p>
        <button onClick={(e)=> {
          setToggle(true)
        }} 
        className="text-sm font-bold text-red-500">ลบ</button>
      </div>
    </div>
      {toggle && <Toggle deletePost={deletePost} setToggle={setToggle}/>}
    </>
  );
}
