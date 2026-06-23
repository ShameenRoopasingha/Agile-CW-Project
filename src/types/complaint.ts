export interface Complaint {
  id: string;
  desc: string;
  reporter: string;
  contact: string;
  date: string;
  time: string;
  location: string;
  asstNo: string;
  status: string;
  photo?: string;
}
