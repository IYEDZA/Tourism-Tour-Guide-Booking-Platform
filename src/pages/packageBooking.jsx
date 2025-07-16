import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaRoute } from 'react-icons/fa';
import { Link, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';
import Authcontext from '../context/Authcontext';

const PackageBooking = () => {
  const [tourDate, setTourDate] = useState(new Date());
  const [selectedGuide, setSelectedGuide] = useState("");
  const [showModal, setShowModal] = useState(false);
  const axiosInstance = useAxios();
  const { user,loading } = use(Authcontext);
  const { id } = useParams();

  // ✅ Fetch All Tour Guides
  const { data: users = [] } = useQuery({
    queryKey: ["tour-guides"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users?role=tourGuide`);
      return res.data;
    },
  });
 const selected = users.find((guide) => guide.email === selectedGuide);
 console.log(selected)

//   // ✅ Fetch Selected Guide Info
//   const { data: tour = {},isLoading } = useQuery({
//     queryKey: ["selected"],
//     queryFn: async () => {
//       const res = await axiosInstance.get(`/users?email={selectedGuide}`);
//       return res.data;
//     },
//     // enabled: !!selectedGuide,
//   });
//  console.log(tour)

  // ✅ Fetch Package Info
  const { data: pack = {} } = useQuery({
    queryKey: ["package-details", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/packages/${id}`);
      return res.data;
    },
  });
// location, description,maxPeople, rating, guide, images, itinerary
  const {
    _id, title,  price, duration,
    travelType, 
  } = pack;

 


  // if(isLoading){
  //   return
  // }

  // ✅ Form Logic

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
   
    const bookingData = {
      ...data,
        tourGuideId:selected._id,
      // tourGuideEmail: tour?.email,
       tourGuideName :selected.name,
      tourDate,
      status: "pending",
      packageId: _id,
     
      travelType,
      title,
     packageprice: price
    };
    console.log(bookingData)

    const res = await axiosInstance.post("/booking", bookingData);
    console.log(res)
    if(res.data.insertedId){
    setShowModal(true)
    }
    console.log("✅ Booking Data:", bookingData);
    
  };
  ;

  return (
    <div className="relative z-10">
      {/* 🌟 Header */}
      <div className="relative py-10 text-center overflow-hidden bg-gradient-to-br from-base-200 to-base-100 rounded-xl shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 via-pink-500 to-indigo-500 opacity-10 blur-2xl animate-pulse z-0" />
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-lg flex items-center justify-center gap-4"
        >
          <FaRoute className="text-accent animate-spin-slow" />
          Plan Your Next Adventure
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg md:text-xl text-base-content mt-4 font-medium z-10 relative"
        >
          Choose your destination, set your schedule, and book with confidence.
        </motion.p>
      </div>

      {/* 📝 Booking Form */}
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white p-6 rounded-xl shadow-xl border border-primary space-y-4 mt-10 mx-auto "
      >
        <h2 className="text-xl font-bold mb-2 text-primary">Booking Form</h2>

        <input {...register("packageName")} readOnly value={title} className="input input-bordered w-full" />
        <input {...register("touristName")} readOnly value={user?.displayName} className="input input-bordered w-full" />
        <input {...register("touristEmail")} readOnly value={user?.email} className="input input-bordered w-full" />
        <input {...register("touristImage")} readOnly value={user?.photoURL} className="input input-bordered w-full" />
        <input {...register("price")} defaultValue={`$${price}`} className="input input-bordered w-full" />

        <DatePicker
          selected={tourDate}
          onChange={(date) => setTourDate(date)}
          className="input input-bordered w-full"
        />

        <select
          {...register("tourGuideEmail")}
          required
          className="select select-bordered w-full"
          // 
          onChange={(e) => setSelectedGuide(e.target.value)}
        >
          <option  value="">Choose a tour guide</option>
          {users.map((guide) => (
            // value={guide._id}
            <option key={guide._id} value={guide.email}>{guide.name}</option>
          ))}
        </select>

        {/* 👤 Selected Tour Guide Info */}
        {selectedGuide  && (
          <motion.div
            className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-lg shadow-inner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-purple-800 mb-1">{selectedGuide}</h3>
            {/* <p className="text-sm"><strong>📍 Location:</strong> {tour.location}</p>
            <p className="text-sm"><strong>📞 Phone:</strong> {tour.phone}</p>
            <p className="text-sm"><strong>💼 Experience:</strong> {tour.experience}</p>
            <p className="text-sm"><strong>🎯 Specialty:</strong> {tour.specialty}</p>
            <p className="text-sm"><strong>🌐 Languages:</strong> {tour.languages?.join(", ")}</p> */}
          </motion.div>
        )}
     
     {
      user?.email?(<button type="submit" className="btn btn-accent w-full mt-4">
          Book Now
        </button>):( <Link to='/login'><button className="btn btn-accent w-full mt-4">
         You can not  Booking login now
        </button></Link>)
     }
        {/* <button type="submit" className="btn btn-accent w-full mt-4">
          Book Now
        </button> */}
       
      </motion.form>

      {/* ✅ Booking Confirmation Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white p-8 rounded-2xl shadow-xl border-2 border-green-400 max-w-md w-full mx-4 text-center"
            >
              <h3 className="text-2xl font-bold text-green-600 mb-3">
                ✅ Booking Confirmed!
              </h3>
              <p className="mb-5 text-gray-700">
                Your booking has been saved with status:{" "}
                <span className="font-semibold text-purple-600">Pending</span>.
              </p>
              <Link
                to="/dashboard/bookings"
                className="btn btn-success w-full hover:scale-105 transition-transform"
              >
                Go to My Bookings
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PackageBooking;
