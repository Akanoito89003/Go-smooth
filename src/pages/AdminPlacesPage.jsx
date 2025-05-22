import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaEye, FaSort, FaStar, FaFilter, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const AdminPlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    rating: 0,
    category: 'all',
  });
  const [categories, setCategories] = useState([
    { id: 'all', name: 'All' },
    { id: 'attractions', name: 'Attractions' },
    { id: 'restaurants', name: 'Restaurants' },
    { id: 'hotels', name: 'Hotels' },
    { id: 'shopping', name: 'Shopping' },
    { id: 'nature', name: 'Nature' },
  ]);
  const { currentUser } = useAuth();
  
  useEffect(() => {
    fetchPlaces();
  }, []);
  
  useEffect(() => {
    filterPlaces();
  }, [searchTerm, filters, places, sortConfig]);
  
  const fetchPlaces = async () => {
    try {
      // In a real app, we would fetch from the API
      // const response = await axios.get('/api/admin/places');
      // setPlaces(response.data);
      
      // Mock data
      setTimeout(() => {
        const placesData = [
          {
            id: 1,
            name: "Santorini, Greece",
            location: "Mediterranean",
            category: "attractions",
            status: "Active",
            addedDate: "2023-10-25",
            rating: 4.9,
          },
          {
            id: 2,
            name: "Bali, Indonesia",
            location: "Southeast Asia",
            category: "attractions",
            status: "Active",
            addedDate: "2023-10-23",
            rating: 4.8,
          },
          {
            id: 3,
            name: "Marrakech, Morocco",
            location: "North Africa",
            category: "attractions",
            status: "Pending Review",
            addedDate: "2023-10-21",
            rating: 4.5,
          },
          {
            id: 4,
            name: "Kyoto, Japan",
            location: "East Asia",
            category: "attractions",
            status: "Active",
            addedDate: "2023-10-20",
            rating: 4.7,
          },
          {
            id: 5,
            name: "Barcelona, Spain",
            location: "Europe",
            category: "attractions",
            status: "Active",
            addedDate: "2023-10-18",
            rating: 4.6,
          },
          {
            id: 6,
            name: "Four Seasons Resort",
            location: "Bali, Indonesia",
            category: "hotels",
            status: "Active",
            addedDate: "2023-10-15",
            rating: 4.9,
          },
          {
            id: 7,
            name: "La Maison",
            location: "Paris, France",
            category: "restaurants",
            status: "Active",
            addedDate: "2023-10-12",
            rating: 4.7,
          },
          {
            id: 8,
            name: "Central Park",
            location: "New York City, USA",
            category: "nature",
            status: "Active",
            addedDate: "2023-10-10",
            rating: 4.8,
          },
          {
            id: 9,
            name: "The Grand Bazaar",
            location: "Istanbul, Turkey",
            category: "shopping",
            status: "Inactive",
            addedDate: "2023-10-05",
            rating: 4.6,
          },
          {
            id: 10,
            name: "Amalfi Coast",
            location: "Italy",
            category: "attractions",
            status: "Active",
            addedDate: "2023-10-01",
            rating: 4.9,
          },
        ];
        
        setPlaces(placesData);
        setFilteredPlaces(placesData);
        setLoading(false);
      }, 800);
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
        place.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by status
    if (filters.status !== 'all') {
      filtered = filtered.filter(place => place.status === filters.status);
    }
    
    // Filter by rating
    if (filters.rating > 0) {
      filtered = filtered.filter(place => place.rating >= filters.rating);
    }
    
    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter(place => place.category === filters.category);
    }
    
    // Sort
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredPlaces(filtered);
  };
  
  const handleSort = (key) => {
    let direction = 'asc';
    
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key, direction });
  };
  
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort className="ml-1 text-neutral-400" />;
    
    return sortConfig.direction === 'asc' 
      ? <FaSort className="ml-1 text-primary-600" /> 
      : <FaSort className="ml-1 text-primary-600 transform rotate-180" />;
  };
  
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedPlaces(filteredPlaces.map(place => place.id));
    } else {
      setSelectedPlaces([]);
    }
  };
  
  const handleSelectPlace = (id) => {
    if (selectedPlaces.includes(id)) {
      setSelectedPlaces(selectedPlaces.filter(placeId => placeId !== id));
    } else {
      setSelectedPlaces([...selectedPlaces, id]);
    }
  };
  
  const handleDeleteSelected = async () => {
    if (!window.confirm(`Are you sure you want to delete ${selectedPlaces.length} places?`)) {
      return;
    }
    
    try {
      // In a real app, we would call the API
      // await axios.post('/api/admin/places/delete-multiple', { ids: selectedPlaces });
      
      // For now, just update the state
      const updatedPlaces = places.filter(place => !selectedPlaces.includes(place.id));
      setPlaces(updatedPlaces);
      setSelectedPlaces([]);
      
      alert(`${selectedPlaces.length} places deleted successfully.`);
    } catch (error) {
      console.error('Error deleting places:', error);
      alert('Failed to delete places. Please try again.');
    }
  };
  
  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      status: 'all',
      rating: 0,
      category: 'all',
    });
  };
  
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-primary-600 border-t-transparent animate-spin mb-4"></div>
          <p className="text-neutral-600">Loading places...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-2 text-neutral-800">Places Management</h1>
            <p className="text-neutral-600">
              Manage all destination and place information on your platform.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-outline flex items-center"
            >
              <FaFilter className="mr-2" />
              Filters
              {(filters.status !== 'all' || filters.rating > 0 || filters.category !== 'all') && (
                <span className="ml-2 bg-primary-100 text-primary-600 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  !
                </span>
              )}
            </button>
            
            <Link to="/admin/places/new" className="btn btn-primary flex items-center">
              <FaPlus className="mr-2" />
              Add New Place
            </Link>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-card overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            {/* Search */}
            <div className="md:w-2/3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-neutral-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search places by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input pl-10"
                />
              </div>
            </div>
            
            {/* Bulk Actions */}
            <div className="md:w-1/3 flex justify-end">
              {selectedPlaces.length > 0 ? (
                <div className="flex space-x-2">
                  <span className="py-2 px-3 bg-primary-50 text-primary-700 rounded-md flex items-center">
                    {selectedPlaces.length} selected
                  </span>
                  <button
                    onClick={handleDeleteSelected}
                    className="btn bg-error-600 text-white hover:bg-error-700"
                  >
                    <FaTrash className="mr-2" />
                    Delete
                  </button>
                </div>
              ) : (
                <div>
                  <select className="input">
                    <option>Bulk Actions</option>
                    <option>Mark as Active</option>
                    <option>Mark as Inactive</option>
                    <option>Delete Selected</option>
                  </select>
                </div>
              )}
            </div>
          </div>
          
          {/* Filters */}
          {showFilters && (
            <div className="mb-6 p-4 border border-neutral-200 rounded-lg bg-neutral-50">
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
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="input"
                  >
                    <option value="all">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending Review">Pending Review</option>
                  </select>
                </div>
                
                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Minimum Rating
                  </label>
                  <select
                    value={filters.rating}
                    onChange={(e) => setFilters({ ...filters, rating: parseFloat(e.target.value) })}
                    className="input"
                  >
                    <option value="0">Any Rating</option>
                    <option value="3">3.0+</option>
                    <option value="3.5">3.5+</option>
                    <option value="4">4.0+</option>
                    <option value="4.5">4.5+</option>
                  </select>
                </div>
                
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="input"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
          
          {/* Places Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 bg-neutral-50 text-left">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedPlaces.length === filteredPlaces.length && filteredPlaces.length > 0}
                        onChange={handleSelectAll}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                      />
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      Place Name
                      {getSortIcon('name')}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('location')}
                  >
                    <div className="flex items-center">
                      Location
                      {getSortIcon('location')}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('category')}
                  >
                    <div className="flex items-center">
                      Category
                      {getSortIcon('category')}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center">
                      Status
                      {getSortIcon('status')}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('rating')}
                  >
                    <div className="flex items-center">
                      Rating
                      {getSortIcon('rating')}
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('addedDate')}
                  >
                    <div className="flex items-center">
                      Date Added
                      {getSortIcon('addedDate')}
                    </div>
                  </th>
                  <th className="px-4 py-3 bg-neutral-50 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {filteredPlaces.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-8 text-center text-neutral-500">
                      No places found. Try adjusting your filters or search term.
                    </td>
                  </tr>
                ) : (
                  filteredPlaces.map((place) => (
                    <tr key={place.id} className="hover:bg-neutral-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedPlaces.includes(place.id)}
                          onChange={() => handleSelectPlace(place.id)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-medium text-neutral-900">{place.name}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-neutral-600">
                        {place.location}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-neutral-600">
                        {categories.find(c => c.id === place.category)?.name || place.category}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          place.status === 'Active' 
                            ? 'bg-secondary-100 text-secondary-800' 
                            : place.status === 'Inactive'
                              ? 'bg-neutral-100 text-neutral-800'
                              : 'bg-accent-100 text-accent-800'
                        }`}>
                          {place.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaStar className="text-accent-400 mr-1" />
                          <span>{place.rating}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-neutral-500">
                        {place.addedDate}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        <div className="flex justify-end space-x-2">
                          <Link 
                            to={`/places/${place.id}`} 
                            className="text-primary-600 hover:text-primary-900"
                            title="View"
                          >
                            <FaEye />
                          </Link>
                          {currentUser?.role === 'admin' && (
                            <Link 
                              to={`/admin/places/${place.id}/edit`} 
                              className="text-neutral-600 hover:text-neutral-900"
                              title="Edit"
                            >
                              <FaEdit />
                            </Link>
                          )}
                          {currentUser?.role === 'admin' && (
                            <button 
                              className="text-error-600 hover:text-error-900"
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-neutral-500">
              Showing <span className="font-medium">{filteredPlaces.length}</span> of{' '}
              <span className="font-medium">{places.length}</span> places
            </div>
            
            <div className="flex space-x-1">
              <button className="px-3 py-1 border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
              </button>
              <button className="px-3 py-1 border border-primary-600 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                1
              </button>
              <button className="px-3 py-1 border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50">
                2
              </button>
              <button className="px-3 py-1 border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50">
                3
              </button>
              <button className="px-3 py-1 border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPlacesPage;