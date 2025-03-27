import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Certification, EmployeeCertification } from "../types/Certification";

export default function Certifications() {
  const navigate = useNavigate();
  const [filterExpiring, setFilterExpiring] = useState(false);
  const [certifications, setCertifications] = useState<Certification[]>([
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
  ]);

  const [employeeCerts] = useState<EmployeeCertification[]>([
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
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [newRequired, setNewRequired] = useState<number>(0);

  const now = dayjs();
  const soon = now.add(30, "day");

  const activeCounts = useMemo(() => {
    const map: Record<number, number> = {};
    employeeCerts.forEach((ec) => {
      if (dayjs(ec.expiresAt).isAfter(now)) {
        map[ec.certificationId] = (map[ec.certificationId] || 0) + 1;
      }
    });
    return map;
  }, [employeeCerts, now]);

  const expiringSoon = useMemo(() => {
    return certifications
      .filter((cert) => {
        return employeeCerts.some(
          (ec) =>
            ec.certificationId === cert.id && dayjs(ec.expiresAt).isBefore(soon)
        );
      })
      .map((c) => c.id);
  }, [certifications, employeeCerts, soon]);

  const startEditing = (cert: Certification) => {
    setEditingId(cert.id);
    setNewRequired(cert.requiredStaff ?? 0);
  };

  const saveNewRequired = (id: number) => {
    setCertifications((prev) =>
      prev.map((c) => (c.id === id ? { ...c, requiredStaff: newRequired } : c))
    );
    setEditingId(null);
  };

  const filteredCerts = filterExpiring
    ? certifications.filter((cert) => expiringSoon.includes(cert.id))
    : certifications;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestione Certificazioni</h1>

      <label className="mb-4 block">
        <input
          type="checkbox"
          checked={filterExpiring}
          onChange={() => setFilterExpiring((v) => !v)}
          className="mr-2"
        />
        Mostra solo certificazioni in scadenza (entro 30 giorni)
      </label>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Certificazione</th>
              <th className="p-2 border">Fabbisogno</th>
              <th className="p-2 border">Certificati Attivi</th>
              <th className="p-2 border">Stato</th>
              <th className="p-2 border">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {filteredCerts.map((cert) => {
              const certified = activeCounts[cert.id] || 0;
              const required = cert.requiredStaff ?? 0;
              const isOk = certified >= required;

              return (
                <tr
                  key={cert.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/certifications/${cert.id}`)}
                >
                  <td className="p-2 border font-medium text-blue-600 hover:underline">
                    {cert.name}
                  </td>
                  <td className="p-2 border text-center">
                    {editingId === cert.id ? (
                      <input
                        type="number"
                        className="w-16 border p-1 text-center"
                        value={newRequired}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setNewRequired(Number(e.target.value))}
                      />
                    ) : (
                      required
                    )}
                  </td>
                  <td className="p-2 border text-center">{certified}</td>
                  <td
                    className={`p-2 border font-semibold text-center ${
                      isOk ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isOk ? "OK" : "Insufficiente"}
                  </td>
                  <td className="p-2 border text-center">
                    {editingId === cert.id ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          saveNewRequired(cert.id);
                        }}
                        className="text-blue-600 hover:underline"
                      >
                        Salva
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startEditing(cert);
                        }}
                        className="text-gray-600 hover:underline"
                      >
                        Modifica
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
