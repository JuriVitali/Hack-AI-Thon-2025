// src/routes.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Certifications from "./pages/Certifications";
import Employees from "./pages/Employees";
import CertificationDetail from "./pages/CertificationDetail";
import CourseAttendance from "./pages/CourseAttendance";
import EmployeeDetail from "./pages/EmployeeDetail";

export default function AppRoutes() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/certifications/:id" element={<CertificationDetail />} />
          <Route path="/courseattendance" element={<CourseAttendance />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/:id" element={<EmployeeDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}
