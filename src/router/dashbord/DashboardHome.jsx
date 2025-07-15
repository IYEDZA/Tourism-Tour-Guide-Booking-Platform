import { motion } from "framer-motion";
import {
  FaMountain,
  FaUmbrellaBeach,
  FaTree,
  FaWater,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { GiPalmTree, GiTempleGate } from "react-icons/gi";
import { MdOutlineTravelExplore } from "react-icons/md";

const destinations = [
  {
    name: "Sajek Valley",
    location: "Rangamati",
    image: "https://i.ibb.co/zhLqK6Jc/Screenshot-2025-07-15-144808.png",
    icon: <FaMountain className="text-white text-3xl drop-shadow" />,
    description:
      "Sajek is known as the Queen of Hills. Clouds float beneath you. A peaceful paradise for nature lovers.",
  },
  {
    name: "Cox's Bazar",
    location: "Chattogram",
    image: "https://i.ibb.co/Xf6wwLwC/Screenshot-2025-07-15-144829.png",
    icon: <FaUmbrellaBeach className="text-white text-3xl drop-shadow" />,
    description:
      "Cox's Bazar is the longest uninterrupted natural beach in the world. Perfect for sunset chasers.",
  },
  {
    name: "Sundarbans",
    location: "Khulna",
    image: "https://i.ibb.co/CK832J2Q/Screenshot-2025-07-15-144127.png",
    icon: <FaTree className="text-white text-3xl drop-shadow" />,
    description:
      "The world's largest mangrove forest and home to the majestic Royal Bengal Tiger.",
  },
  {
    name: "Jaflong",
    location: "Sylhet",
    image: "https://i.ibb.co/8DncBx4Q/Screenshot-2025-07-15-143307.png",
    icon: <FaWater className="text-white text-3xl drop-shadow" />,
    description:
      "Crystal clear water, floating stones, and views of Meghalaya hills make Jaflong magical.",
  },
  {
    name: "Paharpur",
    location: "Naogaon",
    image: "https://i.ibb.co/nNsJgX5g/cascade-boat-clean-china-natural-rural.jpg",
    icon: <GiTempleGate className="text-white text-3xl drop-shadow" />,
    description:
      "Ruins of the ancient Buddhist monastery, a UNESCO World Heritage site showcasing Bangladesh's rich history.",
  },
  {
    name: "Saint Martin's Island",
    location: "Bay of Bengal",
    image: "https://i.ibb.co/wrMSnXsB/landscape-tropical-vacation-palm-summer.jpg",
    icon: <GiPalmTree className="text-white text-3xl drop-shadow" />,
    description:
      "A tropical island paradise with coral reefs, coconut trees, and turquoise water.",
  },
];

export default function DashboardHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-green-50 to-yellow-50 p-6">
      <motion.h2
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-center mb-10 text-emerald-600 drop-shadow-lg"
      >
        Explore the Beauty of Bangladesh 🇧🇩
      </motion.h2>

      <motion.div
        className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {destinations.map((place, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-2xl shadow-xl group"
            whileHover={{ scale: 1.03 }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <img
              src={place.image}
              alt={place.name}
              className="w-full h-60 object-cover transform group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-end">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-emerald-600 rounded-full p-2">{place.icon}</div>
                <h3 className="text-white text-xl font-bold">{place.name}</h3>
              </div>
              <p className="text-gray-200 text-sm">{place.description}</p>
              <p className="text-xs text-gray-300 italic mt-1">
                <FaMapMarkerAlt className="inline mr-1" />
                {place.location}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-12 text-center">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          className="btn bg-gradient-to-r from-green-500 to-blue-500 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-xl"
        >
          <MdOutlineTravelExplore className="inline-block mr-2" />
          Explore More Destinations
        </motion.button>
      </div>
    </div>
  );
}
