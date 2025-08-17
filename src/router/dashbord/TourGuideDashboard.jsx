import { useState } from "react";
import {
  FaUserEdit,
  FaClipboardList,
  FaPlusCircle,
  FaRegNewspaper,
} from "react-icons/fa";
import { motion } from "framer-motion";
import TourGuideProfilePage from "./alltourguidelist/TourGuideProfilePage";
import AssignedToursPage from "./alltourguidelist/AssignedToursPage";
import guideAnimation from "../../assets/Animation - 1752050426745.json"; // <-- your Lottie file
import Lottie, { LottiePlayer } from "lottie-react";
import AddTourguideStory from "./alltourguidelist/AddTourguideStory";
import ManageTourGuideStory from "./alltourguidelist/ManageTourGuideStory";
import AddTourGuideStories from "./alltourguidelist/AddTourGuideStories";

export default function TouristDashboard() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen p-6 bg-base-100">
      <div className="grid md:grid-cols-4 gap-4">
        {/* Dashboard Button 1 */}
        <motion.div
          animate={{ borderColor: ["#3b82f6", "#10b981", "#f59e0b", "#ec4899", "#3b82f6"] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="rounded-xl border-1 p-0"
        >
          <button
            onClick={() => setActiveTab("profile")}
            className="btn w-full h-full flex items-center justify-center gap-2 btn-primary hover:text-white hover:shadow-lg transition hover:bg-gradient-to-r from-primary to-accent"
          >
            <FaUserEdit />
            Manage Profile
          </button>
        </motion.div>

        {/* Dashboard Button 2 */}
        <motion.div
          animate={{ borderColor: ["#10b981", "#f43f5e", "#0ea5e9", "#a855f7", "#10b981"] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="rounded-xl border-1 p-0"
        >
          <button
            onClick={() => setActiveTab("tours")}
            className="btn w-full h-full flex items-center justify-center gap-2 btn-primary hover:text-white hover:shadow-lg transition hover:bg-gradient-to-r from-secondary to-primary"
          >
            <FaClipboardList />
            My Assigned Tours
          </button>
        </motion.div>

        {/* Dashboard Button 3 */}
        <motion.div
          animate={{ borderColor: ["#f59e0b", "#ec4899", "#6366f1", "#14b8a6", "#f59e0b"] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="rounded-xl border-1 p-0"
        >
          <button
            onClick={() => setActiveTab("addStories")}
            className="btn w-full h-full flex items-center justify-center gap-2 btn-primary hover:text-white hover:shadow-lg transition hover:bg-gradient-to-r from-info to-secondary"
          >
            <FaPlusCircle />
            Add Stories
          </button>
        </motion.div>

        {/* Dashboard Button 4 */}
        <motion.div
          animate={{ borderColor: ["#ec4899", "#22d3ee", "#a78bfa", "#84cc16", "#ec4899"] }}
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
      </div>

      {/* Content Section */}
      <div className="mt-8 bg-base-200 p-6 rounded-xl shadow-lg">
        {activeTab === "profile" && (
          <div>
          
            <TourGuideProfilePage></TourGuideProfilePage>
          </div>
        )}

        {activeTab === "tours" && (
          <div>
              {/* 🎬 Lottie Animation at Top */}
      <div className="flex justify-center mb-6">
         <Lottie animationData={guideAnimation} loop={true} className="h-60" />
        {/* <LottiePlayer
          autoplay
          loop
          src={guideAnimation}
          style={{ height: "200px", width: "200px" }}
        /> */}
      </div>
           
            <AssignedToursPage></AssignedToursPage>
          </div>
        )}

        {activeTab === "addStories" && (
          <div>
           
            {/* <AddTourguideStory></AddTourguideStory> */}

            <AddTourGuideStories></AddTourGuideStories>
          </div>
        )}

        {activeTab === "manageStories" && (
          <div>
           
            <div className="overflow-x-auto">
            <ManageTourGuideStory></ManageTourGuideStory>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
