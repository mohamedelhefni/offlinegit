import { get, set } from "idb-keyval"
import React, { Dispatch, useState } from "react"
import toast from "react-hot-toast"
import { BiSearchAlt } from "react-icons/bi"
import { Repo } from "../types/common"
import { addRepo, storeRepo } from "../utils/db"
import { createNewRepo } from "../utils/repo"
import { isGitUrl } from "../utils/validation"


interface SearchBarProps {
    setRepos: Dispatch<React.SetStateAction<Repo[]>>
}



export default function SearchBar({ setRepos }: SearchBarProps) {

    let [repoUrl, setRepoUrl] = useState<string>("")

    function downloadRepo(e: React.SyntheticEvent): void {
        e.preventDefault()
        if (!isGitUrl(repoUrl)) {
            toast.error("please enter valid git url")
            return
        }
        const toastLoading = toast.loading("Getting the repo ⏳ ")
        fetch(`${import.meta.env.VITE_API_URL}/repo`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: repoUrl })
        }).then(res => res.json()).then(data => {
            let repo = createNewRepo(repoUrl, data.hash);
            setRepos(old => [...old, repo])
            addRepo(repo)
            setRepoUrl("")
            storeRepo(data.hash, data.data.files)
            toast.success("Repository Added Successfully")
            toast.dismiss(toastLoading)
        }).catch(err => {
            console.error(err)
            toast.error("something went wrong")
            toast.dismiss(toastLoading)
        })
    }


    return (
        <>
            <form className="flex items-center relative w-full " onSubmit={downloadRepo}>
                <input type="text" className=" w-full pl-11 p-2 px-4 rounded-md border  border-gray-300 text-lg bg-transparent  " placeholder="Repository Url" value={repoUrl} onChange={e => setRepoUrl(e.target.value)} />
                <button>
                    <BiSearchAlt className="absolute top-2.5 left-3" size={27} />
                </button>
            </form>
        </>
    )
}