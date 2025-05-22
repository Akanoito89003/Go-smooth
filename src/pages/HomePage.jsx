import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkedAlt, FaRoute, FaStar, FaSearch } from 'react-icons/fa';

// Component imports
import FeaturedPlaces from '../components/FeaturedPlaces';
import Testimonials from '../components/Testimonials';
import HowItWorks from '../components/HowItWorks';

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-center bg-cover bg-no-repeat z-0"
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/1851481/pexels-photo-1851481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
            backgroundPosition: "center 30%"
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="container-custom relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Travel Smarter, <br />
              <span className="text-primary-400">Discover Faster</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-neutral-200">
              Find the best routes, estimate costs, and explore places with confidence using our all-in-one travel companion.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/routes" 
                className="btn btn-primary text-lg px-8 py-3"
              >
                Find Routes
              </Link>
              <Link 
                to="/places" 
                className="btn bg-white text-primary-800 hover:bg-neutral-100 text-lg px-8 py-3"
              >
                Explore Places
              </Link>
            </div>
          </motion.div>
          
          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 max-w-4xl bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20"
          >
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Where would you like to go?"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              <button className="btn btn-primary py-3 px-6">
                Search
              </button>
            </div>
          </motion.div>
        </div>
        
        {/* Bottom scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white"
        >
          <p className="mb-2 text-sm">Scroll to explore</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 bg-white rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-primary-600">TravelEase</span>
            </h2>
            <p className="text-neutral-600 text-lg">
              We simplify your travel planning with smart features designed to make your journey smoother.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-lg shadow-card p-8 text-center"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaRoute className="text-primary-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Route Planning</h3>
              <p className="text-neutral-600">
                Get the most convenient routes to your destination with accurate time and distance estimates.
              </p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-lg shadow-card p-8 text-center"
            >
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaMapMarkedAlt className="text-secondary-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Accurate Cost Estimation</h3>
              <p className="text-neutral-600">
                Plan your budget with precise travel cost calculations across different transportation options.
              </p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-lg shadow-card p-8 text-center"
            >
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaStar className="text-accent-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Trusted Reviews</h3>
              <p className="text-neutral-600">
                Make informed decisions with authentic ratings and reviews from fellow travelers.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <HowItWorks />
      
      {/* Featured Places Section */}
      <FeaturedPlaces />
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* CTA Section */}
      <section className="bg-primary-700 py-20 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Simplify Your Travel Planning?
          </h2>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-8">
            Join thousands of travelers who are already enjoying stress-free journey planning with TravelEase.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register" className="btn bg-white text-primary-700 hover:bg-neutral-100 text-lg px-8 py-3">
              Sign Up Now
            </Link>
            <Link to="/routes" className="btn border-2 border-white text-white hover:bg-primary-600 text-lg px-8 py-3">
              Try Route Finder
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;