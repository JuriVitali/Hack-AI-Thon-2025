export interface Employee {
  id: number;
  name: string;
  surname: string;
  email: string;
  role: string;
  attendingCourse?: string; // undefined = non sta seguendo un corso
  certifications?: {
    certificationId: number;
    issuedAt: string;
    expiresAt: string;
  }[]; // Certificazioni associate
  courses?: {
    courseName: string;
    attendedAt: string;
    result: "superato" | "non superato";
  }[]; // Corsi frequentati
}
