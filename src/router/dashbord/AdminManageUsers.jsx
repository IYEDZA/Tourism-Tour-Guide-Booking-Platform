import { useEffect, useState } from "react";
import Select from "react-select";
import { motion } from "framer-motion";
import { FaUsersCog, FaSearch, FaUserShield, FaUserTimes } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
const dummyUsers = [
  { name: "Alice Johnson", email: "alice@example.com", role: "Tourist" },
  { name: "Bob Smith", email: "bob@example.com", role: "Tour Guide" },
  { name: "Admin User", email: "admin@tourzone.com", role: "Admin" },
  { name: "Charlie", email: "charlie@gmail.com", role: "Tourist" },
];

const roleOptions = [
  { value: "", label: "All Roles" },
  { value: "tourist", label: "Tourist" },
  { value: "tourGuide", label: "Tour Guide" },
  { value: "admin", label: "Admin" },
];

export default function AdminManageUsers() {
   const [myadmin, setadmin] = useState([]);
    // console.log(myadmin.id,myadmin.role)
    const {id ,role} =myadmin
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState(roleOptions[0]);
  const axiosIn = useAxios();



  //  const [emailQuery, setEmailQuery] = useState("");

  const {
    data: users1 = [],
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["searchedUsers", searchTerm],
    enabled: !!searchTerm,
    queryFn: async () => {
      const res = await axiosIn.get(`/users/search?email=${searchTerm}`);
      return res.data;
    },
  });
    

  // if (isFetching){
  //   return "...loding"
  // }

    // update role .....

   const admindata   =  axiosIn.patch(`/users/${id}/role`, {role })
    refetch();


  const filteredUsers = users1.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole.value
      ? user.role === selectedRole.value
      : true;
    return matchesSearch && matchesRole;
  });




  const handleRoleChange = async (id, currentRole) => {
    console.log(id)
    const action = currentRole === "admin" ? "Remove admin" : "Make admin";
    const newRole = currentRole === "admin" ? "tourist" : "admin";

    const confirm = await Swal.fire({
      title: `${action}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
         await 
         setadmin({ id, role: newRole });
        // const role = newRole
        //  console.log (role)
      // const admindata   =  axiosIn.patch(`/users/${id}/role`, { role })

      Swal.fire("Success", `${action} successful`, "success");
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Failed to update user role", "error");
    }
  };


  return (
    <div className="min-h-screen px-4 md:px-10 py-10 bg-base-100 text-white">
      <motion.h1
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-center text-primary mb-8 flex items-center justify-center gap-2"
      >
        <FaUsersCog className="text-accent animate-pulse" /> Manage Users
      </motion.h1>

      <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center w-full md:w-1/2 gap-2">
          <FaSearch className="text-xl text-info" />
          <input
            type="text"
            placeholder="Search by name or email"
            className="input input-bordered w-full text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="w-full md:w-1/4">
          <Select
            options={roleOptions}
            value={selectedRole}
            onChange={(option) => setSelectedRole(option)}
            placeholder="Filter by Role"
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "#fff",
                borderColor: "#3b82f6",
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected
                  ? "#3b82f6"
                  : state.isFocused
                    ? "#bfdbfe"
                    : "#fff",
                color: state.isSelected ? "white" : "black",
              }),
            }}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra border border-info">
          <thead className="text-info text-lg bg-base-300">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={index} className="hover border-b border-info">
                  <td className="text-black">{index + 1}</td>
                  <td className="text-black">{user.name}</td>
                  <td className="text-black">{user.email}</td>
                  <td>
                    <span
                      className={`badge badge-outline ${user.role === "Admin"
                          ? "badge-error"
                          : user.role === "Tour Guide"
                            ? "badge-info"
                            : "badge-success"
                        }`}
                    >
                      {user.role}
                    </span>
                  </td>
                 

                  <td>
                    <button
                      onClick={() => handleRoleChange(user._id, user.role || "tourist")}
                      className={`btn btn-sm text-black ${user.role === "admin" ? "btn-error" : "btn-primary"
                        }`}
                    >
                      {user.role === "admin" ? (
                        <>
                          <FaUserTimes className="mr-1" />
                          Remove Admin
                        </>
                      ) : (
                        <>
                          <FaUserShield className="mr-1" />
                          Make Admin
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-warning">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}



//  const [emailQuery, setEmailQuery] = useState("");

//   const {
//       data: users = [],
//       refetch,
//       isFetching,
//   } = useQuery({
//       queryKey: ["searchedUsers", emailQuery],
//       enabled: !!emailQuery,
//       queryFn: async () => {
//           const res = await axiosIn.get(`/users/search?email=${emailQuery}`);
//           return res.data;
//       },
//   });





// GET /users?search=term&role=Tour Guide
// const getUsers = async (req, res) => {
//   const { search, role } = req.query;

//   const query = {};
//   if (search) {
//     query.$or = [
//       { name: { $regex: search, $options: "i" } },
//       { email: { $regex: search, $options: "i" } },
//     ];
//   }
//   if (role) {
//     query.role = role; // or use: { $eq: role }
//   }

//   const users = await User.find(query);
//   res.json(users);
// };
