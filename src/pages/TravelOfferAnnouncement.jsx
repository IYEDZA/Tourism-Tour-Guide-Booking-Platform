import { motion } from "framer-motion";
import { FaPlane, FaTags, FaGift, FaArrowRight, FaUmbrellaBeach, FaHiking, FaMountain, FaCity, FaLandmark } from "react-icons/fa";

export default function TravelOfferAnnouncement() {
  return (
    <motion.div
      className="bg-gradient-to-br from-purple-600 to-red-400 text-white rounded-2xl shadow-2xl p-8 text-center my-10 mx-4 md:mx-auto max-w-6xl border-4 border-white"
      initial={{ opacity: 0, y: 40, rotateY: -90 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h2
        className="text-4xl font-extrabold mb-4 flex justify-center items-center gap-3"
        initial={{ rotateX: -90 }}
        animate={{ rotateX: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        <FaGift className="text-yellow-300 animate-bounce" /> Hot Summer Offer!
      </motion.h2>

      <motion.p
        className="text-lg md:text-xl font-medium"
        initial={{ scale: 0.9, rotateX: -10 }}
        animate={{ scale: 1, rotateX: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        🌍 Travel with <span className="text-yellow-200 font-bold">TourZone</span> this season and enjoy up to
        <span className="text-yellow-300 font-extrabold"> 30% OFF </span>on selected packages to:
      </motion.p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-white text-left">
        {[
          {
            title: "Cox’s Bazar",
            icon: <FaUmbrellaBeach />,
            img: "https://i.ibb.co/hZpLtqv/cox.jpg",
            items: [
              "✅ 3 nights beachside resort stay",
              "✅ Seafood & snorkeling tour",
              "✅ Sunset cruise included",
            ],
            delay: 0,
          },
          {
            title: "Sajek Valley",
            icon: <FaMountain />,
            img: "https://i.ibb.co/zVXk7m1/sajek.jpg",
            items: [
              "✅ Scenic hill resort views",
              "✅ Guided trekking & sunrise points",
              "✅ Bonfire and cultural night",
            ],
            delay: 0.1,
          },
          {
            title: "Sundarbans",
            icon: <FaHiking />,
            img: "https://i.ibb.co/VjmCSLc/sundarbans.jpg",
            items: [
              "✅ Jungle boat safari",
              "✅ Wildlife photography session",
              "✅ Local cuisine & heritage walk",
            ],
            delay: 0.2,
          },
          {
            title: "Dhaka City Tour",
            icon: <FaCity />,
            img: "https://i.ibb.co/JjFfNHq/dhaka.jpg",
            items: [
              "✅ Rickshaw heritage ride",
              "✅ Lalbagh Fort & museum visit",
              "✅ Street food tasting",
            ],
            delay: 0.3,
          },
          {
            title: "Paharpur",
            icon: <FaLandmark />,
            img: "https://i.ibb.co/S7jkbXj/paharpur.jpg",
            items: [
              "✅ UNESCO World Heritage Site",
              "✅ Guided archeological tour",
              "✅ Traditional lunch experience",
            ],
            delay: 0.4,
          },
          {
            title: "Saint Martin’s Island",
            icon: <FaUmbrellaBeach />,
            img: "https://i.ibb.co/FB4PcvK/saint.jpg",
            items: [
              "✅ Coral beach & island hop",
              "✅ Water sports and BBQ night",
              "✅ Sunset bonfire party",
            ],
            delay: 0.5,
          },
        ].map((pkg, idx) => (
          <motion.div
            key={idx}
            className="bg-white/30 rounded-xl p-4 shadow-lg backdrop-blur-lg border border-white/30 overflow-hidden"
            whileHover={{ scale: 1.1, rotateY: 5 }}
            initial={{ opacity: 0, rotateY: -20, rotateX: -10, scale: 0.95 }}
            animate={{ opacity: 1, rotateY: 0, rotateX: 0, scale: 1 }}
            whileTap={{ scale: 0.98, rotateX: 3 }}
            transition={{ duration: 0.6, delay: pkg.delay }}
          >
            <motion.img
              src={pkg.img}
              alt={pkg.title}
              className="w-full h-40 object-cover rounded-lg mb-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
            <motion.h4
              className="text-xl font-bold mb-2 flex items-center gap-2"
              whileHover={{ rotateZ: -1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {pkg.icon} {pkg.title}
            </motion.h4>
            <motion.ul
              className="text-sm space-y-1 text-white/90"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: pkg.delay + 0.3, duration: 0.5 }}
            >
              {pkg.items.map((line, i) => (
                <motion.li key={i} whileHover={{ scale: 1.05 }}>{line}</motion.li>
              ))}
            </motion.ul>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.1, rotateZ: 3 }}
        whileTap={{ scale: 0.95 }}
        className="mt-10 bg-yellow-300 text-purple-800 font-bold px-8 py-3 rounded-full shadow-md hover:shadow-xl transition duration-300"
      >
        <FaPlane className="inline-block mr-2" /> Book Now <FaArrowRight className="inline-block ml-2" />
      </motion.button>
    </motion.div>
  );
}
