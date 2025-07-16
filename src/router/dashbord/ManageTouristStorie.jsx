import { use, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

import MangageTouriststoiesCard from "./MangageTouriststoiesCard";
import Authcontext from "../../context/Authcontext";
import useUserRole from "../../hooks/useUserRole";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";



export default function ManageTouristStories() {
  
  const {user}=use(Authcontext);
  const {role} =useUserRole()
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6 py-20 ">

       <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold text-center text-accent mb-12 animate-pulse"
      >
        📝 Manage Your Stories
      </motion.h2>

<div className="grid  ">
  
      {users.map(mockStories=><MangageTouriststoiesCard mockStories={mockStories}></MangageTouriststoiesCard>)}
       
</div>

    </div>
  );
}
