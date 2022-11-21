export interface Repo {
    url: string
    name: string
    slug: string
    createdAt: Number
}


export interface File {
    isDir: Boolean
    name: string
    path: string
    extension: string
    content: string
    childrens: File[]
}