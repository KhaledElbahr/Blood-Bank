export interface Request {
  id: number;
  product_type: { id: number, value: string };
  blood_group: { id: number, value: string };
  quantity: number;
  priority: { id: number, value: string };
  patient_id: number;
  patient_full_name: string;
  requested_date: Date;
  required_date: Date;
  status: { id: number, value: string };
  submitted_by: string;
}
