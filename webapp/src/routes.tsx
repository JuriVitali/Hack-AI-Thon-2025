// src/routes.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Certifications from "./pages/Certifications";
import Employees from "./pages/Employees";
import CertificationDetail from "./pages/CertificationDetail";

export default function AppRoutes() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/certifications/:id" element={<CertificationDetail />} />
          <Route path="/employees" element={<Employees />} />
        </Routes>
      </Layout>
    </Router>
  );
}
