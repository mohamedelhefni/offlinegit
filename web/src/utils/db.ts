import { get, set } from "idb-keyval"
import { Repo } from "../types/common"
import { createNewRepo } from "./repo"

export function addRepo(repo: Repo) {
    get('repositories').then((val: Array<Repo>) => {
        set('repositories', [...val, repo])
    })
}

export function getRepos(): Promise<any> {
    return get("repositories")
}