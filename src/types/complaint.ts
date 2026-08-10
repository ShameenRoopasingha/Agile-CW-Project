export interface Complaint {
  id: string;
  title: string;
  desc: string;
  type?: string;
  reporter: string;
  contact: string;
  date: string;
  time: string;
  location: string;
  asstNo: string;
  status: string;
  photo?: string; // Kept for backwards compatibility
  imageUrls?: string[]; // New array from backend
  citizen?: any; // Nested object
  createdAt?: string;
}
