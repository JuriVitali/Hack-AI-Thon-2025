import { useParams } from "react-router-dom";
import { useMemo } from "react";
import dayjs from "dayjs";
import { Employee } from "../types/Employee";
import { Certification, EmployeeCertification } from "../types/Certification";

export default function CertificationDetail() {
  const { id } = useParams();
  const certId = Number(id);

  const certifications: Certification[] = [
    {
      id: 1,
      name: "Antincendio",
      description: "Basso rischio",
      requiredStaff: 3,
    },
    {
      id: 2,
      name: "Primo Soccorso",
      description: "Livello base",
      requiredStaff: 2,
    },
    { id: 3, name: "PES/PAV", description: "Elettrico", requiredStaff: 1 },
  ];

  const employees: Employee[] = [
    {
      id: 1,
      name: "Mario",
      surname: "Rossi",
      email: "mario@example.com",
      role: "Operaio",
    },
    {
      id: 2,
      name: "Luca",
      surname: "Bianchi",
      email: "luca@example.com",
      role: "Supervisore",
    },
    {
      id: 3,
      name: "Sara",
      surname: "Verdi",
      email: "sara@example.com",
      role: "Tecnico",
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
      certificationId: 1,
      issuedAt: "2022-05-10",
      expiresAt: "2023-11-01",
    },
    {
      employeeId: 3,
      certificationId: 2,
      issuedAt: "2023-03-15",
      expiresAt: "2024-12-31",
    },
  ];

  const certification = certifications.find((c) => c.id === certId);

  const certifiedEmployees = useMemo(() => {
    const today = dayjs();
    return employeeCerts
      .filter(
        (ec) =>
          ec.certificationId === certId && dayjs(ec.expiresAt).isAfter(today)
      )
      .map((ec) => {
        const employee = employees.find((emp) => emp.id === ec.employeeId);
        return {
          ...employee,
          issuedAt: ec.issuedAt,
          expiresAt: ec.expiresAt,
        };
      });
  }, [certId]);

  if (!certification)
    return <div className="p-6">Certificazione non trovata</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{certification.name}</h1>
      <p className="mb-4 text-gray-700">{certification.description}</p>

      <h2 className="text-xl font-semibold mb-2">Dipendenti certificati</h2>
      {certifiedEmployees.length === 0 ? (
        <p className="text-gray-600">
          Nessun dipendente con certificazione attiva.
        </p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Nome</th>
              <th className="p-2 border">Cognome</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Ruolo</th>
              <th className="p-2 border">Data Rilascio</th>
              <th className="p-2 border">Scadenza</th>
            </tr>
          </thead>
          <tbody>
            {certifiedEmployees.map((emp: any) => (
              <tr key={emp.id} className="hover:bg-gray-50">
                <td className="p-2 border">{emp.name}</td>
                <td className="p-2 border">{emp.surname}</td>
                <td className="p-2 border">{emp.email}</td>
                <td className="p-2 border">{emp.role}</td>
                <td className="p-2 border">
                  {dayjs(emp.issuedAt).format("DD/MM/YYYY")}
                </td>
                <td className="p-2 border">
                  {dayjs(emp.expiresAt).format("DD/MM/YYYY")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
