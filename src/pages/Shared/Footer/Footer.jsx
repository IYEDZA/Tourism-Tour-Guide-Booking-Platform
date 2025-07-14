
import { FaFacebookF, FaGithub, FaYoutube } from 'react-icons/fa'
import { MdEmail, MdLocationOn } from 'react-icons/md'
import { motion } from 'framer-motion'
import { Link } from 'react-router'

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, filter: 'blur(15px)' }}
      animate={{ opacity: 1, filter: 'blur(0)' }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative text-white pt-24 pb-10 overflow-hidden shadow-xl"
      style={{
        background: 'linear-gradient(270deg, #0ea5e9, #14b8a6, #facc15)',
        backgroundSize: '600% 600%',
        animation: 'gradientShift 15s ease infinite'
      }}
    >
      {/* 🌀 Infinite Gradient Animation */}
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      {/* 🌊 Wave Top SVG */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] rotate-180 z-0">
        <svg className="relative block w-[calc(100%+1.3px)] h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120">
          <path fill="#ffffff" d="M0,0V46.29c47.64,22.25,103.17,29.61,158.31,23C230.88,60.7,284.43,32.9,339.53,20.6,411.36,5.8,485.5,12.3,556,30.94c71.27,19,136.52,51.51,209.59,57.26,60.48,4.92,119.43-13.73,178.64-28.61C1041,42.52,1099.36,35.52,1159,38.7V0Z"/>
        </svg>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 z-10 relative">
        {/* 🌍 Brand */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img src="/logo.png" alt="Logo" className="w-16 h-16 rounded-full mb-3 border shadow-lg" />
          <motion.h2
            className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-white to-yellow-100 text-transparent bg-clip-text"
            animate={{ scale: [1, 1.03, 1], color: ['#fff', '#facc15', '#fff'] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            The Tourist Guide
          </motion.h2>
          <p className="text-sm mt-2 text-white/90">Explore Bangladesh with trusted guides and local gems.</p>
        </div>

        {/* 👨‍💻 Developer Info */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-3 animate-pulse text-white">Developer Info</h3>
          <p className="flex items-center gap-2 text-sm mb-1"><MdEmail className="text-yellow-300" /> developer@gmail.com</p>
          <p className="flex items-center gap-2 text-sm mb-1"><MdLocationOn className="text-green-300" /> Dhaka, Bangladesh</p>
          <p className="text-sm mt-2 text-white/90">Crafted with ❤️ by Dipu Barman</p>
        </div>

        {/* 🔗 Social Media */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-3 text-white animate-bounce">Follow Me</h3>
          <div className="flex justify-center gap-5 text-2xl">
            <motion.a whileHover={{ scale: 1.3, rotate: 5 }} href="https://facebook.com" target="_blank" className="text-[#1877F2]"><FaFacebookF /></motion.a>
            <motion.a whileHover={{ scale: 1.3, rotate: -5 }} href="https://youtube.com" target="_blank" className="text-[#FF0000]"><FaYoutube /></motion.a>
            <motion.a whileHover={{ scale: 1.3 }} href="mailto:developer@gmail.com" className="text-[#EA4335]"><MdEmail /></motion.a>
            <motion.a whileHover={{ scale: 1.3 }} href="https://github.com/yourusername" target="_blank" className="text-white"><FaGithub /></motion.a>
          </div>
        </div>

        {/* 🧭 Navigation */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-3 text-white animate-fadeIn">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              { to: '/', label: '🏠 Home' },
              { to: '/about', label: 'ℹ️ About Us' },
              { to: '/community', label: '👥 Community' },
              { to: '/trips', label: '✈️ Trips' },
              { to: '/contact', label: '📞 Contact' },
            ].map(({ to, label }, i) => (
              <li key={i}>
                <Link
                  to={to}
                  className="hover:underline hover:text-yellow-300 transition-colors duration-300"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-center text-sm mt-10 pt-6 border-t border-white/30 relative z-10 text-white/80"
      >
        © {new Date().getFullYear()} <span className="font-semibold text-yellow-200">The Tourist Guide</span> — All rights reserved.
      </motion.div>
    </motion.footer>
  )
}

export default Footer
