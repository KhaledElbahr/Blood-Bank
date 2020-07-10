export interface Donor {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  gender: {id: number, value: string};
  phone: string;
  email?: string;
  ssn: string;
  blood_group_id: { id: number, value: string };
  blood_group: string;
  donor_type_id: {id: number, value: string};
}
