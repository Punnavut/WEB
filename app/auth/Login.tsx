"use client"

import { signIn } from "next-auth/react"


export default function Login() {
  return (
    <li className="list-none">
      <button 
      onClick={()=> signIn()}className="text-sm bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded-xl disabled:opacity-25"
      >
        เข้าสู่ระบบ
      </button>
    </li>
  )
}
