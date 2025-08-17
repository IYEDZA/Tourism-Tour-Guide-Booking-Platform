import React from 'react';
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import ShowStoryCard from './ShowStoryCard';
import { motion } from "framer-motion";

const TouristrandomStoie = () => {
  const axiosInstance = useAxios();

  const { data: stories = [] } = useQuery({
    queryKey: ["my-stories"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/stories/random`);
      return res.data;
    },
  });

  return (
    <section className="py-12 bg-base-100">
      {/* Section Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl md:text-3xl font-bold  bg-clip-text drop-shadow-lg">
          🌍 Featured Travel Stories
        </h1>
        <p className="mt-3 text-gray-600 text-sm md:text-base italic tracking-wide">
          Explore inspiring moments shared by our passionate travelers.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid gap-8 px-4 md:px-10 lg:grid-cols-2">
        {stories.map((storyData, i) => (
          <ShowStoryCard key={i} storyData={storyData} />
        ))}
      </div>
    </section>
  );
};

export default TouristrandomStoie;
