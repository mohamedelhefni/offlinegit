import { useEffect, useState } from "react";
import { useParams, redirect, useNavigate } from "react-router-dom";
import { getRepo } from "../utils/db";
import { FileRender } from "./FileRender";
import { FilesList } from "./FilesList";

export default function Repo() {
    const params = useParams()
    let [repoFiles, setRepoFiles] = useState<Array<File>>([])
    let [file, setFile] = useState<File>()
    let [isDir, setIsDir] = useState<Boolean>(false)
    const navigate = useNavigate()
    useEffect(() => {
        let pathParams = params['*'] ? '/' + params['*'] : '';
        let fullPath = String(params.repoId) + pathParams
        getRepo(String(fullPath)).then(data => {

            if (!data) {
                navigate("/")
            }

            if (data.isDir) {
                setIsDir(true)
                data.childrens.sort((x: any, y: any) => y.isDir ? 1 : -1)
                setRepoFiles(data.childrens)
            } else {
                setIsDir(false)
                setFile(data)
            }

        })

    }, [params, isDir])


    return (
        <div>

            {/* @ts-ignore  */}
            {isDir ? <FilesList files={repoFiles} /> : <FileRender file={file} />}
        </div>
    );
}
