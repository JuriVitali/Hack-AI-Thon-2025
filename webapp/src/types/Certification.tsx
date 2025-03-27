// src/types/Certification.ts
export interface Certification {
  id: number;
  name: string;
  description?: string;
  requiredStaff?: number; // fabbisogno minimo
}

export interface EmployeeCertification {
  employeeId: number;
  certificationId: number;
  issuedAt: string;
  expiresAt: string;
}
