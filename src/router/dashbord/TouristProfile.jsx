  // TourismShowcaseFinal.jsx
import { use, useState } from "react";
import { motion } from "framer-motion";
import { Dialog, Transition } from "@headlessui/react";
import {
  FaEdit,
  FaUser,
  FaEnvelope,
  FaUserTie,
  FaArrowRight,
} from "react-icons/fa";
import TouristprofileCard from "./TouristprofileCard";
import useUserRole from "../../hooks/useUserRole";
import Authcontext from "../../context/Authcontext";
import useAxios from "../../hooks/useAxios";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function ManageTouristProfile() {
  // const [isOpen, setIsOpen] = useState(false);

  const adminprofile =useUserRole()
  // console.log(adminprofile)

  const {user}= use (Authcontext)
  const  axiosSecure  = useAxios()
  const axiosPrivate = useAxiosSecure()


  const { data: users = [], refetch } = useQuery({
        queryKey: ['my-profile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user?.email}`);
            // console.log(res.data)
            return res.data;
        }
    })

    console.log(users)


// refetch()


  return (
   <div>

    {users.map(user=><TouristprofileCard user1={user} refetch={refetch}></TouristprofileCard>)}
    
   </div>
  );
}
 
   
   
 