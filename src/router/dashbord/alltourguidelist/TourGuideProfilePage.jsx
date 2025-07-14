import { use, useState } from "react";
import { motion } from "framer-motion";
import { Dialog, Transition } from "@headlessui/react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaStar,
  FaLanguage,
  FaUserTie,
  FaUserEdit,
} from "react-icons/fa";
import TourGuideProfilecard from "./TourGuideProfilecard";
import useAxios from "../../../hooks/useAxios";
import Authcontext from "../../../context/Authcontext";
import useUserRole from "../../../hooks/useUserRole";
import { useQuery } from "@tanstack/react-query";

// const initialGuide = {
//   name: "Sarah Wanderlust",
//   email: "sarah@wanderlust.com",
//   phone: "+19874561230",
//   location: "Pokhara, Nepal",
//   languages: ["English", "Nepali", "French"],
//   experience: "6 Years",
//   rating: 4.8,
//   avatar: "https://i.ibb.co/D5kJ8B6/tour-guide.jpg",
//   role: "Tour Guide",
//   bio: "Friendly guide with a passion for local culture and mountain adventures. I love helping people explore new places with excitement and safety.",
// };

export default function TourGuideProfilePage() {

  
  const adminprofile =useUserRole()
  // console.log(adminprofile)

  const {user}= use (Authcontext)
  const  axiosSecure  = useAxios()




  const { data: users = [], refetch } = useQuery({
        queryKey: ['my-profile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user?.email}`);
            // console.log(res.data)
            return res.data;
        }
    })



  return (
  <div>
{/* 
    {users.map(=><TourGuideProfilecard initialGuide={initialGuide}></TourGuideProfilecard>)} */}
    {users.map(initialGuide => <TourGuideProfilecard key={initialGuide._id} initialGuide={initialGuide} ></TourGuideProfilecard>)}
  </div>
  );
}
