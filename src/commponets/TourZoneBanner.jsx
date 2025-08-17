import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const image1 =
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80";
const image2 =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80";

const borderColors = [
  "border-primary",
  "border-secondary",
  "border-accent",
  "border-info",
  "border-success",
  "border-warning",
  "border-error",
];

const textColors = [
  "text-primary",
  "text-secondary",
  "text-accent",
  "text-info",
  "text-success",
  "text-warning",
  "text-error",
];

const TourZoneBanner = () => {
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % borderColors.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-base-100 px-6 lg:px-24 py-28 ">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16">
        {/* Left: Text Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-xl text-center lg:text-left"
        >
          <h1
            className={`text-3xl sm:text-3xl md:text-3xl font-bold mb-5  duration-500 `}
          >
            Discover Beautiful Destinations with WanderSphere
          </h1>
          <p className="py-4 text-base sm:text-lg text-gray-400">
            Find your dream travel experience — from beaches to mountains,
            adventures to relaxation. Start your journey with confidence.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`relative px-8 py-3 font-semibold text-base sm:text-lg rounded-full border-2 transition-colors duration-500 overflow-hidden ${borderColors[colorIndex]} ${textColors[colorIndex]} btn btn-outline`}
          >
            {/* Sparkling Star Effect Behind */}
            <span className="absolute -left-5 -top-5 w-24 h-24 bg-gradient-to-tr from-pink-500 to-yellow-400 opacity-20 rounded-full animate-ping"></span>

            {/* Button Text */}
            <Link to='/package'> <span className="relative z-10">Explore Now ✨</span></Link>
           
          </motion.button>
        </motion.div>

        {/* Right: Animated Image Group */}
        <div className="relative w-full max-w-md flex justify-center items-center pl-24">
          {/* Top Image */}
          <motion.img
            src={image1}
            alt="TourZone Adventure"
            className={`w-64 sm:w-72 h-44 sm:h-48 object-cover rounded-2xl border-4 shadow-xl z-10 relative transition-all duration-700 ${borderColors[colorIndex]}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          />

          {/* Bottom Image */}
          <motion.img
            src={image2}
            alt="TourZone Nature"
            className={`w-56 sm:w-64 h-40 sm:h-44 object-cover rounded-2xl border-4 shadow-xl absolute -bottom-6 -left-6 z-0 transition-all duration-700 ${borderColors[(colorIndex + 2) % borderColors.length]}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          />
        </div>
      </div>
    </div>
  );
};

export default TourZoneBanner;
