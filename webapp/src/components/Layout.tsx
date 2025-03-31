import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { label: "Certificazioni", path: "/" },
  { label: "Dipendenti", path: "/employees" },
  { label: "Presenze Corsi", path: "/courseattendance" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const user = {
    name: "Giulia Bianchi",
    avatarUrl: "https://i.pravatar.cc/100",
  };

  return (
    <div className="flex min-h-screen bg-[#f3f4f7]">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#323554] shadow-md transform transition-transform duration-200 ease-in-out 
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        <div className="flex items-center gap-3 p-4 border-b">
          <img
            src={user.avatarUrl}
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <div className="text-sm text-white font-medium">{user.name}</div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className={`block px-4 py-2 rounded-lg transition ${
                location.pathname === path
                  ? "bg-[#FF7F11] text-white"
                  : "text-white hover:bg-gray-200 hover:text-[#323554]"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t">
          <Link
            to="/settings"
            className="block px-4 py-2 text-white hover:bg-gray-100 hover:text-[#323554] rounded"
            onClick={() => setSidebarOpen(false)}
          >
            Impostazioni
          </Link>
        </div>
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
        <header className="p-4 bg-white shadow-md flex items-center justify-between md:justify-between h-16">
          <div className="flex items-center gap-3">
            <img
              src="/logo.jpg"
              alt="Quirrel Logo"
              className="w-10 h-10 object-cover"
            />
            <p className="text-xl font-bold text-gray-800">Quirrel</p>
          </div>
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
