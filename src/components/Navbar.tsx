import { Home, Trophy, BookOpen, Laptop, Mic, UserCircleIcon } from "lucide-react";
// import NavbarLink from "./NavbarLink";
import logo from "../assets/logo-full.png"; 
import { NavLink } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  // const navigate = useNavigate();
    
    const menuItems = [
        { label: "Beranda", href: "/", icon: <Home size={18} /> },
        { label: "Competition", href: "/competition", icon: <Trophy size={18} /> },
        { label: "Seminar", href: "/seminar", icon: <BookOpen size={18} /> },
        { label: "Workshop", href: "/workshop", icon: <Laptop size={18} /> },
        { label: "Talkshow", href: "/talkshow", icon: <Mic size={18} /> },
        { label: "Login", href: "/register", icon: <UserCircleIcon size={18} /> }
  ];
  const activeStyle = "bg-red-100 text-red-900";
  const defaultStyle = "text-gray-600 hover:text-red-900";

  return (
    <header className="sticky top-0 bg-white z-50 px-6 py-2">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <img src={logo} alt="logo" className="h-16" />

        <div className="flex gap-2">
          {menuItems.map((item) => (
             <NavLink
            to={item.href}
            className={({isActive}) => 
            `flex items-center gap-2 px-4 py-2 font-medium transition-all
            duration-200 ${isActive ? activeStyle : defaultStyle
                }`}
        >
            {item.icon && <span className="w-5 h-5">{item.icon}</span>}
            <span>{item.label}</span>
        </NavLink>
          ))}
        </div>

      </div>
    </header>
  );
};

export default Navbar;