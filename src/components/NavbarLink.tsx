import { Link } from "react-router-dom";

interface NavLinkProps {
  label: string;
  href: string;
  icon?: React.ReactNode;
  isActive?: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({
  label,
  href,
  icon,
  isActive = false,
}) => {
  const baseStyle = "flex items-center gap-2 px-4 py-2 rounded-md transition";
  const activeStyle = "bg-red-100 text-red-900";
  const defaultStyle = "text-gray-600 hover:text-red-900";

  return (
    <Link
      to={href}
      className={`${baseStyle} ${isActive ? activeStyle : defaultStyle}`}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      <span>{label}</span>
    </Link>
  );
};

export default NavLink;