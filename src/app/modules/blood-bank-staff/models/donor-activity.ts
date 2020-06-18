export interface DonorActivity {
  id: number;
  donor_id: number;
  full_name: string;
  product_type: { id: number, value: string };
  viruses: string[];
  temp: string;
  weight: string;
  height: string;
  status: { id: number, value: string };
  comments: string;
}
