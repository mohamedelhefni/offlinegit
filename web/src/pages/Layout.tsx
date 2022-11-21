import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="App">
            <Outlet />
        </div>
    )
}