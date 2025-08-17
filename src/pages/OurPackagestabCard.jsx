import { motion } from 'framer-motion';
import React from 'react';
import { GiPalmTree } from 'react-icons/gi';
import { Link } from 'react-router';

const OurPackagestabCard = ({ packages }) => {
  return (
    <div className=" px-6 md:px-12 lg:px-16 py-12">
      <motion.div
        className="grid md:grid-cols-3 gap-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {packages.map((pack, index) => (
          <motion.div
            key={index}
            className="relative group rounded-2xl overflow-hidden shadow-2xl cursor-pointer bg-base-200"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 250 }}
            
          >

              <div className="flex items-center gap-3 mb-1 p-4">
                  <GiPalmTree className="text-4xl text-primary animate-bounce" />
                  <h3 className="text-xl md:text-xl font-extrabold ">{pack.title}</h3>
                </div>
            {/* Gradient Overlay */}
            <div className="absolute inset-0  rounded-2xl pointer-events-none"></div>

            <div className="relative bg-base-200 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6  transition-shadow duration-300">
              
              {/* Image */}
              <div className="flex-shrink-0">
                <img
                  src={pack.cover}
                  alt={pack.title}
                  className="w-36 h-36 md:w-40 md:h-40 object-cover rounded-xl ring-2 ring-primary shadow-lg"
                />
              </div>

              {/* Text Content */}
              <div className="flex-1 w-full">
               
                <div className="space-y-2 text-gray-700 text-sm md:text-base">
                  <p><span className="font-semibold text-primary">Type:</span> {pack.travelType}</p>
                  <p><span className="font-semibold text-primary">Price:</span> ${pack.price}</p>
                  <p><span className="font-semibold text-primary"></span> {pack.description}</p>
                </div>

                <Link to={`/pack/${pack._id}`}>
                  <button className="btn btn-primary btn-sm mt-4 w-full md:w-auto transition-all duration-300 group-hover:scale-105">
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

export default OurPackagestabCard;
