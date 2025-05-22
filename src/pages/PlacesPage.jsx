import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaMapMarkerAlt, FaSearch, FaFilter, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const categories = [
  { id: 'all', name: 'All' },
  { id: 'attractions', name: 'Attractions' },
  { id: 'restaurants', name: 'Restaurants' },
  { id: 'hotels', name: 'Hotels' },
  { id: 'shopping', name: 'Shopping' },
  { id: 'nature', name: 'Nature' },
];

const PlaceCard = ({ place, currentUser }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white rounded-lg shadow-card overflow-hidden"
    >
      <Link to={`/places/${place.id}`}>
        <div className="relative">
          <img
            src={place.imageUrl || 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
            alt={place.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-lg px-2 py-1 flex items-center text-accent-600">
            <FaStar />
            <span className="ml-1 font-medium">{place.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1">{place.name}</h3>
          
          <div className="flex items-center text-neutral-600 mb-2">
            <FaMapMarkerAlt className="mr-1 text-neutral-400" />
            <span className="text-sm">{place.location}</span>
          </div>
          
          <p className="text-neutral-600 text-sm mb-3 line-clamp-2">
            {place.description}
          </p>
          
          <div className="flex flex-wrap gap-1">
            {place.tags.map((tag, index) => (
              <span 
                key={index}
                className="inline-block bg-primary-50 text-primary-700 text-xs px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {currentUser && (
            <div>
              <button>Add Review</button>
            </div>
          )}
          {currentUser?.role === 'admin' && (
            <div>
              <Link to={`/admin/places/${place.id}/edit`} className="text-primary-600 text-sm hover:text-primary-800 flex items-center">
                Edit
              </Link>
              <button className="text-primary-600 text-sm hover:text-primary-800 flex items-center">
                Delete
              </button>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    rating: 0,
    priceRange: [0, 5],
  });
  
  const { currentUser } = useAuth();
  
  useEffect(() => {
    fetchPlaces();
  }, []);
  
  useEffect(() => {
    filterPlaces();
  }, [searchTerm, activeCategory, filters, places]);
  
  const fetchPlaces = async () => {
    try {
      // In a real app, we would fetch from the API
      // const response = await axios.get('/api/places');
      // setPlaces(response.data);
      
      // Mock data for demo
      const placesData = [
        {
          id: 1,
          name: "Bali, Indonesia",
          location: "Southeast Asia",
          description: "Experience tropical paradise with stunning beaches, lush rice terraces, and vibrant culture.",
          imageUrl: "https://images.pexels.com/photos/4066841/pexels-photo-4066841.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          rating: 4.8,
          category: "attractions",
          priceLevel: 3,
          tags: ["Beach", "Cultural", "Nature"]
        },
        {
          id: 2,
          name: "Santorini, Greece",
          location: "Mediterranean",
          description: "Discover whitewashed buildings with blue domes overlooking the crystal-clear Aegean Sea.",
          imageUrl: "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          rating: 4.9,
          category: "attractions",
          priceLevel: 4,
          tags: ["Island", "Romantic", "Views"]
        },
        {
          id: 3,
          name: "Kyoto, Japan",
          location: "East Asia",
          description: "Immerse yourself in Japanese culture with ancient temples, traditional gardens, and historic geisha districts.",
          imageUrl: "https://images.pexels.com/photos/5169174/pexels-photo-5169174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          rating: 4.7,
          category: "attractions",
          priceLevel: 3,
          tags: ["Cultural", "Historical", "Temples"]
        },
        {
          id: 4,
          name: "Marrakech, Morocco",
          location: "North Africa",
          description: "Explore vibrant markets, stunning palaces, and the gateway to the Sahara Desert.",
          imageUrl: "https://images.pexels.com/photos/4388164/pexels-photo-4388164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          rating: 4.5,
          category: "attractions",
          priceLevel: 2,
          tags: ["Market", "Cultural", "Desert"]
        },
        {
          id: 5,
          name: "Four Seasons Resort",
          location: "Bali, Indonesia",
          description: "Luxurious resort with private villas, stunning infinity pools and exceptional service.",
          imageUrl: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          rating: 4.9,
          category: "hotels",
          priceLevel: 5,
          tags: ["Luxury", "Resort", "Spa"]
        },
        {
          id: 6,
          name: "La Maison",
          location: "Paris, France",
          description: "Elegant fine dining restaurant serving classic French cuisine with a modern twist.",
          imageUrl: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          rating: 4.7,
          category: "restaurants",
          priceLevel: 4,
          tags: ["Fine Dining", "French", "Elegant"]
        },
        {
          id: 7,
          name: "Central Park",
          location: "New York City, USA",
          description: "Urban oasis with walking paths, lakes, and recreational areas in the heart of Manhattan.",
          imageUrl: "https://images.pexels.com/photos/2225442/pexels-photo-2225442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          rating: 4.8,
          category: "nature",
          priceLevel: 1,
          tags: ["Park", "Urban", "Recreation"]
        },
        {
          id: 8,
          name: "The Grand Bazaar",
          location: "Istanbul, Turkey",
          description: "One of the world's oldest and largest covered markets with over 4,000 shops.",
          imageUrl: "https://images.pexels.com/photos/2846217/pexels-photo-2846217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          rating: 4.6,
          category: "shopping",
          priceLevel: 2,
          tags: ["Market", "Shopping", "Cultural"]
        },
      ];
      
      setPlaces(placesData);
      setFilteredPlaces(placesData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching places:', error);
      setLoading(false);
    }
  };
  
  const filterPlaces = () => {
    let filtered = [...places];
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(place => 
        place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        place.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        place.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        place.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(place => place.category === activeCategory);
    }
    
    // Filter by rating
    if (filters.rating > 0) {
      filtered = filtered.filter(place => place.rating >= filters.rating);
    }
    
    // Filter by price range
    filtered = filtered.filter(place => 
      place.priceLevel >= filters.priceRange[0] && 
      place.priceLevel <= filters.priceRange[1]
    );
    
    setFilteredPlaces(filtered);
  };
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };
  
  const handleRatingChange = (rating) => {
    setFilters({
      ...filters,
      rating
    });
  };
  
  const handlePriceRangeChange = (event, newValue) => {
    setFilters({
      ...filters,
      priceRange: newValue
    });
  };
  
  const resetFilters = () => {
    setSearchTerm('');
    setActiveCategory('all');
    setFilters({
      rating: 0,
      priceRange: [0, 5],
    });
  };
  
  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Amazing Places
          </h1>
          <p className="text-neutral-600 text-lg">
            Discover destinations, hotels, restaurants, and attractions from around the world.
          </p>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-card p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between gap-4">
            {/* Search Bar */}
            <div className="lg:w-2/3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-neutral-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search places, locations, or tags..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="input pl-10"
                />
              </div>
            </div>
            
            {/* Filter Toggle Button */}
            <div className="lg:w-1/3 flex justify-end">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn btn-outline"
              >
                <FaFilter className="mr-2" />
                Filters
                {(filters.rating > 0 || filters.priceRange[0] > 0 || filters.priceRange[1] < 5) && (
                  <span className="ml-2 bg-primary-100 text-primary-600 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    !
                  </span>
                )}
              </button>
            </div>
          </div>
          
          {/* Extended Filters */}
          {showFilters && (
            <div className="mt-6 border-t border-neutral-200 pt-6">
              <div className="flex justify-between mb-4">
                <h3 className="font-medium">Filters</h3>
                <button
                  onClick={resetFilters}
                  className="text-primary-600 text-sm hover:text-primary-800 flex items-center"
                >
                  <FaTimes className="mr-1" />
                  Reset All
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Rating Filter */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Minimum Rating</h4>
                  <div className="flex space-x-2">
                    {[0, 3, 3.5, 4, 4.5].map(rating => (
                      <button
                        key={rating}
                        onClick={() => handleRatingChange(rating)}
                        className={`px-3 py-1 rounded-md text-sm ${
                          filters.rating === rating
                            ? 'bg-primary-600 text-white'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                      >
                        {rating === 0 ? 'Any' : `${rating}+`}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Price Range Filter */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Price Level</h4>
                  <div className="flex space-x-2">
                    {[
                      { value: [0, 5], label: 'Any' },
                      { value: [1, 2], label: '$-$$' },
                      { value: [3, 4], label: '$$$-$$$$' },
                      { value: [5, 5], label: '$$$$$' },
                    ].map((option, index) => (
                      <button
                        key={index}
                        onClick={() => setFilters({...filters, priceRange: option.value})}
                        className={`px-3 py-1 rounded-md text-sm ${
                          JSON.stringify(filters.priceRange) === JSON.stringify(option.value)
                            ? 'bg-primary-600 text-white'
                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Categories */}
        <div className="mb-8 flex overflow-x-auto pb-2 hide-scrollbar">
          <div className="flex space-x-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Places Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border-4 border-primary-600 border-t-transparent animate-spin mb-4"></div>
              <p className="text-neutral-600">Loading places...</p>
            </div>
          </div>
        ) : (
          <>
            {filteredPlaces.length === 0 ? (
              <div className="bg-white rounded-lg shadow-card p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">No places found</h3>
                <p className="text-neutral-600 mb-6">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <button
                  onClick={resetFilters}
                  className="btn btn-primary"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <p className="text-neutral-600 mb-4">Showing {filteredPlaces.length} places</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredPlaces.map(place => (
                    <PlaceCard key={place.id} place={place} currentUser={currentUser} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PlacesPage;