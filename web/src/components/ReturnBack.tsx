import { BiArrowBack } from "react-icons/bi"
import { useNavigate } from "react-router-dom"
export function Returnback() {
    const navigate = useNavigate()
    return (
        <span className="">
            <button onClick={() => navigate(-1)}>
                <BiArrowBack className=" border border-gray-300 rounded p-2 transition hover:bg-gray-300 hover:text-zinc-800 " size={40} />
            </button>
        </span>
    )
}