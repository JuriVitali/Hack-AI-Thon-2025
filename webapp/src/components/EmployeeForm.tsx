// src/components/EmployeeForm.tsx
import { useState } from "react";
import { Employee } from "../types/Employee";

interface EmployeeFormProps {
  employee?: Employee;
  onSave: (employee: Employee) => void;
  onCancel: () => void;
}

export default function EmployeeForm({
  employee,
  onSave,
  onCancel,
}: EmployeeFormProps) {
  const [formData, setFormData] = useState<Employee>(
    employee || { id: Date.now(), name: "", surname: "", email: "", role: "" }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {employee ? "Modifica Dipendente" : "Aggiungi Dipendente"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cognome
            </label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ruolo
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            >
              <option value="">Seleziona un ruolo</option>
              <option value="Operaio">Operaio</option>
              <option value="Supervisore">Supervisore</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Annulla
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Salva
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
