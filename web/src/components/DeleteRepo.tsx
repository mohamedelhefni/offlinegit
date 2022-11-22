import toast from "react-hot-toast";
import { BiTrash } from "react-icons/bi";
import { redirect, useNavigate } from "react-router-dom";
import { deleteRepo } from "../utils/db";

interface DeleteRepoProps {
    repoId: string
}
export function DeleteRepo({ repoId }: DeleteRepoProps) {

    const navigate = useNavigate()

    async function deleteCurrentRepo(hash: String) {
        const toastId = toast.loading("Deleting Repo")

        await deleteRepo(hash)
        navigate("/")
        toast.dismiss(toastId)
        toast.success("Repo deleted successfully")
    }

    return (

        <div onClick={() => { deleteCurrentRepo(repoId) }} className="delete">
            <BiTrash className="transition text-red-500 hover:bg-red-50  cursor-pointer p-2 rounded " size={40} />
        </div>
    )
}

