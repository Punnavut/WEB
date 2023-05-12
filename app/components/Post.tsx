'use client'
import Image from "next/image"
import Link from "next/link"

export default function Post({avatar,name,postTitle,id,comments}) {
  
    return (
        <div className=" my-3 p-8 rounded-lg">
        <div className=" flex items-center gap-2">
          <Image
            className="rounded-full"
            width={50}
            height={50}
            src={avatar}
            alt="avatar"
            />
         <h3 className=" text-black">{name}</h3>
            </div>
            <div className="h-32 p-4 text-sm/[16px] rounded-md my-2 bg-gray-200 ">
            <p className="break-all">{postTitle}</p>
          </div>
          <div className ="flex gap-4 cursor-pointer item-center">
            <Link href= {`/post/${id}`}>
                <p className ="text-sm font-bold px-3 text-black">
                  {comments?.length} ความคิดเห็น
                  </p>
            </Link>
          </div>
          </div>
    )
}