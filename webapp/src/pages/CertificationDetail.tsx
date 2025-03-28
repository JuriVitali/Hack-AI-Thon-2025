import React from "react";
import { useParams } from "react-router-dom";
import { certifications, employees } from "../data/data"; // Importa i dati delle certificazioni e dei dipendenti

export default function CertificationDetail() {
  const { id } = useParams<{ id: string }>();
  const certificationId = parseInt(id || "", 10);

  // Trova la certificazione corrispondente
  const certification = certifications.find(
    (cert) => cert.id === certificationId
  );

  if (!certification) {
    return <p>Certificazione non trovata.</p>;
  }

  // Trova i dipendenti che hanno conseguito questa certificazione
  const certifiedEmployees = employees.filter((employee) =>
    employee.certifications?.some(
      (cert) => cert.certificationId === certificationId
    )
  );

  // Calcola il progresso rispetto al fabbisogno
  const certifiedCount = certifiedEmployees.length;
  const requiredStaff = certification.requiredStaff || 0;
  const progress =
    requiredStaff > 0
      ? Math.min((certifiedCount / requiredStaff) * 100, 100)
      : 100;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{certification.name}</h1>
      <p className="text-gray-700 mb-2">
        {certification.description || "Nessuna descrizione disponibile."}
      </p>

      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">Progresso</h2>
        <div className="w-full bg-gray-200 rounded h-4">
          <div
            className={`h-4 rounded ${
              progress === 100 ? "bg-green-500" : "bg-red-500"
            }`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-700 mt-1">
          {certifiedCount} su {requiredStaff} dipendenti certificati
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-3">Dipendenti certificati</h2>
      {certifiedEmployees.length > 0 ? (
        <ul className="list-disc pl-5">
          {certifiedEmployees.map((employee) => (
            <li key={employee.id} className="text-gray-700">
              {employee.name} {employee.surname} - {employee.role}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700">
          Nessun dipendente ha conseguito questa certificazione.
        </p>
      )}
    </div>
  );
}
