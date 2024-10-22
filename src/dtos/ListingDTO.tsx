import { PaymentMethod } from "@dtos/PaymentMethodsDTO";
export type ListingDTO = {
  id: number;
  title: string;
  description: string;
  condition: string;
  price: string;
  product_id: number;
  product?: {
    id: 1;
    name: string;
    study_area: string;
    published_at: number;
    author: string;
    image: string | null;
  };
  seller_id: number;
  status: "activated" | "disabled";
  created: Date;
  updated: Date;
};
