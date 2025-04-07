
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">CloudKitchen</h3>
            <p className="mb-4 text-gray-300">Delicious meals delivered right to your doorstep. Experience the taste of authentic food from our cloud kitchen.</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/menu" className="text-gray-300 hover:text-white transition-colors">Menu</Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-300 hover:text-white transition-colors">Cart</Link>
              </li>
              <li>
                <Link to="/orders" className="text-gray-300 hover:text-white transition-colors">Order History</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>123 Food Street, Kitchen City</li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: info@cloudkitchen.com</li>
              <li>Hours: 10:00 AM - 10:00 PM</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} CloudKitchen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
