export interface Staff {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: "Active" | "Inactive" | "On Leave";
  avatarUrl?: string;
}
