import React from 'react';
import { useParams } from 'react-router';
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  FaUserCircle,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaStar,
  FaLanguage,
  FaClock,
  FaCheckCircle,
  FaAddressCard,
  FaEnvelope,
} from 'react-icons/fa';

const SingleTourGuideDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();

  const { data: guide = {} } = useQuery({
    queryKey: ['guide-details', id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${id}`);
      return res.data;
    },
  });

  const {
    name,
    email,
    photo,
    role,
    bio,
    experience,
    location,
    languages = [],
    phone,
    availability,
    specialty,
    rating,
  } = guide;

  return (
    <motion.div
      className="max-w-5xl mx-auto mt-12 p-6 md:p-10 rounded-3xl border-4 border-purple-400 bg-white/30 backdrop-blur-xl shadow-2xl hover:shadow-purple-500 transition-shadow duration-500"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-10 relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.img
          src={photo || 'https://i.ibb.co/ZmNtT1K/default-user.png'}
          alt="Tour Guide"
          className="w-32 h-32 mx-auto rounded-full border-4 border-purple-500 shadow-lg hover:shadow-purple-600 transition duration-300"
          whileHover={{ scale: 1.05 }}
        />
        <h1 className="mt-4 text-4xl font-bold text-purple-700 flex items-center justify-center gap-2 drop-shadow-sm tracking-wide animate-pulse">
          <FaUserCircle className="text-indigo-500" /> {name}
        </h1>
        <p className="text-sm text-gray-500 italic">{role}</p>
        <p className="text-gray-600 flex justify-center items-center gap-2"><FaEnvelope /> {email}</p>
      </motion.div>

      {/* Info Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base text-gray-800 mb-10"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {[
          { icon: <FaMapMarkerAlt className="text-pink-500" />, label: 'Location', value: location },
          { icon: <FaPhoneAlt className="text-green-600" />, label: 'Phone', value: phone },
          { icon: <FaClock className="text-orange-500" />, label: 'Availability', value: availability },
          { icon: <FaAddressCard className="text-blue-500" />, label: 'Specialty', value: specialty },
          { icon: <FaStar className="text-yellow-400" />, label: 'Rating', value: rating },
          { icon: <FaCheckCircle className="text-purple-600" />, label: 'Experience', value: experience },
          {
            icon: <FaLanguage className="text-indigo-500" />,
            label: 'Languages',
            value: languages || 'N/A',
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="p-4 bg-gradient-to-r from-white to-purple-50 rounded-xl border-l-4 border-purple-300 shadow hover:scale-[1.01] transition-transform"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 + 0.3 }}
          >
            <div className="flex items-center gap-3 font-medium">
              {item.icon} <span className="text-purple-700">{item.label}:</span>
            </div>
            <p className="text-gray-700 mt-1 ml-7">{item.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Bio Section */}
      {bio && (
        <motion.div
          className="bg-purple-50 p-6 rounded-xl border border-purple-300 shadow-inner"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h3 className="text-xl font-bold text-purple-700 mb-2">About</h3>
          <p className="text-gray-700">{bio}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SingleTourGuideDetails;
