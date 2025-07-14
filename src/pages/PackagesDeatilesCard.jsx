import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import {
  FaMapMarkerAlt, FaUsers, FaDollarSign, FaClock,
  FaStar, FaSuitcase, FaUserTie
} from "react-icons/fa";
import { motion } from "framer-motion";

// Animation configs
const fadeIn = (direction = "up", delay = 0) => ({
  initial: {
    y: direction === "up" ? 40 : 0,
    x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
    opacity: 0,
  },
  animate: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay,
      ease: "easeOut",
    },
  },
});

const PackagesDeatilesCard = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();

  const { data: pack = {} } = useQuery({
    queryKey: ["package-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/packages/${id}`);
      return res.data;
    },
  });

  const {
    title, location, description, price, duration,
    travelType, maxPeople, rating, guide, images, itinerary
  } = pack;

  const [currentImg, setCurrentImg] = useState(images?.[0]);

  useEffect(() => {
    setCurrentImg(images?.[0]);
  }, [images]);

  return (
    <div>
      <motion.div
        className="max-w-7xl mx-auto p-6"
        initial="initial"
        animate="animate"
      >
        {/* ✨ Animated Header */}
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 mb-8 animate-pulse"
          variants={fadeIn("up", 0)}
          whileHover={{ scale: 1.05 }}
        >
          {title}
        </motion.h1>

        {/* 🖼️ Gallery */}
        <motion.div className="flex flex-col md:flex-row gap-6" variants={fadeIn("up", 0.1)}>
          <div className="flex-1">
            <motion.img
              key={currentImg}
              src={currentImg}
              alt="Package"
              className="w-full h-[300px] object-cover rounded-2xl border-4 border-purple-400 shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            />
            <div className="flex gap-2 mt-4 overflow-auto">
              {images?.map((img, idx) => (
                <motion.img
                  key={idx}
                  src={img}
                  alt={`thumb-${idx}`}
                  className={`w-20 h-16 rounded-lg border-2 cursor-pointer hover:scale-105 duration-300 ${
                    currentImg === img ? 'border-purple-600' : 'border-gray-300'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setCurrentImg(img)}
                />
              ))}
            </div>
          </div>

          {/* 📋 Info */}
          <motion.div
            className="flex-1 bg-gradient-to-br from-indigo-100 to-purple-100 p-6 rounded-xl shadow-xl border border-purple-300"
            variants={fadeIn("right", 0.2)}
          >
            <h2 className="text-2xl font-semibold text-purple-700 mb-4">Package Details</h2>
            <div className="space-y-3 text-gray-800">
              <p className="flex items-center gap-3 text-md"><FaMapMarkerAlt className="text-pink-500" /> <strong>Location:</strong> {location}</p>
              <p className="flex items-center gap-3 text-md"><FaUsers className="text-blue-500" /> <strong>Max People:</strong> {maxPeople}</p>
              <p className="flex items-center gap-3 text-md"><FaDollarSign className="text-green-600" /> <strong>Price:</strong> ${price}</p>
              <p className="flex items-center gap-3 text-md"><FaClock className="text-orange-500" /> <strong>Duration:</strong> {duration} Days</p>
              <p className="flex items-center gap-3 text-md"><FaSuitcase className="text-teal-600" /> <strong>Travel Type:</strong> {travelType || "General"}</p>
              <p className="flex items-center gap-3 text-md"><FaUserTie className="text-yellow-600" /> <strong>Guide:</strong> {guide}</p>
              <p className="flex items-center gap-3 text-md"><FaStar className="text-yellow-400" /> <strong>Rating:</strong> {rating}/5</p>
            </div>
          </motion.div>
        </motion.div>

        {/* 📝 Description */}
        <motion.div
          className="mt-10 bg-white rounded-xl p-6 shadow-lg border-t-4 border-purple-300"
          variants={fadeIn("up", 0.3)}
        >
          <h3 className="text-xl font-bold text-purple-700 mb-2">Description</h3>
          <p className="text-gray-700">{description}</p>
        </motion.div>

        {/* 📅 Itinerary */}
        <motion.div
          className="mt-8 bg-purple-50 p-6 rounded-lg shadow-inner border"
          variants={fadeIn("up", 0.4)}
        >
          <h3 className="text-xl font-bold text-purple-700 mb-4">Itinerary</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {itinerary?.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <span className="font-semibold text-purple-600">Day {index + 1}:</span> {item.plan || item.description || 'No detail provided'}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PackagesDeatilesCard;
