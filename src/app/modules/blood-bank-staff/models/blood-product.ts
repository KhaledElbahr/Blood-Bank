export interface BloodProduct {
  id: number;
  barcode: string;
  blood_group_id: { id: number, value: string };
  blood_group: string;
  product_type_id: { id: number, value: string };
  product_type: string;
  storage_location_id: { id: number, value: string };
  storage_location: string;
  donor_activity_id: number;
}
