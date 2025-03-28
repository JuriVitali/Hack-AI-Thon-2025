import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-gradient-to-b from-[#323554] to-[#424566] text-white p-4">
      <ul className="space-y-4">
        <li id="sidebar-home">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive ? "bg-[#FF7F11]" : "hover:bg-[#3e4268]"
              }`
            }
          >
            Home
          </NavLink>
        </li>
        <li id="sidebar-certifications">
          <NavLink
            to="/certifications"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive ? "bg-[#FF7F11]" : "hover:bg-[#3e4268]"
              }`
            }
          >
            Certificazioni
          </NavLink>
        </li>
        <li id="sidebar-employees">
          <NavLink
            to="/employees"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive ? "bg-[#FF7F11]" : "hover:bg-[#3e4268]"
              }`
            }
          >
            Dipendenti
          </NavLink>
        </li>
        <li id="sidebar-courses">
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              `block px-4 py-2 rounded ${
                isActive ? "bg-[#FF7F11]" : "hover:bg-[#3e4268]"
              }`
            }
          >
            Corsi
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}
