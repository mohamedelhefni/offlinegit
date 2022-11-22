import { get, set } from "idb-keyval"
import { json } from "react-router-dom"
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

export function storeFiles(files: File[]) {
    files.forEach(file => {
        if (file.isDir) {
            storeFiles(file.childrens)
            const dir = JSON.parse(JSON.stringify(file))
            dir.childrens = dir.childrens.map((f: File) => {
                f.content = ""
                return f
            })
            set(file.path, dir)
        } else {
            set(file.path, file)
        }
    })
}


export function storeRepo(hash: string, files: File[]): void {

    let dir = JSON.parse(JSON.stringify(files))
    dir.isDir = true
    dir.childrens = dir.map((f: File) => {
        f.childrens = []
        f.content = ""
        return f
    })
    set(hash, dir)
}

export function getRepo(hash: string): Promise<any> {
    return get(hash)
}


