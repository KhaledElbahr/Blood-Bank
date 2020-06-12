export interface User {
  id: number;
  user_type: number;
  user_id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  gender: { id: string, value: string };
  phone: string;
  email: string;
  user_name: string;
}

