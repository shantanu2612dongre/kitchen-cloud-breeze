
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowRight, UtensilsCrossed, Clock, Truck } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { menuService } from '../services/api';
import { MenuItem } from '../data/menuData';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

const HomePage = () => {
  const [popularItems, setPopularItems] = useState<MenuItem[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPopularItems = async () => {
      const items = await menuService.getMenuItems();
      setPopularItems(items.filter(item => item.popular).slice(0, 3));
    };

    fetchPopularItems();
    
    // Simple parallax effect for hero section
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollPosition = window.scrollY;
        heroRef.current.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with 3D-like Background */}
      <section 
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center"
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10"></div>
        
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"></div>
        
        {/* Floating food elements */}
        <div className="absolute right-[10%] top-[20%] animate-float delay-100 hidden lg:block">
          <div className="w-24 h-24 rounded-full bg-contain bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80')] shadow-xl"></div>
        </div>
        <div className="absolute right-[30%] bottom-[30%] animate-float delay-300 hidden lg:block">
          <div className="w-16 h-16 rounded-full bg-contain bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80')] shadow-xl"></div>
        </div>
        <div className="absolute left-[15%] bottom-[20%] animate-float delay-200 hidden lg:block">
          <div className="w-20 h-20 rounded-full bg-contain bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80')] shadow-xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
                <span className="block">Delicious Food,</span>
                <span className="block text-primary">Delivered Fast.</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl">
                Experience restaurant-quality meals prepared in our cloud kitchen, delivered fresh and hot to your location.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-base group">
                  <Link to="/menu">
                    Order Now
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" asChild size="lg" className="border-white text-white hover:bg-white/10 text-base">
                  <Link to="/menu">
                    View Menu
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with 3D Cards */}
      <section className="py-20 bg-gradient-to-b from-background to-gray-50 dark:from-background dark:to-gray-900/40">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 relative">
            <span className="relative inline-block">
              Why Choose Us
              <div className="absolute -bottom-3 left-0 right-0 h-1 bg-primary rounded-full"></div>
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="card-3d bg-white dark:bg-gray-800 p-8 rounded-xl text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-6">
                <UtensilsCrossed className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Premium Ingredients</h3>
              <p className="text-gray-600 dark:text-gray-300">We use only the freshest ingredients sourced from local farms and premium suppliers.</p>
            </div>
            
            <div className="card-3d bg-white dark:bg-gray-800 p-8 rounded-xl text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-secondary/10 text-secondary mb-6">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Lightning Fast</h3>
              <p className="text-gray-600 dark:text-gray-300">Your order will be prepared and delivered in 30 minutes or less, guaranteed hot and fresh.</p>
            </div>
            
            <div className="card-3d bg-white dark:bg-gray-800 p-8 rounded-xl text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-accent/10 text-accent mb-6">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Free Delivery</h3>
              <p className="text-gray-600 dark:text-gray-300">Enjoy free delivery on all orders over $25 within our service area. No hidden fees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Items Section with Hover Cards */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold relative">
              <span className="relative inline-block">
                Popular Dishes
                <div className="absolute -bottom-3 left-0 right-0 h-1 bg-primary rounded-full"></div>
              </span>
            </h2>
            <Link to="/menu" className="text-primary hover:text-primary/90 flex items-center group">
              View All 
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 stagger-grid">
            {popularItems.map((item, index) => (
              <HoverCard key={item.id}>
                <HoverCardTrigger asChild>
                  <div className="food-card bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="relative h-60 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      />
                      {item.category && (
                        <span className="absolute top-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                          {item.category}
                        </span>
                      )}
                    </div>
                    <div className="p-6 food-card-inner">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold">{item.name}</h3>
                        <span className="text-lg font-bold text-primary">${item.price.toFixed(2)}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{item.description}</p>
                      <Button asChild className="w-full">
                        <Link to="/menu">Order Now</Link>
                      </Button>
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 p-0 overflow-hidden">
                  <div className="h-40">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold mb-1">{item.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-primary">${item.price.toFixed(2)}</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Ready in 20 min
                      </span>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with 3D Effect */}
      <section className="relative py-20">
        {/* Background with Gradient Overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1615719413546-198b25453f85?ixlib=rb-4.0.3&auto=format&fit=crop&w=2936&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-primary/90 mix-blend-multiply"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto transform hover:scale-[1.01] transition-transform">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to Order?</h2>
            <p className="text-xl mb-8 text-white/90">Explore our menu and enjoy delicious meals delivered right to your doorstep.</p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-lg">
              <Link to="/menu">View Full Menu</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
