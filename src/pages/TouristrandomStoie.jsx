import React from 'react';
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import ShowStoryCard from './ShowStoryCard';
import { motion } from "framer-motion";
const TouristrandomStoie = () => {

    const axiosInstance = useAxios();

const { data:stories  = [] } = useQuery({
    queryKey: ["my-stories", ],
    queryFn: async () => {
      const res = await axiosInstance.get(`/stories/random`);
      return res.data;
    },
    
  });
  console.log(stories)

    return (
        <div className=''>

            <motion.div
  className="text-center mb-10"
  initial={{ opacity: 0, y: -30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 drop-shadow-lg hover:scale-105 transition-transform duration-300">
    🌍 Featured Travel Story
  </h1>
  <p className="mt-3 text-gray-600 text-sm md:text-base italic tracking-wide">
    Explore inspiring moments shared by our passionate travelers.
  </p>
</motion.div>

<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2'> {stories.map(storyData=> <ShowStoryCard storyData={storyData}></ShowStoryCard>)}</div>
         
           
        </div>
    );
};

export default TouristrandomStoie;