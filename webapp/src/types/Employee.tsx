export interface Employee {
  id: number;
  name: string;
  surname: string;
  email: string;
  role: string;
  attendingCourse?: string; // undefined = non sta seguendo un corso
}
