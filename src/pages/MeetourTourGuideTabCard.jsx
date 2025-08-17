import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const MeetourTourGuideTabCard = ({ guides }) => {
  return (
    <div className="px-5 lg:px-5 py-12">
      <motion.div
        className="grid md:grid-cols-4 gap-5"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {guides.map((guide, index) => (
          <motion.div
            key={index}
            className="relative group rounded-2xl overflow-hidden "
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 250 }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0  rounded-2xl pointer-events-none"></div>

            <div className="relative  rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 bg-base-200 transition-shadow duration-300">
              
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <img
                  src={guide.photo}
                  alt={guide.name}
                  className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-xl ring-2 ring-primary shadow-md"
                />
              </div>

              {/* Text Content */}
              <div className="flex-1 w-full">
                <h3 className="text-xl md:text-xl font-bold  mb-2">{guide.name}</h3>
                <p className="text-gray-700 mb-1"><span className="font-semibold ">Experience:</span> {guide.experience}</p>
                <p className="text-gray-700 mb-4"><span className="font-semibold ">Specialty:</span> {guide.specialty}</p>

                <Link to={`guide/${guide._id}`}>
                  <button className="btn btn-primary btn-sm md:btn-md transition-transform duration-300 group-hover:scale-105">
                    View Details
                  </button>
                </Link>
              </div>

            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default MeetourTourGuideTabCard;
