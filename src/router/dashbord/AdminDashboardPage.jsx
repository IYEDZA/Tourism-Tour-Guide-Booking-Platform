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
         
          transition={{ duration: 8, repeat: Infinity }}
          className="rounded-xl border-1 p-0"
        >
          <button
            onClick={() => setActiveTab("profile")}
            className="btn btn-primary w-full h-full flex items-center justify-center gap-2  hover:text-white hover:shadow-lg transition hover:bg-gradient-to-r from-primary to-accent"
          >
            <FaUserEdit />
            Manage Profile
          </button>
        </motion.div>

        {/* Dashboard Button 2 */}
        <motion.div
        
          // transition={{ duration: 8, repeat: Infinity }}
          className="rounded-xl border-1 p-0"
        >
          <button
            onClick={() => setActiveTab("tours")}
            className="btn w-full h-full flex items-center justify-center gap-2 btn-primary  hover:text-white hover:shadow-lg  hover:bg-gradient-to-r from-primary to-accent"
          >
            <FaClipboardList />
           Add Package -

          </button>
        </motion.div>

        {/* Dashboard Button 3 */}
        <motion.div
         
          transition={{ duration: 8, repeat: Infinity }}
          className="rounded-xl border-1 p-0"
        >
          <button
            onClick={() => setActiveTab("addStories")}
            className="btn btn-primary w-full h-full flex items-center justify-center gap-2 hover:text-white hover:shadow-lg transition hover:bg-gradient-to-r from-primary to-accent"
          >
            <FaPlusCircle />
           Manage Users - 

          </button>
        </motion.div>

        {/* Dashboard Button 4 */}
        <motion.div
        
          transition={{ duration: 8, repeat: Infinity }}
          className="rounded-xl border-1 p-0"
        >
          <button
            onClick={() => setActiveTab("manageStories")}
            className="btn w-full h-full flex items-center justify-center gap-2 btn-primary hover:text-white hover:shadow-lg transition hover:bg-gradient-to-r from-primary to-accent"
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
           
            <AdminManageProfile></AdminManageProfile>
          </div>
        )}

        {activeTab === "tours" && (
          <div>
            
<AdminAddPackage></AdminAddPackage>
          </div>
        )}

        {activeTab === "addStories" && (
          <div>
           
            <AdminManageUsers></AdminManageUsers>
          </div>
        )}

        {activeTab === "manageStories" && (
          <div>
           
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
