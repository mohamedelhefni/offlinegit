import { get, set } from "idb-keyval"
import { useState } from "react"
import { Repo } from "../types/common"


interface RepoListProps {
    repos: Array<Repo>
}

export default function ReposList({ repos }: RepoListProps) {

    return (
        <div className="flex flex-col gap-3">
            {repos.map((repo, idx) => (
                <RepoItem key={idx} {...repo} />
            ))}
        </div>
    )
}

function deleteRepo(Name: string): void {
    get("repositories").then((val: Array<Repo>) => {
        val = val.filter(v => v.Name != Name)
        set("repositories", val)
    })
}

function RepoItem({ Name, Slug, CreatedAt }: Repo) {
    return (
        <div onDoubleClick={() => { deleteRepo(Name) }} className="w-full p-2 border border-gray-200 transition hover:bg-gray-300 hover:text-zinc-800  mx-auto rounded select-none cursor-pointer">
            {Name}
        </div>
    )
}