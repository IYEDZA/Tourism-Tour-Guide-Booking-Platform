import { useState } from "react";
import {
  FaUserEdit,
  FaBookOpen,
  FaPlusCircle,
  FaRegNewspaper,
  FaUserTie,
} from "react-icons/fa";
import { motion } from "framer-motion";
import TouristProfile from "./TouristProfile";
import TouristBookings from "./TouristBookings";
import AddTouristStory from "./AddTouristStory";
import ManageTouristStories from "./ManageTouristStorie";
import JoinAsTourGuide from "./JoinAsTourGuide";

export default function TouristDashboard() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen p-6 bg-base-100">
      <div className="grid md:grid-cols-5 gap-4">
        {/* Manage Profile */}
        <motion.div
          animate={{
            borderColor: ["#3b82f6", "#10b981", "#f59e0b", "#ec4899", "#3b82f6"],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="rounded-xl border-4 p-0"
        >
          <button
            onClick={() => setActiveTab("profile")}
            className="btn w-full h-full flex items-center justify-center gap-2 bg-base-200 text-base-content hover:text-white hover:shadow-lg transition hover:bg-gradient-to-r from-primary to-accent"
          >
            <FaUserEdit />
            Manage Profile
          </button>
        </motion.div>

        {/* My Bookings */}
        <motion.div
          animate={{
            borderColor: ["#0ea5e9", "#a855f7", "#f43f5e", "#14b8a6", "#0ea5e9"],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="rounded-xl border-4 p-0"
        >
          <button
            onClick={() => setActiveTab("bookings")}
            className="btn w-full h-full flex items-center justify-center gap-2 bg-base-200 text-base-content hover:text-white hover:shadow-lg transition hover:bg-gradient-to-r from-secondary to-primary"
          >
            <FaBookOpen />
            My Bookings
          </button>
        </motion.div>

        {/* Add Stories */}
        <motion.div
          animate={{
            borderColor: ["#f59e0b", "#ec4899", "#6366f1", "#14b8a6", "#f59e0b"],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="rounded-xl border-4 p-0"
        >
          <button
            onClick={() => setActiveTab("addStories")}
            className="btn w-full h-full flex items-center justify-center gap-2 bg-base-200 text-base-content hover:text-white hover:shadow-lg transition hover:bg-gradient-to-r from-info to-secondary"
          >
            <FaPlusCircle />
            Add Stories
          </button>
        </motion.div>

        {/* Manage Stories */}
        <motion.div
          animate={{
            borderColor: ["#ec4899", "#22d3ee", "#a78bfa", "#84cc16", "#ec4899"],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="rounded-xl border-4 p-0"
        >
          <button
            onClick={() => setActiveTab("manageStories")}
            className="btn w-full h-full flex items-center justify-center gap-2 bg-base-200 text-base-content hover:text-white hover:shadow-lg transition hover:bg-gradient-to-r from-accent to-primary"
          >
            <FaRegNewspaper />
            Manage Stories
          </button>
        </motion.div>

        {/* Join as Tour Guide */}
        <motion.div
          animate={{
            borderColor: ["#10b981", "#f43f5e", "#0ea5e9", "#f59e0b", "#10b981"],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="rounded-xl border-4 p-0"
        >
          <button
            onClick={() => setActiveTab("joinGuide")}
            className="btn w-full h-full flex items-center justify-center gap-2 bg-base-200 text-base-content hover:text-white hover:shadow-lg transition hover:bg-gradient-to-r from-rose-400 to-teal-400"
          >
            <FaUserTie />
            Join as Tour Guide
          </button>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="mt-8 bg-base-200 p-6 rounded-xl shadow-lg">
        {activeTab === "profile" && (
          <div>
            <h2 className="text-xl font-bold mb-2">Manage Profile</h2>
            <p>Update your personal and professional information here.</p>
            <TouristProfile></TouristProfile>
          </div>
        )}

        {activeTab === "bookings" && (
          <div>
            <h2 className="text-xl font-bold mb-2">My Bookings</h2>
            <p>View and manage your tour bookings here.</p>
            <TouristBookings></TouristBookings>
          </div>
        )}

        {activeTab === "addStories" && (
          <div>
            <h2 className="text-xl font-bold mb-2">Add a New Story</h2>
            <p>Write and share your recent tour experiences with others.</p>
            <AddTouristStory></AddTouristStory>
          </div>
        )}

        {activeTab === "manageStories" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Manage Stories</h2>
            <div className="overflow-x-auto">
              <table className="table w-full border border-info rounded-xl animate-pulse">
                <thead className="bg-gradient-to-r from-accent to-secondary text-white">
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>email</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3].map((item, i) => (
                    <tr key={i} className="hover:bg-base-300 transition">
                      <td>{i + 1}</td>
                      <td className="text-info font-semibold">Story Title {item}</td>
                      <td>
                        <span className="badge badge-success text-white animate-pulse shadow">
                          Published
                        </span>
                      </td>
                      <td>
                      
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ManageTouristStories></ManageTouristStories>
          </div>
        )}

        {activeTab === "joinGuide" && (
          <div>
            <h2 className="text-xl font-bold mb-2">Join as Tour Guide</h2>
            <p>
              Want to become a tour guide? Fill out your information and join
              our travel network.
            </p>
            <JoinAsTourGuide></JoinAsTourGuide>
          </div>
        )}
      </div>
    </div>
  );
}
