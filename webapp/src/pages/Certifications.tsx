import React, { useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Select from "react-select";
import type { SelectInstance } from "react-select";
import {
  certifications as gridCertifications,
  availableCertificationsForDropdown,
  employees,
} from "../data/data"; // Importa i dati separati
import { Certification } from "../types/Certification";

export default function Certifications() {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState<string>("all");
  const [certifications, setCertifications] =
    useState<Certification[]>(gridCertifications);
  const [newCertification, setNewCertification] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const searchInputRef = useRef<SelectInstance<any, false> | null>(null);
  const now = dayjs();
  const soon = now.add(30, "day");

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: "#323554",
      color: "white",
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: "#323554",
      color: "white",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "white",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "white",
    }),
    input: (provided: any) => ({
      ...provided,
      color: "white",
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#424566" : "#323554",
      color: "white",
    }),
  };

  const activeCounts = useMemo(() => {
    const map: Record<number, number> = {};
    employees.forEach((employee) => {
      employee.certifications?.forEach((cert) => {
        if (dayjs(cert.expiresAt).isAfter(now)) {
          map[cert.certificationId] = (map[cert.certificationId] || 0) + 1;
        }
      });
    });
    return map;
  }, [now]);

  const filteredCerts = useMemo(() => {
    if (filterType === "expiring") {
      return certifications.filter((cert) =>
        employees.some((employee) =>
          employee.certifications?.some(
            (c) =>
              c.certificationId === cert.id &&
              dayjs(c.expiresAt).isAfter(now) &&
              dayjs(c.expiresAt).isBefore(soon)
          )
        )
      );
    } else if (filterType === "insufficient") {
      return certifications.filter((cert) => {
        const certified = activeCounts[cert.id] || 0;
        return certified < (cert.requiredStaff ?? 0);
      });
    }
    return certifications;
  }, [filterType, certifications, activeCounts, now, soon]);

  const availableOptions = useMemo(() => {
    const existingNames = certifications.map((cert) => cert.name);
    return availableCertificationsForDropdown
      .filter((cert) => !existingNames.includes(cert.name))
      .map((cert) => ({
        value: cert.name,
        label: cert.name,
      }));
  }, [certifications]);

  const addNewCertification = () => {
    if (
      newCertification &&
      !certifications.find((c) => c.name === newCertification.value)
    ) {
      const newId = Math.max(0, ...certifications.map((c) => c.id)) + 1;
      setCertifications([
        ...certifications,
        {
          id: newId,
          name: newCertification.value,
          description: "",
          requiredStaff: 0,
        },
      ]);
      setNewCertification(null);
      setShowSearch(false);
    }
  };

  const toggleSearch = () => {
    setShowSearch((prev) => {
      if (!prev) {
        setTimeout(() => searchInputRef.current?.focus(), 300); // Focus dopo l'animazione
      }
      return !prev;
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-wrap justify-between items-end gap-4">
        <div className="w-64">
          <label className="block text-lg font-medium mb-1 text-black">
            Filtra certificazioni
          </label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full px-3 py-2 bg-[#323554] text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#424566] focus:border-white"
          >
            <option value="all">Tutte</option>
            <option value="expiring">In scadenza</option>
            <option value="insufficient">Copertura insufficiente</option>
          </select>
        </div>
        <div className="flex items-end gap-4">
          <div
            className={`transition-transform duration-300 ${
              showSearch ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {showSearch && (
              <div className="w-64">
                <Select
                  ref={searchInputRef}
                  options={availableOptions} // Usa le opzioni filtrate
                  value={newCertification}
                  onChange={(val: any) => setNewCertification(val)}
                  placeholder="Cerca certificazione..."
                  isClearable
                  styles={customStyles} // Applica gli stili personalizzati
                />
              </div>
            )}
          </div>
          {showSearch ? (
            <button
              onClick={addNewCertification}
              className="px-4 py-2 bg-[#33b168] text-white rounded hover:bg-[#30a761]"
            >
              Conferma aggiunta
            </button>
          ) : (
            <button
              onClick={toggleSearch}
              className="px-4 py-2 bg-[#33b168] text-white rounded hover:bg-[#30a761]"
            >
              Aggiungi certificazione
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {filteredCerts.map((cert) => {
          const certified = activeCounts[cert.id] || 0; // Numero di certificati attivi
          const required = cert.requiredStaff ?? 0; // Fabbisogno minimo
          const isOk = certified >= required; // Verifica se il fabbisogno è soddisfatto
          const progress =
            required > 0 ? Math.min((certified / required) * 100, 100) : 0;

          return (
            <div
              key={cert.id}
              className={`rounded-lg shadow-lg p-4 cursor-pointer transition border-l-4 ${
                isOk ? "border-[#2fb667] bg-white" : "border-[#c73131] bg-white"
              } hover:shadow-xl`} // Aumenta l'ombra con hover
              onClick={() => navigate(`/certifications/${cert.id}`)}
            >
              <div className="w-14 h-14 rounded-full bg-[#323554] flex items-center justify-center text-xl font-bold text-[#FF7F11]">
                {cert.name[0]}
              </div>
              <h2 className="text-lg font-semibold mb-1">{cert.name}</h2>
              <p className="text-sm text-gray-600">{cert.description || "-"}</p>
              <div className="mt-3">
                <div className="h-2 w-full bg-gray-200 rounded">
                  <div
                    className={`h-2 rounded ${
                      isOk ? "bg-[#2fb667]" : "bg-[#c73131]"
                    }`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm mt-1 text-gray-700">
                  {certified} su {required} dipendenti certificati
                </p>
              </div>
              <p
                className={`mt-2 font-medium ${
                  isOk ? "text-[#2fb667]" : "text-[#c73131]"
                }`}
              >
                {isOk ? "Copertura sufficiente" : "Copertura insufficiente"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
