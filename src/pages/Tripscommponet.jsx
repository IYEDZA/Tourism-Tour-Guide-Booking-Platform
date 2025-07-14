import { motion } from "framer-motion";
import { FaQuoteLeft, FaMapMarkerAlt, FaStar } from "react-icons/fa";

const tripComments = [
  {
    name: "Elena Parker",
    location: "New York, USA",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=9",
    comment:
      "TourZone gave me the most unforgettable sunrise hike in Bandarban! Nature, culture, and comfort—all in one trip.",
    date: "July 2025",
  },
  {
    name: "Ishfaq Hossain",
    location: "Kushtia",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?img=10",
    comment:
      "Our river cruise in Barishal was peaceful and scenic. TourZone managed everything like pros.",
    date: "June 2025",
  },
  {
    name: "Linda Zhao",
    location: "Beijing, China",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=11",
    comment:
      "Visiting tea gardens in Sylhet was a serene escape. TourZone made it authentic and safe for solo travel.",
    date: "May 2025",
  },
  {
    name: "Mohammad Yusuf",
    location: "Cox's Bazar",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=12",
    comment:
      "I traveled with family to the Sundarbans. Everything was well organized and kid-friendly too!",
    date: "April 2025",
  },
  {
    name: "Tania Akter",
    location: "Narayanganj",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=13",
    comment:
      "Nilgiri was a dream! The views, the food, the care from TourZone—it was 10/10.",
    date: "March 2025",
  },
  {
    name: "Akash Saha",
    location: "Kolkata, India",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?img=14",
    comment:
      "Bangladesh is underrated. My experience with TourZone in Paharpur and Mahasthangarh was top-notch.",
    date: "February 2025",
  }
];

export default function TripComments() {
  return (
    <div className="bg-white py-10 px-6 md:px-12 rounded-xl shadow-xl mt-10 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')]">
      <motion.h2
        className="text-3xl font-bold text-center text-emerald-600 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        What Our Travelers Say 💬
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-6">
        {tripComments.map((comment, idx) => (
          <motion.div
            key={idx}
            className="bg-gradient-to-br from-green-50 via-white to-emerald-50 border-l-4 border-emerald-400 p-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={comment.avatar}
                alt={comment.name}
                className="w-12 h-12 rounded-full border-2 border-emerald-400 shadow-md"
              />
              <div>
                <h4 className="text-lg font-semibold text-gray-800">{comment.name}</h4>
                <p className="text-sm text-gray-500 flex items-center">
                  <FaMapMarkerAlt className="mr-1" /> {comment.location}
                </p>
              </div>
            </div>

            <p className="text-sm italic text-gray-700 flex items-start gap-2">
              <FaQuoteLeft className="text-emerald-400 mt-1" /> {comment.comment}
            </p>

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-1">
                {[...Array(comment.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>
              <p className="text-xs text-gray-400">{comment.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}