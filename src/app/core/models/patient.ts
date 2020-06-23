export interface Patient {
  id: number;
  ssn: string;
  first_name: string;
  last_name: string;
  full_name: string;
  phone: string;
  gender: { id: number, value: string };
  blood_group_id: { id: number, value: string };
  blood_group: string;
  address: string;
}
