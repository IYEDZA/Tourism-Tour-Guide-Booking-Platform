import { motion } from 'framer-motion';
import React from 'react';
import { GiPalmTree } from 'react-icons/gi';
import { Link } from 'react-router';

// const packag = [
//   {
//     title: "Tropical Paradise",
//     description: "7 days in the Maldives with luxury resorts and water sports.",
//     icon: <GiPalmTree />,
//   },
//   {
//     title: "Mountain Explorer",
//     description: "Trekking through the Himalayas with expert local guides.",
//     icon: <FaMapMarkedAlt />,
//   },
// ];

const OurPackagestabCard = ({packages}) => {

    return (
        <div>

             <motion.div
            className="grid md:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >

             {packages.map((pack, index) => (
              <motion.div
                key={index}
                className="glow-border rounded-xl p-[2px]"
                whileHover={{ scale: 1.03 }}
              >
                <div className="bg-base-200 rounded-xl p-6 h-full shadow-xl flex justify-between">
                 <div >
                     <div className="flex items-center gap-4 mb-4">
                    
                    
                    <span className="text-3xl text-primary"><GiPalmTree /></span>
                      
                       
                    <h3 className="text-2xl font-bold">{pack.title}</h3>
                   </div>          
                    <p className="text-gray-600">travelType:{pack.travelType}</p>
                    <p className="text-gray-600">price:${pack.price}</p>
                  <p className="text-gray-600"> description:{pack.description}</p>
                    <Link to={`/pack/${pack._id}`}> <button className='btn btn-primary mt-5'>View deatiles</button></Link>
                  
                 </div>
                   <img className='w-36 rounded-3xl' src="https://i.ibb.co/QFp3KvKg/Screenshot-2025-07-15-143038.png" alt="" /> 
                </div>  
              </motion.div>
            ))}
            
          </motion.div>
         
        </div>
    );
};

export default OurPackagestabCard;