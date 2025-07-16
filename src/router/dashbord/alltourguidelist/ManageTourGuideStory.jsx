import React, { use } from 'react';
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  FaEdit,
  FaTrash,
  FaImages,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaDollarSign,
  FaAlignLeft,
  FaListUl
} from "react-icons/fa";
import Swal from "sweetalert2";
import Authcontext from '../../../context/Authcontext';
import useUserRole from '../../../hooks/useUserRole';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import ManageTourGuideStoriesCard from './ManageTourGuideStoriesCard';

// const mockStories = [
//   {
//     id: 1,
//     title: "Safari Adventure",
//     shortDesc: "Exploring wildlife in Kenya.",
//     story: "It was an amazing safari adventure, witnessing the big five in their natural habitat.",
//     place: "Kenya",
//     date: "2025-06-10",
//     cost: 1200,
//     images: [
//       "https://i.ibb.co/V9JqV0L/safari.jpg",
//       "https://i.ibb.co/hVKKgtH/testimonial6.jpg"
//     ]
//   },
//   {
//     id: 2,
//     title: "Bali Beach Escape",
//     shortDesc: "Relaxing days on Bali's beaches.",
//     story: "The beaches of Bali were tranquil and beautiful. Enjoyed sunsets and cultural dances.",
//     place: "Bali, Indonesia",
//     date: "2025-05-05",
//     cost: 800,
//     images: [
//       "https://i.ibb.co/Ytk1cY3/testimonial9.jpg"
//     ]
//   }
// ];

const ManageTourGuideStory = () => {

  const {user}=use(Authcontext);

  const {role} = useUserRole()
  const axiosInstance = useAxios();
  console.log(role)

  const { data: users = [] } = useQuery({
    queryKey: ["my-profile", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/stories?email=${user?.email}&role=${role}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  console.log(users)




    
    return (
   
    <div>
       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6 py-20 ">

       <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold text-center text-accent mb-12 animate-pulse"
      >
        📝 Manage Your Stories
      </motion.h2>

<div className='grid'>
  
      {users?.map(mockStories=><ManageTourGuideStoriesCard mockStories={mockStories}></ManageTourGuideStoriesCard> )}
       
</div>
    </div>
    </div>
    );
};

export default ManageTourGuideStory;