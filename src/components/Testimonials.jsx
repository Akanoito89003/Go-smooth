import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: "Emma Thompson",
    location: "London, UK",
    quote: "TravelEase transformed how I plan my trips. The route finder saved me hours of research, and the cost estimates were spot on!",
    rating: 5,
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 2,
    name: "David Chen",
    location: "Toronto, Canada",
    quote: "As someone who travels frequently for work, this app has been a game-changer. Accurate routes, realistic costs, and excellent place recommendations.",
    rating: 5,
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    location: "Barcelona, Spain",
    quote: "The travel cost estimator is incredibly accurate. I've used it for three international trips, and it helped me budget with confidence each time.",
    rating: 4,
    image: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Travelers Say About Us
          </h2>
          <p className="text-neutral-600 text-lg">
            Hear from our users who have simplified their travel planning with TravelEase.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-card p-8 relative"
            >
              <div className="absolute -top-6 left-8">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <FaQuoteLeft className="text-primary-600 text-xl" />
                </div>
              </div>
              
              <div className="flex items-center space-x-1 mb-4 mt-4 text-accent-500">
                {[...Array(5)].map((_, i) => (
                  <FaStar 
                    key={i} 
                    className={i < testimonial.rating ? "text-accent-500" : "text-neutral-300"} 
                  />
                ))}
              </div>
              
              <p className="text-neutral-700 mb-6">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-neutral-500 text-sm">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;