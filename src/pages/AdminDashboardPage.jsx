import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaMapMarkedAlt, FaRoute, FaStar, FaArrowUp, FaArrowDown, FaEye, FaEdit, FaPlus } from 'react-icons/fa';
import axios from 'axios';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPlaces: 0,
    totalRoutes: 0,
    totalReviews: 0,
  });
  const [recentPlaces, setRecentPlaces] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    fetchDashboardData();
    fetchCurrentUser();
  }, []);
  
  const fetchDashboardData = async () => {
    try {
      // In a real app, these would be separate API calls
      // const statsResponse = await axios.get('/api/admin/stats');
      // const placesResponse = await axios.get('/api/admin/places/recent');
      // const usersResponse = await axios.get('/api/admin/users/recent');
      
      // Mock data
      setTimeout(() => {
        setStats({
          totalUsers: 1258,
          totalPlaces: 432,
          totalRoutes: 8765,
          totalReviews: 3641,
        });
        
        setRecentPlaces([
          {
            id: 1,
            name: "Santorini, Greece",
            status: "Active",
            addedDate: "2023-10-25",
            rating: 4.9,
          },
          {
            id: 2,
            name: "Bali, Indonesia",
            status: "Active",
            addedDate: "2023-10-23",
            rating: 4.8,
          },
          {
            id: 3,
            name: "Marrakech, Morocco",
            status: "Pending Review",
            addedDate: "2023-10-21",
            rating: 4.5,
          },
          {
            id: 4,
            name: "Kyoto, Japan",
            status: "Active",
            addedDate: "2023-10-20",
            rating: 4.7,
          },
          {
            id: 5,
            name: "Barcelona, Spain",
            status: "Active",
            addedDate: "2023-10-18",
            rating: 4.6,
          },
        ]);
        
        setRecentUsers([
          {
            id: 1,
            name: "Michael Johnson",
            email: "michael.j@example.com",
            joinDate: "2023-10-26",
            role: "User",
          },
          {
            id: 2,
            name: "Emily Davis",
            email: "emily.d@example.com",
            joinDate: "2023-10-25",
            role: "Admin",
          },
          {
            id: 3,
            name: "David Smith",
            email: "david.s@example.com",
            joinDate: "2023-10-24",
            role: "User",
          },
          {
            id: 4,
            name: "Sarah Wilson",
            email: "sarah.w@example.com",
            joinDate: "2023-10-23",
            role: "User",
          },
          {
            id: 5,
            name: "Robert Brown",
            email: "robert.b@example.com",
            joinDate: "2023-10-22",
            role: "User",
          },
        ]);
        
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };
  
  const fetchCurrentUser = async () => {
    try {
      // In a real app, this would be an API call to fetch the current user
      // const userResponse = await axios.get('/api/user/current');
      
      // Mock data
      setTimeout(() => {
        setCurrentUser({
          role: "Admin",
        });
      }, 800);
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };
  
  if (currentUser?.role !== 'admin') {
    return <div className="text-center text-error-600 py-12">You do not have permission to view this page.</div>;
  }
  
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-primary-600 border-t-transparent animate-spin mb-4"></div>
          <p className="text-neutral-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2 text-neutral-800">Dashboard</h1>
        <p className="text-neutral-600">
          Welcome to the admin dashboard. Here's an overview of your travel platform.
        </p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="bg-primary-100 rounded-full p-3">
              <FaUsers className="text-primary-600 text-xl" />
            </div>
            <span className="text-sm px-2 py-1 bg-secondary-100 text-secondary-700 rounded-full flex items-center">
              <FaArrowUp className="mr-1" />
              12%
            </span>
          </div>
          <h3 className="text-neutral-500 text-sm">Total Users</h3>
          <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="bg-secondary-100 rounded-full p-3">
              <FaMapMarkedAlt className="text-secondary-600 text-xl" />
            </div>
            <span className="text-sm px-2 py-1 bg-secondary-100 text-secondary-700 rounded-full flex items-center">
              <FaArrowUp className="mr-1" />
              8%
            </span>
          </div>
          <h3 className="text-neutral-500 text-sm">Total Places</h3>
          <p className="text-2xl font-bold">{stats.totalPlaces.toLocaleString()}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="bg-accent-100 rounded-full p-3">
              <FaRoute className="text-accent-600 text-xl" />
            </div>
            <span className="text-sm px-2 py-1 bg-error-100 text-error-700 rounded-full flex items-center">
              <FaArrowDown className="mr-1" />
              3%
            </span>
          </div>
          <h3 className="text-neutral-500 text-sm">Total Routes</h3>
          <p className="text-2xl font-bold">{stats.totalRoutes.toLocaleString()}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="bg-neutral-100 rounded-full p-3">
              <FaStar className="text-neutral-600 text-xl" />
            </div>
            <span className="text-sm px-2 py-1 bg-secondary-100 text-secondary-700 rounded-full flex items-center">
              <FaArrowUp className="mr-1" />
              15%
            </span>
          </div>
          <h3 className="text-neutral-500 text-sm">Total Reviews</h3>
          <p className="text-2xl font-bold">{stats.totalReviews.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Places */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Recent Places</h2>
            <Link
              to="/admin/places" 
              className="text-primary-600 hover:text-primary-800 text-sm flex items-center"
            >
              View All
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Place Name
                  </th>
                  <th className="px-4 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Date Added
                  </th>
                  <th className="px-4 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-4 py-3 bg-neutral-50 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {recentPlaces.map((place) => (
                  <tr key={place.id}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="font-medium text-neutral-900">{place.name}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        place.status === 'Active' 
                          ? 'bg-secondary-100 text-secondary-800' 
                          : 'bg-neutral-100 text-neutral-800'
                      }`}>
                        {place.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-neutral-500">
                      {place.addedDate}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaStar className="text-accent-400 mr-1" />
                        <span>{place.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-primary-600 hover:text-primary-900">
                          <FaEye />
                        </button>
                        <button className="text-neutral-600 hover:text-neutral-900">
                          <FaEdit />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6">
            <Link
              to="/admin/places/new"
              className="btn btn-primary w-full flex items-center justify-center"
            >
              <FaPlus className="mr-2" />
              Add New Place
            </Link>
          </div>
        </div>
        
        {/* Recent Users */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Recent Users</h2>
            <a 
              href="#" 
              className="text-primary-600 hover:text-primary-800 text-sm flex items-center"
            >
              View All
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-4 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-4 py-3 bg-neutral-50 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th className="px-4 py-3 bg-neutral-50 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {recentUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-700 font-medium">{user.name.charAt(0)}</span>
                        </div>
                        <div className="ml-3">
                          <div className="font-medium text-neutral-900">{user.name}</div>
                          <div className="text-neutral-500 text-sm">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.role === 'Admin' 
                          ? 'bg-primary-100 text-primary-800' 
                          : 'bg-neutral-100 text-neutral-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-neutral-500">
                      {user.joinDate}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-primary-600 hover:text-primary-900">
                          <FaEye />
                        </button>
                        <button className="text-neutral-600 hover:text-neutral-900">
                          <FaEdit />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;