import {BiSearchAlt} from "react-icons/bi"

export default function SearchBar() {
    return (
        <div className="flex items-center relative w-full ">
            <input type="text" className=" w-full pl-11 p-2 px-4 rounded-md border  border-gray-300 text-lg bg-transparent  " placeholder="Repository Url" />
            <BiSearchAlt className="absolute left-3" size={27} />
        </div>
    )
}