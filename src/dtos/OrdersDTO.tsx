interface User {
    id: number;
    password: string;
    last_login: string;
    is_superuser: boolean;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_staff: boolean;
    is_active: boolean;
    date_joined: string;
}

interface Order {
    id: number;
    buyer_id: number;
    seller_id: number;
    announcement_id: number;
    address_id: number;
    created_at: string;
    status: string;
    quantity: number;
}

interface Address {
    number: string;
    complement: string;
    nickname: string;
    receiver_name: string;
    cep: string;
    neighborhood: string;
    city: string;
    state: string;
    street: string;
}

export interface OrderDetailsDTO {
    user: User;
    order: Order;
    address: Address;
}
