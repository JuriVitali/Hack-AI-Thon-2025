import { useParams } from "react-router-dom";
import { Certification } from "../types/Certification";
import { Employee } from "../types/Employee";

interface Prediction {
  employeeId: number;
  probability: number; // 0 to 1
}

export default function CertificationPrediction() {
  const { certName } = useParams();

  const certifications: Certification[] = [
    { id: 1, name: "Antincendio", description: "Basso rischio" },
    { id: 2, name: "Primo Soccorso" },
    { id: 3, name: "PES/PAV" },
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
      name: "Giulia",
      surname: "Neri",
      email: "giulia@example.com",
      role: "Supervisore",
    },
    {
      id: 3,
      name: "Luca",
      surname: "Bianchi",
      email: "luca@example.com",
      role: "Tecnico",
    },
  ];

  const mockPredictions: Prediction[] = [
    { employeeId: 1, probability: 0.85 },
    { employeeId: 2, probability: 0.72 },
    { employeeId: 3, probability: 0.55 },
  ];

  const predictedEmployees = mockPredictions.map((pred) => {
    const emp = employees.find((e) => e.id === pred.employeeId);
    return {
      ...emp,
      probability: pred.probability,
    };
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Previsione idoneità certificazione {certName ? `- ${certName}` : ""}
      </h1>

      <table className="min-w-full bg-white border border-gray-300 rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">Cognome</th>
            <th className="p-2 border">Ruolo</th>
            <th className="p-2 border">Probabilità di superamento</th>
          </tr>
        </thead>
        <tbody>
          {predictedEmployees.map((emp) => (
            <tr key={emp.id} className="hover:bg-gray-50">
              <td className="p-2 border">{emp.name}</td>
              <td className="p-2 border">{emp.surname}</td>
              <td className="p-2 border">{emp.role}</td>
              <td className="p-2 border">
                <div className="w-full bg-gray-200 rounded h-4 relative">
                  <div
                    className="bg-blue-500 h-4 rounded"
                    style={{
                      width: `${Math.round((emp.probability ?? 0) * 100)}%`,
                    }}
                  />
                  <span className="absolute right-2 top-0 text-xs text-white">
                    {Math.round((emp.probability ?? 0) * 100)}%
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
