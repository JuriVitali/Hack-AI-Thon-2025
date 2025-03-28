import React, { useState } from "react";
import { employees as initialEmployees } from "../data/data";

export default function Employees() {
  const [employees, setEmployees] = useState(initialEmployees);

  const addEmployee = () => {
    const name = prompt("Inserisci il nome del dipendente:");
    const surname = prompt("Inserisci il cognome del dipendente:");
    const email = prompt("Inserisci l'email del dipendente:");
    const role = prompt("Inserisci il ruolo del dipendente:");
    if (name && surname && email && role) {
      const newEmployee = {
        id: Math.max(...employees.map((e) => e.id)) + 1,
        name,
        surname,
        email,
        role,
        attendingCourse: undefined,
      };
      setEmployees([...employees, newEmployee]);
    }
  };

  const editEmployee = (id: number) => {
    const employee = employees.find((e) => e.id === id);
    if (!employee) return;

    const name = prompt("Modifica il nome:", employee.name);
    const surname = prompt("Modifica il cognome:", employee.surname);
    const email = prompt("Modifica l'email:", employee.email);
    const role = prompt("Modifica il ruolo:", employee.role);

    if (name && surname && email && role) {
      setEmployees(
        employees.map((e) =>
          e.id === id ? { ...e, name, surname, email, role } : e
        )
      );
    }
  };

  const deleteEmployee = (id: number) => {
    if (confirm("Sei sicuro di voler eliminare questo dipendente?")) {
      setEmployees(employees.filter((e) => e.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dipendenti</h1>
        <button
          onClick={addEmployee}
          className="px-4 py-2 bg-[#2fb667] text-white rounded-lg hover:bg-[#2aa05b] transition"
        >
          Aggiungi Dipendente
        </button>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 rounded-full bg-[#323554] flex items-center justify-center text-xl font-bold text-[#FF7F11]">
                  {employee.name[0]}
                  {employee.surname[0]}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {employee.name} {employee.surname}
                  </h3>
                  <p className="text-sm text-gray-500">{employee.role}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Email:</strong> {employee.email}
              </p>
              {employee.attendingCourse && (
                <p className="text-sm text-[#3e4268]">
                  Attualmente segue il corso:{" "}
                  <strong>{employee.attendingCourse}</strong>
                </p>
              )}
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => editEmployee(employee.id)}
                className="px-3 py-1 bg-[#50a4a7] text-white rounded hover:bg-[#478385] transition"
              >
                Modifica
              </button>
              <button
                onClick={() => deleteEmployee(employee.id)}
                className="px-3 py-1 bg-[#c73131] text-white rounded hover:bg-[#b92d2d] transition"
              >
                Elimina
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
