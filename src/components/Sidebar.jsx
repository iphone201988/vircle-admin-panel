import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Home,
  GroupIcon,
  Brain,
  Users,
  LogOut,
  SmartphoneNfc
} from "lucide-react";

const Sidebar = ({ onClose }) => {
  const location = useLocation();
  const pathname = location.pathname;
 const handleLinkClick = () => {
    if (onClose) onClose();
  };
  const navItems = [
    {
      title: "Dashboard",
      to: "/dashboard",
      icon: <Home className="mr-2 h-4 w-4" />,
    },
    {
      title: "Users",
      to: "/dashboard/users",
      icon: <Users className="mr-2 h-4 w-4" />,
    },
    {
      title: "Ai Contacts",
      to: "/dashboard/AiContact",
      icon: <Brain className="mr-2 h-4 w-4" />,
    },
    {
      title: "Contacs",
      to: "/dashboard/Contact",
      icon: <SmartphoneNfc className="mr-2 h-4 w-4" />,
    },
    // {
    //   title: "Settings",
    //   to: "/settings",
    //   icon: <Settings className="mr-2 h-4 w-4" />,
    // },
  ];

 const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="flex h-full flex-col justify-between py-4 bg-gray-900 text-white">
      <div className="px-4">
        <h2 className="mb-6 text-xl font-semibold tracking-tight">
          Vircle
        </h2>
        <div className="space-y-2">
          {navItems.map((item) => (
            <Link
              onClick={handleLinkClick}
              key={item.to}
              to={item.to}
              className={`flex items-center w-full px-4 py-2 rounded-md transition ${
                pathname === item.to
                  ? "bg-purple-700 text-white"
                  : "hover:bg-purple-600"
              }`}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="px-4">
        <Link
         onClick={() => handleLogout()}
          className="flex items-center w-full px-4 py-2 rounded-md border border-white hover:bg-red-600 transition"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
