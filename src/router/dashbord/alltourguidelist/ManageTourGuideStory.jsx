import React, { use } from 'react';
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  FaEdit,
  FaTrash,
  FaImages,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaDollarSign,
  FaAlignLeft,
  FaListUl
} from "react-icons/fa";
import Swal from "sweetalert2";
import Authcontext from '../../../context/Authcontext';
import useUserRole from '../../../hooks/useUserRole';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import ManageTourGuideStoriesCard from './ManageTourGuideStoriesCard';

// const mockStories = [
//   {
//     id: 1,
//     title: "Safari Adventure",
//     shortDesc: "Exploring wildlife in Kenya.",
//     story: "It was an amazing safari adventure, witnessing the big five in their natural habitat.",
//     place: "Kenya",
//     date: "2025-06-10",
//     cost: 1200,
//     images: [
//       "https://i.ibb.co/V9JqV0L/safari.jpg",
//       "https://i.ibb.co/hVKKgtH/testimonial6.jpg"
//     ]
//   },
//   {
//     id: 2,
//     title: "Bali Beach Escape",
//     shortDesc: "Relaxing days on Bali's beaches.",
//     story: "The beaches of Bali were tranquil and beautiful. Enjoyed sunsets and cultural dances.",
//     place: "Bali, Indonesia",
//     date: "2025-05-05",
//     cost: 800,
//     images: [
//       "https://i.ibb.co/Ytk1cY3/testimonial9.jpg"
//     ]
//   }
// ];

const ManageTourGuideStory = () => {

  const {user}=use(Authcontext);

  const {role} = useUserRole()
  const axiosInstance = useAxios();
  console.log(role)

  const { data: users = [] } = useQuery({
    queryKey: ["my-profile", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/stories?email=${user?.email}&role=${role}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  console.log(users)




    //  const [stories, setStories] = useState(mockStories);
    
    //   const handleDelete = (id) => {
    //     const storyTitle = stories.find((s) => s.id === id)?.title;
    //     Swal.fire({
    //       title: `Delete "${storyTitle}"?`,
    //       text: "Are you sure you want to delete this story? This action cannot be undone.",
    //       icon: "warning",
    //       showCancelButton: true,
    //       confirmButtonColor: "#d33",
    //       cancelButtonColor: "#3085d6",
    //       confirmButtonText: "Yes, delete it!"
    //     }).then((result) => {
    //       if (result.isConfirmed) {
    //         setStories(stories.filter((story) => story.id !== id));
    //         Swal.fire("Deleted!", "Your story has been deleted.", "success");
    //       }
    //     });
    //   };
    return (
    //      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6 py-20">
    //   <motion.h2
    //     initial={{ opacity: 0, y: -20 }}
    //     animate={{ opacity: 1, y: 0 }}
    //     transition={{ duration: 0.5 }}
    //     className="text-4xl font-extrabold text-center text-accent mb-12 animate-pulse"
    //   >
    //     📝 Manage Your Stories
    //   </motion.h2>

    //   <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
    //     {stories.map((story) => (
    //       <motion.div
    //         key={story.id}
    //         whileHover={{ scale: 1.02 }}
    //         className="bg-base-100 rounded-xl overflow-hidden shadow-lg border-2 border-info"
    //       >
    //         <img
    //           src={story.images[0]}
    //           alt={story.title}
    //           className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
    //         />
    //         <div className="p-4 space-y-2">
    //           <h3 className="text-xl font-bold text-accent">{story.title}</h3>
    //           <p className="text-sm text-info italic"><FaAlignLeft className="inline mr-1" /> {story.shortDesc}</p>
    //           <p className="text-xs text-gray-400 italic"><FaListUl className="inline mr-1" /> {story.story.slice(0, 80)}...</p>
    //           <p className="text-sm text-info"><FaMapMarkerAlt className="inline mr-1" /> {story.place}</p>
    //           <p className="text-sm text-info"><FaCalendarAlt className="inline mr-1" /> {story.date}</p>
    //           <p className="text-sm text-info"><FaDollarSign className="inline mr-1" /> ${story.cost}</p>
    //           <div className="flex gap-2 flex-wrap mt-2">
    //             {story.images.map((img, i) => (
    //               <img
    //                 key={i}
    //                 src={img}
    //                 alt={`story-img-${i}`}
    //                 className="w-16 h-16 object-cover border border-info rounded hover:scale-105 transition"
    //               />
    //             ))}
    //           </div>
    //           <div className="flex justify-between mt-4">
    //             <Link
    //               to={`/dashboard/edit-story/${story.id}`}
    //               className="btn btn-sm btn-primary flex items-center gap-2"
    //             >
    //               <FaEdit /> Edit
    //             </Link>
    //             <button
    //               onClick={() => handleDelete(story.id)}
    //               className="btn btn-sm btn-error flex items-center gap-2"
    //             >
    //               <FaTrash /> Delete
    //             </button>
    //           </div>
    //         </div>
    //       </motion.div>
    //     ))}
    //   </div>
    // </div>
    <div>
       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6 py-20 ">

       <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold text-center text-accent mb-12 animate-pulse"
      >
        📝 Manage Your Stories
      </motion.h2>


      {users?.map(mockStories=><ManageTourGuideStoriesCard mockStories={mockStories}></ManageTourGuideStoriesCard> )}
       
    </div>
    </div>
    );
};

export default ManageTourGuideStory;