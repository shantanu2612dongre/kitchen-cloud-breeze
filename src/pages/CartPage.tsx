
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();

  // Calculate tax and total
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const deliveryFee = subtotal > 0 ? 3.99 : 0;
  const total = subtotal + tax + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added any items to your cart yet.</p>
        <Button asChild>
          <Link to="/menu">Browse Menu</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Cart Items</h2>
              <Button 
                variant="ghost" 
                className="text-red-500 hover:text-red-700 flex items-center"
                onClick={clearCart}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear Cart
              </Button>
            </div>
            
            <div className="divide-y">
              {items.map((item) => (
                <div key={item.id} className="py-4 flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-gray-500 text-sm mb-2">{item.description}</p>
                    <p className="text-culinary-600 font-semibold">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-3">
                    <div className="flex items-center">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 border rounded-md hover:bg-gray-100"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="mx-3 min-w-[2rem] text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 border rounded-md hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm flex items-center"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-culinary-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <Button asChild className="w-full mt-6">
              <Link to="/checkout">Proceed to Checkout</Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full mt-3">
              <Link to="/menu">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
