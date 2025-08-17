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
//  
//   {
//    
//    
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
       <div className="min-h-screen  px-6 py-20 ">

       <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center  mb-12 animate-pulse"
      >
        📝 Manage Your Stories
      </motion.h2>

<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3'>
  
      {users?.map(mockStories=><ManageTourGuideStoriesCard mockStories={mockStories}></ManageTourGuideStoriesCard> )}
       
</div>
    </div>
    </div>
    );
};

export default ManageTourGuideStory;