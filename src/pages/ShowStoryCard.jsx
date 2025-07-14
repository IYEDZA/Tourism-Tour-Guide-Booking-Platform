import React, { use } from "react";
import { Link, useNavigate } from "react-router";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { FaShareAlt, FaArrowRight, FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import Authcontext from "../context/Authcontext";

const ShowStoryCard = ({ storyData }) => {
  const navigate = useNavigate();
  const { user } = use(Authcontext);

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
    stories = [],
  } = storyData || {};

  const handleShareClick = () => {
    if (!user?.email) navigate("/login");
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl p-6 md:p-8 border-2 border-purple-300 shadow-xl mt-10"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
    >
      {/* Header */}
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 text-transparent bg-clip-text mb-10 tracking-tight"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        🌟 Traveler Profile & Story
      </motion.h1>

      {/* Flex layout: Profile + Info */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {/* Profile Left */}
        <motion.div
          className="md:w-1/3 flex flex-col items-center text-center bg-purple-50 p-4 rounded-2xl border border-purple-200 shadow-sm"
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <img
            src={photo || "https://i.ibb.co/ZmNtT1K/default-user.png"}
            alt="User"
            className="w-24 h-24 rounded-full border-4 border-purple-500 shadow-md"
          />
          <h2 className="text-xl font-bold mt-3 text-purple-700 flex items-center justify-center gap-1">
            <FaUserCircle /> {name}
          </h2>
          <p className="text-sm text-gray-500 italic">{role}</p>
          <p className="text-xs text-gray-600">{email}</p>
        </motion.div>

        {/* Details Right */}
        <motion.div
          className="md:w-2/3 flex flex-col justify-center gap-2 text-sm text-gray-700"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p><strong>📍 Location:</strong> {location}</p>
          {/* <p><strong>📞 Phone:</strong> {phone}</p> */}
          {/* <p><strong>🌐 Languages:</strong> {languages.join(", ") || "N/A"}</p> */}
          {/* <p><strong>🧭 Availability:</strong> {availability}</p> */}
          <p><strong>💼 Experience:</strong> {experience}</p>
          <p><strong>🎯 Specialty:</strong> {specialty}</p>
        </motion.div>
      </div>

      {/* Bio Section */}
      <motion.div
        className="bg-white p-5 rounded-xl border-l-4 border-purple-400 mb-6 shadow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-lg font-bold text-purple-700 mb-1">About</h3>
        <p className="text-gray-700 text-sm">{bio || "No bio provided."}</p>
      </motion.div>

      {/* Stories Section */}
      {stories.length > 0 && (
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-xl font-bold text-indigo-700 mb-3">Travel Stories</h3>
          <div className="flex flex-col gap-4">
            {stories.map((story, i) => (
              <motion.div
                key={i}
                className="bg-white p-4 rounded-xl border-l-4 border-purple-500 shadow-md hover:scale-[1.01] transition-transform"
                whileHover={{ y: -5 }}
              >
                <h4 className="text-lg font-semibold text-purple-700">
                  {story.title || `Story ${i + 1}`}
                </h4>
                <p className="text-gray-600 text-sm">{story.description || "No description."}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Buttons */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >

        <Link to='/allStories'><button
          className="btn btn-outline btn-accent w-full md:w-auto"
        //   onClick={() => navigate("/all-stories")}
        >
          <FaArrowRight /> All Stories
        </button>
</Link>
        
        {user?.email ? (
          <FacebookShareButton
            url={window.location.href}
            quote={`Check out this amazing travel story by ${name}!`}
            hashtag="#ExploreWithUs"
            className="hover:scale-110 transition-transform duration-300"
          >
            <FacebookIcon size={40} round />
          </FacebookShareButton>
        ) : (
          <button
            onClick={handleShareClick}
            className="btn btn-primary w-full md:w-auto flex items-center gap-2"
          >
            <FaShareAlt /> Login to Share
          </button>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ShowStoryCard;
