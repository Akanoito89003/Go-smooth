import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt, FaStar, FaEdit } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const [recentSearches, setRecentSearches] = useState([]);
  const [favoriteRoutes, setFavoriteRoutes] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
  });
  
  useEffect(() => {
    if (currentUser) {
      setProfileData({
        name: currentUser.name || '',
        email: currentUser.email || '',
      });
      
      // In a real app, you would fetch this data from your API
      fetchUserData();
    }
  }, [currentUser]);
  
  const fetchUserData = async () => {
    try {
      // In a real application, these would be separate API calls
      // For now, we'll use mock data
      
      // Mock recent searches
      setRecentSearches([
        { id: 1, origin: 'New York, NY', destination: 'Boston, MA', date: '2023-11-01' },
        { id: 2, origin: 'San Francisco, CA', destination: 'Los Angeles, CA', date: '2023-10-28' },
        { id: 3, origin: 'Chicago, IL', destination: 'Milwaukee, WI', date: '2023-10-15' },
      ]);
      
      // Mock favorite routes
      setFavoriteRoutes([
        { 
          id: 1, 
          name: 'Work Commute', 
          origin: 'Brooklyn, NY', 
          destination: 'Manhattan, NY',
          distance: '9.7 km',
          duration: '45 mins'
        },
        { 
          id: 2, 
          name: 'Weekend Getaway', 
          origin: 'New York, NY', 
          destination: 'Hamptons, NY',
          distance: '154 km',
          duration: '2.5 hours'
        },
      ]);
      
      // Mock user reviews
      setUserReviews([
        {
          id: 1,
          placeName: 'Grand Central Terminal',
          placeId: 101,
          rating: 4.5,
          comment: 'Beautiful historic landmark with excellent transportation connections.',
          date: '2023-10-10'
        },
        {
          id: 2,
          placeName: 'Central Park',
          placeId: 102,
          rating: 5,
          comment: 'A perfect escape from the city hustle. The paths are well-maintained and the views are stunning.',
          date: '2023-09-22'
        },
      ]);
      
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    try {
      // In a real app, you would make an API call to update the user's profile
      // For now, we'll just simulate success
      
      setIsEditing(false);
      // You would normally update the user in context here
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - User Info */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-card overflow-hidden">
              <div className="bg-primary-600 h-32 relative">
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                  <div className="w-32 h-32 rounded-full bg-white p-2">
                    <div className="w-full h-full rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-primary-600 text-5xl font-bold">
                        {profileData.name ? profileData.name.charAt(0).toUpperCase() : 'U'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-20 px-6 pb-6">
                <div className="text-center">
                  <h1 className="text-2xl font-bold mb-1">{profileData.name}</h1>
                  <p className="text-neutral-500 mb-4">{profileData.email}</p>
                  {currentUser && (
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="btn btn-outline py-2 px-4 text-sm"
                    >
                      <FaEdit className="mr-2" />
                      {isEditing ? 'Cancel Editing' : 'Edit Profile'}
                    </button>
                  )}
                </div>
                
                {isEditing && (
                  <form onSubmit={handleProfileUpdate} className="mt-6">
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="input"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="input"
                        disabled
                      />
                      <p className="text-xs text-neutral-500 mt-1">Email cannot be changed</p>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
                        New Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        className="input"
                        placeholder="Leave blank to keep current password"
                      />
                    </div>
                    
                    <button type="submit" className="btn btn-primary w-full">
                      Save Changes
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Side - User Activity */}
          <div className="lg:w-2/3">
            {/* Recent Searches */}
            <div className="bg-white rounded-lg shadow-card p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Recent Searches</h2>
              
              {recentSearches.length === 0 ? (
                <p className="text-neutral-500">No recent searches found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-neutral-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          Origin
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          Destination
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {recentSearches.map((search) => (
                        <tr key={search.id}>
                          <td className="px-4 py-3 whitespace-nowrap">{search.origin}</td>
                          <td className="px-4 py-3 whitespace-nowrap">{search.destination}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-neutral-500 text-sm">
                            {search.date}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right">
                            <button className="text-primary-600 hover:text-primary-800">
                              Search Again
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            
            {/* Favorite Routes */}
            <div className="bg-white rounded-lg shadow-card p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Favorite Routes</h2>
              
              {favoriteRoutes.length === 0 ? (
                <p className="text-neutral-500">No favorite routes saved.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favoriteRoutes.map((route) => (
                    <div key={route.id} className="border border-neutral-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{route.name}</h3>
                        <button className="text-neutral-400 hover:text-error-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center mb-1">
                        <FaMapMarkerAlt className="text-primary-600 mr-2" />
                        <p className="text-sm">From: {route.origin}</p>
                      </div>
                      <div className="flex items-center mb-2">
                        <FaMapMarkerAlt className="text-primary-600 mr-2" />
                        <p className="text-sm">To: {route.destination}</p>
                      </div>
                      <div className="flex justify-between text-xs text-neutral-500 mt-2">
                        <span>{route.distance}</span>
                        <span>{route.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Your Reviews */}
            <div className="bg-white rounded-lg shadow-card p-6">
              <h2 className="text-xl font-bold mb-4">Your Reviews</h2>
              
              {userReviews.length === 0 ? (
                <p className="text-neutral-500">You haven't written any reviews yet.</p>
              ) : (
                <div className="space-y-4">
                  {userReviews.map((review) => (
                    <div key={review.id} className="border-b border-neutral-200 pb-4 last:border-b-0 last:pb-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold">{review.placeName}</h3>
                        <div className="flex items-center text-accent-500">
                          <FaStar />
                          <span className="ml-1">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-neutral-600 mb-2">{review.comment}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-neutral-500">{review.date}</span>
                        <div className="flex space-x-2">
                          <button className="text-primary-600 text-sm hover:text-primary-800">
                            Edit
                          </button>
                          <button className="text-error-600 text-sm hover:text-error-800">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;