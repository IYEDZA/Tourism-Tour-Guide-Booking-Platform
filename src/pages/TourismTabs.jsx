import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { motion } from "framer-motion";
import { GiPalmTree } from "react-icons/gi";
import { FaMapMarkedAlt, FaUserTie } from "react-icons/fa";
import "./glow.css"; // add glow styles here
import OurPackagestabCard from "./OurPackagestabCard";
import MeetourTourGuideTabCard from "./MeetourTourGuideTabCard";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";


// const guides = [
//   {
//     name: "Lara Benson",
//     expertise: "Cultural and Historical Tours",
//     image: "https://i.ibb.co/WnZG3NR/guide1.jpg",
//   },
//   {
//     name: "Amit Desai",
//     expertise: "Adventure Specialist",
//     image: "https://i.ibb.co/xFGSGqK/guide2.jpg",
//   },
// ];

const TourismTabs = () => {
  const axiosInstance = useAxios();

const { data:packages  = [] } = useQuery({
    queryKey: ["my-packages", ],
    queryFn: async () => {
      const res = await axiosInstance.get(`/packages/random`);
      return res.data;
    },
    
  });
  console.log(packages)

  const { data:guides  = [] } = useQuery({
    queryKey: ["my-random", ],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/random`);
      return res.data;
    },
    
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h2 className="text-4xl font-bold text-center text-primary mb-4">Tourism & Travel Guide</h2>
      <p className="text-center text-gray-500 mb-10">Choose from our premium packages or meet expert tour guides.</p>

      <Tabs>
        {/* Tab Buttons */}
        <TabList className="flex justify-center gap-4 mb-10">
          <Tab className="px-6 py-2 text-lg font-semibold rounded-full border border-primary cursor-pointer transition hover:bg-primary hover:text-white"
            selectedClassName="bg-primary text-white shadow-lg">
            Our Packages
          </Tab>
          <Tab className="px-6 py-2 text-lg font-semibold rounded-full border border-secondary cursor-pointer transition hover:bg-secondary hover:text-white"
            selectedClassName="bg-secondary text-white shadow-lg">
            Meet Our Tour Guides
          </Tab>
        </TabList>

        {/* Packages */}
        <TabPanel>
          <OurPackagestabCard packages={packages} ></OurPackagestabCard>
         
        </TabPanel>

        {/* Guides */}
        <TabPanel>
          <MeetourTourGuideTabCard guides={guides}></MeetourTourGuideTabCard>
        
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default TourismTabs;
