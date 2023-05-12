
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
        if(!session)
        return res.status(401).json({message: "ล็อกอินก่อนนะครับ"})

        const title:string=req.body.title

        
        const prismaUser = await prisma.user.findUnique({
            where: {email:session?.user?.email},
        })

    
        if(title.length>250){
        return res.status(403).json({message:"ห้ามเกิน 300 ตัวอักษรนะครับ"})
        }
        if(!title.length){
        return res.status(403).json({message:"ยังไม่มีข้อความนะครับ"})
        }

        try{
            const result = await prisma.post.create({
                data:{
                    title,
                    userId:prismaUser.id,
                },
            })
            res.status(200).json(result)
        }catch(err){
            res.status(403).json({err:"เกิดข้อผิดพลาดขณะทำการโพสต์"})
            
        }
    }
    
}