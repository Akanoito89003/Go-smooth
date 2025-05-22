import React, { useState } from 'react';
import { FaSearch, FaRoute, FaMoneyBillWave } from 'react-icons/fa';
import Map from '../components/Map';

const RouteFinderPage = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [route, setRoute] = useState(null);
  const [cost, setCost] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/routes/find', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          origin,
          destination,
          mode: 'driving',
        }),
        credentials: 'include',
      });

      const data = await response.json();
      setRoute(data.route);
      setCost(data.cost);
    } catch (error) {
      console.error('Error finding route:', error);
    }
  };

  const markers = route ? [
    {
      lat: route[0].lat,
      lng: route[0].lng,
      title: 'Origin',
      description: origin,
    },
    {
      lat: route[route.length - 1].lat,
      lng: route[route.length - 1].lng,
      title: 'Destination',
      description: destination,
    },
  ] : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Your Route</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Origin</label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Enter starting point"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Destination</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                placeholder="Enter destination"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <FaSearch className="mr-2" />
              Find Route
            </button>
          </form>

          {route && (
            <div className="mt-8 space-y-4">
              <div className="flex items-center text-gray-700">
                <FaRoute className="mr-2" />
                <span>Distance: {route.distance}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <FaMoneyBillWave className="mr-2" />
                <span>Estimated Cost: ${cost}</span>
              </div>
            </div>
          )}
        </div>

        <div className="h-[500px] rounded-lg overflow-hidden shadow-lg">
          <Map
            markers={markers}
            center={markers.length > 0 ? [markers[0].lat, markers[0].lng] : [13.7563, 100.5018]}
            zoom={markers.length > 0 ? 12 : 13}
          />
        </div>
      </div>
    </div>
  );
};

export default RouteFinderPage;