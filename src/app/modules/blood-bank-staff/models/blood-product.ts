export interface BloodProduct {
  id: number;
  barcode: string;
  blood_group: { id: number, value: string };
  product_type: { id: number, value: string };
  storage_location: {id: number, value: string};
  donor_activity_id: number;
}
