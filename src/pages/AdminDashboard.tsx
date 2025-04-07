
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { authService, orderService, menuService } from '../services/api';
import { useToast } from "../hooks/use-toast";
import { MenuItem } from '../data/menuData';
import { Order } from '../data/orderData';
import { 
  ShoppingBag, 
  Users, 
  DollarSign, 
  BarChart3, 
  Edit, 
  Trash2, 
  Plus,
  X,
  Save
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState<Order[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState<MenuItem | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated and is admin
    const user = authService.getCurrentUser();
    if (!authService.isAuthenticated() || !user || user.name !== 'Admin') {
      toast({
        title: "Access Denied",
        description: "You need to be logged in as an admin to access this page.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    setIsAdmin(true);

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [ordersData, menuData] = await Promise.all([
          orderService.getOrders(),
          menuService.getMenuItems()
        ]);
        
        setOrders(ordersData);
        setMenuItems(menuData);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        toast({
          title: "Failed to load data",
          description: "There was an error loading the dashboard data.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate, toast]);

  const handleEditItem = (item: MenuItem) => {
    setCurrentEditItem({...item});
    setIsEditModalOpen(true);
  };

  const handleAddNewItem = () => {
    const newItem: MenuItem = {
      id: Math.max(0, ...menuItems.map(item => item.id)) + 1,
      name: '',
      description: '',
      price: 0,
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
      category: 'Main Course',
      popular: false
    };
    
    setCurrentEditItem(newItem);
    setIsEditModalOpen(true);
  };

  const handleSaveItem = () => {
    if (!currentEditItem) return;
    
    if (currentEditItem.name.trim() === '') {
      toast({
        title: "Validation Error",
        description: "Item name cannot be empty",
        variant: "destructive"
      });
      return;
    }

    const isNewItem = !menuItems.some(item => item.id === currentEditItem.id);
    
    if (isNewItem) {
      setMenuItems([...menuItems, currentEditItem]);
      toast({
        title: "Item Added",
        description: `${currentEditItem.name} has been added to the menu.`
      });
    } else {
      setMenuItems(menuItems.map(item => 
        item.id === currentEditItem.id ? currentEditItem : item
      ));
      toast({
        title: "Item Updated",
        description: `${currentEditItem.name} has been updated.`
      });
    }
    
    setIsEditModalOpen(false);
    setCurrentEditItem(null);
  };

  const handleDeleteItem = (itemId: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setMenuItems(menuItems.filter(item => item.id !== itemId));
      toast({
        title: "Item Deleted",
        description: "The menu item has been removed."
      });
    }
  };

  const handleUpdateOrderStatus = (orderId: number, newStatus: 'Delivered' | 'In Progress' | 'Cancelled') => {
    setOrders(orders.map(order => 
      order.id === orderId ? {...order, status: newStatus} : order
    ));
    
    toast({
      title: "Status Updated",
      description: `Order #${orderId} status changed to ${newStatus}.`
    });
  };

  if (!isAdmin) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-culinary-500"></div>
      </div>
    );
  }

  // Calculate dashboard metrics
  const totalOrders = orders.length;
  const completedOrders = orders.filter(order => order.status === 'Delivered').length;
  const inProgressOrders = orders.filter(order => order.status === 'In Progress').length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'dashboard' 
              ? 'bg-culinary-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'orders' 
              ? 'bg-culinary-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab('menu')}
          className={`px-4 py-2 rounded-md ${
            activeTab === 'menu' 
              ? 'bg-culinary-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Menu Management
        </button>
      </div>
      
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Orders</p>
                <h3 className="text-2xl font-bold">{totalOrders}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <h3 className="text-2xl font-bold">${totalRevenue.toFixed(2)}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="rounded-full bg-culinary-100 p-3 mr-4">
                <BarChart3 className="h-6 w-6 text-culinary-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Completed Orders</p>
                <h3 className="text-2xl font-bold">{completedOrders}</h3>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="rounded-full bg-yellow-100 p-3 mr-4">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Orders</p>
                <h3 className="text-2xl font-bold">{inProgressOrders}</h3>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'orders' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : order.status === 'In Progress' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.items.length} items
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <select 
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(
                          order.id, 
                          e.target.value as 'Delivered' | 'In Progress' | 'Cancelled'
                        )}
                        className="mr-2 border-gray-300 rounded-md text-xs"
                      >
                        <option value="In Progress">In Progress</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {activeTab === 'menu' && (
        <div>
          <div className="flex justify-end mb-4">
            <Button 
              onClick={handleAddNewItem}
              className="flex items-center"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add New Item
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <span className="font-bold text-culinary-600">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1 mb-2">{item.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEditItem(item)}
                        className="p-1 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Edit Modal */}
      {isEditModalOpen && currentEditItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                {menuItems.some(item => item.id === currentEditItem.id) 
                  ? 'Edit Menu Item' 
                  : 'Add New Menu Item'
                }
              </h3>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={currentEditItem.name}
                  onChange={(e) => setCurrentEditItem({...currentEditItem, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={currentEditItem.description}
                  onChange={(e) => setCurrentEditItem({...currentEditItem, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    id="price"
                    value={currentEditItem.price}
                    onChange={(e) => setCurrentEditItem({...currentEditItem, price: parseFloat(e.target.value) || 0})}
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    value={currentEditItem.category}
                    onChange={(e) => setCurrentEditItem({...currentEditItem, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="Main Course">Main Course</option>
                    <option value="Appetizer">Appetizer</option>
                    <option value="Beverage">Beverage</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Bread">Bread</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  id="image"
                  value={currentEditItem.image}
                  onChange={(e) => setCurrentEditItem({...currentEditItem, image: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="popular"
                  checked={currentEditItem.popular}
                  onChange={(e) => setCurrentEditItem({...currentEditItem, popular: e.target.checked})}
                  className="h-4 w-4 text-culinary-600 focus:ring-culinary-500 border-gray-300 rounded"
                />
                <label htmlFor="popular" className="ml-2 block text-sm text-gray-900">
                  Mark as Popular
                </label>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button 
                variant="outline" 
                onClick={() => setIsEditModalOpen(false)}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveItem}
                className="flex items-center"
              >
                <Save className="h-4 w-4 mr-1" />
                Save Item
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
