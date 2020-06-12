export interface Patient {
  id: number;
  ssn: string;
  first_name: string;
  last_name: string;
  full_name: string;
  phone: string;
  gender: { id: string, value: string };
  blood_group: { id: number, name: string };
  address: string;
}
