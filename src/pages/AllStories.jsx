import React from "react";
import { motion } from "framer-motion";
import {
  FaUserCircle,
  FaLocationArrow,
  FaGlobe,
  FaPhone,
  FaUserTie,
  FaStar,
  FaPlaneDeparture,
} from "react-icons/fa";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, type: "spring", stiffness: 70 },
  }),
};

const AllStories = ({ allStories = [] }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header with shimmer text */}
      <motion.h2
        className="text-4xl font-extrabold text-center mb-14 bg-gradient-to-r from-purple-500 via-pink-400 to-indigo-500 text-transparent bg-clip-text animate-pulse drop-shadow-lg"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        🌍 Explore Incredible Travel Stories
      </motion.h2>

      {/* Grid of Story Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allStories.map((user, i) => (
          <motion.div
            key={user._id || i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="rounded-2xl border-2 border-purple-200 shadow-lg hover:shadow-purple-400 hover:scale-[1.02] bg-white/90 backdrop-blur-sm transition-all duration-300 p-5 relative overflow-hidden group"
          >
            {/* Glowing border effect */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-400 group-hover:animate-pulse transition-all"></div>

            {/* User Profile */}
            <div className="text-center">
              <img
                src={user.photo || "https://i.ibb.co/ZmNtT1K/default-user.png"}
                alt="user"
                className="w-20 h-20 mx-auto rounded-full border-4 border-purple-500 shadow-md transition-all duration-500 group-hover:rotate-3"
              />
              <h3 className="mt-3 font-bold text-xl text-purple-700 flex items-center justify-center gap-2">
                <FaUserCircle className="text-indigo-500" /> {user.name}
              </h3>
              <p className="text-xs text-gray-500 italic">{user.role}</p>
              <p className="text-xs text-gray-600">{user.email}</p>
            </div>

            {/* Info Section */}
            <div className="mt-4 space-y-1 text-sm text-gray-700">
              <p><FaLocationArrow className="inline mr-2 text-pink-500" /> {user.location}</p>
              <p><FaPhone className="inline mr-2 text-green-500" /> {user.phone}</p>
              <p><FaGlobe className="inline mr-2 text-blue-600" /> {user.languages?.join(", ")}</p>
              <p><FaUserTie className="inline mr-2 text-yellow-600" /> {user.experience}</p>
              <p><FaStar className="inline mr-2 text-purple-600" /> {user.specialty}</p>
            </div>

            {/* Story Card */}
            {user.stories?.length > 0 && (
              <motion.div
                className="mt-5 bg-purple-50 rounded-xl p-3 shadow-inner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h4 className="font-bold text-md text-purple-600 mb-3 flex items-center gap-2">
                  <FaPlaneDeparture className="text-purple-500" /> Travel Story
                </h4>
                {user.stories.map((story, idx) => (
                  <motion.div
                    key={idx}
                    className="rounded-lg overflow-hidden border border-purple-300 shadow-md mb-3 group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-40 object-cover transform transition duration-500 group-hover:scale-105"
                    />
                    <div className="p-3">
                      <h5 className="text-purple-700 font-semibold text-sm">
                        {story.title}
                      </h5>
                      <p className="text-xs text-gray-600">
                        {story.description || "No description."}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        📍 {story.place} | 📅 {story.date} | 💸 {story.cost}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllStories;
