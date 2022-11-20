import { get, set } from "idb-keyval"
import React, { Dispatch, useState } from "react"
import { BiSearchAlt } from "react-icons/bi"
import { Repo } from "../types/common"


interface SearchBarProps {
    setRepos: Dispatch<React.SetStateAction<Repo[]>>
}



export default function SearchBar({ setRepos }: SearchBarProps) {

    let [repoUrl, setRepoUrl] = useState<string>("")

    function downloadRepo(e: React.SyntheticEvent): void {
        e.preventDefault()
        setRepos(old => [...old, { Name: repoUrl, Slug: "test-slug", CreatedAt: Date.now() }])
        get('repositories').then(val => {
            console.log(val)
            set('repositories', [...val, { Name: repoUrl }])
        })
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