import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaMapMarkerAlt, FaRoute, FaHeart, FaRegHeart, FaShareAlt, FaMoneyBillWave, FaPhone, FaGlobe, FaClock, FaInfo } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import ReactStars from 'react-stars';

const PlaceDetailPage = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [userReview, setUserReview] = useState({
    rating: 0,
    comment: '',
  });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  
  useEffect(() => {
    fetchPlaceDetails();
  }, [id]);
  
  const fetchPlaceDetails = async () => {
    try {
      // In a real app, we would fetch from the API
      // const response = await axios.get(`/api/places/${id}`);
      // setPlace(response.data);
      
      // Mock data for demo
      setTimeout(() => {
        // Simulate API call
        const placeData = {
          id: parseInt(id),
          name: "Santorini, Greece",
          location: "Mediterranean",
          description: "Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape. The whitewashed, cubiform houses of its 2 principal towns, Fira and Oia, cling to cliffs above an underwater caldera (crater). They overlook the sea, small islands to the west and beaches made up of black, red and white lava pebbles.",
          longDescription: "Santorini (officially Thira) is a Greek island located in the southern Aegean Sea, about 200 km southeast of mainland Greece. It is the largest island of a small, circular archipelago, which bears the same name and is the remnant of a volcanic caldera. Santorini is essentially what remains after an enormous volcanic eruption that destroyed the earliest settlements on a formerly single island, and created the current geological caldera.\n\nThe island is known for its breathtaking views, stunning sunsets, white-washed buildings with blue domes, beautiful beaches with crystal-clear waters, and excellent wineries producing some of Greece's most distinctive wines.",
          imageUrl: "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          gallery: [
            "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/3601426/pexels-photo-3601426.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            "https://images.pexels.com/photos/3719040/pexels-photo-3719040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          ],
          rating: 4.9,
          priceLevel: 4,
          category: "attractions",
          coordinates: {
            lat: 36.3932,
            lng: 25.4615
          },
          tags: ["Island", "Romantic", "Views", "Beach", "History"],
          contact: {
            phone: "+30 22860 22555",
            website: "https://www.santorini.gr",
            hours: "Open 24 hours",
            address: "Santorini, Cyclades, Greece"
          },
          highlights: [
            "Stunning sunsets in Oia",
            "Volcanic beaches with black sand",
            "Ancient ruins of Akrotiri",
            "Wine tasting at local vineyards",
            "Boat tours of the caldera"
          ],
          reviews: [
            {
              id: 1,
              user: {
                name: "Emily Johnson",
                image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
              rating: 5,
              date: "2023-09-15",
              comment: "Absolutely breathtaking! The views from Oia are incredible, especially at sunset. We stayed for a week and couldn't get enough of the beautiful architecture and scenery."
            },
            {
              id: 2,
              user: {
                name: "Michael Chen",
                image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
              rating: 4.5,
              date: "2023-08-22",
              comment: "Gorgeous island with amazing views. It can get very crowded during peak season, but it's still worth visiting. The food was excellent and the people were friendly."
            },
            {
              id: 3,
              user: {
                name: "Sophia Rodriguez",
                image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
              rating: 5,
              date: "2023-07-10",
              comment: "One of the most beautiful places I've ever visited! The white buildings against the blue sea is even more stunning in person than in photos. Highly recommend taking a boat tour of the caldera."
            }
          ],
          nearbyPlaces: [
            {
              id: 101,
              name: "Mykonos",
              imageUrl: "https://images.pexels.com/photos/1006965/pexels-photo-1006965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              rating: 4.7
            },
            {
              id: 102,
              name: "Athens",
              imageUrl: "https://images.pexels.com/photos/951539/pexels-photo-951539.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              rating: 4.6
            },
            {
              id: 103,
              name: "Crete",
              imageUrl: "https://images.pexels.com/photos/4388167/pexels-photo-4388167.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              rating: 4.8
            }
          ]
        };
        
        setPlace(placeData);
        setLoading(false);
      }, 800); // Simulate loading time
      
    } catch (error) {
      console.error('Error fetching place details:', error);
      setError('Failed to load place details. Please try again later.');
      setLoading(false);
    }
  };
  
  const toggleFavorite = async () => {
    if (!currentUser) {
      // Redirect to login if not authenticated
      return;
    }
    
    try {
      // In a real app, we would make an API call
      // await axios.post(`/api/favorites/toggle/${id}`);
      
      // For now, just toggle the state
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };
  
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      // Redirect to login if not authenticated
      return;
    }
    
    if (userReview.rating === 0) {
      alert('Please select a rating');
      return;
    }
    
    try {
      setIsSubmittingReview(true);
      
      // In a real app, we would make an API call
      // await axios.post(`/api/places/${id}/reviews`, userReview);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form and show success message
      setUserReview({ rating: 0, comment: '' });
      setReviewSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setReviewSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmittingReview(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-4 border-primary-600 border-t-transparent animate-spin mb-4"></div>
          <p className="text-neutral-600">Loading place details...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-card p-8 max-w-lg text-center">
          <h2 className="text-2xl font-bold text-error-600 mb-4">Something went wrong</h2>
          <p className="text-neutral-600 mb-6">{error}</p>
          <Link to="/places" className="btn btn-primary">
            Back to Places
          </Link>
        </div>
      </div>
    );
  }
  
  if (!place) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-card p-8 max-w-lg text-center">
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">Place not found</h2>
          <p className="text-neutral-600 mb-6">
            The place you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/places" className="btn btn-primary">
            Back to Places
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] bg-neutral-800">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${place.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
        
        <div className="container-custom relative h-full flex items-end z-10">
          <div className="pb-8 md:pb-16 text-white max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow-md">
              {place.name}
            </h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <FaStar className="text-accent-400 mr-1" />
                <span className="font-medium">{place.rating.toFixed(1)}</span>
                <span className="text-white text-opacity-80 ml-1">({place.reviews.length} reviews)</span>
              </div>
              
              <div className="flex items-center mr-4">
                <FaMapMarkerAlt className="mr-1 text-white text-opacity-80" />
                <span>{place.location}</span>
              </div>
              
              <div className="hidden md:flex items-center">
                <span className="text-white text-opacity-80">
                  {Array(place.priceLevel).fill('$').join('')}
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {place.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="inline-block bg-white bg-opacity-20 text-white text-sm px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Action Buttons */}
            <div className="bg-white rounded-lg shadow-card p-4 mb-6 flex justify-between">
              <Link to={`/routes?destination=${encodeURIComponent(place.name)}`} className="btn btn-primary flex-1 mr-2 flex items-center justify-center">
                <FaRoute className="mr-2" />
                Get Directions
              </Link>
              
              <button 
                onClick={toggleFavorite}
                className="btn btn-outline flex-1 ml-2 flex items-center justify-center"
              >
                {isFavorite ? (
                  <>
                    <FaHeart className="mr-2 text-primary-600" />
                    Saved
                  </>
                ) : (
                  <>
                    <FaRegHeart className="mr-2" />
                    Save
                  </>
                )}
              </button>
              
              <button className="ml-2 p-3 bg-white border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50">
                <FaShareAlt />
              </button>
            </div>
            
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-card overflow-hidden mb-6">
              <div className="border-b border-neutral-200">
                <nav className="flex">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-4 py-3 font-medium text-sm ${
                      activeTab === 'overview'
                        ? 'text-primary-600 border-b-2 border-primary-600'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    Overview
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('photos')}
                    className={`px-4 py-3 font-medium text-sm ${
                      activeTab === 'photos'
                        ? 'text-primary-600 border-b-2 border-primary-600'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    Photos
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`px-4 py-3 font-medium text-sm ${
                      activeTab === 'reviews'
                        ? 'text-primary-600 border-b-2 border-primary-600'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    Reviews ({place.reviews.length})
                  </button>
                </nav>
              </div>
              
              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">About {place.name}</h2>
                    
                    <p className="text-neutral-700 mb-6 whitespace-pre-line">
                      {place.longDescription}
                    </p>
                    
                    <h3 className="text-xl font-bold mb-3">Highlights</h3>
                    
                    <ul className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-2">
                      {place.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-primary-600 mr-2">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* Map Preview */}
                    <h3 className="text-xl font-bold mb-3">Location</h3>
                    <div className="h-64 bg-neutral-200 rounded-lg mb-6 overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(place.name)}`}
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}
                
                {/* Photos Tab */}
                {activeTab === 'photos' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Photos</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {place.gallery.map((photo, index) => (
                        <div key={index} className="rounded-lg overflow-hidden h-64">
                          <img
                            src={photo}
                            alt={`${place.name} - Photo ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                    
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <div className="bg-primary-100 text-primary-700 rounded-lg px-3 py-2 text-2xl font-bold mr-3">
                            {place.rating.toFixed(1)}
                          </div>
                          <div>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                  key={star}
                                  className={star <= Math.round(place.rating) ? "text-accent-400" : "text-neutral-300"}
                                />
                              ))}
                            </div>
                            <p className="text-neutral-500">
                              Based on {place.reviews.length} reviews
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Write a Review */}
                      {currentUser && (
                        <div className="bg-neutral-50 rounded-lg p-4 mb-6">
                          <h3 className="font-medium mb-3">Write a Review</h3>
                          
                          {reviewSuccess ? (
                            <div className="bg-secondary-100 text-secondary-700 p-3 rounded-lg">
                              Thank you for your review! It has been submitted successfully.
                            </div>
                          ) : (
                            <form onSubmit={handleReviewSubmit}>
                              <div className="mb-3">
                                <label className="block text-sm font-medium text-neutral-700 mb-1">
                                  Your Rating
                                </label>
                                <ReactStars
                                  count={5}
                                  value={userReview.rating}
                                  onChange={(newRating) => setUserReview({ ...userReview, rating: newRating })}
                                  size={24}
                                  color2={'#FFC107'}
                                  half={false}
                                />
                              </div>
                              
                              <div className="mb-3">
                                <label htmlFor="review-comment" className="block text-sm font-medium text-neutral-700 mb-1">
                                  Your Review
                                </label>
                                <textarea
                                  id="review-comment"
                                  rows="3"
                                  value={userReview.comment}
                                  onChange={(e) => setUserReview({ ...userReview, comment: e.target.value })}
                                  className="input"
                                  placeholder="Share your experience with this place..."
                                ></textarea>
                              </div>
                              
                              <button
                                type="submit"
                                disabled={isSubmittingReview}
                                className={`btn btn-primary ${isSubmittingReview ? 'opacity-70 cursor-not-allowed' : ''}`}
                              >
                                {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                              </button>
                            </form>
                          )}
                        </div>
                      )}
                      
                      {/* Review List */}
                      <div className="space-y-6">
                        {place.reviews.map((review) => (
                          <div key={review.id} className="border-b border-neutral-200 pb-6 last:border-b-0">
                            <div className="flex justify-between mb-2">
                              <div className="flex items-center">
                                <img
                                  src={review.user.image}
                                  alt={review.user.name}
                                  className="w-10 h-10 rounded-full object-cover mr-3"
                                />
                                <div>
                                  <h4 className="font-medium">{review.user.name}</h4>
                                  <p className="text-neutral-500 text-sm">{review.date}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <FaStar
                                    key={star}
                                    className={star <= Math.floor(review.rating) ? "text-accent-400" : "text-neutral-300"}
                                    size={14}
                                  />
                                ))}
                                {review.rating % 1 !== 0 && (
                                  <div className="text-sm ml-1 text-accent-400">+</div>
                                )}
                              </div>
                            </div>
                            
                            <p className="text-neutral-700">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Nearby Places */}
            <div className="bg-white rounded-lg shadow-card p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Nearby Places</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {place.nearbyPlaces.map((nearbyPlace) => (
                  <Link
                    key={nearbyPlace.id}
                    to={`/places/${nearbyPlace.id}`}
                    className="group"
                  >
                    <div className="rounded-lg overflow-hidden">
                      <div className="h-40 overflow-hidden">
                        <img
                          src={nearbyPlace.imageUrl}
                          alt={nearbyPlace.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium group-hover:text-primary-600 transition-colors">
                            {nearbyPlace.name}
                          </h3>
                          <div className="flex items-center text-accent-500">
                            <FaStar size={12} />
                            <span className="ml-1 text-sm">{nearbyPlace.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-card p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 flex-shrink-0 flex justify-center mt-1">
                    <FaMapMarkerAlt className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Address</h3>
                    <p className="text-neutral-600">{place.contact.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 flex-shrink-0 flex justify-center mt-1">
                    <FaPhone className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p className="text-neutral-600">{place.contact.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 flex-shrink-0 flex justify-center mt-1">
                    <FaGlobe className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Website</h3>
                    <a 
                      href={place.contact.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-primary-600 hover:underline"
                    >
                      {place.contact.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 flex-shrink-0 flex justify-center mt-1">
                    <FaClock className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Hours</h3>
                    <p className="text-neutral-600">{place.contact.hours}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional Info */}
            <div className="bg-white rounded-lg shadow-card p-6">
              <div className="flex items-center bg-primary-50 text-primary-700 p-4 rounded-lg mb-4">
                <FaInfo className="mr-3 flex-shrink-0" />
                <p className="text-sm">
                  Ready to visit? Use our route finder to get directions and explore the most convenient way to reach {place.name}.
                </p>
              </div>
              
              <Link 
                to={`/routes?destination=${encodeURIComponent(place.name)}`}
                className="btn btn-primary w-full"
              >
                Find Route to {place.name}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetailPage;