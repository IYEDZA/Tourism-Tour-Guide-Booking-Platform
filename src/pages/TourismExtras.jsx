// TourismShowcaseFinal.jsx
import { motion } from "framer-motion";
import {
  FaStar,
  FaMapMarkedAlt,
  FaGlobe,
  FaUmbrellaBeach,
  FaCameraRetro,
  FaHiking,
  FaShip,
  FaCampground,
  FaCalendarAlt,
  FaMapPin, FaUser,FaQuoteLeft,
  FaTree,
  FaMountain,
  FaBinoculars,
  FaSwimmer,
  FaClock,
  FaDollarSign
} from "react-icons/fa";

// import { FaStar, FaMapMarkedAlt, FaUser,  } from "react-icons/fa";

const testimonials = [
  { name: "Emily Johnson", location: "🇺🇸 USA", occupation: "Photographer", trip: "Mountain Trek", quote: "The Himalayas were breathtaking, and every detail was taken care of!", img: "https://i.ibb.co/VWTZkfYH/Screenshot-2025-07-15-144257.png", rating: 5 },
  { name: "Hiro Tanaka", location: "🇯🇵 Japan", occupation: "Wildlife Biologist", trip: "Sundarbans", quote: "Raw nature, vibrant wildlife, and perfect weather!", img: "https://i.ibb.co/VWTZkfYH/Screenshot-2025-07-15-144257.png", rating: 4 },
  { name: "Maria Garcia", location: "🇪🇸 Spain", occupation: "Travel Blogger", trip: "Morocco Culture Tour", quote: "From souks to Sahara nights – I felt alive!", img: "https://i.ibb.co/VWTZkfYH/Screenshot-2025-07-15-144257.png", rating: 5 },
  { name: "Liam Smith", location: "🇨🇦 Canada", occupation: "Engineer", trip: "Iceland Adventure", quote: "Northern lights felt like a dream come true!", img: "https://i.ibb.co/VWTZkfYH/Screenshot-2025-07-15-144257.png", rating: 5 },
  { name: "Sara Costa", location: "🇧🇷 Brazil", occupation: "Backpacker", trip: "Amazon River", quote: "The sounds of nature at night gave me peace.", img: "https://i.ibb.co/VWTZkfYH/Screenshot-2025-07-15-144257.png", rating: 5 },
  { name: "Marco Bianchi", location: "🇮🇹 Italy", occupation: "Chef", trip: "Kenya Safari", quote: "Seeing lions in the wild was surreal!", img: "https://i.ibb.co/VWTZkfYH/Screenshot-2025-07-15-144257.png", rating: 4 },
  { name: "Ayesha Rahman", location: "🇧🇩 Bangladesh", occupation: "Student", trip: "Bali Beaches", quote: "Sunset yoga on the beach was magical.", img: "https://i.ibb.co/VWTZkfYH/Screenshot-2025-07-15-144257.png", rating: 5 },
  { name: "Tom Müller", location: "🇩🇪 Germany", occupation: "Software Dev", trip: "Swiss Alps", quote: "Snowboarding with expert guides!", img: "https://i.ibb.co/VWTZkfYH/Screenshot-2025-07-15-144257.png", rating: 4 },
  { name: "Chloe Lee", location: "🇰🇷 South Korea", occupation: "Fashion Designer", trip: "Paris Escape", quote: "Stylish, romantic, and unforgettable!", img: "https://i.ibb.co/VWTZkfYH/Screenshot-2025-07-15-144257.png", rating: 5 },
  { name: "Noah Williams", location: "🇦🇺 Australia", occupation: "Marine Biologist", trip: "Barrier Reef Dive", quote: "I swam with sea turtles and dolphins!", img: "https://i.ibb.co/VWTZkfYH/Screenshot-2025-07-15-144257.png", rating: 5 },
  { name: "Fatima Khan", location: "🇦🇪 UAE", occupation: "Entrepreneur", trip: "Desert Safari", quote: "Luxury and thrill all in one ride!", img: "https://i.ibb.co/VWTZkfYH/Screenshot-2025-07-15-144257.png", rating: 5 },
  { name: "John Smith", location: "🇬🇧 UK", occupation: "Retired Teacher", trip: "Greek Islands", quote: "Calm, culture, and crystal clear waters.", img: "https://i.ibb.co/VWTZkfYH/Screenshot-2025-07-15-144257.png", rating: 4 },
];

const experiences = [
  {
    title: "Sahara Nights",
    desc: "Ride camels, sleep under stars, and dine with Berber tribes.",
    duration: "3 Days",
    price: "$499",
    image: "https://i.ibb.co/gLYvsCTn/Screenshot-2025-07-15-143216.png",
    icon: <FaUmbrellaBeach />, 
    size: " h-[360px]"
  },
  {
    title: "Amazon Trek",
    desc: "Jungle tours, waterfalls, and tribal storytelling.",
    duration: "5 Days",
    price: "$899",
    image: "https://i.ibb.co/3G86ZWQ/Screenshot-2025-07-15-143251.png",
    icon: <FaTree />, 
    size: "row-span-2 h-[480px]"
  },
  {
    title: "Fuji Sunrise",
    desc: "Night hikes to summit, meditation at dawn, local tea rituals.",
    duration: "2 Days",
    price: "$349",
    image: "https://i.ibb.co/8DncBx4Q/Screenshot-2025-07-15-143307.png",
    icon: <FaMountain />, 
    size: "h-[360px]"
  },
  {
    title: "Kenya Safari",
    desc: "Witness lions, elephants, and vibrant sunsets.",
    duration: "4 Days",
    price: "$749",
    image: "https://i.ibb.co/1fr2QLJG/Screenshot-2025-07-15-143445.png",
    icon: <FaBinoculars />, 
    size: " h-[400px]"
  },
  {
    title: "Alaskan Cruise",
    desc: "Icebergs, whale sightings, and northern lights show.",
    duration: "7 Days",
    price: "$1,299",
    image: "https://i.ibb.co/8LtLBDwn/Screenshot-2025-07-15-143532.png",
    icon: <FaShip />, 
    size: "h-[370px]"
  },
  {
    title: "Mountain Camping",
    desc: "Bonfires, stargazing, alpine trails & peaceful mornings.",
    duration: "3 Days",
    price: "$399",
    image: "https://i.ibb.co/hJ8Dg4J4/Screenshot-2025-07-15-143546.png",
    icon: <FaCampground />, 
    size: "h-[380px]"
  },
  {
    title: "Great Barrier Reef Dive",
    desc: "Coral gardens, turtles, dolphins & underwater photography.",
    duration: "2 Days",
    price: "$599",
    image: "https://i.ibb.co/0V8VBByT/Screenshot-2025-07-15-143641.png",
    icon: <FaSwimmer />, 
    size: " h-[300px]"
  },
  {
    title: "Swiss Alps Hike",
    desc: "Snow-covered passes, cable cars & glacier lakes.",
    duration: "4 Days",
    price: "$799",
    image: "https://i.ibb.co/Xf6wwLwC/Screenshot-2025-07-15-144829.png",
    icon: <FaHiking />, 
    size: "row-span-1 h-[400px]"
  },
  {
    title: "Paris Culture Walk",
    desc: "Louvre, croissants, romantic strolls & street musicians.",
    duration: "1 Day",
    price: "$199",
    image: "https://i.ibb.co/HDhxX4wc/Screenshot-2025-07-15-143820.png",
    icon: <FaMapMarkedAlt />, 
    size: "col-span-3 h-[360px]"
  }
];

const highlights = [
  { icon: <FaGlobe />, title: "100+ Countries", desc: "Global reach for every type of traveler" },
  { icon: <FaHiking />, title: "Thrill Packed", desc: "Adventure tours, hikes, dives, safaris" },
  { icon: <FaStar />, title: "Top Ratings", desc: "4.9+ average traveler rating" },
];

const seasons = [
  {
    icon: <FaCalendarAlt />, 
    name: "Spring (Mar-May)", 
    places: "Japan, Netherlands, Italy",
    tips: "Enjoy cherry blossoms, tulip fields, and mild Mediterranean weather.",
    color: "text-pink-400"
  },
  {
    icon: <FaCalendarAlt />, 
    name: "Summer (Jun-Aug)", 
    places: "Iceland, Alaska, Switzerland",
    tips: "Perfect for hiking, cruises, and cool weather escapes.",
    color: "text-yellow-300"
  },
  {
    icon: <FaCalendarAlt />, 
    name: "Autumn (Sep-Nov)", 
    places: "USA, Canada, Germany",
    tips: "Experience fall foliage, Oktoberfest, and harvest festivals.",
    color: "text-orange-400"
  },
  {
    icon: <FaCalendarAlt />, 
    name: "Winter (Dec-Feb)", 
    places: "Finland, Nepal, Morocco",
    tips: "Great for snow adventures, warm deserts, and northern lights.",
    color: "text-blue-300"
  },
];

export default function TourismShowcaseFinal() {
  return (
    <div className="text-white animate-pulse-slow bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-gray-900 via-black to-gray-800 py-20 space-y-28 px-4 lg:px-24 ">

      {/* Traveler Testimonials */}
      <div className="">
      <h2 className="text-4xl font-extrabold text-center text-primary animate-pulse mb-16">
        💬 What Travelers Are Saying
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="bg-base-100 rounded-2xl border-4 border-info p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-accent"
          >
            <div className="flex items-center justify-center flex-col">
              <img
                src={t.img}
                alt={t.name}
                className="w-20 h-20 rounded-full border-4 border-secondary shadow-lg mb-3"
              />
              <h3 className="text-xl font-bold text-accent">{t.name}</h3>
              <p className="text-sm text-gray-400 flex items-center gap-1">
                <FaMapMarkedAlt /> {t.location}
              </p>
              <p className="text-sm text-info flex items-center gap-1 mt-1">
                <FaUser /> {t.occupation} — <span className="text-white">{t.trip}</span>
              </p>
            </div>

            <div className="mt-4 p-4 bg-gray-900 rounded-xl border border-dashed border-gray-600 relative">
              <FaQuoteLeft className="absolute -top-5 left-3 text-2xl text-secondary" />
              <p className="text-white italic">{t.quote}</p>
            </div>

            <div className="flex justify-center mt-4 text-yellow-400 text-lg">
              {[...Array(t.rating)].map((_, i) => (
                <motion.div key={i} whileHover={{ scale: 1.2 }}>
                  <FaStar />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>

      {/* Top Experiences */}
       <section>
        <h2 className="text-center text-4xl font-extrabold text-accent animate-pulse mb-12">
          🌍 Global Top Experiences
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-flow-dense auto-rows-fr gap-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`relative group rounded-2xl overflow-hidden border-4 border-secondary hover:border-accent transition shadow-lg ${exp.size}`}
            >
              <img src={exp.image} alt={exp.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out" />
              <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-2xl font-bold text-info flex items-center gap-2">
                  {exp.icon} {exp.title}
                </h3>
                <p className="text-gray-300 text-sm mb-1">{exp.desc}</p>
                <div className="flex items-center justify-between text-sm text-white">
                  <span className="flex items-center gap-1"><FaClock className="text-warning" /> {exp.duration}</span>
                  <span className="flex items-center gap-1"><FaDollarSign className="text-green-400" /> {exp.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Highlight Features */}
      <section>
        <h2 className="text-center text-4xl font-extrabold text-primary animate-pulse mb-12">
          🚀 Why Travel With Us?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl bg-gradient-to-r from-accent via-secondary to-info text-center shadow-2xl text-black"
            >
              <div className="text-5xl mb-3 text-white animate-bounce">{h.icon}</div>
              <h4 className="text-xl font-bold mb-2 text-white">{h.title}</h4>
              <p className="text-white text-sm">{h.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Seasonal Travel Tips */}
      <section>
        <h2 className="text-center text-4xl font-extrabold text-warning animate-pulse mb-12">
          🗕️ Best Seasons to Travel
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {seasons.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-base-100 border-2 border-info rounded-xl p-5 shadow-lg"
            >
              <div className={`text-3xl ${s.color} mb-3`}>{s.icon}</div>
              <h4 className="font-bold text-lg text-red-400">{s.name}</h4>
              <p className="text-gray-400 text-sm mt-1">Best for: {s.places}</p>
              <p className="text-gray-300 text-xs mt-2 italic">{s.tips}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
