// TourGuideProfilePage.jsx
import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaStar,
  FaLanguage, FaUserTie, FaFacebook, FaInstagram, FaClock
} from "react-icons/fa";
import Authcontext from "../context/Authcontext";
import useUserRole from "../hooks/useUserRole";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

// Inject animated glow border styles
const glowStyle = `
.glow-border {
  background: linear-gradient(135deg, #06b6d4, #3b82f6, #10b981);
  background-size: 300% 300%;
  animation: glowEffect 5s ease infinite;
  border-radius: 1rem;
}
@keyframes glowEffect {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
`;

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



const TourGuideProfilePage = () => {
  const [colorIndex, setColorIndex] = useState(0);

// ..................
  const {user}=use(Authcontext);

  const {role} = useUserRole()
  const axiosInstance = useAxios();
  console.log(role)

  const { data: users = [] } = useQuery({
    queryKey: ["my-profile", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/stories?role=${role}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  console.log(users)

  // .....................

  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = glowStyle;
    document.head.appendChild(styleTag);

    const timer = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % borderColors.length);
    }, 500);

    return () => {
      document.head.removeChild(styleTag);
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-base-200 px-6 py-14">
      <h1 className={`text-4xl font-bold text-center mb-14 ${textColors[colorIndex]} transition-all duration-500`}>
        🌍 Meet Our Expert Tour Guides
      </h1>

      <div className="grid gap-12 md:grid-cols-2">
        {users?.map((guide) => (
          <motion.div
            key={guide._id}
            className="glow-border p-[3px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-base-100 rounded-xl p-6 shadow-lg">
              {/* Profile Header */}
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <img
                  src={guide.photo}
                  alt={guide.name}
                  className="w-32 h-32 rounded-full object-cover ring-4 ring-info hover:ring-success transition"
                />
                <div className="text-center lg:text-left">
                  <h2 className={`text-2xl font-bold mb-1`}>
                    {guide.name}
                  </h2>
                  <p className="text-gray-600 mb-2">{guide.bio}</p>
                  <div className="flex flex-wrap gap-3 text-sm mt-2 justify-center lg:justify-start">
                    <span className="flex items-center gap-2"><FaEnvelope /> {guide.email}</span>
                    <span className="flex items-center gap-2"><FaPhone /> {guide.phone}</span>
                    <span className="flex items-center gap-2"><FaMapMarkerAlt /> {guide.location}</span>
                    <span className="flex items-center gap-2"><FaStar className="text-yellow-400" /> {guide.rating} / 5</span>
                    <span className="flex items-center gap-2"><FaClock />{guide?.availability}</span>
                    <span className="flex items-center gap-2"><FaLanguage /> {guide?.languages?.join(", ")}</span>
                    <span className="flex items-center gap-2"><FaUserTie /> {guide?.specialty}</span>
                  </div>
                  <div className="flex justify-center lg:justify-start gap-4 mt-3">
                    <a href={guide.social.facebook} target="_blank" rel="noreferrer" className="text-blue-600 text-lg"><FaFacebook /></a>
                    <a href={guide.social.instagram} target="_blank" rel="noreferrer" className="text-pink-500 text-lg"><FaInstagram /></a>
                  </div>
                </div>
              </div>

              {/* Stories */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-accent">📘 Tour Stories</h3>
                <div className="space-y-6">
                  {guide.stories.map((story, idx) => (
                    <motion.div
                      key={idx}
                      className="bg-base-100 border-l-4 border-info p-4 rounded shadow-md flex items-center gap-4"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.2 }}
                    >
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-20 h-20 object-cover rounded-lg border-2 border-primary"
                      />
                      <div>
                        <h4 className="font-bold text-base text-primary">{story.title}</h4>
                        <p className="text-sm text-gray-400">{story.date}</p>
                        <p className="text-gray-700">{story.description}</p>
                         <p className="text-gray-700">Place :{story.place}</p>
                           <p className="text-gray-700">CoST :{story.cost}</p>

                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TourGuideProfilePage;
