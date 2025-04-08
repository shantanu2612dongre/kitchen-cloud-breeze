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
    // Desi Delight Section
    {
      id: 1,
      name: 'Sabudana Khichdi',
      description: 'Light, nutty khichdi made with sago pearls, peanuts & mild spices.',
      price: 80,
      image: '/images/sabudana_khichdi.jpg',
      category: 'Desi Delight',
      popular: true
    },
    {
      id: 2,
      name: 'Poha',
      description: 'Flattened rice tempered with mustard seeds, turmeric & garnished with sev.',
      price: 60,
      image: '/images/poha.jpg',
      category: 'Desi Delight',
      popular: false
    },
    {
      id: 3,
      name: 'Pav Bhaji',
      description: 'Spicy mashed veggie curry served with buttery toasted pav.',
      price: 120,
      image: '',
      category: 'Desi Delight',
      popular: false
    },
  
    // Thirst Quenchers Section
    {
      id: 4,
      name: 'Thandai',
      description: 'Chilled milk infused with almonds, spices, and saffron. Traditional & refreshing!',
      price: 70,
      image: '/images/thandai.jpg',
      category: 'Thirst Quenchers',
      popular: false
    },
    {
      id: 5,
      name: 'Mango Lassi',
      description: 'A rich blend of mango and yogurt, sweet and thick.',
      price: 60,
      image: '/images/mango_lassi.jpg',
      category: 'Thirst Quenchers',
      popular: true
    },
    {
      id: 6,
      name: 'Chaanch (Buttermilk)',
      description: 'Cool and light spiced buttermilk to refresh your soul.',
      price: 40,
      image: '/images/chaach.jpg',
      category: 'Thirst Quenchers',
      popular: false
    },
  
    // Ghar Ki Mithaas Section
    {
      id: 7,
      name: 'Mathri',
      description: 'Crispy and salty snack perfect with chai.',
      price: 30,
      image: '/images/mathri.jpg',
      category: 'Ghar Ki Mithaas',
      popular: true
    },
    {
      id: 8,
      name: 'Gathiya',
      description: 'Soft besan sticks, mildly spiced and addictive.',
      price: 30,
      image: '/images/gathiya.jpg',
      category: 'Ghar Ki Mithaas',
      popular: false
    },
    {
      id: 9,
      name: 'Kheeche',
      description: 'Traditional crunchy rice snack from Rajasthan.',
      price: 60,
      image: '/images/kheeche.jpg',
      category: 'Ghar Ki Mithaas',
      popular: false
    },
  ];