
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
import useAxios from "../../hooks/useAxios";


const MangageTouriststoiesCard = ({mockStories}) => {

     const [stories1, setStories] = useState(mockStories.stories);
     const axiosInstance = useAxios();
    
      const handleDelete = async(parentId) => {



         const confirm = await Swal.fire({
    title: "Are you sure?",
    text: `This storyCollection id${mockStories._id} will be permanently deleted.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
  });




  if (confirm.isConfirmed) {
    try {
      const res = await axiosInstance.delete(`/stories/${parentId}`);
    //   if (res.data.success) {
   
    //     // refetch && refetch(); // refresh data if needed
    //   } else {
   
    //   }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  }


  
    
     };
    
    return (
        <div>
           <div className="mb-6">
     
        
      <div className="ml-5   ">
      
      
         
        {stories1?.map((story) => (
            
          <motion.div
            key={story.id}
            whileHover={{ scale: 1.02 }}
            className=" rounded-xl overflow-hidden shadow-lg "
          >
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
            />
            {/* <img src={stories1.photo} alt="" /> */}
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-bold ">{story.title}</h3>
              <p className="text-sm italic"><FaAlignLeft className="inline mr-1" /> {story.description}</p>
              {/* <p className="text-xs text-gray-400 italic"><FaListUl className="inline mr-1" /> {story.story.slice(0, 80)}...</p> */}
              <p className="text-sm "><FaMapMarkerAlt className="inline mr-1" /> {story.place}</p>
              <p className="text-sm "><FaCalendarAlt className="inline mr-1" /> {story.date}</p>
              <p className="text-sm "><FaDollarSign className="inline mr-1" /> ${story.cost}</p>
              <div className="flex gap-2 flex-wrap mt-2">
                {/* {story.images.map((img, i) => ( */}
                  <img
                    // key={i}
                    src={story.image}
                    // alt={`story-img-${i}`}
                    className="w-16 h-16 object-cover border  rounded hover:scale-105 transition"
                  />
                {/* ))} */}
              </div>
              <div className="flex justify-between mt-4">
                <Link
               
                   to=  {`/dashboard/editStory/${mockStories._id}`}
                  className="btn btn-sm btn-primary flex items-center gap-2"
                >
                  <FaEdit /> Edit
                </Link>
                <button
                  onClick={() => handleDelete(mockStories._id)}
                  className="btn btn-sm btn-primary flex items-center gap-2"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
       </div>


    </div> 
        </div>
    );
};

export default MangageTouriststoiesCard;