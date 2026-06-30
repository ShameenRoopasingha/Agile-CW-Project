export interface Resident {
  id: string;
  name: string;
  address: string;
  zone: string;
  status: "Active" | "Inactive" | "Suspended";
  avatarUrl?: string;
}
