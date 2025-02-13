import {
  Home,
  Users,
  Settings,
  Mail,
  Bell,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}) => {
  const location = useLocation();

  const menuItems = [
    { title: "Dashboard", icon: <Home className="w-5 h-5" />, path: "" },
    {
      title: "Availability",
      icon: <Users className="w-5 h-5" />,
      path: "availability",
    },
    {
      title: "Messages",
      icon: <Mail className="w-5 h-5" />,
      path: "messages",
    },
    {
      title: "Notifications",
      icon: <Bell className="w-5 h-5" />,
      path: "notifications",
    },
    {
      title: "Settings",
      icon: <Settings className="w-5 h-5" />,
      path: "settings",
    },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={`fixed top-17 left-0 h-screen border-r transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-16" : "w-64"}`}
      >
        {/* Header */}
        <div className="flex md:hidden items-center justify-between p-4">
          {!isCollapsed && <span className="text-xl font-bold"></span>}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={`${item.path}`}
                  className={`flex items-center gap-4 p-2 rounded-lg transition-colors
                  ${
                    location.pathname === item.path
                      ? "bg-gray-700"
                      : "hover:bg-gray-700"
                  }
                  ${isCollapsed ? "justify-center" : ""}`}
                >
                  {item.icon}
                  {!isCollapsed && <span>{item.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <a
            href="#"
            className={`flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700 transition-colors text-red-400
              ${isCollapsed ? "justify-center" : ""}`}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span>Logout</span>}
          </a>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
