import { del, get, set } from "idb-keyval"
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

export async function storeFiles(files: File[]) {
    await Promise.all(files.map(async (file) => {
        if (file.isDir) {
            storeFiles(file.childrens)
            const dir = JSON.parse(JSON.stringify(file))
            dir.childrens = dir.childrens.map((f: File) => {
                f.content = ""
                f.childrens = []
                return f
            })
            await set(file.path, dir)
        } else {
            await set(file.path, file)
        }
    })
    )
}


export function storeRepo(hash: string, files: File[]): void {

    let dir = JSON.parse(JSON.stringify(files))
    dir.isDir = true
    dir.childrens = dir.map((f: File) => {
        f.content = ""
        f.childrens = []
        return f
    })
    set(hash, dir)
}
function deleteFiles(files: File[]) {
    return Promise.all(files.map(async (file: File) => {
        if (file.isDir) {
            await del(file.path)
            deleteFiles(file.childrens)
        } else {
            await del(file.path)
        }
    }))
}

export async function deleteRepo(hash: String): Promise<any> {
    const files = await getRepo(String(hash))
    await deleteFiles(files)
    del(String(hash))
    get('repositories').then((val: Array<Repo>) => {
        let newRepos = val.filter(v => v.slug != hash)
        set('repositories', [...newRepos])
    })
}

export function getRepo(hash: string): Promise<any> {
    return get(hash)
}

export function getFile(path: string): Promise<any> {
    return get(path)
}




