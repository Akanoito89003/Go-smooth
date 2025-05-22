import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkedAlt, FaCalculator, FaStar, FaArrowRight } from 'react-icons/fa';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Enter Your Destination",
      description: "Start by entering your current location and where you want to go.",
      icon: <FaMapMarkedAlt className="text-primary-600 text-3xl" />,
      color: "bg-primary-100",
      iconColor: "text-primary-600"
    },
    {
      id: 2,
      title: "View Route Options",
      description: "Compare different routes with transportation types, times, and distances.",
      icon: <FaCalculator className="text-secondary-600 text-3xl" />,
      color: "bg-secondary-100",
      iconColor: "text-secondary-600"
    },
    {
      id: 3,
      title: "Explore Destinations",
      description: "Check out ratings, reviews, and essential information about your destination.",
      icon: <FaStar className="text-accent-600 text-3xl" />,
      color: "bg-accent-100",
      iconColor: "text-accent-600"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How TravelEase Works
          </h2>
          <p className="text-neutral-600 text-lg">
            Planning your trip is easy with our simple 3-step process.
          </p>
        </div>
        
        <div className="relative">
          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="relative">
                  <div className={`w-24 h-24 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    {step.icon}
                  </div>
                  <div className="absolute top-0 right-0 w-8 h-8 bg-white rounded-full border-2 border-primary-600 flex items-center justify-center font-bold text-primary-600">
                    {step.id}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-neutral-600 max-w-xs mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
          
          {/* Connecting lines - Only visible on desktop */}
          <div className="hidden md:block absolute top-1/3 left-1/4 right-1/4 h-0.5 bg-neutral-200 z-0"></div>
          <div className="hidden md:flex absolute top-1/3 left-1/4 transform -translate-x-1/2 z-0">
            <div className="bg-white p-2 rounded-full">
              <FaArrowRight className="text-neutral-400 text-xl" />
            </div>
          </div>
          <div className="hidden md:flex absolute top-1/3 right-1/4 transform translate-x-1/2 z-0">
            <div className="bg-white p-2 rounded-full">
              <FaArrowRight className="text-neutral-400 text-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;