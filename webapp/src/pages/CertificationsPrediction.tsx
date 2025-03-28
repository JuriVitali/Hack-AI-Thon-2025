import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { employees, certifications } from "../data/data";

export default function CertificationsPrediction() {
  const { id } = useParams<{ id: string }>();
  const certificationId = parseInt(id || "0", 10);

  const certification = useMemo(
    () => certifications.find((cert) => cert.id === certificationId),
    [certificationId]
  );

  const employeesWithProgress = useMemo(() => {
    return employees
      .map((employee) => ({
        ...employee,
        progress: Math.floor(Math.random() * 100), // Assign a random percentage
      }))
      .sort((a, b) => b.progress - a.progress); // Sort by progress in descending order
  }, []);

  const getBarColor = (progress: number) => {
    if (progress <= 50) {
      // Interpolate from red to yellow
      const red = 255;
      const green = Math.floor((progress / 50) * 255);
      return `rgb(${red}, ${green}, 0)`;
    } else {
      // Interpolate from yellow to green
      const red = Math.floor(((100 - progress) / 50) * 255);
      const green = 255;
      return `rgb(${red}, ${green}, 0)`;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Probabilità di superamento dell'esame
      </h1>
      <h2 className="text-2xl font-bold text-gray-600 mb-6">
        Movimentazione Manuale dei Carichi
      </h2>
      <div className="space-y-4">
        {employeesWithProgress.map((employee) => (
          <div
            key={employee.id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow flex items-center"
          >
            <div className="w-14 h-14 rounded-full bg-[#323554] flex items-center justify-center text-xl font-bold text-[#FF7F11]">
              {employee.name[0]}
              {employee.surname[0]}
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {employee.name} {employee.surname}
              </h3>
              <p className="text-sm text-gray-500">{employee.role}</p>
            </div>
            <div className="flex items-center gap-4 w-2/3">
              <div className="h-4 w-full bg-gray-200 rounded">
                <div
                  className="h-4 rounded"
                  style={{
                    width: `${employee.progress}%`,
                    backgroundColor: getBarColor(employee.progress),
                  }}
                ></div>
              </div>
              <p className="text-sm font-medium text-gray-800">
                {employee.progress}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
