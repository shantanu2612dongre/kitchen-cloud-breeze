
export interface Order {
  id: number;
  date: string;
  items: OrderItem[];
  total: number;
  status: 'Delivered' | 'In Progress' | 'Cancelled';
  deliveryAddress: string;
}

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export const orderHistory: Order[] = [
  {
    id: 1001,
    date: "2025-04-05T14:30:00",
    items: [
      { id: 1, name: "Chicken Tikka Masala", price: 12.99, quantity: 2 },
      { id: 3, name: "Butter Naan", price: 2.99, quantity: 3 }
    ],
    total: 34.95,
    status: "Delivered",
    deliveryAddress: "123 Main St, Apt 4B, New York, NY 10001"
  },
  {
    id: 1002,
    date: "2025-04-06T19:15:00",
    items: [
      { id: 5, name: "Lamb Korma", price: 14.99, quantity: 1 },
      { id: 3, name: "Butter Naan", price: 2.99, quantity: 2 },
      { id: 4, name: "Mango Lassi", price: 3.99, quantity: 2 }
    ],
    total: 28.95,
    status: "In Progress",
    deliveryAddress: "456 Park Ave, Suite 201, Boston, MA 02115"
  },
  {
    id: 1003,
    date: "2025-04-01T12:45:00",
    items: [
      { id: 2, name: "Vegetable Biryani", price: 10.99, quantity: 1 },
      { id: 6, name: "Samosa", price: 4.99, quantity: 2 }
    ],
    total: 20.97,
    status: "Delivered",
    deliveryAddress: "789 Oak St, San Francisco, CA 94107"
  }
];
