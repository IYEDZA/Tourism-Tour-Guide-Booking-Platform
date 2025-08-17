import React from 'react';
import { useParams } from 'react-router';
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import {
  FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone,
  FaGlobe, FaLanguage, FaStar, FaUserTie, FaClock,
  FaInfoCircle, FaCheckCircle
} from "react-icons/fa";
import { motion } from 'framer-motion';

const iconBounce = {
  whileHover: { scale: 1.2, rotate: [0, -5, 5, -5, 0], transition: { duration: 0.5 } },
  whileTap: { scale: 0.95 }
};

const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.8, ease: 'easeOut' },
  },
});

const TourGuideCardTab = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();

  const { data: tourGuide = {} } = useQuery({
    queryKey: ["tour-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${id}`);
      return res.data;
    },
  });

  const {
    name, email, role, photo, bio, experience, languages = [],
    location, phone, rating, availability, specialty, created_at, last_log_in
  } = tourGuide;

  return (
    <motion.div
      className="max-w-4xl mx-auto mt-24  animate-pulse hover:animate-none  duration-1000"
      initial="initial"
      animate="animate"
    >
      {/* Animated Header */}
      <motion.div
        className="text-center mb-10"
        variants={fadeInUp(0)}
      >
        <h1 className="text-3xl md:text-3xl font-boldbold  animate-gradient-x">
          🌟 Tourist Profile Card 🌟
        </h1>
      </motion.div>

      {/* Profile Top */}
      <motion.div
        className="flex flex-col md:flex-row items-center gap-6"
        variants={fadeInUp(0.2)}
      >
        <motion.img
          src={photo || 'https://i.ibb.co/ZmNtT1K/default-user.png'}
          alt="Profile"
          className="w-40 h-40 object-cover rounded-full border-1 shadow-md hover:scale-105 transition-transform duration-500"
          whileHover={{ rotate: 6 }}
        />
        <div className="text-center md:text-left space-y-2">
          <motion.h2
            className="text-xl font-bold  flex items-center justify-center md:justify-start gap-2"
            {...iconBounce}
          >
            <FaUser className="" /> {name}
          </motion.h2>
          <p className="flex items-center justify-center md:justify-start gap-2 text-gray-600"><FaUserTie /> <span className=" font-semibold">{role}</span></p>
          <p className="flex items-center justify-center md:justify-start gap-2 text-gray-600"><FaEnvelope /> {email}</p>
          <p className="flex items-center justify-center md:justify-start gap-2 text-gray-600"><FaMapMarkerAlt /> {location}</p>
          <p className="flex items-center justify-center md:justify-start gap-2 text-gray-600"><FaPhone /> {phone}</p>
        </div>
      </motion.div>

      {/* Divider */}
      <motion.div
        className="divider mt-8 divider-warning text-purple-600"
        variants={fadeInUp(0.3)}
      >
        About & Expertise
      </motion.div>

      {/* Details */}
      <motion.div
        className="grid md:grid-cols-2 gap-6 "
        variants={fadeInUp(0.4)}
      >
        <div className="space-y-4">
          <p className="flex items-center gap-3"><FaStar className="" /> <span className="font-semibold">Rating:</span> <span className="">{rating}</span></p>
          <p className="flex items-center gap-3"><FaClock className="" /> <span className="font-semibold">Availability:</span> <span className="">{availability}</span></p>
          <p className="flex items-center gap-3"><FaGlobe className="text-green-600" /> <span className="font-semibold">Experience:</span> <span className="">{experience}</span></p>
          <p className="flex items-center gap-3"><FaCheckCircle className="text-blue-600" /> <span className="font-semibold">Specialty:</span> <span className="">{specialty}</span></p>
        </div>

        <div className="space-y-4">
          <p className="flex items-center gap-3"><FaLanguage className="text-pink-500" /> <span className="font-semibold">Languages:</span> <span className="">{languages.join(', ') || 'N/A'}</span></p>
          <p className="flex items-center gap-3"><FaInfoCircle className="text-indigo-600" /> <span className="font-semibold">Bio:</span> <span className="">{bio || 'No bio provided'}</span></p>
          <p className="text-sm italic text-gray-500">Joined: {new Date(created_at).toLocaleDateString()}</p>
          <p className="text-sm italic text-gray-500">Last Login: {new Date(last_log_in).toLocaleString()}</p>
        </div>
      </motion.div>

      {/* Animated Glow Border Bottom */}
      <div className="mt-10 h-2 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-500 rounded-full animate-pulse blur-sm shadow-xl" />
    </motion.div>
  );
};

export default TourGuideCardTab;
