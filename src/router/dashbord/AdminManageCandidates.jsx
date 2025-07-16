


import { use,  useEffect,  useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { FaUserCheck, FaUserTimes, FaUserTie, FaEnvelope, FaPaperclip, FaStar, FaUserAlt, FaUserCircle, FaCheck } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Authcontext from "../../context/Authcontext";

// Dummy Data
const admin = [
  {
    _id: 125,
    userId: "662d123...",
    name: "John Doe",
    email: "john@example.com",
    reason: "I love guiding tourists",
    cvLink: "https://link-to-cv.com",
    role: "Tourist",
  },
  {
    _id: 123,
    userId: "662d124...",
    name: "Jane Smith",
    email: "jane@example.com",
    reason: "Experienced in travel management",
    cvLink: "https://link-to-cv.com",
    role: "Tourist",
  },
];

export default function AdminManageCandidates() {
  // const [applications, setApplications] = useState([]);
  const axiosSecure = useAxios();
  

  // ..................................................
 const [count, setCount] = useState(0)
     const [itemsPerPage, setItemsPerPage] = useState(10);
      const [currentPage, setCurrentPage] = useState(0);
   
const {user}= use(Authcontext)

  const { isPending, data: tourGuide = [], refetch } = useQuery({
    queryKey: ['pending-tourGuides'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tourGuides/pending?page=${currentPage}&size=${itemsPerPage}`);
      return res.data;
    }
  })
  console.log(tourGuide)
  //  setApplications(tourGuide);
  // if (isPending) {
  //   return '...loading'
  // }




  const handleDecision = async (id, action, email) => {
    const confirm = await Swal.fire({
      title: `${action === "approve" ? "Approve" : "Reject"} Application?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      const status = action === "approve" ? "active" : "rejected"

      await axiosSecure.patch(`/tourGuides/${id}/status`, {
        status,
        email
      });

      // refetch();

      Swal.fire("Success", ` ${action}d successfully`, "success");

    } catch (err) {
      Swal.fire("Error", "Could not update  status", err);
    }
  };

// .......................................


 useEffect( () =>{
        fetch(`http://localhost:3000/tourGuides/pendingCount`)
        .then(res => res.json())
        .then(data => setCount(data.count))
    }, [])

    console.log(count)
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




  return (
   <div>
     <div className="min-h-screen bg-base-100 py-10 px-4 md:px-10 text-white">
      {/* Heading */}
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center mb-10 text-accent flex justify-center items-center gap-3"
      >
        <FaUserTie className="text-primary" />
        Manage Tour Guide Applications
      </motion.h1>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl">
        <table className="table table-zebra border-2  border-info ">
          <thead className="text-info bg-black text-lg">
            <tr className="">
              <th>#</th>
              <th><FaUserAlt></FaUserAlt> Candidate Name</th>
              <th><FaEnvelope /> Email </th>
              <th> <FaStar />Reason</th>
              <th> <FaPaperclip />CV Link</th>
              <th><FaUserCircle></FaUserCircle> Role</th>
              <th className=""><FaUserTie></FaUserTie> Actions</th>
            </tr>
          </thead>
          <tbody>
            {tourGuide.length > 0 ? (
              tourGuide.map((app, index) => (
                <motion.tr
                  key={app._id}
                  className="border-b border-info hover:bg-gray-300  text-black overflow-x-auto"
                  whileHover={{ x: 20 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <td className="font-bold">{index + 1}</td>
                  <td className="font-bold">{app.name}</td>
                  <td className="font-bold">{app.touremail}</td>
                  <td>{app.description}</td>
                  <td>
                    <a
                      href={app.cv}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link link-info"
                    >
                      View CV
                    </a>
                  </td>
                  <td>
                    <span className="badge badge-outline badge-success">
                      {app.role || "Tourist"}
                    </span>
                  </td>
                  <td className=" justify-center gap-2 mt-2">
                    {/* <button
                      onClick={() => (app)}
                      className="btn btn-success btn-sm mb-2"
                    >
                      <FaUserCheck className="mr-1" /> Accept
                    </button> */}
                    <button
                      onClick={() => handleDecision(app._id, "approve", app.touremail)}
                      className="btn btn-sm btn-success mb-2 "
                    >
                      <FaUserCheck className="mr-1" /> Accept
                    </button>
                    {/* <button
                      onClick={() => handleReject(app)}
                      className="btn btn-error btn-sm"
                    >
                      <FaUserTimes className="mr-1" /> Reject
                    </button> */}

                    <button
                      onClick={() => handleDecision(app._id, "reject", app.touremail)}
                      className="btn btn-sm btn-error"
                    >
                      <FaUserTimes className="mr-1" /> Reject
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-warning py-8">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
<div className=' mt-10 text-center mb-16 '>
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


//   useEffect(() => {
//     // Simulated fetch
//     setApplications(admin);
//     // Real fetch:
//     // fetch("/api/applications")
//     //   .then((res) => res.json())
//     //   .then((data) => setApplications(data));
//   }, []);


// {
//   _id: ObjectId,
//   userId: "662d123...", // linked to Users collection
//   name: "John Doe",
//   email: "john@example.com",
//   reason: "I love guiding tourists",
//   cvLink: "https://link-to-cv.com",
//   role: "Tourist"
// }



// ✅ PATCH /api/users/role/:id

// js
// Copy
// Edit
// await User.findByIdAndUpdate(req.params.id, { role: 'Tour Guide' });
// ✅ DELETE /api/applications/:id

// js
// Copy
// Edit
// await Application.findByIdAndDelete(req.params.id);