import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Dialog, Transition } from "@headlessui/react";
import Swal from "sweetalert2";
import {
  FaEdit,
  FaUser,
  FaEnvelope,
  FaUserTie,
  FaArrowRight,
} from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router";

const TouristprofileCard = ({ user,refetch }) => {


  const [isOpen, setIsOpen] = useState(false);

  const  axiosSecure  = useAxios()

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: user.name,
      phone: user.phone || "",
      location: user.location || "",
      about: user.about || "",
    },
  });

  const onSubmit = (data) => {
    // Optional: Send `data` to backend with Axios
const admindata   =  axiosSecure.patch(`/users/${user._id}`,data)
   


// reset()
refetch()

    console.log(data)
    Swal.fire({
      icon: "success",
      title: "Profile Updated!",
      text: `${data.name}'s profile has been saved.`,
      confirmButtonColor: "#0ea5e9",
    });
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen px-6 py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto bg-base-100 p-10 rounded-xl shadow-2xl border border-accent"
      >
        <h2 className="text-4xl font-extrabold text-center text-primary mb-10 animate-pulse">
          👋 Welcome Back, {user.name}!
        </h2>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-full overflow-hidden border-4 border-info shadow-lg group rounded-xl"
          >
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-full h-80 object-cover group-hover:scale-105 transition duration-700"
            />
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 text-white text-center p-2">
              <p className="text-lg font-bold">{user.name}</p>
              <p className="text-sm text-info">{user.role}</p>
            </div>
          </motion.div>

          <div className="lg:col-span-2 divide-y divide-accent/30">
            <div className="py-4 flex items-center gap-2 text-info text-lg font-semibold">
              <FaUser /> Name: <span>{user.name}</span>
            </div>
            <div className="py-4 flex items-center gap-2 text-info text-lg font-semibold">
              <FaEnvelope /> Email: <span>{user.email}</span>
            </div>
            <div className="py-4 flex items-center gap-2 text-info text-lg font-semibold">
              <FaUserTie /> Role: <span>{user.role}</span>
            </div>
            <div className="py-4 flex items-center gap-2 text-info text-lg font-semibold">
              📞 Phone: <span>{user.phone}</span>
            </div>
            <div className="py-4 flex items-center gap-2 text-info text-lg font-semibold">
              📍 Location: <span>{user.location}</span>
            </div>
            <div className="py-4 text-info italic border-l-4 border-accent pl-4">
              📝 {user.about}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-12 gap-4 flex-wrap">
          <button
            onClick={() => {
              reset();
              setIsOpen(true);
            }}
            className="btn btn-secondary text-white border-2 border-info hover:scale-105 transition"
          >
            <FaEdit className="mr-2" /> Edit Profile
          </button>

          <Link
           to='/dashboard/joinTourGuide'
            className="btn btn-accent text-white border-2 border-primary hover:scale-105 transition flex items-center"
          >
            Apply for Tour Guide <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </motion.div>

      {/* Modal */}
      <Transition show={isOpen} as="div" className="relative z-50">
        <Dialog onClose={() => setIsOpen(false)} className="fixed inset-0 overflow-y-auto p-4">
          <div className="flex items-center justify-center min-h-screen">
            <Dialog.Panel className="w-full max-w-md bg-base-100 rounded-xl p-6 shadow-2xl border border-info text-white">
              <Dialog.Title className="text-2xl font-bold text-accent mb-4">
                Edit Profile
              </Dialog.Title>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                  {...register("name")}
                  className="input w-full text-black border-b-2 border-info"
                  placeholder="Name......"
                />
                <input
                  value={user.email}
                  disabled
                  className="input w-full bg-gray-200 text-gray-500 border-b-2 border-gray-300"
                />
                <input
                  value={user.role}
                  disabled
                  className="input w-full bg-gray-200 text-gray-500 border-b-2 border-gray-300"
                />
                <input
                  {...register("phone")}
                  className="input w-full text-black border-b-2 border-info"
                  placeholder="Phone"
                />
                <input
                  {...register("location")}
                  className="input w-full text-black border-b-2 border-info"
                  placeholder="Location"
                />
                <textarea
                  {...register("about")}
                  className="textarea w-full text-black border-b-2 border-info"
                  placeholder="About"
                ></textarea>

                <div className="flex justify-end mt-6">
                  <button type="submit" className="btn btn-primary text-white px-6">
                    Save
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default TouristprofileCard;
