import {
  FaHome,
  FaBoxOpen,
  FaMoneyCheckAlt,
  FaSearchLocation,
  FaUserEdit,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import useUserRole from "../hooks/useUserRole";
import Navbar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer/Footer";

const colors = [
  "text-primary",
  "text-secondary",
  "text-accent",
  "text-info",
  "text-success",
  "text-warning",
  "text-error",
];

const DashboardLayout = () => {
  const [colorIndex, setColorIndex] = useState(0);
  const { role, roleLoading } = useUserRole();

  // Cycle through colors infinitely every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colors.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden font-bold text-xl">Dashboard</div>
        </div>

        {/* Main content */}

        <Outlet />


      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-6">
          {/* TourZone Logo & Name */}
          <div className="flex items-center justify-center mb-10 space-x-3">
            <span className="text-4xl animate-pulse">🌍</span>
            <Link to='/'> <h1 className="text-3xl font-extrabold text-gradient bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent select-none">
              TourZone
            </h1></Link>
           
          </div>

          {/* Navigation Links */}
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 text-lg font-semibold transition-colors duration-500 ${
                  isActive ? colors[colorIndex] : "hover:text-primary"
                }`
              }
            >
              <FaHome />
             DashboardHome
            </NavLink>
          </li>
          

          <li>
            <NavLink
              to="/dashboard/tourist"
              className={({ isActive }) =>
                `flex items-center gap-3 text-lg font-semibold transition-colors duration-500 ${
                  isActive ? colors[colorIndex] : "hover:text-primary"
                }`
              }
            >
              <FaBoxOpen />
             Tourist Dashboard Page 
            </NavLink>
          </li>


           {/* {!roleLoading && role === 'tourGuide' && <>
                      <li>
            <NavLink
              to="/dashboard/guide"
              className={({ isActive }) =>
                `flex items-center gap-3 text-lg font-semibold transition-colors duration-500 ${
                  isActive ? colors[colorIndex] : "hover:text-primary"
                }`
              }
            >
              <FaHome />
             Tour Guide Dashboard Page
            </NavLink>
          </li> 
                        
                    </>} */}

           <li>
            <NavLink
              to="/dashboard/guide"
              className={({ isActive }) =>
                `flex items-center gap-3 text-lg font-semibold transition-colors duration-500 ${
                  isActive ? colors[colorIndex] : "hover:text-primary"
                }`
              }
            >
              <FaHome />
             Tour Guide Dashboard Page
            </NavLink>
          </li>

          
           {/* {!roleLoading && role === 'admin' && <>
                       
          <li>
            <NavLink
              to="/dashboard/admin"
              className={({ isActive }) =>
                `flex items-center gap-3 text-lg font-semibold transition-colors duration-500 ${
                  isActive ? colors[colorIndex] : "hover:text-primary"
                }`
              }
            >
              <FaMoneyCheckAlt />
            Admin Dashboard Page
            </NavLink>
          </li>
                    </>} */}

          <li>
            <NavLink
              to="/dashboard/admin"
              className={({ isActive }) =>
                `flex items-center gap-3 text-lg font-semibold transition-colors duration-500 ${
                  isActive ? colors[colorIndex] : "hover:text-primary"
                }`
              }
            >
              <FaMoneyCheckAlt />
            Admin Dashboard Page
            </NavLink>
          </li>

           <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 text-lg font-semibold transition-colors duration-500 ${
                  isActive ? colors[colorIndex] : "hover:text-primary"
                }`
              }
            >
              <FaHome />
             Help
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/track"
              className={({ isActive }) =>
                `flex items-center gap-3 text-lg font-semibold transition-colors duration-500 ${
                  isActive ? colors[colorIndex] : "hover:text-primary"
                }`
              }
            >
              <FaSearchLocation />Assked More
              
            </NavLink>
          </li>
           <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 text-lg font-semibold transition-colors duration-500 ${
                  isActive ? colors[colorIndex] : "hover:text-primary"
                }`
              }
            >
              <FaHome />
              Settings
            </NavLink>
          </li>

         
        </ul>
      </div>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default DashboardLayout;
