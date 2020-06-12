export interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  ssn: string;
  phone: string;
  gender: string;
  // blood_group: { id: number, value: string };
  blood_group: string;
  address: string;
}
