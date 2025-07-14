import { useState, useContext } from 'react';

import { FaUserCircle, FaHome, FaUsers, FaInfoCircle, FaSuitcase, FaSignOutAlt, FaBullhorn, FaTachometerAlt, FaRegUserCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Authcontext from '../../context/Authcontext';
import { Link } from 'react-router';

const Navbar = () => {
  const { user, signOutuser } = useContext(Authcontext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    signOutuser()
      .then(() => {
        console.log('signout successful');
        setIsOpen(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="navbar bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg px-6 "
    >
      <div className="flex-1">
        <Link to="/" className="text-2xl font-extrabold flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="w-10 h-10 animate-bounce" />
          <motion.span
            animate={{
              background: [
                'linear-gradient(to right, #f9a8d4, #818cf8)',
                'linear-gradient(to right, #34d399, #3b82f6)',
                'linear-gradient(to right, #f472b6, #60a5fa)'
              ],
            }}
            transition={{ repeat: Infinity, duration: 6, repeatType: 'loop' }}
            className="bg-clip-text p-3 rounded-3xl bg-gradient-to-r from-white via-gray-200 to-white"
          >
            The Tourist Guide
          </motion.span>
        </Link>
      </div>

      <div className="hidden md:flex gap-4 items-center">
        <Link to="/" className="btn btn-ghost text-white flex items-center gap-1"><FaHome /> Home</Link>
        <Link to="/community" className="btn btn-ghost text-white flex items-center gap-1"><FaUsers /> Community</Link>
        <Link to="/about" className="btn btn-ghost text-white flex items-center gap-1"><FaInfoCircle /> About Us</Link>
        <Link to="/trips" className="btn btn-ghost text-white flex items-center gap-1"><FaSuitcase /> Trips</Link>
         <Link to="/tourguide" className="btn btn-ghost text-white flex items-center gap-1 "><FaSuitcase />TourGuideProfile </Link>
          <Link to="/package" className="btn btn-ghost text-white flex items-center gap-1 mr-2"><FaSuitcase />Package Details Page   </Link>
      </div>

      <div className="flex-none">
        {user && user.email ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="w-10 rounded-full ring ring-white ring-offset-2">
                <img src={user.photoURL || 'https://i.ibb.co/2n4J2Jg/default.png'} alt="user" />
              </div>
            </div>
            
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-xl bg-base-200 text-black rounded-box w-60"
              >
                <li>
                  <Link to="/dashboard" className='text-gradient animate-text font-bold text-xl'><FaTachometerAlt /> Dashboard</Link>
                </li>
                <li>
                 <Link to="/offers" className='text-gradient animate-text font-bold text-[14px]' ><FaBullhorn /> Offer Announcements</Link>
                </li>
                <div className="p-2 border-t border-gray-300 mt-2">
                  <p className="text-sm font-semibold"><FaRegUserCircle />{user.displayName}</p>
                  <p className="text-sm text-gray-600"> {user.email}</p>
                </div>
                <li>
                  <button onClick={handleLogout} className="text-red-600 flex items-center btn btn-primary gap-1">
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              </ul>
            
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-outline text-white border-white">Login</Link>
            <Link to="/register" className="btn btn-primary text-white">Register</Link>
          </div>
        )}
      </div>

        <style>{`
        .text-gradient {
          background: linear-gradient(to right, #f9a8d4, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .animate-text {
          background-size: 200% auto;
          animation: shineText 5s linear infinite;
        }
        @keyframes shineText {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </motion.div>
  );
};

export default Navbar;
