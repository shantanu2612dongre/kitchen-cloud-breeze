
import React from 'react';
import { Button } from '@/components/ui/button';

const AboutUsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="card-3d bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden mb-10 animate-fade-in">
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">About Kitchen Cloud</h1>
            
            <div className="prose dark:prose-invert max-w-none mb-8">
              <h2 className="text-2xl font-semibold text-primary mb-4">Our Story</h2>
              <p className="mb-4">
                Kitchen Cloud was founded in 2023 with a vision to revolutionize the food delivery experience. In a world where convenience often comes at the cost of quality, we set out to create a cloud kitchen that delivers exceptional culinary experiences right to your doorstep.
              </p>
              
              <h2 className="text-2xl font-semibold text-primary mb-4">Our Mission</h2>
              <p className="mb-4">
                At Kitchen Cloud, our mission is to combine the convenience of food delivery with the quality of a fine dining experience. We believe that everyone deserves access to delicious, nutritious meals prepared with care and delivered with efficiency.
              </p>
              
              <h2 className="text-2xl font-semibold text-primary mb-4">What Sets Us Apart</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-medium text-lg mb-2 text-secondary">Quality Ingredients</h3>
                  <p>We source only the freshest, highest-quality ingredients, supporting local farmers and sustainable practices wherever possible.</p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-medium text-lg mb-2 text-secondary">Culinary Expertise</h3>
                  <p>Our team of professional chefs brings years of experience from top restaurants, ensuring every dish meets our exacting standards.</p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-medium text-lg mb-2 text-secondary">Technological Innovation</h3>
                  <p>Our state-of-the-art ordering system and logistics network ensure your food arrives promptly and in perfect condition.</p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-medium text-lg mb-2 text-secondary">Customer-First Approach</h3>
                  <p>We listen to our customers, constantly refining our menu and service based on your feedback and preferences.</p>
                </div>
              </div>
              
              <h2 className="text-2xl font-semibold text-primary mb-4">Our Process</h2>
              <p className="mb-8">
                From the moment you place your order to the second it arrives at your door, we maintain strict quality control. Our centralized kitchen allows us to optimize operations without compromising on taste or freshness. Our dedicated delivery team ensures your food reaches you in perfect condition, maintaining temperature and presentation throughout the journey.
              </p>
              
              <div className="bg-primary/10 p-6 rounded-lg mb-8">
                <h2 className="text-2xl font-semibold text-primary mb-2">Join Us On Our Journey</h2>
                <p className="mb-4">
                  We're more than just a food delivery service—we're building a community of food lovers who value quality, convenience, and sustainability. Whether you're ordering for a quiet night in or catering for a special event, Kitchen Cloud is here to elevate your dining experience.
                </p>
                <Button 
                  className="mt-2 hover:scale-105 transition-transform" 
                  onClick={() => window.location.href = '/menu'}
                >
                  Explore Our Menu
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
