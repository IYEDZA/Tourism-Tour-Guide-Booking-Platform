import { useState, useContext, useEffect } from 'react';
import {
  FaUserCircle,
  FaHome,
  FaUsers,
  FaInfoCircle,
  FaSuitcase,
  FaSignOutAlt,
  FaBullhorn,
  FaTachometerAlt,
  FaRegUserCircle,
  FaBars,
  FaGlobeAsia,
  FaSun,
  FaMoon
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import Authcontext from '../../context/Authcontext';
import { Link } from 'react-router';

const Navbar = () => {
  const { user, signOutuser } = useContext(Authcontext);
  const [isOpen, setIsOpen] = useState(false);

  // Theme state
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.querySelector('html').setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const handleLogout = () => {
    signOutuser()
      .then(() => setIsOpen(false))
      .catch((error) => console.log(error.message));
  };

  const commonLinks = (
    <>
      <li>
        <Link className="flex items-center gap-2 px-3 py-2 hover:text-yellow-400 transition-colors duration-300" to="/">
          <FaHome /> Home
        </Link>
      </li>
      <li>
        <Link className="flex items-center gap-2 px-3 py-2 hover:text-yellow-400 transition-colors duration-300" to="/community">
          <FaUsers /> Community
        </Link>
      </li>
      <li>
        <Link className="flex items-center gap-2 px-3 py-2 hover:text-yellow-400 transition-colors duration-300" to="/about">
          <FaInfoCircle /> About Us
        </Link>
      </li>
    </>
  );

  const protectedLinks = (
    <>
      <li>
        <Link className="flex items-center gap-2 px-3 py-2 hover:text-yellow-400 transition-colors duration-300" to="/trip">
          <FaSuitcase /> Trips
        </Link>
      </li>
      <li>
        <Link className="flex items-center gap-2 px-3 py-2 hover:text-yellow-400 transition-colors duration-300" to="/package">
          <FaSuitcase /> Packages
        </Link>
      </li>
      <li>
        <Link className="flex items-center gap-2 px-3 py-2 hover:text-yellow-400 transition-colors duration-300" to="/tourguide">
          <FaSuitcase /> Tour Guide
        </Link>
      </li>
    </>
  );

  return (
    <motion.nav
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 z-50 w-full shadow-lg transition-colors duration-500 ${
        theme === 'light' ? 'bg-white text-gray-900' : 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white'
      }`}
      style={{ backdropFilter: 'blur(10px)' }}
    >
      <div className="w-full mx-auto flex items-center px-4 md:px-8 lg:px-10 py-3">
        
        {/* Mobile Menu */}
        <div className="dropdown md:hidden">
          <label tabIndex={0} className="btn btn-circle btn-ghost text-xl">
            <FaBars />
          </label>
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-xl rounded-box w-60 ${
              theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-800 text-white'
            }`}
          >
            {commonLinks}
            {user?.email && protectedLinks}
          </ul>
        </div>

        {/* Logo */}
        <div className="flex-1 flex items-center gap-3">
          <Link to="/" className="text-2xl font-extrabold flex items-center gap-2">
            <FaGlobeAsia className={`text-3xl drop-shadow-lg ${theme === 'light' ? 'text-cyan-600' : 'text-cyan-400'}`} />
            <motion.span
              transition={{ repeat: Infinity, duration: 6, repeatType: 'loop' }}
              className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-400 to-yellow-400 font-extrabold tracking-wide"
            >
              WanderSphere
            </motion.span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center">
          <ul className="menu menu-horizontal px-2 font-medium">
            {commonLinks}
            {user?.email && protectedLinks}
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 ml-4">
          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="btn btn-circle btn-ghost">
            {theme === 'light' ? <FaMoon className="text-xl" /> : <FaSun className="text-xl text-yellow-400" />}
          </button>

          {/* User Profile / Auth */}
          {user?.email ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar"
                onClick={() => setIsOpen(!isOpen)}
              >
                <div className="w-10 rounded-full ring ring-cyan-400 ring-offset-2">
                  <img src={user.photoURL || 'https://i.ibb.co/2n4J2Jg/default.png'} alt="user" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className={`menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-xl rounded-box w-64 ${
                  theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-800 text-white'
                }`}
              >
                <li>
                  <Link to="/dashboard" className="font-semibold flex items-center gap-2">
                    <FaTachometerAlt /> Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/offers" className="font-semibold flex items-center gap-2">
                    <FaBullhorn /> Offers
                  </Link>
                </li>
                <div className="p-2 border-t border-gray-300 mt-2">
                  <p className="text-sm font-semibold flex items-center gap-1">
                    <FaRegUserCircle /> {user.displayName}
                  </p>
                  <p className="text-sm opacity-70">{user.email}</p>
                </div>
                <li>
                  <button
                    onClick={handleLogout}
                    className="btn btn-primary text-white flex items-center gap-2 mt-2 w-full justify-center"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link
                to="/login"
                className={`btn btn-outline transition-colors duration-300 ${
                  theme === 'light' ? 'text-gray-900 border-gray-900 hover:bg-gray-900 hover:text-white' : 'text-white border-white hover:bg-white hover:text-black'
                }`}
              >
                Login
              </Link>
              <Link to="/register" className="btn btn-primary text-white">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
