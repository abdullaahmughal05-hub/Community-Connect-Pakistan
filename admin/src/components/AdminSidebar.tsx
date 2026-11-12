
import {
  LayoutDashboard,
  Building2,
  ClipboardList,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Organizations", path: "/organizations", icon: Building2 },
    { label: "Submissions", path: "/submissions", icon: ClipboardList },
    { label: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 min-h-screen bg-[#124B39] text-white p-6 hidden md:flex flex-col shrink-0">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 rounded-xl bg-[#E7C77E] text-[#124B39] flex items-center justify-center">
          <ShieldCheck size={23} />
        </div>

        <div>
          <h1 className="font-bold text-lg">Community Connect</h1>
          <p className="text-xs text-emerald-200">ADMIN PORTAL</p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive
                    ? "bg-white text-[#124B39] font-semibold"
                    : "text-emerald-100 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={19} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <button
        onClick={() => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminInfo");
  navigate("/login", { replace: true });
}}
        className="mt-auto flex items-center gap-3 p-3 text-emerald-100 hover:text-white rounded-lg hover:bg-white/10"
      >
        <LogOut size={19} />
        Logout
      </button>
    </aside>
  );
};

export default AdminSidebar;
