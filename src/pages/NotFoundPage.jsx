import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaMapMarkedAlt, FaCompass } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-neutral-50 py-20 flex items-center">
      <div className="container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto w-64 h-64 relative mb-8">
            <div className="absolute inset-0 bg-primary-100 rounded-full flex items-center justify-center">
              <FaCompass className="text-primary-600 text-7xl animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-neutral-800">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-neutral-700">
            Oops! You seem to be lost
          </h2>
          
          <p className="text-neutral-600 max-w-md mx-auto mb-8">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/"
              className="btn btn-primary flex items-center justify-center"
            >
              <FaHome className="mr-2" />
              Back to Home
            </Link>
            
            <Link
              to="/places"
              className="btn btn-outline flex items-center justify-center"
            >
              <FaMapMarkedAlt className="mr-2" />
              Explore Places
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;