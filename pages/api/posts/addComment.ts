import type { NextApiRequest,NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import prisma from "../../../prisma/client"

export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
    ){
    if(req.method === "POST"){
        const session = await getServerSession(req,res,authOptions)
        if(!session) return res.status(401).json({message: "ล็อกอินก่อนนะครับ"})

        const prismaUser = await prisma.user.findUnique({
            where:{email:session?.user?.email},
        })

        try{
            const { title ,postId} = req.body.data

            if(!title.lenght){
                return res.status(401).json({message:"ใส่ความคิดเห็นก่อนค้าบ"})
            }

            const result = await prisma.comment.create({
               data :{
                message:title,
                userId:prismaUser?.id,
                postId,
               },
        })
        res.status(200).json(result)
        }catch(err){
            res.status(403).json({err:"เกิดข้อผิดพลาดขณะทำการโพสต์"})       
        }
    }
}