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
    <div className="min-h-screen p-6 ">
      <div className="grid md:grid-cols-5 gap-4">
        {/* Manage Profile */}
        <motion.div
          animate={{
            borderColor: ["#3b82f6", "#10b981", "#f59e0b", "#ec4899", "#3b82f6"],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="rounded-xl border-1 p-0"
        >
          <button
            onClick={() => setActiveTab("profile")}
            className="btn btn-primary w-full h-full flex items-center justify-center gap-2 hover:text-white hover:shadow-lg transition hover:bg-gradient-to-r from-primary to-accent"
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
          className="rounded-xl border-1 p-0"
        >
          <button
            onClick={() => setActiveTab("bookings")}
            className="btn w-full h-full flex items-center justify-center gap-2 btn-primary hover:text-white hover:shadow-lg transition hover:bg-gradient-to-r from-secondary to-primary"
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
          className="rounded-xl border-1 p-0"
        >
          <button
            onClick={() => setActiveTab("addStories")}
            className="btn btn-primary w-full h-full flex items-center justify-center gap-2  hover:text-white hover:shadow-lg transition hover:bg-gradient-to-r from-info to-secondary"
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
          className="rounded-xl border-1 p-0"
        >
          <button
            onClick={() => setActiveTab("manageStories")}
            className="btn btn-primary w-full h-full flex items-center justify-center gap-2  hover:text-white hover:shadow-lg transition hover:bg-gradient-to-r from-accent to-primary"
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
          className="rounded-xl border-1 p-0"
        >
          <button
            onClick={() => setActiveTab("joinGuide")}
            className="btn btn-primary w-full h-full flex items-center justify-center gap-2  hover:text-white hover:shadow-lg transition hover:bg-gradient-to-r from-rose-400 to-teal-400"
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
            
            <TouristProfile></TouristProfile>
          </div>
        )}

        {activeTab === "bookings" && (
          <div>
           
            <TouristBookings></TouristBookings>
          </div>
        )}

        {activeTab === "addStories" && (
          <div>
           
            <AddTouristStory></AddTouristStory>
          </div>
        )}

        {activeTab === "manageStories" && (
          <div>
           
         
            <ManageTouristStories></ManageTouristStories>
          </div>
        )}

        {activeTab === "joinGuide" && (
          <div>
            
            <JoinAsTourGuide></JoinAsTourGuide>
          </div>
        )}
      </div>
    </div>
  );
}
