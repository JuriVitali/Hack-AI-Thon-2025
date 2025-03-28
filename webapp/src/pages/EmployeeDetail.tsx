import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { Employee } from "../types/Employee";
import { EmployeeCourse } from "../types/EmployeeCourse";
import { EmployeeCertification } from "../types/Certification";

export default function EmployeeDetail() {
  const { id } = useParams();
  const employeeId = Number(id);

  const employees: Employee[] = [
    {
      id: 1,
      name: "Mario",
      surname: "Rossi",
      email: "mario@example.com",
      role: "Operaio",
      attendingCourse: "Aggiornamento Antincendio",
    },
    {
      id: 2,
      name: "Giulia",
      surname: "Neri",
      email: "giulia@example.com",
      role: "Supervisore",
    },
  ];

  const employeeCourses: EmployeeCourse[] = [
    {
      employeeId: 1,
      courseName: "Antincendio Base",
      attendedAt: "2022-05-01",
      result: "superato",
    },
    {
      employeeId: 1,
      courseName: "PES/PAV",
      attendedAt: "2023-02-15",
      result: "non superato",
    },
    {
      employeeId: 2,
      courseName: "Primo Soccorso",
      attendedAt: "2021-11-20",
      result: "superato",
    },
  ];

  const employeeCerts: EmployeeCertification[] = [
    {
      employeeId: 1,
      certificationId: 1,
      issuedAt: "2023-01-01",
      expiresAt: "2025-01-01",
    },
    {
      employeeId: 2,
      certificationId: 2,
      issuedAt: "2022-03-15",
      expiresAt: "2024-04-01",
    },
  ];

  const employee = employees.find((e) => e.id === employeeId);

  const currentCourses = employee?.attendingCourse;
  const pastCourses = employeeCourses.filter(
    (ec) => ec.employeeId === employeeId
  );
  const activeCerts = employeeCerts.filter(
    (ec) => ec.employeeId === employeeId && dayjs(ec.expiresAt).isAfter(dayjs())
  );

  if (!employee) return <div className="p-6">Dipendente non trovato</div>;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          {employee.name} {employee.surname}
        </h1>
        <p className="text-gray-600">
          {employee.role} – {employee.email}
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">
          Corso attualmente frequentato
        </h2>
        {currentCourses ? (
          <p className="text-blue-600 font-medium">{currentCourses}</p>
        ) : (
          <p className="text-gray-600">Nessun corso in corso.</p>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">
          Storico corsi frequentati
        </h2>
        {pastCourses.length === 0 ? (
          <p className="text-gray-600">Nessun corso passato registrato.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 rounded">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">Corso</th>
                <th className="p-2 border">Data</th>
                <th className="p-2 border">Esito</th>
              </tr>
            </thead>
            <tbody>
              {pastCourses.map((course, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="p-2 border">{course.courseName}</td>
                  <td className="p-2 border">
                    {dayjs(course.attendedAt).format("DD/MM/YYYY")}
                  </td>
                  <td
                    className={`p-2 border font-medium ${
                      course.result === "superato"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {course.result}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Certificazioni attive</h2>
        {activeCerts.length === 0 ? (
          <p className="text-gray-600">Nessuna certificazione attiva.</p>
        ) : (
          <ul className="list-disc list-inside text-blue-700">
            {activeCerts.map((cert, idx) => (
              <li key={idx}>
                Rilasciata il {dayjs(cert.issuedAt).format("DD/MM/YYYY")} -
                Scade il {dayjs(cert.expiresAt).format("DD/MM/YYYY")}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
