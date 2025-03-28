import { useMemo } from "react";
import { Employee } from "../types/Employee";

export default function CourseAttendance() {
  const employees: Employee[] = [
    {
      id: 1,
      name: "Mario",
      surname: "Rossi",
      email: "mario@example.com",
      role: "Operaio",
      attendingCourse: "Antincendio",
    },
    {
      id: 2,
      name: "Giulia",
      surname: "Neri",
      email: "giulia@example.com",
      role: "Supervisore",
      attendingCourse: "Primo Soccorso",
    },
    {
      id: 3,
      name: "Luca",
      surname: "Bianchi",
      email: "luca@example.com",
      role: "Tecnico",
    },
  ];

  const attending = useMemo(
    () => employees.filter((emp) => emp.attendingCourse),
    [employees]
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Dipendenti che frequentano un corso
      </h1>

      {attending.length === 0 ? (
        <p className="text-gray-600">
          Nessun dipendente sta frequentando un corso al momento.
        </p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Nome</th>
              <th className="p-2 border">Cognome</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Ruolo</th>
              <th className="p-2 border">Corso</th>
            </tr>
          </thead>
          <tbody>
            {attending.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50">
                <td className="p-2 border">{emp.name}</td>
                <td className="p-2 border">{emp.surname}</td>
                <td className="p-2 border">{emp.email}</td>
                <td className="p-2 border">{emp.role}</td>
                <td className="p-2 border font-medium text-blue-600">
                  {emp.attendingCourse}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
