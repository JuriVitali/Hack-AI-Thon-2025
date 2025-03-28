import { useMemo } from "react";
import { Employee } from "../types/Employee";

export default function CourseAttendance() {
  const employees: Employee[] = [
    {
      id: 1,
      name: "Silvia",
      surname: "Gemini",
      email: "mario@example.com",
      role: "Operaio",
      attendingCourse: "Antincendio",
    },
    {
      id: 2,
      name: "Giulia",
      surname: "Marzano",
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
    {
      id: 4,
      name: "Anna",
      surname: "Iudice",
      email: "anna@example.com",
      role: "Amministratore",
      attendingCourse: "Leadership",
    },
    {
      id: 5,
      name: "Marco",
      surname: "Greco",
      email: "marco@example.com",
      role: "Operaio",
      attendingCourse: "Sicurezza sul lavoro",
    },
    {
      id: 6,
      name: "Sara",
      surname: "Naselli",
      email: "sara@example.com",
      role: "Tecnico",
      attendingCourse: "Aggiornamento tecnico",
    },
  ];

  const attending = useMemo(
    () => employees.filter((emp) => emp.attendingCourse),
    [employees]
  );

  const trainingProgress = useMemo(() => {
    return employees
      .filter((emp) => emp.attendingCourse)
      .map((emp) => ({
        employeeId: emp.id,
        name: `${emp.name} ${emp.surname}`,
        course: emp.attendingCourse,
        progress: Math.floor(Math.random() * 100), // Random progress percentage
      }));
  }, [employees]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Partecipazione ai Corsi</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {trainingProgress.map((employee) => (
          <div
            key={employee.employeeId}
            className="rounded-lg shadow-lg p-4 bg-white border border-gray-300"
          >
            <h2 className="text-lg font-semibold mb-2">{employee.name}</h2>
            <p className="text-sm text-gray-800 mb-2">
              Corso: {employee.course}
            </p>
            <div className="h-2 w-full bg-gray-200 rounded">
              <div
                className="h-2 bg-[#FF7F11] rounded"
                style={{ width: `${employee.progress}%` }}
              ></div>
            </div>
            <p className="text-sm mt-2 text-gray-800">
              Progresso: {employee.progress}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
