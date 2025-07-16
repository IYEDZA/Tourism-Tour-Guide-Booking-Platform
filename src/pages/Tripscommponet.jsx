import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
// import { FaQuoteLeft, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import useAxios from "../hooks/useAxios";
import { FaMapMarkerAlt, FaStar, FaUsers, FaRegClock, FaPlane } from "react-icons/fa";
import { Link } from "react-router";

// const tripComments = [
//   {
//     name: "Elena Parker",
//     location: "New York, USA",
//     rating: 5,
//     avatar: "https://i.pravatar.cc/150?img=9",
//     comment:
//       "TourZone gave me the most unforgettable sunrise hike in Bandarban! Nature, culture, and comfort—all in one trip.",
//     date: "July 2025",
//   },
//   {
//     name: "Ishfaq Hossain",
//     location: "Kushtia",
//     rating: 4,
//     avatar: "https://i.pravatar.cc/150?img=10",
//     comment:
//       "Our river cruise in Barishal was peaceful and scenic. TourZone managed everything like pros.",
//     date: "June 2025",
//   },
//   {
//     name: "Linda Zhao",
//     location: "Beijing, China",
//     rating: 5,
//     avatar: "https://i.pravatar.cc/150?img=11",
//     comment:
//       "Visiting tea gardens in Sylhet was a serene escape. TourZone made it authentic and safe for solo travel.",
//     date: "May 2025",
//   },
//   {
//     name: "Mohammad Yusuf",
//     location: "Cox's Bazar",
//     rating: 5,
//     avatar: "https://i.pravatar.cc/150?img=12",
//     comment:
//       "I traveled with family to the Sundarbans. Everything was well organized and kid-friendly too!",
//     date: "April 2025",
//   },
//   {
//     name: "Tania Akter",
//     location: "Narayanganj",
//     rating: 5,
//     avatar: "https://i.pravatar.cc/150?img=13",
//     comment:
//       "Nilgiri was a dream! The views, the food, the care from TourZone—it was 10/10.",
//     date: "March 2025",
//   },
//   {
//     name: "Akash Saha",
//     location: "Kolkata, India",
//     rating: 4,
//     avatar: "https://i.pravatar.cc/150?img=14",
//     comment:
//       "Bangladesh is underrated. My experience with TourZone in Paharpur and Mahasthangarh was top-notch.",
//     date: "February 2025",
//   }
// ];

export default function TripComments() {
const axiosInstance = useAxios();
  const { data:packages  = [] } = useQuery({
    queryKey: ["my-packages", ],
    queryFn: async () => {
      const res = await axiosInstance.get(`/packages`);
      return res.data;
    },
    
  });

  console.log(packages)
  return (
      <div className="py-12 px-4 md:px-10 bg-gradient-to-b from-white to-emerald-50">
      <motion.h2
        className="text-4xl font-bold text-center text-emerald-600 mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Explore All Tour Packages ✈️
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg, i) => (
          <motion.div
            key={pkg._id}
            className="card bg-white shadow-xl hover:shadow-2xl border border-emerald-200 rounded-2xl transition-transform transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <figure className="overflow-hidden rounded-t-2xl">
              <img
                src={pkg.cover}
                alt={pkg.title}
                className="w-full h-56 object-cover hover:scale-110 transition-transform duration-500"
              />
            </figure>
            <div className="card-body space-y-2">
              <h3 className="text-xl font-bold text-emerald-700">{pkg.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FaMapMarkerAlt className="text-emerald-500" /> {pkg.location}
              </div>
              <div className="flex flex-wrap justify-between text-sm text-gray-700 mt-2">
                <span className="flex items-center gap-1">
                  <FaPlane className="text-blue-500" /> {pkg.travelType}
                </span>
                <span className="flex items-center gap-1">
                  <FaRegClock className="text-orange-500" /> {pkg.duration} days
                </span>
                <span className="flex items-center gap-1">
                  <FaUsers className="text-indigo-500" /> Max {pkg.maxPeople}
                </span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="text-lg font-semibold text-emerald-600">
                  ${pkg.price}
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  <FaStar />
                  {pkg.rating}
                </div>
              </div>
              <div className="card-actions mt-4">

                <Link to={`/pack/${pkg._id}`}><button
                  // onClick={() => navigate(`/package-details/${pkg._id}`)}
                  className="btn btn-outline btn-emerald-600 w-full hover:bg-emerald-500 hover:text-white transition-all duration-300"
                >
                  View Details
                </button>
                </Link>
                
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}