export interface DonorActivity {
  id: number;
  donor_id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  product_type_id: { id: number, value: string };
  product_type: string;
  viruses: {id: number, name: string}[];
  temperature: string;
  weight: string;
  height: string;
  status: { id: number, value: string };
  comments?: string;
}
