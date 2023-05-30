export type PaymentMethod = "pix" | "card" | "deposit" | "cash" | "boleto";

export const paymentMethods: PaymentMethod[] = ["pix", "card", "deposit", "cash", "boleto"];

export type ListingDTO = {
    id? : string;
    user_id?: string;
    name: string;
    description: string;
    is_new: boolean;
    price: number;
    accept_trade: boolean;
    payment_methods: PaymentMethod[];
}