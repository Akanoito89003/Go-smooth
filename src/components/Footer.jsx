import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkedAlt, FaRoute, FaHeart, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      {/* Main Footer */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <Link to="/" className="text-white text-2xl font-bold flex items-center mb-4">
              TravelEase
            </Link>
            <p className="text-neutral-400 mb-4">
              Simplifying travel planning with smart route recommendations, accurate cost estimates, and trusted reviews.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-400 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/places" className="text-neutral-400 hover:text-white transition">
                  Explore Places
                </Link>
              </li>
              <li>
                <Link to="/routes" className="text-neutral-400 hover:text-white transition">
                  Find Routes
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div className="col-span-1">
            <h3 className="text-white text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="col-span-1 md:col-span-3 lg:col-span-1">
            <h3 className="text-white text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-neutral-400 mb-4">
              Subscribe to our newsletter for travel tips and exclusive offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-md focus:outline-none bg-neutral-800 text-neutral-200 border-neutral-700 border"
              />
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 transition text-white px-4 py-2 rounded-r-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="bg-neutral-950 py-4">
        <div className="container-custom flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500 text-sm">
            &copy; {currentYear} TravelEase. All rights reserved.
          </p>
          <p className="text-neutral-500 text-sm flex items-center mt-2 md:mt-0">
            Made with <FaHeart className="text-primary-600 mx-1" size={14} /> for travelers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;