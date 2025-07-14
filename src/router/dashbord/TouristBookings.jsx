// TouristBookings.jsx
import { use, useState } from "react";
import { motion } from "framer-motion";
import { FaMoneyCheckAlt, FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router";
import useUserRole from "../../hooks/useUserRole";
import useAxios from "../../hooks/useAxios";
import Authcontext from "../../context/Authcontext";
import { useQuery } from "@tanstack/react-query";

const bookings = [
  {
    id: 1,
    packageName: "Amazon Rainforest Tour",
    guideName: "Leo Santos",
    date: "2025-08-01",
    price: "$899",
    status: "Pending",
  },
  {
    id: 2,
    packageName: "Swiss Alps Hike",
    guideName: "Anna Müller",
    date: "2025-09-10",
    price: "$799",
    status: "Accepted",
  },
  {
    id: 3,
    packageName: "Paris Culture Walk",
    guideName: "Claire Dubois",
    date: "2025-07-20",
    price: "$199",
    status: "Rejected",
  },
];

export default function TouristBookings() {
  const [data, setData] = useState(bookings);


const {role} = useUserRole()
  const axiosInstance = useAxios();
  console.log(role)
  const {user}= use(Authcontext)
  console.log(user)

  const { data: users = [] } = useQuery({
    queryKey: ["my-profile", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/booking?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  console.log(users)





  return (
    <div className="min-h-screen px-6 py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto bg-base-100 p-10 rounded-xl shadow-2xl border border-accent animate-pulse-slow"
      >
        <h2 className="text-4xl font-extrabold text-center text-primary mb-10 animate-pulse">
          📅 My Tour Bookings
        </h2>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full border border-info">
            <thead className="bg-black text-white text-md">
              <tr>
                <th>Package</th>
                <th>Tour Guide</th>
                <th>Date</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((booking, i) => (
                <motion.tr
                  key={booking.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="hover:bg-black text-black font-bold border-b-4 hover:text-accent transition"
                >
                  <td className="border-b-4">{booking.title}</td>
                  <td>{booking.tourGuideName}</td>
                  <td>{booking.tourDate}</td>
                  <td>{booking.packageprice}</td>
                  <td>
                    <span
                      className={`badge text-white w-20 text-[12px]  ${
                        booking.status === "pending"
                          ? "bg-yellow-500"
                          : booking.status === "Accepted"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="flex gap-2">
                    {booking.status === "pending" && (
                      < >
                        <Link
                          to={`/dashboard/payment/${booking._id}`}
                          className="btn btn-success btn-sm flex items-center gap-2"
                        >
                          <FaMoneyCheckAlt /> Pay
                        </Link>
                        <button
                          onClick={() =>
                            setData(data.filter((b) => b._id !== booking._id))
                          }
                          className="btn btn-error btn-sm flex items-center gap-2"
                        >
                          <FaTimesCircle /> Cancel
                        </button>
                      </>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
