


import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { FaUserCheck, FaUserTimes, FaUserTie, FaEnvelope, FaPaperclip, FaStar, FaUserAlt, FaUserCircle, FaCheck } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

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
  const [applications, setApplications] = useState([]);
  const axiosSecure = useAxios();


  const { isPending, data: tourGuide = [], refetch } = useQuery({
    queryKey: ['pending-tourGuides'],
    queryFn: async () => {
      const res = await axiosSecure.get("/tourGuides/pending");
      return res.data;
    }
  })
  console.log(tourGuide)
  //  setApplications(tourGuide);
  if (isPending) {
    return '...loading'
  }



  // const handleAccept = async (app) => {
  //   try {
  //     // const roleRes = await fetch(`/api/users/role/${app.userId}`, {
  //     //   method: "PATCH",
  //     //   headers: { "Content-Type": "application/json" },
  //     //   body: JSON.stringify({ role: "Tour Guide" }),
  //     // });

  //     const status = action === "approve" ? "active" : "rejected"
  //     await axiosSecure.patch(`/riders/${id}/status`, {
  //       status,
  //       email
  //     });

  //     refetch();
  //     // const deleteRes = await fetch(`/api/applications/${app._id}`, {
  //     //   method: "DELETE",
  //     // });

  //     if (roleRes.ok && deleteRes.ok) {
  //       setApplications(applications.filter((a) => a._id !== app._id));
  //       Swal.fire("Accepted!", `${app.name} is now a Tour Guide.`, "success");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     Swal.fire("Error!", "Something went wrong!", "error");
  //   }
  // };


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

      refetch();

      Swal.fire("Success", `Rider ${action}d successfully`, "success");

    } catch (err) {
      Swal.fire("Error", "Could not update rider status", err);
    }
  };


  // const handleReject = async (app) => {
  //   try {
  //     const res = await fetch(`/api/applications/${app._id}`, {
  //       method: "DELETE",
  //     });

  //     if (res.ok) {
  //       setApplications(applications.filter((a) => a._id !== app._id));
  //       Swal.fire("Rejected!", `Application from ${app.name} deleted.`, "info");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     Swal.fire("Error!", "Something went wrong!", "error");
  //   }
  // };

  return (
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