import { BiArrowBack, BiFile, BiFolder } from "react-icons/bi"
import { FcFile, FcFolder } from "react-icons/fc"
import { Link } from "react-router-dom"
import { File } from "../types/common"

interface FilesListProps {
    files: Array<File>
}
export function FilesList({ files }: FilesListProps) {
    return (
        <div className="flex flex-col gap-3 my-5">
            <span className="">
                <Link to="/">
                    <BiArrowBack className=" border border-gray-300 rounded p-2 transition hover:bg-gray-300 hover:text-zinc-800 " size={40} />
                </Link>
            </span>
            <div className="flex flex-col  border border-gray-300 rounded  divide-y">
                {files.map((file: File) => (
                    <FileItem key={file.name} {...file} />
                ))}
            </div>
        </div>
    )
}

function FileItem({ name, isDir }: File) {
    return (
        <div className="file p-2 cursor-pointer transition hover:bg-gray-300 hover:text-zinc-800  ">
            <div className="flex items-center gap-2 ">
                {isDir ? <FcFolder /> : <FcFile />}
                <span>{name}</span>
            </div>
        </div>
    )
}