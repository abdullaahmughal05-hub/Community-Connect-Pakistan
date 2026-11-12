
import { Link, NavLink } from "react-router-dom";
import { HandHeart, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Organizations", path: "/organizations" },
    { name: "Categories", path: "/categories" },
    { name: "Cities", path: "/cities" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#E8E0D2] bg-[#FFFCF5]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link to="/" className="flex items-center gap-3">
          <div className="rounded-xl bg-[#145C45] p-2.5 text-white">
            <HandHeart size={25} />
          </div>

          <div>
            <h1 className="font-bold text-[#145C45]">
              Community Connect
            </h1>
            <p className="text-[10px] font-semibold tracking-[3px] text-[#A34F36]">
              PAKISTAN
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-[#145C45] font-bold"
                    : "text-slate-600 hover:text-[#145C45]"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <Link
          to="/register"
          className="hidden rounded-lg bg-[#145C45] px-5 py-3 text-sm font-semibold text-white hover:bg-[#104936] md:block"
        >
          Register Organization
        </Link>

        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-[#E8E0D2] bg-[#FFFCF5] p-5 md:hidden">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-sm font-medium text-[#145C45]"
            >
              {link.name}
            </Link>
          ))}

          <Link
            to="/register"
            onClick={() => setMenuOpen(false)}
            className="mt-3 block rounded-lg bg-[#145C45] p-3 text-center text-white"
          >
            Register Organization
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
