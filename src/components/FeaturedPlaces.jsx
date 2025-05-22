import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';

const PlaceCard = ({ place }) => {
  return (
    <motion.div
      whileHover={{ y: -10, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-lg shadow-card overflow-hidden"
    >
      <div className="relative">
        <img
          src={place.imageUrl || 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
          alt={place.name}
          className="w-full h-52 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-lg px-2 py-1 flex items-center text-accent-600">
          <FaStar />
          <span className="ml-1 font-medium">{place.rating.toFixed(1)}</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold mb-2">{place.name}</h3>
        </div>
        
        <div className="flex items-center text-neutral-600 mb-3">
          <FaMapMarkerAlt />
          <span className="ml-1">{place.location}</span>
        </div>
        
        <p className="text-neutral-600 mb-4 line-clamp-2">
          {place.description}
        </p>
        
        <Link
          to={`/places/${place.id}`}
          className="btn btn-outline w-full"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

const FeaturedPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, we would fetch from the API
    // For now, we'll use mock data
    const fetchPlaces = async () => {
      try {
        // const response = await axios.get('/api/places/featured');
        // setPlaces(response.data);
        
        // Mock data
        setPlaces([
          {
            id: 1,
            name: "Bali, Indonesia",
            location: "Southeast Asia",
            description: "Experience tropical paradise with stunning beaches, lush rice terraces, and vibrant culture.",
            imageUrl: "https://images.pexels.com/photos/4066841/pexels-photo-4066841.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            rating: 4.8
          },
          {
            id: 2,
            name: "Santorini, Greece",
            location: "Mediterranean",
            description: "Discover whitewashed buildings with blue domes overlooking the crystal-clear Aegean Sea.",
            imageUrl: "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            rating: 4.9
          },
          {
            id: 3,
            name: "Kyoto, Japan",
            location: "East Asia",
            description: "Immerse yourself in Japanese culture with ancient temples, traditional gardens, and historic geisha districts.",
            imageUrl: "https://images.pexels.com/photos/5169174/pexels-photo-5169174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            rating: 4.7
          },
          {
            id: 4,
            name: "Marrakech, Morocco",
            location: "North Africa",
            description: "Explore vibrant markets, stunning palaces, and the gateway to the Sahara Desert.",
            imageUrl: "https://images.pexels.com/photos/4388164/pexels-photo-4388164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            rating: 4.5
          }
        ]);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching places:', error);
        setLoading(false);
      }
    };
    
    fetchPlaces();
  }, []);
  
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Discover Featured Destinations
          </h2>
          <p className="text-neutral-600 text-lg">
            Explore our handpicked selection of popular destinations loved by travelers worldwide.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border-4 border-primary-600 border-t-transparent animate-spin mb-4"></div>
              <p className="text-neutral-600">Loading featured places...</p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {places.map(place => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/places" className="btn btn-primary px-8 py-3">
                View All Destinations
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedPlaces;