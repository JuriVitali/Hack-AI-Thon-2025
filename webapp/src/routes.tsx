// src/routes.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Certifications from "./pages/Certifications";
import Employees from "./pages/Employees";
import CertificationDetails from "./pages/CertificationDetails";
import CourseAttendance from "./pages/CourseAttendance";
import EmployeeDetail from "./pages/EmployeeDetail";
import CertificationsPrediction from "./pages/CertificationsPrediction";

export default function AppRoutes() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Certifications />} />
          <Route
            path="/certifications/:id"
            element={<CertificationDetails />}
          />
          <Route path="/courseattendance" element={<CourseAttendance />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/:id" element={<EmployeeDetail />} />
          <Route
            path="/certifications/prediction/:certificationId"
            element={<CertificationsPrediction />}
          />
        </Routes>
      </Layout>
    </Router>
  );
}
