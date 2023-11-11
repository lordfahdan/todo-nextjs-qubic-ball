import { UserType } from "@/interfaces/user";
import { FcBusinessContact } from "react-icons/fc";

export default function Navbar({user}: {user: UserType | undefined}) {
  
  return (
    <nav className="py-4 px-8 w-full shadow-md shadow-gray-900 bg-gray-950 flex items-center">
      <FcBusinessContact className="text-lg lg:text-3xl fill-white mr-4" />
      <h1 className="text-lg lg:text-3xl capitalize">
        {user?.name && `${user?.name}'s Todo`}
      </h1>
    </nav>
  )
}