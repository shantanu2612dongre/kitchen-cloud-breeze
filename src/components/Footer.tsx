
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Logo and Social Media */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Kitchen Cloud</h3>
            <p className="mt-2 text-gray-300 max-w-md">Delicious meals delivered right to your doorstep. Experience the taste of authentic food from our cloud kitchen.</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="https://facebook.com" className="transform hover:scale-110 transition-transform duration-200 text-gray-300 hover:text-primary">
              <Facebook size={24} />
            </a>
            <a href="https://twitter.com" className="transform hover:scale-110 transition-transform duration-200 text-gray-300 hover:text-primary">
              <Twitter size={24} />
            </a>
            <a href="https://instagram.com" className="transform hover:scale-110 transition-transform duration-200 text-gray-300 hover:text-primary">
              <Instagram size={24} />
            </a>
          </div>
        </div>
        
        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-gray-800">
          <div>
            <h4 className="text-lg font-semibold mb-4 relative inline-block">
              Quick Links
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors hover:underline">Home</Link>
              </li>
              <li>
                <Link to="/menu" className="text-gray-300 hover:text-white transition-colors hover:underline">Menu</Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-300 hover:text-white transition-colors hover:underline">Cart</Link>
              </li>
              <li>
                <Link to="/orders" className="text-gray-300 hover:text-white transition-colors hover:underline">Order History</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 relative inline-block">
              Contact Us
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                <span className="text-gray-300">123 Food Street, Kitchen City, CA 94538</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                <span className="text-gray-300">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                <span className="text-gray-300">info@kitchencloud.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 relative inline-block">
              Opening Hours
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
            </h4>
            <div className="space-y-2">
              <p className="text-gray-300">Monday - Friday: 10:00 AM - 10:00 PM</p>
              <p className="text-gray-300">Saturday - Sunday: 11:00 AM - 11:00 PM</p>
              <p className="mt-4 text-gray-400 text-sm">Delivery available within 5 miles of our location</p>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 mt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Kitchen Cloud. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2 text-sm">
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
