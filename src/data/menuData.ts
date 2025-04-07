
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
  {
    id: 1,
    name: "Chicken Tikka Masala",
    description: "Grilled chicken chunks in a creamy spiced tomato sauce.",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80",
    category: "Main Course",
    popular: true
  },
  {
    id: 2,
    name: "Vegetable Biryani",
    description: "Fragrant basmati rice cooked with mixed vegetables and aromatic spices.",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "Main Course",
    popular: false
  },
  {
    id: 3,
    name: "Butter Naan",
    description: "Soft, buttery flatbread, perfect for scooping up curries.",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1347&q=80",
    category: "Bread",
    popular: true
  },
  {
    id: 4,
    name: "Mango Lassi",
    description: "Sweet and refreshing yogurt-based drink with mango pulp.",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1527761939622-933c22a8b034?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "Beverage",
    popular: true
  },
  {
    id: 5,
    name: "Lamb Korma",
    description: "Tender pieces of lamb in a rich, creamy sauce with cashews and mild spices.",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1545247181-516773cae754?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "Main Course",
    popular: false
  },
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
  {
    id: 8,
    name: "Chicken Biryani",
    description: "Aromatic basmati rice cooked with tender pieces of chicken and spices.",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "Main Course",
    popular: true
  }
];
