import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../hooks/useAxios';
import AllStories from './AllStories';

const AllStoriesCard = () => {
     const axiosInstance = useAxios();

        const { data:stories  = [] } = useQuery({
    queryKey: ["my-stories", ],
    queryFn: async () => {
      const res = await axiosInstance.get(`/stories`);
      return res.data;
    },
    
  });
  console.log(stories)
    return (

        <div>
           
        {/* {stories.map (allStories=><AllStories allStories={allStories}></AllStories>)} */}
        <AllStories allStories={stories}></AllStories>
        </div>
    );
};

export default AllStoriesCard;