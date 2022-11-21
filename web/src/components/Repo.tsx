import { useEffect, useState } from "react";
import { useParams, redirect } from "react-router-dom";
import { getRepo } from "../utils/db";
import { FilesList } from "./FilesList";

export default function Note() {
    const params = useParams()
    let [repoFiles, setRepoFiles] = useState<Array<File>>([])
    useEffect(() => {
        getRepo(String(params.repoId)).then(data => {
            if (!data) {
                // TODO: fix this bug
                return redirect("/") // didn't work
            }
            data.sort((x: any, y: any) => y.isDir ? 1 : -1)
            setRepoFiles(data)
        })

    }, [])


    return (
        <div>
            <FilesList files={repoFiles} />
        </div>
    );
}
