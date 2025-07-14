import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import { motion, AnimatePresence } from "framer-motion";
import { FaImage,FaCameraRetro, FaChevronDown, FaChevronUp, FaHeart, FaMapMarkedAlt, FaPlaneDeparture, FaStar } from "react-icons/fa";
import VanillaTilt from "vanilla-tilt";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import PackageCard from "./PackageCard";


function TiltCard({ children }) {
  const tiltRef = useRef(null);

  useEffect(() => {
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
      });
    }
  }, []);

  return <div ref={tiltRef}>{children}</div>;
}



// Gallery images with explicit sizes for variety (w = width fraction, h = height px)
const galleryImages = [
  { src: "https://images.unsplash.com/photo-1607746882042-944635dfe10e", w: "100%", h: 250 },
  { src: "https://images.unsplash.com/photo-1607746882042-944635dfe10e", w: "100%", h: 320 },
  { src: "https://images.unsplash.com/photo-1607746882042-944635dfe10e", w: "100%", h: 200 },
  { src: "https://images.unsplash.com/photo-1607746882042-944635dfe10e", w: "100%", h: 280 },
  { src: "https://images.unsplash.com/photo-1607746882042-944635dfe10e", w: "100%", h: 350 },
  { src: "https://images.unsplash.com/photo-1607746882042-944635dfe10e", w: "100%", h: 230 },
];

const tourPlan = [
  "Day 1: Arrival and sunset river cruise",
  "Day 2: Mountain hiking and local village tour",
  "Day 3: Beach day and cultural event",
];

const tourGuides = [
  { id: "guide1", name: "Alex Roy" },
  { id: "guide2", name: "Nadia Ahmed" },
];

const PackageDetailsPage = () => {
  const navigate = useNavigate();
   const axiosSecure = useAxios();
  
  const [expandedIndex, setExpandedIndex] = useState(null);

   const { data: packages = [], refetch } = useQuery({
        queryKey: ['packages'],
        queryFn: async () => {
          // `/parcels?email=${user.email}`
            const res = await axiosSecure.get('/packages');
            return res.data;
        }
    })

    console.log(packages);


  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };


  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">







  
      {/* Masonry Gallery with varied heights */}
      <PhotoProvider
        maskOpacity={0.85}
        speed={600}
        easing="cubic-bezier(0.4, 0, 0.2, 1)"
      >
        <div
          className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6"
          style={{ columnGap: "1.5rem" }}
        >
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="break-inside-avoid rounded-xl shadow-lg border-4 border-transparent hover:border-primary transition-all cursor-pointer overflow-hidden"
              style={{ height: img.h }}
            >
              <PhotoView src={img.src}>
                <img
                  src={img.src}
                  alt={`Gallery image ${i + 1}`}
                  className="w-full h-full object-cover rounded-xl transition-transform duration-300 hover:scale-105 hover:brightness-110"
                  loading="lazy"
                />
              </PhotoView>
            </motion.div>
          ))}
        </div>
      </PhotoProvider>


      
    <div className="relative overflow-hidden py-6 bg-gradient-to-r from-primary to-secondary shadow-xl rounded-xl mb-10">
      {/* Marquee animation using motion + Tailwind */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "linear",
        }}
        className="flex gap-12 whitespace-nowrap text-white font-extrabold text-2xl md:text-4xl tracking-widest px-6"
      >
        {Array(3)
          .fill(
            <span className="flex items-center gap-4 drop-shadow-lg">
              <FaStar className="text-yellow-400 animate-pulse" />
              <FaHeart className="text-pink-500 animate-bounce" />
              Your Favourite Package 
              <FaPlaneDeparture className="text-info animate-spin-slow" />
            </span>
          )
          .map((content, idx) => (
            <div key={idx}>{content}</div>
          ))}
      </motion.div>

      {/* Overlay blur glow */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent blur-sm opacity-30 animate-pulse" />
    </div>


    {packages.map (pack =>(<div><PackageCard pack={pack}></PackageCard>

      <div>
       {/* {pack.images?.map((img, i) => (
  <img src='' alt='' />))}  */}
</div> </div>))}


     
     


    </div>
  );
};

export default PackageDetailsPage;
