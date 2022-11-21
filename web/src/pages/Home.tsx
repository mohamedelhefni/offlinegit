import { VscGithubAction } from "react-icons/vsc"
import { get, set } from 'idb-keyval';
import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import ReposList from '../components/ReposList'
import { Repo } from '../types/common'


export default function Home() {
    let [repos, setRepos] = useState<Array<Repo>>([])

    get("repositories").then(val => {
        if (val == undefined) {
            set("repositories", [])
        }
        setRepos(val)
    })


    return (
        <>
            <h1 className='text-5xl md:text-6xl my-5 text-center mx-auto font-bold flex items-center justify-center gap-2 '>
                <span>Offline Git</span>
                <VscGithubAction />
            </h1>
            <div className="flex flex-col gap-4 container mx-auto px-2 md:px-0">
                <div className="flex items-center justify-center">
                    <SearchBar setRepos={setRepos} />
                </div>

                <ReposList repos={repos} />

            </div>

        </>
    )
}