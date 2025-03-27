// src/components/Layout.tsx
import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { label: "Dashboard", path: "/" },
  { label: "Certificazioni", path: "/certifications" },
  { label: "Dipendenti", path: "/employees" },
];

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-md transform transition-transform duration-200 ease-in-out 
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        <div className="p-4 text-xl font-semibold border-b">Safety Manager</div>
        <nav className="p-4 space-y-2">
          {navItems.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className={`block px-4 py-2 rounded-lg transition ${
                location.pathname === path
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="p-4 bg-white shadow-md flex items-center justify-between md:justify-end">
          <button
            className="md:hidden text-gray-600"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
        </header>

        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
