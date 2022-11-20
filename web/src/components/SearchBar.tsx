import React, { useState } from "react"
import { BiSearchAlt } from "react-icons/bi"

export default function SearchBar() {
    let [repoUrl, setRepoUrl] = useState("")

    function downloadRepo(e: React.SyntheticEvent): void {
        e.preventDefault()
    }


    return (
        <>
            <form className="flex items-center relative w-full " onSubmit={downloadRepo}>
                <input type="text" className=" w-full pl-11 p-2 px-4 rounded-md border  border-gray-300 text-lg bg-transparent  " placeholder="Repository Url" onChange={e => setRepoUrl(e.target.value)} />
                <button>
                    <BiSearchAlt className="absolute top-2.5 left-3" size={27} />
                </button>
            </form>
        </>
    )
}