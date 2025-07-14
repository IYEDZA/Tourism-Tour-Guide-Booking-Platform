import React from 'react';
import { useState } from "react";
import {
  FaUserEdit,
  FaClipboardList,
  FaPlusCircle,
  FaRegNewspaper,
} from "react-icons/fa";
import { motion } from "framer-motion";
import AdminManageProfile from './AdminManageProfile';
import AdminAddPackage from './AdminAddPackage';
import AdminManageUsers from './AdminManageUsers';
import AdminManageCandidates from './AdminManageCandidates';


  

const AdminDashboardPage = () => {

const [activeTab, setActiveTab] = useState("profile");

    return (
        <div>
             <div className="min-h-screen p-6 bg-base-100">
      <div className="grid md:grid-cols-4 gap-4">
        {/* Dashboard Button 1 */}
        <motion.div
          animate={{ borderColor: ["#3b82f6", "#10b981", "#f59e0b", "#ec4899", "#3b82f6"] }}
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

        {/* Dashboard Button 2 */}
        <motion.div
          animate={{ borderColor: ["#10b981", "#f43f5e", "#0ea5e9", "#a855f7", "#10b981"] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="rounded-xl border-4 p-0"
        >
          <button
            onClick={() => setActiveTab("tours")}
            className="btn w-full h-full flex items-center justify-center gap-2 bg-base-200 text-base-content hover:text-white hover:shadow-lg transition hover:bg-gradient-to-r from-secondary to-primary"
          >
            <FaClipboardList />
           Add Package -

          </button>
        </motion.div>

        {/* Dashboard Button 3 */}
        <motion.div
          animate={{ borderColor: ["#f59e0b", "#ec4899", "#6366f1", "#14b8a6", "#f59e0b"] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="rounded-xl border-4 p-0"
        >
          <button
            onClick={() => setActiveTab("addStories")}
            className="btn w-full h-full flex items-center justify-center gap-2 bg-base-200 text-base-content hover:text-white hover:shadow-lg transition hover:bg-gradient-to-r from-info to-secondary"
          >
            <FaPlusCircle />
           Manage Users - 

          </button>
        </motion.div>

        {/* Dashboard Button 4 */}
        <motion.div
          animate={{ borderColor: ["#ec4899", "#22d3ee", "#a78bfa", "#84cc16", "#ec4899"] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="rounded-xl border-4 p-0"
        >
          <button
            onClick={() => setActiveTab("manageStories")}
            className="btn w-full h-full flex items-center justify-center gap-2 bg-base-200 text-base-content hover:text-white hover:shadow-lg transition hover:bg-gradient-to-r from-accent to-primary"
          >
            <FaRegNewspaper />
            Manage Candidates
          </button>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="mt-8 bg-base-200 p-6 rounded-xl shadow-lg">
        {activeTab === "profile" && (
          <div>
            <h2 className="text-xl font-bold mb-2">Manage Profile</h2>
            <p>Update your personal and professional information here.</p>
            <AdminManageProfile></AdminManageProfile>
          </div>
        )}

        {activeTab === "tours" && (
          <div>
            <h2 className="text-xl font-bold mb-2">Add Package -</h2>
            <p>List of Add Package -.</p>
<AdminAddPackage></AdminAddPackage>
          </div>
        )}

        {activeTab === "addStories" && (
          <div>
            <h2 className="text-xl font-bold mb-2">Manage Users - </h2>
            <p>Write and share your recent tour experiences.</p>
            <AdminManageUsers></AdminManageUsers>
          </div>
        )}

        {activeTab === "manageStories" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Manage Candidates</h2>
            <div className="overflow-x-auto">
              <AdminManageCandidates></AdminManageCandidates>
            </div>
          </div>
        )}
      </div>
    </div> 
        </div>
    );
};

export default AdminDashboardPage;
