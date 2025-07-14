import { useState } from "react";
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
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";
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

const TourGuideProfilecard = ({initialGuide}) => {

    
      const [guide, setGuide] = useState(initialGuide);
      const [isOpen, setIsOpen] = useState(false);
      const [formData, setFormData] = useState({ ...initialGuide });
       const  axiosSecure  = useAxios()
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const updatedLanguages = formData.languages
          ?.split(",")
          .map((lang) => lang.trim());
          const mydata ={ ...formData, languages: updatedLanguages }
        setGuide(mydata);
        console.log(mydata)
    
         const admindata   =  axiosSecure.patch(`/users/${guide._id}`,mydata)
          Swal.fire({
               icon: "success",
               title: "Profile Updated!",
               text: `${guide.name}'s profile has been saved.`,
               confirmButtonColor: "#0ea5e9",
             });
        setIsOpen(false);
      };
    



    return (
        <div>
             <div className="">
     
   {/* <TourGuideProfilecard></TourGuideProfilecard> */}
    
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto bg-base-100 rounded-3xl shadow-2xl border-4 border-info p-8"
      >
        <h2 className="text-4xl font-bold text-center text-accent mb-10 animate-pulse">
          👋 Welcome Back, {guide.name}!
        </h2>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Profile Image */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-full max-w-sm border-4 border-info rounded-xl overflow-hidden shadow-xl"
          >
            <img
              src={guide.image}
              alt="Tour Guide"
              className="object-cover h-96 w-full"
            />
            <div className="absolute bottom-0 w-full bg-black bg-opacity-70 text-center p-3">
              <h2 className="text-xl font-bold">{guide.name}</h2>
              <p className="text-sm text-info">{guide.role}</p>
            </div>
          </motion.div>

          {/* Info Section */}
          <div className="flex-1 space-y-4 text-lg">
            <p className="flex items-center gap-2 text-info">
              <FaEnvelope /> {guide.email}
            </p>
            <p className="flex items-center gap-2 text-info">
              <FaPhone /> {guide.phone}
            </p>
            <p className="flex items-center gap-2 text-info">
              <FaMapMarkerAlt /> {guide.location}
            </p>
            <h1 className="flex items-center gap-2 text-info"> <FaUserTie /> {guide.experience}</h1>
            {/* <p className="flex items-center gap-2 text-info">
             
            </p> */}
            <p className="flex items-center gap-2 text-yellow-400">
              <FaStar /> Rating: {guide.rating}
            </p>
            <div className="flex items-start gap-2 text-info">
              <FaLanguage /> Languages:
              <div className="flex flex-wrap gap-2 ml-2">
                {guide?.languages?.map((lang, i) => (
                  <span key={i} className="badge badge-accent text-white">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
            <div className="italic border-l-4 border-primary text-black pl-4">{guide.bio}</div>
          </div>
        </div>

        {/* Edit Button */}
        <div className="mt-10 text-right">
          <button
            onClick={() => setIsOpen(true)}
            className="btn btn-secondary px-6 py-2 text-white font-bold hover:scale-105 transition border-2 border-info"
          >
            <FaUserEdit className="mr-2" /> Edit Profile
          </button>
        </div>

        {/* Edit Modal */}
        <Transition show={isOpen} as={motion.div}>
          <Dialog onClose={() => setIsOpen(false)} className="fixed inset-0 z-50 p-4 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <Dialog.Panel className="w-full max-w-md bg-base-100 text-white rounded-xl p-6 border-4 border-info shadow-2xl">
                <Dialog.Title className="text-2xl font-bold text-accent mb-4">
                  Edit Tour Guide Info
                </Dialog.Title>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input input-bordered w-full text-black"
                    placeholder="Name"
                  />
                  <input
                    name="email"
                    value={formData.email}
                    disabled
                    className="input w-full bg-gray-200 text-gray-600 cursor-not-allowed"
                  />
                  <input
                    name="role"
                    value={formData.role}
                    disabled
                    className="input w-full bg-gray-200 text-gray-600 cursor-not-allowed"
                  />
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input input-bordered w-full text-black"
                    placeholder="Phone"
                  />
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="input input-bordered w-full text-black"
                    placeholder="Location"
                  />

                  <input
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    className="input input-bordered w-full text-black"
                    placeholder="specialty...Wirte............"
                  />
                  <input
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="input input-bordered w-full text-black"
                    placeholder="Experience"
                  />

                   <input
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className="input input-bordered w-full text-black"
                    placeholder="availability.........."
                  />
                  <input
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="input input-bordered w-full text-black"
                    placeholder="Rating"
                  />
                  <input
                    name="languages"
                    value={formData.languages}
                    onChange={handleChange}
                    className="input input-bordered w-full text-black"
                    placeholder="Languages (comma separated)"
                  />
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full text-black"
                    placeholder="Bio"
                  ></textarea>
                  <div className="text-right">
                    <button
                      type="submit"
                      className="btn btn-primary px-6 mt-4 text-white"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </div>
          </Dialog>
        </Transition>
      </motion.div>
    </div>
        </div>
    );
};

export default TourGuideProfilecard;