import { Outlet, useNavigate, Link } from "react-router-dom";
// import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/useAuthStore";
import { LayoutDashboard, User, List,AwardIcon, Users} from "lucide-react";

export default function DashboardLayout(){
    const logout = useAuthStore ((state) => state.logout);
    const navigate = useNavigate()

    const handleLogout = () => {
        logout();

        navigate("/login")
    };
    return (
        <div className="flex w-full min-h-screen">
            <div className="bg-pink-500/30 w-64  flex flex-col justify-between p-4 sticky top-0 h-screen">
                
                <div>
                    <h1 className="text-xl font-bold text-center ">Dashboard</h1>
                </div>
                <div>
                        <ul className=" justify-between flex flex-col p-5 text-lg gap-6 w-full">
                            <li className="flex items-center gap-3 hover:text-red-600 transition">
                                <LayoutDashboard size={20} />
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                            <li className="flex items-center gap-3 hover:text-red-600 transition">
                                <User size={20} />
                                <Link to="/dashboard/biodata">Biodata</Link>
                            </li>
                            <li className="flex items-center gap-3 hover:text-red-600 transition">
                                <Users size={20} />
                                <Link to="/dashboard/pembicara">Pembicara</Link>
                            </li>
                            <li className="flex items-center gap-3 hover:text-red-600 transition">
                                <List size={20} />
                                <Link to="/dashboard/category">Category</Link>
                            </li>
                            <li className="flex items-center gap-3 hover:text-red-600 transition">
                                   <AwardIcon size = {20}/> 
                                     <Link to="/dashboard/event">Event</Link>
                            </li>
                        </ul>
                </div>
                <div>
                    <button onClick={handleLogout} type="button" className="w-30 p-4 bg-red-600 text-white rounded-xl cursor-pointer hover:bg-red-950">LogOut</button>
                </div>
            </div>
            <div className="flex-1 min-h-screen p-6 overflow-x-hidden">
                <Outlet />
            </div>

        </div>
    )
}