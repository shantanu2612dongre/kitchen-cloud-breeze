
import { useState, useEffect } from 'react';
import { menuService } from '../services/api';
import { MenuItem } from '../data/menuData';
import { Button } from "@/components/ui/button";
import { useCart } from '../context/CartContext';
import { ShoppingCart, Search } from 'lucide-react';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setIsLoading(true);
        const items = await menuService.getMenuItems();
        setMenuItems(items);
        setFilteredItems(items);
      } catch (error) {
        console.error('Failed to fetch menu items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, []);

  // Get unique categories
  const categories = ['All', ...new Set(menuItems.map(item => item.category))];

  // Filter items based on category and search query
  useEffect(() => {
    let result = menuItems;
    
    // Apply category filter
    if (activeCategory !== 'All') {
      result = result.filter(item => item.category === activeCategory);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        item => 
          item.name.toLowerCase().includes(query) || 
          item.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredItems(result);
  }, [activeCategory, searchQuery, menuItems]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Menu</h1>
      
      {/* Search & Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 md:gap-6 justify-between">
        {/* Search Bar */}
        <div className="relative md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-culinary-500"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-culinary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-culinary-500"></div>
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md food-item-shadow hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" 
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <span className="text-lg font-bold text-culinary-600">${item.price.toFixed(2)}</span>
                </div>
                <p className="text-gray-600 mb-4 text-sm">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{item.category}</span>
                  <Button 
                    onClick={() => addToCart(item)}
                    className="flex items-center gap-1"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-xl text-gray-500 mb-4">No menu items found.</p>
          <Button onClick={() => {
            setActiveCategory('All');
            setSearchQuery('');
          }}>
            Show All Items
          </Button>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
