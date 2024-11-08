import { PaymentMethod } from "@dtos/PaymentMethodsDTO";
export type ListingDTO = {
  id: number;
  title: string;
  description: string;
  condition: string;
  price: string;
  product_id: number;
  product?: ProductDTO;
  seller_id: number;
  status: "activated" | "disabled";
  created: Date;
  updated: Date;
  quantity: number;
  product_image: string;
  seller_profile: {
    photo: string;
  };
  seller: {
    username: string;
    first_name: string;
    last_name: string;
    id: number;
  }
};

export type ProductDTO = {
  id: number;
  name: string;
  study_area: string;
  published_at: number;
  author: string;
  image: string | null;
}

export type createListingDTO = {
  title: string;
  description: string;
  is_new: boolean;
  price: number;
  quantity: number;
} & ProductDTO;
