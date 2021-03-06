export interface User {
  id: number;
  user_type_id: { id: number, value: string };
  user_id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  gender: { id: number, value: string };
  phone: string;
  email: string;
  user_name: string;
}

