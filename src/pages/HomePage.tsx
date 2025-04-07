
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowRight, UtensilsCrossed, Clock, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { menuService } from '../services/api';
import { MenuItem } from '../data/menuData';

const HomePage = () => {
  const [popularItems, setPopularItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchPopularItems = async () => {
      const items = await menuService.getMenuItems();
      setPopularItems(items.filter(item => item.popular).slice(0, 3));
    };

    fetchPopularItems();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-culinary-600 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-culinary-800 to-culinary-600 opacity-90"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Delicious Food Delivered To Your Door</h1>
            <p className="text-lg md:text-xl mb-8">Experience restaurant-quality meals prepared in our cloud kitchen, delivered fresh and hot to your location.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-white text-culinary-700 hover:bg-gray-100 px-6 py-3 rounded-md text-lg">
                <Link to="/menu">
                  Order Now <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="border-white text-white hover:bg-white/10 px-6 py-3 rounded-md text-lg">
                <Link to="/menu">
                  View Menu
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-culinary-100 text-culinary-600 mb-4">
                <UtensilsCrossed />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Ingredients</h3>
              <p className="text-gray-600">We use only the freshest ingredients to prepare our delicious meals.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-culinary-100 text-culinary-600 mb-4">
                <Clock />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Your order will be delivered to your doorstep in 30 minutes or less.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-culinary-100 text-culinary-600 mb-4">
                <Truck />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Delivery</h3>
              <p className="text-gray-600">Free delivery on all orders over $20 within our service area.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Popular Items</h2>
            <Link to="/menu" className="text-culinary-600 hover:text-culinary-700 flex items-center">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md food-item-shadow hover:shadow-lg transition-shadow">
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-culinary-600">${item.price.toFixed(2)}</span>
                    <Button asChild>
                      <Link to="/menu">Order Now</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-kitchen-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">Explore our menu and enjoy delicious meals delivered right to your doorstep.</p>
          <Button asChild className="bg-culinary-500 hover:bg-culinary-600 text-white px-8 py-3 rounded-md text-lg">
            <Link to="/menu">View Menu</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
