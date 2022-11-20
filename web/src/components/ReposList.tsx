import { useState } from "react"
import { Repo } from "../types/common"
import { get, set } from 'idb-keyval';


export default function ReposList() {
    let [repos, setRepos] = useState(Array<Repo>)

    get("repositories").then(val => {
        if (val == undefined) {
            set("repositories", [])
            setRepos([])
        }
        setRepos(val)
    })


    return (
        <div className="flex flex-col gap-3">
            {repos.map((repo, idx) => (
                <RepoItem key={idx} {...repo} />
            ))}
        </div>
    )
}

function RepoItem({ Name, Slug, CreatedAt }: Repo) {
    return (
        <div className="w-full p-2 border border-gray-200 transition hover:bg-gray-300 hover:text-zinc-800  mx-auto rounded">
            {Name}
        </div>
    )
}