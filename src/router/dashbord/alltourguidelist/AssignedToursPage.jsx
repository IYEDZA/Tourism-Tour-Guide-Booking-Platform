import { use, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaUser,
  FaGlobe,
  FaCalendarAlt,
  FaDollarSign,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import Marquee from "react-fast-marquee";
import useUserRole from "../../../hooks/useUserRole";
import useAxios from "../../../hooks/useAxios";
import Authcontext from "../../../context/Authcontext";
import { useQuery } from "@tanstack/react-query";

const initialTours = [
  {
    id: 1,
    packageName: "Mystic Mountains",
    touristName: "John Doe",
    date: "2025-07-20",
    price: "$500",
    status: "in-review",
    extraDetails: {
      location: "Nepal",
      guideNotes: "Bring hiking boots and warm clothes.",
      contact: "john@example.com",
    },
  },
  {
    id: 2,
    packageName: "Cultural Wonders",
    touristName: "Emily Smith",
    date: "2025-07-25",
    price: "$700",
    status: "pending",
    extraDetails: {
      location: "Thailand",
      guideNotes: "Focus on temple etiquette.",
      contact: "emily@example.com",
    },
  },
];

export default function AssignedToursPage() {
  // const [tours, setTours] = useState(initialTours);
  const [expandedId, setExpandedId] = useState(null);
// ....................................
  const [count, setCount] = useState(0)
     const [itemsPerPage, setItemsPerPage] = useState(10);
      const [currentPage, setCurrentPage] = useState(0);
   


console.log(count)
// ................................

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };


  // ........................load...
const {role} = useUserRole()
  const axiosInstance = useAxios();
  console.log(role)
  const {user}= use(Authcontext)
  console.log(user)

  const { data: users = [],refetch } = useQuery({
    queryKey: ["my-profile", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/booking?email=${user?.email}&page=${currentPage}&size=${itemsPerPage}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
  console.log(users)
  //  const [tours, setTours] = useState(users);
  //  console.log(tours)
// ...................................

 useEffect( () =>{
        fetch(`http://localhost:3000/bookingCount?email=${user?.email}`)
        .then(res => res.json())
        .then(data => setCount(data.count))
    }, [])
//  const itemsPerPage = 10;

const numberOfPages = Math.ceil(count / itemsPerPage);
 const pages = [...Array(numberOfPages).keys()];

console.log(pages)
refetch()
// ,,,,,,,,,,,,,,,,,,,,,,,,,,


 const handleItemsPerPage = e => {
        const val = parseInt(e.target.value);
        console.log(val);
        setItemsPerPage(val);
        setCurrentPage(0);
    }


    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    }

// .........................

  const handleAccept = async(id, action) => {
  
    const confirm = await Swal.fire({
          title: `${action === "Accepted" ? "Accepted" : "Reject"} Application?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "Cancel",
        });


        
    if (!confirm.isConfirmed) return;

    try {
      const status = action === "Accepted" ? "Accepted" : "rejected"

      await axiosInstance.patch(`/booking/${id}`, {
        status
        // email
      });

      // refetch()
       Swal.fire("Success", ` ${action}d successfully`, "success");
      
          } catch (err) {
            Swal.fire("Error", "Could not update  status", err);
          }
        


  
   };

  

  return (
  <div>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4 md:px-8 py-16 text-white">
      {/* Marquee Title */}
      <div className="mb-10">
        <Marquee speed={80} gradient={false} className="text-3xl font-bold text-accent">
          🧭 Assigned Tours for Tour Guide — Manage your upcoming adventures!
        </Marquee>
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mt-6 mb-8"
        >
          🧳 Assigned Tours –
        </motion.h1>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="overflow-x-auto rounded-xl shadow-2xl border-4 border-info"
      >
        <table className="table w-full bg-base-100">
          <thead className="text-info bg-base-200 border-b border-info">
            <tr>
              <th><FaGlobe /> Package</th>
              <th><FaUser /> Tourist</th>
              <th><FaCalendarAlt /> Date</th>
              <th><FaDollarSign /> Price</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((tour) => (
              <>
                <motion.tr
                  key={tour.id}
                  whileHover={{ scale: 1.01 }}
                  className="hover:bg-gray-700 bg-black transition-all duration-300"
                >
                  <td className="text-accent">{tour.title}</td>
                  <td>{tour.touristName}</td>
                  <td>{tour.date}</td>
                  <td>{tour.packageprice}</td>
                  <td>
                    <span
                      className={`badge ${
                        tour.status === "pending"
                          ? "badge-warning"
                          : tour.status === "in Review"
                          ? "badge-info text-[13px] p-4"
                          : tour.status === "accepted"
                          ? "badge-success"
                          : "badge-error"
                      } capitalize`}
                    >
                      {tour.status}
                    </span>
                  </td>
                  <td className="flex gap-3 justify-center items-center">
                    <button
                      onClick={() => handleAccept(tour._id,"Accepted")}
                      disabled={tour.status !== "in Review"}
                      className={`btn btn-sm ${
                        tour.status === "in Review" ? "btn-success" : "btn-disabled"
                      } text-white`}
                    >
                      <FaCheckCircle className="mr-1" /> Accept
                    </button>
                    <button
                      onClick={() => handleAccept(tour._id,"reject")}
                      disabled={tour.status !== "in Review"}
                      className="btn btn-sm btn-error text-white"
                    >
                      <FaTimesCircle className="mr-1" /> Reject
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => toggleExpand(tour.id)}
                      className="btn btn-sm btn-ghost"
                    >
                      {expandedId === tour.id ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  </td>
                </motion.tr>

                <AnimatePresence>
                  {expandedId === tour.id && (
                    <motion.tr
                      key={`details-${tour.id}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="bg-base-200 text-black"
                    >
                      <td colSpan="7" className="p-4 space-y-2">
                        <p><strong>📍 Location:</strong> </p>
                        <p><strong>📝 Notes:</strong> </p>
                        <p><strong>📧 Contact:</strong> </p>
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>

      <div className=' mt-20 text-center mb-16 '>
          {/*  */}
                <p className="text-xl mb-6 font-bold">Current page:{currentPage} </p>
                {/*  */}
                <button onClick={handlePrevPage} className="ml-3 btn btn-neutral " >Prev</button>
                {
                    pages.map(page => <button  

                       className={currentPage == page ? 'bg-amber-400 p-2 btn btn-primary rounded-3xl ml-6' : ' btn btn-primary ml-3'}

                        onClick={() => setCurrentPage(page)}
                        key={page}
                    >{page}</button>)
                }

                {/*  */}
                <button onClick={handleNextPage} className="ml-3 btn btn-neutral" >Next</button>
                {/*  */}
                <select value={itemsPerPage} onChange={handleItemsPerPage} className="ml-3" name="" id="">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    {/* <option value="20">20</option>
                    <option value="50">50</option> */}
                </select>
            </div> 
  </div>
  );
}
