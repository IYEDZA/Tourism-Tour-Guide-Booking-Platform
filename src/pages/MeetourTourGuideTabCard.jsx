import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

// const guides = [
//   {
//     name: "Lara Benson",
//     expertise: "Cultural and Historical Tours",
//     image: "https://i.ibb.co/WnZG3NR/guide1.jpg",
//   },
//   {
//     name: "Amit Desai",
//     expertise: "Adventure Specialist",
//     image: "https://i.ibb.co/xFGSGqK/guide2.jpg",
//   },
// ];

const MeetourTourGuideTabCard = ({guides}) => {
    return (
        <div>
              <motion.div
                        className="grid md:grid-cols-2 gap-8"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                      >
                        {guides.map((guide, index) => (
                          <motion.div
                            key={index}
                            className="glow-border rounded-xl p-[2px]"
                            whileHover={{ scale: 1.03 }}
                          >
                            <div className="bg-base-200 rounded-xl p-5 flex gap-4 items-center shadow-md h-full justify-around">
                              <div>
                                <img
                                src={guide.photo}
                                alt={guide.name}
                                className="w-20 h-20 rounded-full border-4 border-primary object-cover"
                              />
                              <div>
                                <h4 className="text-xl font-semibold">{guide.name}</h4>
                                <p className="text-gray-600">{guide?.experience}</p>
                                 <p className="text-gray-600">{guide?.specialty}</p>
                                
                              </div>
                             
                              </div>
                              <Link to={`guide/${guide._id}`}> <button className='btn btn-primary'>view deatiles</button></Link>
                             
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
        </div>
    );
};

export default MeetourTourGuideTabCard;