
import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem } from '../data/menuData';
import { toast } from '../hooks/use-toast';

interface CartItem extends MenuItem {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (item: MenuItem) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(i => i.id === item.id);
      
      if (existingItem) {
        toast({
          title: 'Item already in cart',
          description: `Increased ${item.name} quantity by 1`,
        });
        
        return currentItems.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 } 
            : i
        );
      } else {
        toast({
          title: 'Item added to cart',
          description: `Added ${item.name} to your cart`,
        });
        
        return [...currentItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId: number) => {
    setItems(currentItems => {
      const itemToRemove = currentItems.find(i => i.id === itemId);
      
      if (itemToRemove) {
        toast({
          title: 'Item removed',
          description: `Removed ${itemToRemove.name} from your cart`,
        });
      }
      
      return currentItems.filter(i => i.id !== itemId);
    });
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setItems(currentItems => 
      currentItems.map(i => 
        i.id === itemId 
          ? { ...i, quantity } 
          : i
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: 'Cart cleared',
      description: 'All items have been removed from your cart',
    });
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );

  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        totalItems,
        subtotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
