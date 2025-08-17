import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaHiking, FaUmbrellaBeach, FaMountain } from "react-icons/fa";
import { Link } from "react-router";

const textColors = [
  "text-primary",
  "text-secondary",
  "text-accent",
  "text-info",
  "text-success",
  "text-warning",
  "text-error",
];

const OverviewSection = () => {
  const [colorIndex, setColorIndex] = useState(0);
  const [count, setCount] = useState({
    destinations: 0,
    travelers: 0,
    reviews: 0,
  });

  useEffect(() => {
    const colorInterval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % textColors.length);
    }, 2000);

    const counterInterval = setInterval(() => {
      setCount((prev) => ({
        destinations: Math.min(prev.destinations + 1, 100),
        travelers: Math.min(prev.travelers + 10, 5000),
        reviews: Math.min(prev.reviews + 2, 800),
      }));
    }, 30);

    return () => {
      clearInterval(colorInterval);
      clearInterval(counterInterval);
    };
  }, []);

  return (
    <div className="bg-base-100 px-6 lg:px-24 py-20">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
        {/* Left: Text + Stats + Icons */}
        <motion.div
          className="max-w-lg text-center lg:text-left"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2
            className={`text-3xl md:text-3xl font-bold mb-6 transition-colors duration-500 `}
          >
            Why Choose WanderSphere?
          </h2>
          <p className="text-gray-400 text-lg md:text-xl mb-8 leading-relaxed">
            TourZone brings the world to your fingertips — explore with confidence and create
            unforgettable memories with our curated experiences.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 text-center gap-6 mb-8">
            <div className="bg-base-100 p-4 rounded-lg shadow-lg">
              <p className="text-3xl md:text-4xl font-bold text-accent">{count.destinations}+</p>
              <p className="text-sm md:text-base text-gray-500 mt-1">Destinations</p>
            </div>
            <div className="bg-base-100 p-4 rounded-lg shadow-lg">
              <p className="text-3xl md:text-4xl font-bold ">{count.travelers}+</p>
              <p className="text-sm md:text-base text-gray-500 mt-1">Happy Travelers</p>
            </div>
            <div className="bg-base-100 p-4 rounded-lg shadow-lg">
              <p className="text-3xl md:text-4xl font-bold text-accent">{count.reviews}+</p>
              <p className="text-sm md:text-base text-gray-500 mt-1">Reviews</p>
            </div>
          </div>

          {/* Animated Travel Category Icons */}
          <div className="flex justify-center lg:justify-start gap-8 text-3xl md:text-4xl text-info mb-8">
            <motion.div whileHover={{ scale: 1.2 }} className="p-3 bg-base-100 rounded-lg shadow-lg">
              <FaHiking title="Adventure" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }} className="p-3 bg-base-100 rounded-lg shadow-lg">
              <FaUmbrellaBeach title="Beach" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.2 }} className="p-3 bg-base-100 rounded-lg shadow-lg">
              <FaMountain title="Mountain" />
            </motion.div>
          </div>

          {/* Button */}
          <Link to='/trip'> <motion.button
            className={`btn btn-outline btn-wide rounded-full font-bold border-2 ${textColors[colorIndex]}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button></Link>
         
        </motion.div>

        {/* Right: Video */}
        <motion.div
          className="w-full  rounded-2xl shadow-2xl overflow-hidden border-2 border-base-300"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
        >
          <iframe
            className="w-full h-64 sm:h-80 md:h-96 rounded-2xl"
            src="https://www.youtube.com/embed/Z755vZBf9oM?si=OhoXK3he_feG2yrH"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </motion.div>
      </div>
    </div>
  );
};

export default OverviewSection;
