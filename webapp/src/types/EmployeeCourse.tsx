export interface EmployeeCourse {
  employeeId: number;
  courseName: string;
  attendedAt: string;
  result: "superato" | "non superato";
}
