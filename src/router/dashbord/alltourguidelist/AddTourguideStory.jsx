 import React from 'react';
 import { useState } from "react";
import { motion } from "framer-motion";
 import { useNavigate } from "react-router";
import { FaPlus, FaImage, FaMapMarkerAlt, FaCalendarAlt, FaDollarSign } from "react-icons/fa";

const AddTourguideStory = () => {
     const navigate = useNavigate();
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Save story to backend
    navigate("/dashboard/manage-story");
  };



    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 px-6 py-20 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-base-100 p-10 rounded-xl shadow-2xl border border-accent animate-pulse-slow"
      >
        <h2 className="text-4xl font-extrabold text-center text-primary mb-10 animate-pulse">
          <FaPlus className="inline-block mr-2" /> Share Your Travel Story
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-info font-semibold">Title</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-info text-black bg-transparent focus:outline-none"
              placeholder="Enter story title"
            />
          </div>
           <div>
            <label className="block mb-2 text-info font-semibold">story</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-info text-black bg-transparent focus:outline-none"
              placeholder="Enter story "
            />
          </div>

          <div>
            <label className="block mb-2 text-info font-semibold">Description</label>
            <textarea
              rows={5}
              required
              className="w-full px-4 py-2 border border-info  text-black bg-transparent focus:outline-none"
              placeholder="Write your amazing experience..."
            ></textarea>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block mb-2 text-info font-semibold flex items-center gap-2">
                <FaMapMarkerAlt /> Place
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2  text-black border-info bg-transparent focus:outline-none"
                placeholder="e.g. Bali, Indonesia"
              />
            </div>
            <div>
              <label className="block mb-2 text-info font-semibold flex items-center gap-2">
                <FaCalendarAlt /> Date
              </label>
              <input
                type="date"
                required
                className="w-full px-4 py-2  text-black border-info bg-transparent focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 text-info font-semibold flex items-center gap-2">
                <FaDollarSign /> Cost
              </label>
              <input
                type="number"
                required
                className="w-full px-4 py-2 border border-info text-black bg-transparent focus:outline-none"
                placeholder="$"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-info font-semibold flex items-center gap-2">
              <FaImage /> Upload Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="file-input file-input-bordered w-full bg-black/30 text-white"
            />
            <label className="block mb-2 mt-2 text-info font-semibold flex items-center gap-2">
             Or ... <FaImage />  Give Images .. Url
            </label>
            <input
              type="url"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              placeholder="give image url..."
              className="file-input file-input-bordered w-full text-black "
            />
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((src, i) => (
                <motion.img
                  key={i}
                  src={src}
                  alt="preview"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-xl h-32 w-full object-cover border-2 border-accent hover:scale-105 transition-transform"
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              type="submit"
              className="btn btn-accent px-10 py-2 font-bold text-white hover:scale-105 hover:shadow-xl transition"
            >
              Submit Story
            </button>
          </div>
        </form>
      </motion.div>
    </div>
    );
};

export default AddTourguideStory;