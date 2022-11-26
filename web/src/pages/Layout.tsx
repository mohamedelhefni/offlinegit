import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="App container mx-auto">
            <Outlet />
            <Toaster
                position="bottom-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    // Define default options
                    className: '',
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },

                    // Default options for specific types
                    success: {
                        duration: 3000,
                        // @ts-ignore
                        theme: {
                            primary: 'green',
                            secondary: 'black',
                        },
                    },
                }}
            />
        </div>
    )
}