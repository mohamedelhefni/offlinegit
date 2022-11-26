import { TiWarning } from "react-icons/ti"
import React, { Dispatch, useState } from "react"
import toast from "react-hot-toast"
import { BiSearchAlt } from "react-icons/bi"
import { Repo } from "../types/common"
import { addRepo, storeFiles, storeRepo } from "../utils/db"
import { createNewRepo } from "../utils/repo"
import { isGitUrl } from "../utils/validation"


interface SearchBarProps {
    repos: Repo[]
    setRepos: Dispatch<React.SetStateAction<Repo[]>>
}



export default function SearchBar({ repos, setRepos }: SearchBarProps) {

    let [repoUrl, setRepoUrl] = useState<string>("")

    function downloadRepo(e: React.SyntheticEvent): void {
        e.preventDefault()
        if (!isGitUrl(repoUrl)) {
            toast.error("please enter valid git url")
            return
        }
        let repoExists = repos.some(repo => repo.url == repoUrl)
        if (repoExists) {
            toast('Repo Already exists',
                {
                    icon: <TiWarning color="yellow" size={25} />,
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            )
            return
        }
        const getRepoFiles = fetch(`${import.meta.env.VITE_API_URL}/repo`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: repoUrl })
        }).then(res => {
            if (res.status == 400) {
                throw new Error("something went wrong");
            }
            return res.json()
        }).then(async (data) => {
            let repo = createNewRepo(repoUrl, data.hash);
            setRepoUrl("")
            storeRepo(data.hash, data.data.files)
            await storeFiles(data.data.files)
            setRepos(old => [...old, repo])
            addRepo(repo)
        }).catch(err => {
            console.error(err)
        })

        toast.promise(getRepoFiles, {
            loading: "Getting the repo ⏳ ",
            success: "Repository Added Successfully",
            error: "something went wrong"
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