export type DishCategory = 'all' | 'tagines' | 'grills' | 'classics' | 'desserts';

export interface DishPortionOption {
  id: string;
  label: string;
  extraPrice: number;
}

export interface DishAddon {
  id: string;
  label: string;
  price: number;
}

export interface Dish {
  id: string;
  name: string;
  category: Exclude<DishCategory, 'all'>;
  categoryLabel: string;
  prepTime: string;
  servingLabel: string;
  price: number;
  description: string;
  ingredients: string[];
  image: string;
  featured?: boolean;
  portions: DishPortionOption[];
  addons: DishAddon[];
}

export interface CartItem {
  cartKey: string;
  dishId: string;
  name: string;
  image: string;
  portionLabel: string;
  addons: DishAddon[];
  unitPrice: number;
  quantity: number;
}

export interface OrderReceipt {
  orderNumber: string;
  customerName: string;
  phone: string;
  district: string;
  address: string;
  paymentMethod: 'cash' | 'card';
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  estimatedTime: string;
}

export interface ReservationReceipt {
  code: string;
  name: string;
  phone: string;
  branch: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
}
