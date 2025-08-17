import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaGithub, FaGlobe, FaEnvelope, FaFileDownload } from "react-icons/fa";

const textColors = [
  "text-primary",
  "text-secondary",
  "text-accent",
  "text-info",
  "text-success",
  "text-warning",
  "text-error",
];

const skills = [
  { name: "React", value: 90, color: "bg-primary" },
  { name: "Node.js", value: 85, color: "bg-success" },
  { name: "Express.js", value: 80, color: "bg-info" },
  { name: "MongoDB", value: 88, color: "bg-accent" },
  { name: "Firebase", value: 84, color: "bg-warning" },
  { name: "Java", value: 70, color: "bg-error" },
  { name: "Tailwind CSS", value: 95, color: "bg-secondary" },
];

const AboutUs = () => {
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % textColors.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-base-200 px-6 py-16 mt-20">
      <motion.div
        className="max-w-5xl mx-auto text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Profile Section */}
        <div className="flex flex-col lg:flex-row items-center gap-8 mb-10">
          <motion.img
            src="https://i.ibb.co/f9c5Lt1/dipu-barman.jpg" // Replace with your image
            alt="Developer Profile"
            className="w-40 h-40 rounded-full object-cover ring-4 ring-info hover:scale-105 transition-transform duration-500"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
          <div>
            <h1
              className={`text-3xl font-bold transition-colors duration-500 `}
            >
              👨‍💻 Dipu Barman
            </h1>
            <p className="text-lg text-gray-600 mt-2">Full Stack Web Developer</p>
            <p className="text-md text-gray-500 mt-1">Passionate about clean code, UI/UX, and solving real-world problems through tech.</p>
          </div>
        </div>

        {/* Resume Download */}
        <div className="mb-8">
          <a
            href="/dipu-barman-resume.pdf"
            download
            className="btn btn-outline btn-primary font-semibold"
          >
            <FaFileDownload className="mr-2" /> Download Resume
          </a>
        </div>

        {/* Tech Stats */}
        <motion.div
          className="stats shadow bg-base-100 flex flex-col lg:flex-row justify-center items-center mb-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="stat">
            <div className="stat-title">Projects Completed</div>
            <div className="stat-value text-primary">12+</div>
            <div className="stat-desc">React / MERN / Firebase</div>
          </div>
          <div className="stat">
            <div className="stat-title">Years Experience</div>
            <div className="stat-value ">1+</div>
            <div className="stat-desc">Frontend & Backend</div>
          </div>
          <div className="stat">
            <div className="stat-title">Tech Mastery</div>
            <div className="stat-value text-primary">90%</div>
            <div className="stat-desc">Consistently learning & growing</div>
          </div>
        </motion.div>

        {/* Skills Progress */}
        <motion.div
          className="bg-base-100 rounded-xl p-6 shadow-xl mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-4">🚀 My Technical Skills</h2>
          {skills.map((skill, index) => (
            <div key={index} className="mb-4 text-left">
              <div
                className={`font-semibold mb-1 transition-colors duration-500 ${textColors[colorIndex]}`}
              >
                {skill.name} — {skill.value}%
              </div>
              <div className="w-full bg-gray-300 h-4 rounded-full overflow-hidden">
                <motion.div
                  className={`h-4 ${skill.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.value}%` }}
                  transition={{ duration: 1 + index * 0.2 }}
                />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Contact + Projects */}
        <motion.div
          className="flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <a
            href="https://github.com/dipu-barman"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline btn-primary"
          >
            <FaGithub className="mr-2" />
            GitHub
          </a>
          <a
            href="https://tourzone-project.web.app"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline btn-primary"
          >
            <FaGlobe className="mr-2" />
            Live Project
          </a>
          <a
            href="mailto:dipu@example.com"
            className="btn btn-outline btn-primary"
          >
            <FaEnvelope className="mr-2" />
            Email Me
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
