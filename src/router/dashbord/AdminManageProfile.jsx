import {  Fragment, use } from "react";
import { Dialog, Transition } from "@headlessui/react";
// import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUserShield,
  FaUserTie,
  FaEdit,
  FaUsers,
  FaBoxOpen,
  FaMoneyCheckAlt,
  FaUserCheck,
  FaBookOpen,
  FaUserAlt,
  FaInfoCircle,
} from "react-icons/fa";
 import "./AdminManageProfile.css"; // Make sure this file exists
import useUserRole from "../../hooks/useUserRole";
import Authcontext from "../../context/Authcontext";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import AdminprofileCard from "./AdminprofileCard";



// const stats = {
//   totalPayment: "$12,800",
//   totalGuides: 8,
//   totalPackages: 15,
//   totalClients: 35,
//   totalStories: 20,
// };

export default function AdminManageProfile() {
 
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
   <div> {
    users.map(initialAdmin=><AdminprofileCard refetch={refetch} initialAdmin={initialAdmin}></AdminprofileCard>)
    }
    
   </div>
  );
}
