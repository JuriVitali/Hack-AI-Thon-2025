import { useState } from "react";
import { Employee } from "../types/Employee";
import EmployeeForm from "../components/EmployeeForm";
import { useNavigate } from "react-router-dom";

export default function Employees() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: "Mario",
      surname: "Rossi",
      email: "mario.rossi@example.com",
      role: "Operaio",
    },
    {
      id: 2,
      name: "Luca",
      surname: "Bianchi",
      email: "luca.bianchi@example.com",
      role: "Supervisore",
    },
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAdd = () => {
    setSelectedEmployee(null);
    setIsFormOpen(true);
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const handleSave = (employee: Employee) => {
    if (selectedEmployee) {
      setEmployees(
        employees.map((emp) => (emp.id === employee.id ? employee : emp))
      );
    } else {
      setEmployees([...employees, employee]);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestione Dipendenti</h1>

      <button
        onClick={handleAdd}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        + Aggiungi Dipendente
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Nome</th>
              <th className="p-2 border">Cognome</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Ruolo</th>
              <th className="p-2 border">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50">
                <td className="p-2 border">{emp.name}</td>
                <td className="p-2 border">{emp.surname}</td>
                <td className="p-2 border">{emp.email}</td>
                <td className="p-2 border">{emp.role}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleEdit(emp)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Modifica
                  </button>
                  <button
                    onClick={() => handleDelete(emp.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Elimina
                  </button>
                  <button
                    onClick={() => navigate(`/employees/${emp.id}`)}
                    className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Dettagli
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <EmployeeForm
          employee={selectedEmployee ?? undefined}
          onSave={handleSave}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}
