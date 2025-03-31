import { Certification, EmployeeCertification } from "../types/Certification";
import { Employee } from "../types/Employee";
import { EmployeeCourse } from "../types/EmployeeCourse";

export const certifications: Certification[] = [
  {
    id: 1,
    name: "Corso Antincendio - Rischio Basso",
    description:
      "Formazione per addetti antincendio in aziende a basso rischio.",
    requiredStaff: 2,
  },
  {
    id: 2,
    name: "Primo Soccorso Aziendale - Gruppo B/C",
    description:
      "Corso base per addetti al primo soccorso secondo il D.M. 388/2003.",
    requiredStaff: 2,
  },
  {
    id: 3,
    name: "Abilitazione PES/PAV",
    description:
      "Formazione per lavori elettrici su impianti fuori tensione e in prossimità.",
    requiredStaff: 1,
  },
  {
    id: 4,
    name: "Lavori in Quota e DPI di III Categoria",
    description:
      "Formazione per attività sopra i 2 metri e uso dei dispositivi di protezione individuale.",
    requiredStaff: 1,
  },
  {
    id: 5,
    name: "Gestione delle Emergenze",
    description:
      "Corso per coordinatori delle emergenze e gestione dei piani di evacuazione.",
    requiredStaff: 2,
  },
  {
    id: 6,
    name: "Movimentazione Manuale dei Carichi",
    description:
      "Prevenzione dei rischi legati alla movimentazione di carichi pesanti.",
    requiredStaff: 3,
  },
  {
    id: 7,
    name: "Abilitazione alla Conduzione di Carrelli Elevatori",
    description:
      "Patentino per l’utilizzo in sicurezza dei muletti (D.Lgs. 81/08 e Accordo Stato-Regioni).",
    requiredStaff: 2,
  },
];

export const availableCertificationsForDropdown: Certification[] = [
  {
    id: 8,
    name: "Attestato Sicurezza Generale (D.Lgs. 81/08)",
    description:
      "Formazione obbligatoria sulla sicurezza per tutti i lavoratori.",
  },
  {
    id: 9,
    name: "Antincendio Rischio Medio",
    description:
      "Formazione per addetti alla prevenzione incendi in aziende a rischio medio.",
  },
  {
    id: 10,
    name: "Primo Soccorso - Gruppo B e C",
    description:
      "Corso per addetti al primo soccorso nelle aziende del gruppo B e C.",
  },
  {
    id: 11,
    name: "Formazione Specifica Rischio Alto",
    description:
      "Formazione sulla sicurezza per lavoratori esposti a rischi elevati.",
  },
  {
    id: 12,
    name: "RLS - Rappresentante dei Lavoratori per la Sicurezza",
    description: "Corso per chi ricopre il ruolo di RLS in azienda.",
  },
  {
    id: 13,
    name: "Aggiornamento Sicurezza Lavoratori (5 anni)",
    description: "Aggiornamento quinquennale obbligatorio per i lavoratori.",
  },
];

export const employees: Employee[] = [
  {
    id: 1,
    name: "Mario",
    surname: "Rossi",
    email: "mario.rossi@example.com",
    role: "Operaio",
    attendingCourse: "Aggiornamento Antincendio",
    certifications: [
      {
        certificationId: 1,
        issuedAt: "2023-01-01",
        expiresAt: "2026-01-01",
      },
    ],
    courses: [
      {
        courseName: "Antincendio Base",
        attendedAt: "2022-01-10",
        result: "superato",
      },
      {
        courseName: "PES/PAV",
        attendedAt: "2023-03-01",
        result: "non superato",
      },
    ],
  },
  {
    id: 2,
    name: "Luca",
    surname: "Bianchi",
    email: "luca.bianchi@example.com",
    role: "Tecnico",
    certifications: [
      {
        certificationId: 1,
        issuedAt: "2022-05-10",
        expiresAt: "2027-05-10",
      },
    ],
    courses: [
      {
        courseName: "Primo Soccorso",
        attendedAt: "2022-02-15",
        result: "superato",
      },
    ],
  },
  {
    id: 3,
    name: "Giulia",
    surname: "Verdi",
    email: "giulia.verdi@example.com",
    role: "Supervisore",
    attendingCourse: "Primo Soccorso",
    certifications: [
      {
        certificationId: 2,
        issuedAt: "2023-03-15",
        expiresAt: "2025-12-31",
      },
    ],
    courses: [
      {
        courseName: "Uso DPI",
        attendedAt: "2023-09-12",
        result: "superato",
      },
    ],
  },
  {
    id: 4,
    name: "Anna",
    surname: "Neri",
    email: "anna.neri@example.com",
    role: "Tecnico",
    certifications: [
      {
        certificationId: 3,
        issuedAt: "2022-06-01",
        expiresAt: "2027-06-01",
      },
    ],
    courses: [
      {
        courseName: "Lavori in quota",
        attendedAt: "2021-11-20",
        result: "non superato",
      },
    ],
  },
  {
    id: 5,
    name: "Elena",
    surname: "Mancini",
    email: "elena.m@example.com",
    role: "Magazziniere",
    certifications: [
      {
        certificationId: 6,
        issuedAt: "2023-05-10",
        expiresAt: "2025-05-10",
      },
    ],
    courses: [
      {
        courseName: "Movimentazione Carichi",
        attendedAt: "2023-04-15",
        result: "superato",
      },
    ],
  },
  {
    id: 6,
    name: "Davide",
    surname: "Corsi",
    email: "davide.c@example.com",
    role: "Responsabile Sicurezza",
    attendingCourse: "Gestione Emergenze",
    certifications: [
      {
        certificationId: 7,
        issuedAt: "2022-01-20",
        expiresAt: "2026-01-20",
      },
    ],
    courses: [
      {
        courseName: "Uso Carrelli Elevatori",
        attendedAt: "2022-01-05",
        result: "superato",
      },
    ],
  },
  {
    id: 7,
    name: "Martina",
    surname: "Ferrari",
    email: "martina.f@example.com",
    role: "Operaio",
    certifications: [
      {
        certificationId: 5,
        issuedAt: "2022-09-01",
        expiresAt: "2023-09-01",
      },
    ],
    courses: [
      {
        courseName: "Gestione Emergenze",
        attendedAt: "2023-01-30",
        result: "non superato",
      },
    ],
  },
  {
    id: 8,
    name: "Simone",
    surname: "Barbieri",
    email: "simone.b@example.com",
    role: "Tecnico",
    courses: [
      {
        courseName: "Movimentazione Carichi",
        attendedAt: "2023-08-20",
        result: "superato",
      },
    ],
  },
  {
    id: 9,
    name: "Alessandro",
    surname: "Galli",
    email: "alessandro.g@example.com",
    role: "Tecnico",
    courses: [
      {
        courseName: "Movimentazione Carichi",
        attendedAt: "2023-08-20",
        result: "superato",
      },
    ],
  },
  {
    id: 10,
    name: "Filippo",
    surname: "Turchi",
    email: "filippo.t@example.com",
    role: "Tecnico",
    courses: [
      {
        courseName: "Movimentazione Carichi",
        attendedAt: "2023-08-20",
        result: "superato",
      },
      {
        courseName: "Movimentazione Carichi",
        attendedAt: "2024-07-24",
        result: "superato",
      },
    ],
  },
  {
    id: 11,
    name: "Carlo",
    surname: "Lombardi",
    email: "carlo.l@example.com",
    role: "Tecnico",
    courses: [
      {
        courseName: "Movimentazione Carichi",
        attendedAt: "2022-02-01",
        result: "superato",
      },
    ],
  },
];

export const employeeCertifications: EmployeeCertification[] = [
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
    expiresAt: "2024-05-10",
  },
  {
    employeeId: 3,
    certificationId: 2,
    issuedAt: "2023-03-15",
    expiresAt: "2024-12-31",
  },
  {
    employeeId: 4,
    certificationId: 3,
    issuedAt: "2022-06-01",
    expiresAt: "2023-06-01",
  }, // scaduta
  {
    employeeId: 5,
    certificationId: 6,
    issuedAt: "2023-05-10",
    expiresAt: "2025-05-10",
  },
  {
    employeeId: 6,
    certificationId: 7,
    issuedAt: "2022-01-20",
    expiresAt: "2025-05-20",
  },
  {
    employeeId: 7,
    certificationId: 5,
    issuedAt: "2023-10-01",
    expiresAt: "2026-09-30",
  },
  {
    employeeId: 7,
    certificationId: 2,
    issuedAt: "2022-01-09",
    expiresAt: "2025-05-14",
  },
  {
    employeeId: 4,
    certificationId: 4,
    issuedAt: "2022-09-01",
    expiresAt: "2023-09-01",
  },
  {
    employeeId: 4,
    certificationId: 2,
    issuedAt: "2022-09-01",
    expiresAt: "2023-09-01",
  },
  {
    employeeId: 9,
    certificationId: 2,
    issuedAt: "2022-09-01",
    expiresAt: "2023-09-01",
  },
  {
    employeeId: 10,
    certificationId: 5,
    issuedAt: "2022-09-01",
    expiresAt: "2023-09-01",
  },
  {
    employeeId: 11,
    certificationId: 1,
    issuedAt: "2022-09-01",
    expiresAt: "2023-09-01",
  },
];

export const employeeCourses: EmployeeCourse[] = [
  {
    employeeId: 1,
    courseName: "Antincendio Base",
    attendedAt: "2022-01-10",
    result: "superato",
  },
  {
    employeeId: 1,
    courseName: "PES/PAV",
    attendedAt: "2023-03-01",
    result: "non superato",
  },
  {
    employeeId: 2,
    courseName: "Primo Soccorso",
    attendedAt: "2022-02-15",
    result: "superato",
  },
  {
    employeeId: 3,
    courseName: "Uso DPI",
    attendedAt: "2023-09-12",
    result: "superato",
  },
  {
    employeeId: 4,
    courseName: "Lavori in quota",
    attendedAt: "2021-11-20",
    result: "non superato",
  },
  {
    employeeId: 5,
    courseName: "Movimentazione Carichi",
    attendedAt: "2023-04-15",
    result: "superato",
  },
  {
    employeeId: 6,
    courseName: "Uso Carrelli Elevatori",
    attendedAt: "2022-01-05",
    result: "superato",
  },
  {
    employeeId: 7,
    courseName: "Gestione Emergenze",
    attendedAt: "2023-01-30",
    result: "non superato",
  },
  {
    employeeId: 8,
    courseName: "Movimentazione Carichi",
    attendedAt: "2023-08-20",
    result: "superato",
  },
];
