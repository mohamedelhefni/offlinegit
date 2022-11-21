import { Repo } from "../types/common";

export function createNewRepo(url: string): Repo {
    let repo: Repo;
    let parts = url.split("/")
    let slug = parts[parts.length - 1]
    slug = slug.substring(0, slug.length - 4) // remove .git at end of url
    let name = slug.replaceAll("-", " ")
    repo = {
        Url: url,
        Name: name,
        Slug: slug,
        CreatedAt: Date.now()
    }
    return repo
}