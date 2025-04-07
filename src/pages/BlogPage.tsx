
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const BlogPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-10 text-center">Kitchen Cloud Blog</h1>
        
        <div className="grid gap-8 animate-fade-in">
          {/* First Blog Post */}
          <div className="card-3d bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <div className="p-8">
              <div className="mb-4">
                <span className="inline-block bg-secondary/20 text-secondary px-3 py-1 rounded-full text-sm font-medium">Culinary Trends</span>
                <span className="text-gray-400 dark:text-gray-500 ml-4 text-sm">May 15, 2025</span>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">The Rise of Ghost Kitchens: How Cloud Kitchens Are Transforming Food Delivery</h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                The restaurant industry is undergoing a significant transformation with the emergence of ghost kitchens, also known as cloud kitchens or dark kitchens. These delivery-only restaurants operate without a physical dining space, focusing solely on preparing food for delivery. This model has gained tremendous traction, especially following the global pandemic, which accelerated the shift towards food delivery.
              </p>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Cloud kitchens offer numerous advantages, including reduced overhead costs, increased operational efficiency, and the ability to serve multiple brands from a single location. For entrepreneurs, this means lower barriers to entry and the flexibility to experiment with different culinary concepts without the financial risk associated with traditional restaurants.
              </p>
              
              <Button variant="ghost" className="group flex items-center text-primary hover:text-primary/80">
                Read More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
          
          {/* Second Blog Post */}
          <div className="card-3d bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <div className="p-8">
              <div className="mb-4">
                <span className="inline-block bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-medium">Nutrition</span>
                <span className="text-gray-400 dark:text-gray-500 ml-4 text-sm">April 28, 2025</span>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Balancing Convenience and Nutrition: The Challenge of Healthy Food Delivery</h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                As food delivery continues to dominate the dining landscape, consumers are increasingly seeking healthier options that don't compromise on taste or convenience. This growing demand has prompted cloud kitchens to innovate and expand their offerings beyond traditional takeout fare.
              </p>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                At Kitchen Cloud, we're committed to addressing this challenge by incorporating nutritious, whole-food ingredients while maintaining the convenience that our customers expect. From our carefully sourced produce to our transparent nutritional information, we're redefining what delivery food can be.
              </p>
              
              <Button variant="ghost" className="group flex items-center text-primary hover:text-primary/80">
                Read More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
