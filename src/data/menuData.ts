export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular: boolean;
}

export const menuItems: MenuItem[] = [
  // Desi Delight
  {
    id: 1,
    name: "Chicken Tikka Masala",
    description: "Grilled chicken chunks in a creamy spiced tomato sauce.",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80",
    category: "Desi Delight",
    popular: true
  },
  {
    id: 2,
    name: "Vegetable Biryani",
    description: "Fragrant basmati rice cooked with mixed vegetables and aromatic spices.",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "Desi Delight",
    popular: false
  },
  {
    id: 5,
    name: "Lamb Korma",
    description: "Tender pieces of lamb in a rich, creamy sauce with cashews and mild spices.",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1545247181-516773cae754?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "Desi Delight",
    popular: false
  },
  {
    id: 8,
    name: "Chicken Biryani",
    description: "Aromatic basmati rice cooked with tender pieces of chicken and spices.",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "Desi Delight",
    popular: true
  },

  // Appetizer
  {
    id: 6,
    name: "Samosa",
    description: "Crispy pastry filled with spiced potatoes and peas.",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "Appetizer",
    popular: true
  },
  {
    id: 7,
    name: "Paneer Tikka",
    description: "Chunks of cottage cheese marinated in spices and grilled to perfection.",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "Appetizer",
    popular: false
  },

  // Thirst Quenchers
  {
    id: 4,
    name: "Mango Lassi",
    description: "Sweet and refreshing yogurt-based drink with mango pulp.",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1527761939622-933c22a8b034?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "Thirst Quenchers",
    popular: true
  },

  // Ghar Ki Mithaas (New Additions)
  {
    id: 9,
    name: "Mathri",
    description: "Crispy and salty snack perfect with chai.",
    price: 2.5,
    image: "/images/mathri.jpg",
    category: "Ghar Ki Mithaas",
    popular: false
  },
  {
    id: 10,
    name: "Gathiya",
    description: "Soft besan sticks, mildly spiced and addictive.",
    price: 2.5,
    image: "/images/gathiya.jpg",
    category: "Ghar Ki Mithaas",
    popular: false
  },
  {
    id: 11,
    name: "Kheeche",
    description: "Traditional crunchy rice snack from Rajasthan.",
    price: 2.0,
    image: "/images/kheeche.jpg",
    category: "Ghar Ki Mithaas",
    popular: false
  }
];