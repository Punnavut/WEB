import Link from "next/link"
import Login from "./Login"
import Logout from "./Logout"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../pages/api/auth/[...nextauth]"

export default async function Nav() {
    const session = await getServerSession(authOptions)
    
    return ( 
        <nav className="flex justify-between item-ccenter py-5 px-5">
            <Link href={"/"}>
                <h1 className="bg-orange-600 rounded-md text-white font-bold text-7xl cursor-pointer">TALK.com</h1>
            </Link>
            <ul className="flex item-center gap-5 ">
                {!session?.user &&  <Login /> }
                {session?.user &&   <Logout image={session.user?.image || ''}/>}   
            </ul>
            </nav>
    )
}