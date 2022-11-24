import { useEffect, useState } from "react"
import ReactMarkdown from 'react-markdown'
import { FcFile, FcFolder } from "react-icons/fc"
import { Link, useParams } from "react-router-dom"
import { File } from "../types/common"
import { getFile } from "../utils/db"
import { DeleteRepo } from "./DeleteRepo"
import { Returnback } from "./ReturnBack"

interface FilesListProps {
    files: Array<File>
}

export function FilesList({ files }: FilesListProps) {
    const params = useParams()
    const [hasReadme, setHasReadme] = useState(false)
    const [readme, setReadme] = useState<File>()
    const readmeFile = files.find(file => file.name.toUpperCase() == "README.MD")


    useEffect(() => {
        if (readmeFile) {
            setHasReadme(true)
            getFile(readmeFile.path).then((data: File) => {
                setReadme(data)
            })
        } else {
            setHasReadme(false)
        }
    }, [params, files])


    return (
        <div className="flex flex-col gap-3 my-5 px-2 md:px-0 ">
            <div className="flex items-cener justify-between">
                <Returnback />
                <DeleteRepo repoId={String(params.repoId)} />
            </div>
            <div className="flex flex-col  border border-gray-300 rounded  divide-y">
                {files.map((file: File) => (
                    <FileItem key={file.name} {...file} />
                ))}
            </div>
            {hasReadme && <RenderReadMe {...readme} />}
        </div>
    )
}

function FileItem({ name, isDir, path }: File) {
    return (
        <Link to={"/repo/" + path} className="file p-2 cursor-pointer transition hover:bg-gray-300 hover:text-zinc-800  ">
            <div className="flex items-center gap-2 ">
                {isDir ? <FcFolder /> : <FcFile />}
                <span>{name}</span>
            </div>
        </Link>
    )
}

function RenderReadMe({ content }: File) {
    return (
        <div className="w-full mt-3 p-6 rounded border border-gray-300">
            <div className="prose lg:prose-xl prose-invert ">
                <ReactMarkdown>
                    {content}
                </ReactMarkdown>
            </div>

        </div>
    )
}
