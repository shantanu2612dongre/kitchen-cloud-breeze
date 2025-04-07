
import { useState, useEffect } from 'react';
import { orderService } from '../services/api';
import { Order } from '../data/orderData';
import { Button } from "@/components/ui/button";
import { Clock, ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { authService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    if (!authService.isAuthenticated()) {
      navigate('/login', { state: { from: '/orders' } });
      return;
    }

    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const data = await orderService.getOrders();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const toggleOrderDetails = (orderId: number) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-culinary-500"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">No orders yet</h2>
        <p className="text-gray-500 mb-8">You haven't placed any orders yet.</p>
        <Button asChild>
          <Link to="/menu">Browse Menu</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order History</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="divide-y">
          {orders.map((order) => (
            <div key={order.id} className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center">
                    <p className="font-semibold">Order #{order.id}</p>
                    <span className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <Clock className="h-4 w-4 mr-1" />
                    {formatDate(order.date)}
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <p className="font-bold text-culinary-600">
                    ${order.total.toFixed(2)}
                  </p>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => toggleOrderDetails(order.id)}
                    className="flex items-center"
                  >
                    {expandedOrderId === order.id ? (
                      <>
                        <span className="mr-1">Hide Details</span>
                        <ChevronUp className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        <span className="mr-1">View Details</span>
                        <ChevronDown className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              {expandedOrderId === order.id && (
                <div className="mt-4 pt-4 border-t">
                  <h3 className="font-medium mb-3">Items:</h3>
                  <ul className="space-y-2">
                    {order.items.map((item) => (
                      <li key={item.id} className="flex justify-between">
                        <span>
                          {item.quantity} x {item.name}
                        </span>
                        <span className="text-gray-600">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-4 pt-4 border-t">
                    <h3 className="font-medium mb-2">Delivery Address:</h3>
                    <p className="text-gray-600">{order.deliveryAddress}</p>
                  </div>
                  
                  {order.status === 'In Progress' && (
                    <div className="mt-4">
                      <div className="bg-blue-50 text-blue-700 p-3 rounded-md flex items-start">
                        <div className="flex-shrink-0">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div className="ml-3">
                          <p className="font-medium">Your order is being prepared</p>
                          <p className="text-sm">Estimated delivery time: 30-45 minutes</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
