import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
export default function MainLayout() {
    return (
        <div className=" max-w-9xl min-h-screen flex flex-col justify-between">
            <Navbar/>

            <main className=" mx-auto">
                <Outlet/>
            </main>

            <footer className="p-4 bg-slate-100 text-center">
                &copy; 2026 Universitas Harkat Negeri

            </footer>
            
        </div>
    )
}