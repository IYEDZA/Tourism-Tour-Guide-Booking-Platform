import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaGlobeAmericas, FaUsers, FaStar, FaHiking, FaUmbrellaBeach, FaMountain } from "react-icons/fa";

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
    <div className="bg-base-200 px-6 lg:px-20 py-16">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Left: Text + Stats + Icons */}
        <motion.div
          className="max-w-xl text-center lg:text-left"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2
            className={`text-4xl font-bold mb-4 transition-colors duration-500 ${textColors[colorIndex]}`}
          >
            Why Choose TourZone?
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            TourZone brings the world to your fingertips — explore with confidence and create unforgettable memories with our curated experiences.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 text-center mb-6">
            <div>
              <p className="text-3xl font-bold text-primary">{count.destinations}+</p>
              <p className="text-sm text-gray-500">Destinations</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-secondary">{count.travelers}+</p>
              <p className="text-sm text-gray-500">Happy Travelers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent">{count.reviews}+</p>
              <p className="text-sm text-gray-500">Reviews</p>
            </div>
          </div>

          {/* Animated Travel Category Icons */}
          <div className="flex justify-center lg:justify-start gap-6 text-3xl text-info mb-6">
            <motion.div whileHover={{ scale: 1.2 }}><FaHiking title="Adventure" /></motion.div>
            <motion.div whileHover={{ scale: 1.2 }}><FaUmbrellaBeach title="Beach" /></motion.div>
            <motion.div whileHover={{ scale: 1.2 }}><FaMountain title="Mountain" /></motion.div>
          </div>

          {/* Button */}
          <motion.button
            className={`btn btn-outline btn-wide font-bold border-2 ${textColors[colorIndex]}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Right: Local Video */}
        <motion.div
  className="w-full max-w-xl rounded-lg shadow-2xl overflow-hidden"
  initial={{ opacity: 0, x: 80 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 1.2 }}
>
  
  {/* <video
    src="https://youtu.be/Z755vZBf9oM?si=tYumkcaE6yiKI3F0"
    className="w-full h-full rounded-xl"
    autoPlay
    loop
    muted
    playsInline
  /> */}

  <iframe width="560" height="315" src="https://www.youtube.com/embed/Z755vZBf9oM?si=OhoXK3he_feG2yrH" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</motion.div>

      </div>
    </div>
  );
};

export default OverviewSection;
