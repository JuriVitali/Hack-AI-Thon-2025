import React, { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { employees, certifications } from "../data/data";

export default function CertificationDetails() {
  const { id } = useParams<{ id: string }>();
  const certificationId = parseInt(id || "0", 10);
  const navigate = useNavigate();

  useEffect(() => {
    // Set the active sidebar button to "Certificazioni"
    const sidebarButton = document.querySelector("#sidebar-certifications");
    if (sidebarButton) {
      sidebarButton.classList.add("active");
    }
    return () => {
      // Cleanup: Remove the active class when leaving the page
      if (sidebarButton) {
        sidebarButton.classList.remove("active");
      }
    };
  }, []);

  const certification = useMemo(
    () => certifications.find((cert) => cert.id === certificationId),
    [certificationId]
  );

  const certifiedEmployees = useMemo(
    () =>
      employees.filter((employee) =>
        employee.certifications?.some(
          (cert) => cert.certificationId === certificationId
        )
      ),
    [certificationId]
  );

  const validCertifications = certifiedEmployees.filter((employee) => {
    const cert = employee.certifications?.find(
      (c) => c.certificationId === certificationId
    );
    return cert && new Date(cert.expiresAt) >= new Date();
  });

  const coveragePercentage =
    certification?.requiredStaff && certification.requiredStaff > 0
      ? Math.min(
          (validCertifications.length / certification.requiredStaff) * 100,
          100
        )
      : 0;

  const barColor = certification?.requiredStaff
    ? validCertifications.length >= certification.requiredStaff
      ? "bg-green-500"
      : "bg-orange-400"
    : "bg-gray-400";

  const updateRequiredStaff = () => {
    const newRequiredStaff = prompt("Inserisci il nuovo fabbisogno minimo:");
    if (newRequiredStaff !== null && !isNaN(Number(newRequiredStaff))) {
      certification!.requiredStaff = Number(newRequiredStaff);
      alert("Fabbisogno aggiornato con successo!");
    }
  };

  const generateQuiz = () => {
    alert("Il test è stato generato con successo!");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{certification?.name}</h1>
        <div className="flex gap-4">
          <button
            onClick={updateRequiredStaff}
            className="px-4 py-2 bg-[#3e4268] text-white rounded-lg hover:bg-[#3e4268] transition"
          >
            Modifica fabbisogno
          </button>
          <button
            onClick={generateQuiz}
            className="px-4 py-2 bg-[#FF7F11] text-white rounded-lg hover:bg-[#FF7F11] transition flex items-center gap-2"
          >
            <span>Genera Test</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m9-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <button
            onClick={() =>
              navigate(`/certifications/prediction/${certificationId}`)
            }
            className="px-4 py-2 bg-[#438b8d] text-white rounded-lg hover:bg-[#3d8183] transition"
          >
            Vai a Previsione
          </button>
        </div>
      </div>
      <p className="text-gray-600 mb-4">
        {certification?.description || "Nessuna descrizione disponibile."}
      </p>

      {certification?.requiredStaff && (
        <div className="mb-6">
          <p className="text-sm text-gray-700 mb-1">
            Certificazioni valide: <strong>{validCertifications.length}</strong>{" "}
            su <strong>{certification.requiredStaff}</strong> richiesti
          </p>
          <div className="w-full bg-gray-200 rounded h-3">
            <div
              className={`h-3 rounded ${barColor}`}
              style={{ width: `${coveragePercentage}%` }}
            ></div>
          </div>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4">Dipendenti Certificati</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {certifiedEmployees.map((employee) => {
          const certInfo = employee.certifications?.find(
            (cert) => cert.certificationId === certificationId
          );

          const expiresAt = certInfo ? new Date(certInfo.expiresAt) : null;
          const issuedAt = certInfo ? new Date(certInfo.issuedAt) : null;
          const now = new Date();

          const isExpired = expiresAt && expiresAt < now;
          const expiresSoon =
            expiresAt &&
            expiresAt >= now &&
            expiresAt < new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

          return (
            <div
              key={employee.id}
              className="rounded-lg shadow-lg p-4 bg-white border border-gray-300 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#323554] flex items-center justify-center text-lg font-bold text-[#FF7F11]">
                  {employee.name[0]}
                  {employee.surname[0]}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">
                    {employee.name} {employee.surname}
                  </h3>
                  <p className="text-sm text-gray-600">{employee.role}</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-1">
                Email: {employee.email}
              </p>

              {issuedAt && (
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Rilasciata:</strong>{" "}
                  {issuedAt.toLocaleDateString("it-IT")}
                </p>
              )}

              {expiresAt && (
                <p
                  className={`text-sm mb-1 ${
                    isExpired
                      ? "text-red-600"
                      : expiresSoon
                      ? "text-orange-500"
                      : "text-gray-700"
                  }`}
                >
                  <strong>Scadenza:</strong>{" "}
                  {expiresAt.toLocaleDateString("it-IT")}
                </p>
              )}

              {employee.attendingCourse && (
                <p className="text-sm text-blue-600 mb-1">
                  Attualmente segue il corso:{" "}
                  <strong>{employee.attendingCourse}</strong>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
