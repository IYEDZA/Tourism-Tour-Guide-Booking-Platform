import React, { use } from "react";
import { Link, useNavigate } from "react-router";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { FaShareAlt, FaArrowRight, FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import Authcontext from "../context/Authcontext";

const ShowStoryCard = ({ storyData }) => {
  const navigate = useNavigate();
  const { user } = use(Authcontext);

  const { name, email, photo, role, bio, experience, location, specialty, stories = [] } = storyData || {};

  const handleShareClick = () => {
    if (!user?.email) navigate("/login");
  };

  return (
    <motion.div
      className="bg-base-200 rounded-3xl shadow-2xl  overflow-hidden hover:scale-[1.02] transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="md:flex">
        {/* Left - Profile */}
        <div className="md:w-1/3  p-6 flex flex-col items-center md:items-start text-center md:text-left">
          <img
            src={photo || "https://i.ibb.co/ZmNtT1K/default-user.png"}
            alt={name}
            className="w-28 h-28 rounded-full border-4 border-primary object-cover mb-4 shadow-md"
          />
          <h2 className="font-bold text-xl flex items-center gap-2">
            <FaUserCircle /> {name}
          </h2>
          <span className="badge badge-primary mt-1">{role}</span>
          {/* <p className="text-xs opacity-70 break-words mt-1">{email}</p> */}

          <div className="mt-4 bg-base-100 p-3 rounded-xl w-full border-l-4 border-primary shadow-sm">
            <p><strong>📍 Location:</strong> {location || "Unknown"}</p>
            {/* <p><strong>💼 Experience:</strong> {experience || "N/A"}</p> */}
            <p><strong>🎯 Specialty:</strong> {specialty || "Not mentioned"}</p>
          </div>
        </div>

        {/* Right - Bio & Stories */}
        <div className="md:w-2/3 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold  mb-3 border-b-1 border-primary pb-2">About</h3>
            <p className="text-gray-700 text-sm leading-relaxed">{bio || "No bio provided."}</p>
          </div>

          {stories.length > 0 && (
            <div className="mt-5">
              <h3 className="text-xl font-semibold  mb-3 border-b-1 border-secondary pb-2">Travel Stories</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {stories.map((story, i) => (
                  <div key={i} className="bg-base-300 p-4 rounded-xl shadow hover:shadow-md transition">
                    <h4 className="font-semibold text-primary">{story.title || `Story ${i + 1}`}</h4>
                    <p className="text-gray-600 text-sm line-clamp-3">{story.description || "No description."}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Link to="/allStories" className="btn btn-outline btn-primary flex-1">
              <FaArrowRight /> All Stories
            </Link>

            {user?.email ? (
              <FacebookShareButton
                url={window.location.href}
                quote={`Check out this amazing travel story by ${name}!`}
                hashtag="#ExploreWithUs"
                className="flex-1 flex justify-center"
              >
                <FacebookIcon size={40} round />
              </FacebookShareButton>
            ) : (
              <button
                onClick={handleShareClick}
                className="btn btn-primary flex-1 flex items-center gap-2 justify-center"
              >
                <FaShareAlt /> Login to Share
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ShowStoryCard;
