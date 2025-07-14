import React from 'react';
import { useState, Fragment, use, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
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
import Swal from 'sweetalert2';

// const initialAdmin = {
//   name: "Admin Master",
//   email: "admin@tourzone.com",
//   role: "Admin",
//   phone: "+880123456789",
//   location: "Dhaka, Bangladesh",
//   avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e", // More reliable avatar
//   about: "Oversees all platform operations and ensures quality experiences.",
// };

const stats = {
  totalPayment: "$12,800",
  totalGuides: 8,
  totalPackages: 15,
  totalClients: 35,
  totalStories: 20,
};


  
const AdminprofileCard = ({initialAdmin}) => {

const [admin, setAdmin] = useState(initialAdmin);
  const [isOpen, setIsOpen] = useState(false);
   const [users1, setUsers1] = useState();
   console.log(users1)
  const [formData, setFormData] = useState({ ...initialAdmin });
//   const adminprofile =useUserRole()
  // console.log(adminprofile)

//   const {user}= use (Authcontext)
  const  axiosSecure  = useAxios()

    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAdmin(formData);

    console.log(formData)

     const admindata   =  axiosSecure.patch(`/users/${admin._id}`,formData)
     Swal.fire({
     icon: "success",
     title: "Done!",
      text: "User profile eddited  successfully",
     confirmButtonColor: "#0ea5e9",
  });
    setIsOpen(false);
  };


    return (
        <div>
            <div className="min-h-screen relative bg-gradient-to-b from-black to-gray-900 text-white px-6 py-12 overflow-hidden">
      
      {/* Header */}
      <motion.h1
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="text-4xl text-center font-bold text-primary mb-10 drop-shadow-lg"
      >
        👋 Welcome Back, {admin?.name || "Admin"}
      </motion.h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-10 z-10 relative">
        {[
          [<FaMoneyCheckAlt />, "Total Payment", stats.totalPayment],
          [<FaUserCheck />, "Tour Guides", stats.totalGuides],
          [<FaBoxOpen />, "Packages", stats.totalPackages],
          [<FaUsers />, "Clients", stats.totalClients],
          [<FaBookOpen />, "Stories", stats.totalStories],
        ].map(([icon, label, value]) => (
          <div
            key={label}
            whileHover={{ scale: 1.08, rotate: [0, 2, -2, 0] }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-base-100 p-5 rounded-xl shadow-2xl text-center border border-info hover:shadow-accent snake-border "
          >
            <div className="text-3xl text-accent mb-2 animate-bounce">{icon}</div>
            <h2 className="text-xl text-black font-bold">{value}</h2>
            <p className="text-info text-sm">{label}</p>
          </div>
        ))}
      </div>

      {/* Profile Info */}
      <div className="grid lg:grid-cols-3 gap-10 items-start relative z-10">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.03 }}
          className="border-4 border-accent rounded-xl overflow-hidden shadow-xl hover:shadow-accent  "
        >
          <img
            src={admin.photo}
            onError={(e) => (e.currentTarget.src = "/default-avatar.png")} // fallback if image fails
            className="w-full h-72 object-cover "
            alt="Admin"
          />
          <div className="bg-black bg-opacity-70 p-3 text-center">
            <p className="font-bold text-lg animate-pulse-slow">
              <FaUserAlt className="inline mr-1" />
              {admin?.name}
            </p>
            <p className="text-accent">
              <FaUserShield className="inline mr-1" />
              {admin?.role}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-6 lg:col-span-2 space-y-3 text-info font-medium"
        >
          <p className="border-b-2 border-accent border-dotted pb-3">
            <FaUserAlt className="inline mr-1" />
            <strong>Name:</strong> <span className="text-white">{admin?.name}</span>
          </p>
          <p>
            <FaEnvelope className="inline mr-1" />
            <strong>Email:</strong> <span className="text-white">{admin?.email}</span>
          </p>
          <p>
            <FaUserTie className="inline mr-1" />
            <strong>Role:</strong> <span className="text-white">{admin?.role}</span>
          </p>
          <p>
            <FaPhone className="inline mr-1" />
            <strong>Phone:</strong> <span className="text-white">{admin?.phone}</span>
          </p>
          <p>
            <FaMapMarkerAlt className="inline mr-1" />
            <strong>Location:</strong> <span className="text-white">{admin?.location}</span>
          </p>
          <p className="border-l-4 border-accent pl-4 text-white italic">
            <FaInfoCircle className="inline mr-2 text-accent" />
            <strong>About:</strong> {admin?.about}
          </p>
        </motion.div>
      </div>

      {/* Edit Button */}
      <div className="mt-10 text-center relative z-10">
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setIsOpen(true)}
          className="btn btn-secondary font-bold text-white px-6 border border-info hover:shadow-lg"
        >
          <FaEdit className="mr-2" /> Edit Profile
        </motion.button>
      </div>

      {/* Edit Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md rounded-xl bg-base-100 p-6 text-white border-4 border-info shadow-2xl">
                <Dialog.Title className="text-xl font-bold text-accent mb-4">Edit Admin Profile</Dialog.Title>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input name="name" value={formData.name} onChange={handleChange} placeholder='type your name ...'  className="input input-bordered w-full text-black" required />
                  <input value={formData.email} disabled className="input input-bordered w-full bg-gray-200 text-gray-500" />

                  <input value={formData.role} disabled className="input input-bordered w-full bg-gray-200 text-gray-500" />

                  <input name="phone" value={formData.phone} onChange={handleChange} placeholder='type your phone number ...' className="input input-bordered w-full text-black" />

                  <input name="photo" value={formData.photo} onChange={handleChange} placeholder='type your photo url ...' className="input input-bordered w-full text-black" />

                  <input name="location" value={formData.location} onChange={handleChange} placeholder='type your location ...' className="input input-bordered w-full text-black" />

                  <textarea name="about" value={formData.about} onChange={handleChange} placeholder='type about or more  ...' className="textarea textarea-bordered w-full text-black" rows={3} />
                  <div className="text-right">
                    <button type="submit" className="btn btn-primary text-white px-6">Save</button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
        </div>
    );
};

export default AdminprofileCard;