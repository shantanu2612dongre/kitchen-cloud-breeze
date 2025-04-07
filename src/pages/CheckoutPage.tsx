
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from "@/components/ui/button";
import { CreditCard, Truck, CheckCircle } from 'lucide-react';
import { useToast } from "../hooks/use-toast";
import { orderService } from '../services/api';

const CheckoutPage = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'credit-card',
    saveInfo: false
  });

  // Calculate order totals
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const deliveryFee = subtotal > 0 ? 3.99 : 0;
  const total = subtotal + tax + deliveryFee;

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  // Handle order submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive"
      });
      navigate('/menu');
      return;
    }
    
    try {
      setIsProcessing(true);
      
      // Prepare order data
      const orderData = {
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone
        },
        deliveryAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
        paymentMethod: formData.paymentMethod,
        subtotal,
        tax,
        deliveryFee,
        total
      };
      
      // Submit order
      await orderService.createOrder(orderData);
      
      // Show success state
      setIsOrderPlaced(true);
      
      // Clear cart after successful order
      clearCart();
      
      // Show toast notification
      toast({
        title: "Order placed successfully!",
        description: "Your delicious food is on its way.",
      });
      
      // Redirect to order history after 3 seconds
      setTimeout(() => {
        navigate('/orders');
      }, 3000);
      
    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Failed to place order",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Show success page when order is placed
  if (isOrderPlaced) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-green-100 text-green-600 mb-6">
            <CheckCircle className="h-12 w-12" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your order. We've received your order and will begin preparing it right away.
          </p>
          <p className="text-gray-500 mb-8">
            You will be redirected to your order history in a few seconds...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            {/* Delivery Information */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Truck className="mr-2 h-5 w-5 text-culinary-600" />
                Delivery Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-culinary-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-culinary-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-culinary-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-culinary-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address*
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-culinary-500"
                    placeholder="Street address"
                  />
                </div>
                
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City*
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-culinary-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State*
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-culinary-500"
                  >
                    <option value="">Select State</option>
                    <option value="CA">California</option>
                    <option value="NY">New York</option>
                    <option value="TX">Texas</option>
                    <option value="FL">Florida</option>
                    <option value="IL">Illinois</option>
                    {/* Add more states as needed */}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code*
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-culinary-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="saveInfo"
                      checked={formData.saveInfo}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-culinary-600 focus:ring-culinary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Save this information for next time
                    </span>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-culinary-600" />
                Payment Method
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit-card"
                      checked={formData.paymentMethod === 'credit-card'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-culinary-600 focus:ring-culinary-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      Credit / Debit Card
                    </span>
                  </label>
                  
                  {formData.paymentMethod === 'credit-card' && (
                    <div className="ml-6 mt-3 grid grid-cols-1 gap-4">
                      <div>
                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-culinary-500"
                          placeholder="Card holder name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-culinary-500"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiration Date
                          </label>
                          <input
                            type="text"
                            id="expDate"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-culinary-500"
                            placeholder="MM/YY"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-culinary-500"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-culinary-600 focus:ring-culinary-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      PayPal
                    </span>
                  </label>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-culinary-600 focus:ring-culinary-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      Cash on Delivery
                    </span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="lg:hidden">
              <OrderSummary 
                subtotal={subtotal} 
                tax={tax} 
                deliveryFee={deliveryFee} 
                total={total} 
                isProcessing={isProcessing}
              />
            </div>
            
            <div className="mt-6 lg:hidden">
              <Button 
                type="submit" 
                className="w-full"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </Button>
            </div>
          </form>
        </div>
        
        {/* Order Summary */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-20">
            <OrderSummary 
              subtotal={subtotal} 
              tax={tax} 
              deliveryFee={deliveryFee} 
              total={total} 
              isProcessing={isProcessing}
            />
            
            <Button 
              onClick={handleSubmit} 
              className="w-full mt-4"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Order Summary Component
const OrderSummary = ({
  subtotal,
  tax,
  deliveryFee,
  total,
  isProcessing
}: {
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  isProcessing: boolean;
}) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
    
    <div className="space-y-3 mb-4">
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
    
    {isProcessing && (
      <div className="text-sm text-gray-500 flex items-center justify-center">
        <div className="animate-spin h-4 w-4 border-t-2 border-culinary-500 rounded-full mr-2"></div>
        Processing your order...
      </div>
    )}
  </div>
);

export default CheckoutPage;
