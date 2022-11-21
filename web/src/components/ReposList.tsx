import { get, set } from "idb-keyval"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Repo } from "../types/common"


interface RepoListProps {
    repos: Array<Repo>
}

export default function ReposList({ repos }: RepoListProps) {

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
            {repos.map((repo, idx) => (
                <RepoItem key={idx} {...repo} />
            ))}
        </div>
    )
}

function deleteRepo(Name: string): void {
    get("repositories").then((val: Array<Repo>) => {
        val = val.filter(v => v.name != Name)
        set("repositories", val)
    })
}

function RepoItem({ name, slug, createdAt }: Repo) {
    return (

        <Link to={"/repo/" + slug} className="" >
            <div onDoubleClick={() => { deleteRepo(name) }} className="w-full p-2 border border-gray-200 transition hover:bg-gray-300 hover:text-zinc-800  mx-auto rounded select-none cursor-pointer">
                {name}
            </div>
        </Link>
    )
}