import { use, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { FaFileUpload, FaPaperPlane, FaUserTie } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import Authcontext from "../../context/Authcontext";


export default function JoinAsTourGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const axiosIn = useAxios();
  const {user}=use (Authcontext)
  console.log(user.displayName)
// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

  const handleSubmit =async (e) => {
    e.preventDefault();
     const form = e.target;
    // const data = {
    // //  name :user.na me 
    //   //  :user.email
      
    // };

    // ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
    const name = user.displayName
    const touremail =user.email
      const title= form.tourGuideTitle.value;
      const experience= form.tourGuideExperince.value;
       const description= form.tourGuidedescription.value;
      const cv= form.cV.value;
      const status = "pending";
      const role = "tourist"
     const  createdAt= new Date().toISOString();

// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

      const tourGuidedata = { name ,touremail,title,experience,description,cv,createdAt,status,role}
      console.log(tourGuidedata)

    const userRes = await axiosIn.post('/tourGuides', tourGuidedata);
                console.log(userRes.data);
     setIsOpen(true);
  };

  return (
    <div className="min-h-screen  px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto p-10 rounded-xl shadow-2xl "
      >
        <h2 className="text-3xl font-bold text-center  mb-10 animate-pulse">
          🧳 Apply to Become a Tour Guide
        </h2>
{/* ,,,,,,,,,,,,,,,,,,,,,,, */}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-semibold ">
              Application Title
            </label>
            <input
              type="text"
              name="tourGuideTitle"
              required
              placeholder="Enter a strong application title"
              className="input w-full "
            />
          </div>
          <div>
           <label className="block mb-1 font-semibold ">
              Application Experince
            </label>
            <input
              type="text"
              name="tourGuideExperince"
              required
              placeholder="Enter a strong application Experince"
              className="input w-full "
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold ">
              Why do you want to be a Tour Guide?
            </label>
            <textarea
              required
              name="tourGuidedescription"
              placeholder="Describe your motivation and experience"
              className="textarea w-full  "
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 font-semibold ">
              CV / Portfolio Link
            </label>
            <input
              type="url"
              name="cV"
              required
              placeholder="https://your-cv-link.com"
              className="input w-full "
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full mt-4 flex justify-center items-center gap-2 text-white font-bold hover:scale-105 transition shadow-lg"
          >
            <FaPaperPlane /> Submit Application
          </button>
        </form>
      </motion.div>

      {/* Success Modal */}
      <Transition show={isOpen} as={motion.div} className="relative z-50">
        <Dialog onClose={() => setIsOpen(false)} className="fixed inset-0 p-4 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <Dialog.Panel className="w-full max-w-md rounded-2xl bg-base-100 p-6 shadow-2xl border-4 border-info text-white text-center">
              <Dialog.Title className="text-2xl font-bold text-accent mb-4">
                🎉 Application Submitted
              </Dialog.Title>
              <p className="text-gray-300">Your request to join as a Tour Guide has been submitted successfully. We’ll review and get back to you soon.</p>
              <div className="mt-6">
                <button
                  onClick={() => setIsOpen(false)}
                  className="btn btn-primary px-6 text-white"
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
} 
