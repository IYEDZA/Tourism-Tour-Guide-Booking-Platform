import { motion } from "framer-motion";
import { use, useEffect, useState } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import Authcontext from "../context/Authcontext";
import useUserRole from "../hooks/useUserRole";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import CommunitypageCard from "./CommunitypageCard";

const textColors = [
  "text-primary",
  "text-secondary",
  "text-accent",
  "text-info",
  "text-success",
  "text-warning",
  "text-error",
];

// Dummy stories with image URLs
const dummyStories = [
  {
    id: 1,
    title: "Journey to the Mountains",
    description: "An unforgettable hiking experience with breathtaking views.",
    author: "Sabrina",
    image: "https://images.unsplash.com/photo-1521336575822-6da63fb45455?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Sunset at Bali",
    description: "The beaches, the food, the people — truly magical!",
    author: "Liam",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "City Lights of Tokyo",
    description: "A tech paradise and cultural wonderland all in one place.",
    author: "Noah",
    image: "https://i.ibb.co/QFp3KvKg/Screenshot-2025-07-15-143038.png",
  },
];

const CommunityPage = () => {
  const [colorIndex, setColorIndex] = useState(0);

  // ....................
               

   const {user}=use(Authcontext);

  const {role} = useUserRole()
  const axiosInstance = useAxios();
  console.log(role)

  const { data: users = [] } = useQuery({
    queryKey: ["my-profile"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/stories`);
      return res.data;
    },
    // enabled: !!user?.email,
  });

  console.log(users)




  // ...........................

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % textColors.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen mt-20 px-6 py-12">
      <motion.h1
        className={`text-3xl font-bold text-center mb-12 transition-colors duration-500 `}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        🧳 Travel Stories from the wanderSphere Community
      </motion.h1>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dummyStories.map((story, index) => (
          <motion.div
            key={story.id}
            className="bg-base-100 shadow-2xl p-5 rounded-xl border-2 border-transparent relative group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
           
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary via-accent to-info blur-md opacity-0 group-hover:opacity-40 transition duration-500 z-0"></div>

            <div className="relative z-10">
              <div className="overflow-hidden rounded-xl mb-4 border-1 border-info transition-all duration-500 group-hover:scale-105 group-hover:border-accent shadow-md">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="card-body space-y-2">
                <h2 className={`card-title font-semibold text-lg ${textColors[colorIndex]}`}>
                  {story.title}
                </h2>
                <p className="text-gray-600">{story.description}</p>
                <p className="text-sm text-gray-400">— {story.author}</p>
                <div className="mt-4 flex gap-2 items-center">
                  <FacebookShareButton
                    url={window.location.href}
                    quote={story.title}
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={window.location.href}
                    title={story.title}
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <WhatsappShareButton
                    url={window.location.href}
                    title={story.title}
                  >
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div> */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5 ">
            {users.map(Card=><CommunitypageCard Card={Card}></CommunitypageCard>)}
           </div>
      
    </div>
  );
};

export default CommunityPage;
