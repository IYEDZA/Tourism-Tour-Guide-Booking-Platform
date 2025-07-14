import React, { useEffect, useRef, useState } from 'react';

import { useNavigate, Link } from "react-router";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import { motion, AnimatePresence } from "framer-motion";
import { FaImage,FaCameraRetro, FaChevronDown, FaChevronUp, FaHeart, FaMapMarkedAlt, FaPlaneDeparture, FaStar } from "react-icons/fa";
import VanillaTilt from 'vanilla-tilt';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';



function TiltCard({ children }) {
  const tiltRef = useRef(null);

  useEffect(() => {
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
      });
    }
  }, []);

  return <div ref={tiltRef}>{children}</div>;
}
 const tourGuides = [
  { id: "guide1", name: "Alex Roy" },
  { id: "guide2", name: "Nadia Ahmed" },
];

const tourPlan = [
  "Day 1: Arrival and sunset river cruise",
  "Day 2: Mountain hiking and local village tour",
  "Day 3: Beach day and cultural event",
];

// Gallery images with explicit sizes for variety (w = width fraction, h = height px)



const PackageCard = ({pack}) => {
   const [expandedIndex, setExpandedIndex] = useState(null);
    const navigate = useNavigate();
    const axiosInstance = useAxios();

    console.log(pack)
   const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };


  const {_id,images,itinerary} = pack
// .....................lodad all tour guide .................

const { data: users = [] } = useQuery({
    queryKey: ["my-profile" ],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users?role=tourGuide`);
      return res.data;
    },
    // enabled: !!user?.email,
  });

  console.log(users)




    return (
        <div>


           <div className="py-12 relative z-10">
                {/* Section Heading */}
                <motion.h2
                  initial={{ y: -40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="text-center text-4xl md:text-5xl font-extrabold text-primary mb-10 flex justify-center items-center gap-4"
                >
                  <FaCameraRetro className="text-accent animate-bounce" />
                   Gallery
                </motion.h2>
          
                {/* Image Grid */}
                 <div className="py-14 px-4 bg-gradient-to-tr from-gray-900 via-black to-base-100 text-white">
                {/* Heading */}
                <motion.h2
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl md:text-5xl font-bold text-center mb-12 flex items-center justify-center gap-3 text-primary"
                >
                  <FaImage className="text-accent animate-spin-slow" />
                  Explore Magical Moments
                </motion.h2>
             
          
          
                {/* Grid Gallery */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {images.map((img, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <TiltCard>
                        <div className="relative group rounded-xl overflow-hidden shadow-2xl border border-base-300 hover:border-accent transition-all duration-500">
                          {/* Image */}
                          <img
                            src={img}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-64 object-cover transform transition-all duration-500 group-hover:scale-105"
                          />
          
                          {/* Shine Effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-50 transition-all duration-700 pointer-events-none" />
          
                          {/* Label */}
                          <div className="absolute bottom-0 w-full bg-black/60 text-white text-center text-sm font-medium py-2 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500">
                            Picture {index + 1}
                          </div>
                        </div>
                      </TiltCard>
                    </motion.div>
                  ))}
                </div>
              </div>
              </div>
          
          
              
          
                {/* 📝 About the Tour */}
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-base-200 p-6 rounded-xl shadow border-l-4 border-info"
                >
                  <h2 className="text-2xl font-bold text-accent mb-2">About the Tour</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Discover the breathtaking natural beauty of Bangladesh. From the calm rivers and
                    picturesque hills to vibrant local culture—this 3-day experience offers comfort, adventure,
                    and rich tradition all in one.
                  </p>
                </motion.div>
          
                {/* 🗺️ Tour Plan */}
               
          
                <motion.div
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold text-secondary flex items-center gap-2">
                  <FaMapMarkedAlt className="text-primary animate-pulse" />
                  Tour Plan
                </h2>
          
                {itinerary.map((day, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.01 }}
                    className={`bg-base-100 border-l-4 transition-all duration-300 ${
                      expandedIndex === index ? "border-accent" : "border-primary"
                    } rounded-xl shadow-xl overflow-hidden`}
                  >
                    <button
                      onClick={() => toggleExpand(index)}
                      className="w-full flex justify-between items-center p-4 font-semibold text-lg text-left hover:bg-base-200 transition-colors"
                    >
                      <span>Day {index + 1}</span>
                      {expandedIndex === index ? (
                        <FaChevronUp className="text-accent animate-bounce" />
                      ) : (
                        <FaChevronDown className="text-primary animate-bounce" />
                      )}
                    </button>
          
                    <AnimatePresence initial={false}>
                      {expandedIndex === index && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="px-4 pb-4 text-white p-4 bg-black"
                        >
                          <p className="text-sm leading-relaxed">{day.day}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
          
                {/* 🧑‍✈️ Tour Guides */}
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-accent">Tour Guides</h2>
                  <div className="flex flex-wrap gap-3">
                    {users.map((guide) => (

                    <Link to={`/tourGide/${guide._id}`}>  <motion.button
                        whileHover={{ scale: 1.05 }}
                        key={guide.id}
                        // onClick={() => navigate(`/tour-guide/${guide.id}`)}
                        className="btn btn-outline btn-info rounded-full px-5"
                      >
                        {guide.name}
                      </motion.button></Link>
                    
                    ))}
                  </div>
                </div>
          
          
                
                 <Link to={`/booking/${_id}`}><button  className="btn btn-accent w-full mt-4">
                    Book Now
                  </button></Link> 
          



        </div>
    );
};

export default PackageCard;