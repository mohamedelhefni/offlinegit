import { Repo } from "../types/common";

export function createNewRepo(url: string, hash: string): Repo {
    let repo: Repo;
    let parts = url.split("/")
    let slug = parts[parts.length - 1]
    slug = slug.substring(0, slug.length - 4) // remove .git at end of url
    let name = slug.replaceAll("-", " ")
    repo = {
        url: url,
        name: name,
        slug: hash,
        createdAt: Date.now()
    }
    return repo
}