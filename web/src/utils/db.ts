import { get, set } from "idb-keyval"
import { File, Repo } from "../types/common"
import { createNewRepo } from "./repo"

export function addRepo(repo: Repo) {
    get('repositories').then((val: Array<Repo>) => {
        set('repositories', [...val, repo])
    })
}

export function initRepos() {
    set("repositories", [])
}

export function getRepos(): Promise<any> {
    return get("repositories")
}


export function storeRepo(hash: string, files: File[]): void {
    set(hash, files)
}

export function getRepo(hash: string): Promise<any> {
    return get(hash)
}


