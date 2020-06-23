export interface Request {
  id: number;
  patient_id: number;
  full_name: string;
  blood_group_id: { id: number, value: string };
  product_type_id: { id: number, value: string };
  blood_group: string;
  product_type: string;
  quantity: number;
  priority: { id: number, value: string };
  required_date: Date;
  submitted_by: string;
  status: { id: number, value: string };
  created_at: Date;
}
