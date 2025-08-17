import React, { useState, useMemo, use } from "react";
import { FaUser, FaCalendarAlt, FaMapMarkerAlt, FaSortAmountDown, FaSortAmountUp, FaShareAlt, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { FacebookIcon, FacebookShareButton } from "react-share";
import Authcontext from "../../context/Authcontext";

const storiesData = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Tourist",
    images: [
      "https://i.ibb.co.com/PZcSrWP5/image.jpg",
      "https://i.ibb.co.com/fYNsZ589/4k-Nature-wallpaper.jpg",
      "https://i.ibb.co.com/4nLpFcHZ/15-Colorado-Reflections-That-Almost-Look-Unreal.jpg"
    ],
    title: "Amazing Trip to the Mountains",
    description: "I had an unforgettable experience exploring the snowy mountains. The guides were professional, and every moment was magical!",
    date: "2025-08-10",
    place: "Swiss Alps"
  },
  {
    id: 2,
    name: "David Smith",
    role: "Tour Guide",
    images: [
      "https://i.ibb.co.com/F4PG34jX/23-High-Definition-Windows-10-Wallpapers-for-Your-Desktop-85ideas-com.jpg",
      "https://i.ibb.co.com/Tx96jMzX/A-group-of-people-hiking-in-the-mountains.jpg",
      "https://i.ibb.co.com/B5B1hWpN/A-man-standing-on-top-of-a-mountain-with-a-backpack.jpg"
    ],
    title: "Guiding Through the Desert",
    description: "Sharing the beauty of the desert with tourists is always rewarding. Watching their excitement makes the journey worthwhile.",
    date: "2025-07-22",
    place: "Sahara Desert"
  },
  {
    id: 3,
    name: "Emma Williams",
    role: "Tourist",
    images: [
      "https://i.ibb.co.com/qLY8y2LC/Background-exclusive-Full-rt.jpg",
      "https://i.ibb.co.com/XkSthSYp/Beach-Desktop-Wallpapers-Free-Download.jpg",
      "https://i.ibb.co.com/B5B1hWpN/A-man-standing-on-top-of-a-mountain-with-a-backpack.jpg"
    ],
    title: "City Adventure Experience",
    description: "Exploring the city culture, tasting amazing food, and meeting friendly locals made this trip unforgettable.",
    date: "2025-06-18",
    place: "Barcelona, Spain"
  },
  {
    id: 4,
    name: "Michael Brown",
    role: "Tour Guide",
    images: [
      "https://i.ibb.co.com/qYdW1QCj/Beautiful-Photo.jpg",
      "https://i.ibb.co.com/n4cqGjW/Beautiful-sea-and-beach-holiday.jpg",
      "https://i.ibb.co.com/XkSthSYp/Beach-Desktop-Wallpapers-Free-Download.jpg"
    ],
    title: "Hiking the Rocky Trails",
    description: "Guiding tourists through the rugged trails is challenging yet fulfilling. Their joy at reaching the peak is priceless.",
    date: "2025-05-30",
    place: "Rocky Mountains, USA"
  },
  {
    id: 5,
    name: "Sophia Lee",
    role: "Tourist",
    images: [
      "https://i.ibb.co.com/Z1SVLh0y/Character-design-of-a-mountain-climber-in-3d-pixar-style-Premium-AI-generated-image.jpg",
      "https://i.ibb.co.com/cKs9LvDM/Design-Wave-Ai-photos-images-assets.jpg",
      "https://i.ibb.co.com/n4cqGjW/Beautiful-sea-and-beach-holiday.jpg"
    ],
    title: "Relaxing Beach Getaway",
    description: "The serene beaches, the sunset views, and local seafood made my vacation truly relaxing and memorable.",
    date: "2025-04-14",
    place: "Bali, Indonesia"
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Tour Guide",
    images: [
      "https://i.ibb.co.com/B2dMCVxC/download-1.jpg",
      "https://i.ibb.co.com/RG1ZLNC7/download-2.jpg",
      "https://i.ibb.co.com/F4P9WyKN/download-3.jpg"
    ],
    title: "Cultural Heritage Tour",
    description: "Sharing historical and cultural stories with tourists brings the past alive. Every visit is a learning experience for everyone.",
    date: "2025-03-10",
    place: "Kyoto, Japan"
  },
  {
    id: 7,
    name: "Olivia Martinez",
    role: "Tourist",
    images: [
      "https://randomuser.me/api/portraits/women/33.jpg",
      "https://i.ibb.co.com/F4P9WyKN/download-3.jpg",
      "https://i.ibb.co.com/5JjHSg1/download-4.jpg"
    ],
    title: "Safari Adventure",
    description: "Watching wildlife up close and learning from expert guides made this safari adventure unforgettable and thrilling.",
    date: "2025-02-28",
    place: "Kenya"
  },
  {
    id: 8,
    name: "Liam Thompson",
    role: "Tour Guide",
    images: [
      "https://i.ibb.co.com/wrh3C4Qy/download-5.jpg",
      "https://i.ibb.co.com/5JjHSg1/download-4.jpg",
      "https://i.ibb.co.com/d30MbJd/download-7.jpg"
    ],
    title: "Exploring Ancient Ruins",
    description: "Guiding tourists through ancient ruins, explaining their history, and seeing their fascination makes my job incredibly rewarding.",
    date: "2025-01-20",
    place: "Machu Picchu, Peru"
  }
];

const StorySection = () => {
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

   const navigate = useNavigate();
  const { user } = use(Authcontext);

//   const { name, email, photo, role, bio, experience, location, specialty, stories = [] } = storyData || {};

  const handleShareClick = () => {
    if (!user?.email) navigate("/login");
  };


  const filteredStories = useMemo(() => {
    return storiesData
      .filter(story =>
        story.name.toLowerCase().includes(search.toLowerCase()) ||
        story.title.toLowerCase().includes(search.toLowerCase()) ||
        story.place.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => sortAsc ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date));
  }, [search, sortAsc]);

  return (
    <section className="  px-4 ">
      <div className="w-11/12 mx-auto text-center ">
        <h2 className="text-3xl md:text-3xl font-bold  mb-4">Inspiring Stories from Travelers & Guides</h2>
        <p className="text-gray-700 text-md md:text-lg mb-8">Discover real experiences shared by tourists and tour guides. Let their adventures inspire your next journey.</p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12">
          <input
            type="text"
            placeholder="Search by name, title or place"
            className="input input-bordered w-full md:w-96"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-primary flex items-center gap-2" onClick={() => setSortAsc(!sortAsc)}>
            {sortAsc ? <FaSortAmountDown /> : <FaSortAmountUp />}
            {sortAsc ? "Date Desc" : "Date Asc"}
          </button>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredStories.length === 0 ? (
            <p className="text-center col-span-full text-gray-500">No stories found.</p>
          ) : (
            filteredStories.map(story => (
              <motion.div
                key={story.id}
                whileHover={{ scale: 1.03 }}
                className="card bg-base-100 shadow-2xl border border-base-300 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-primary"
              >
                {/* Multi-image carousel */}
                <div className="flex overflow-x-auto space-x-2 p-2">
                  {story.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${story.name}-${idx}`}
                      className="h-32 w-32 object-cover rounded-lg flex-shrink-0 border border-base-200"
                    />
                  ))}
                </div>

                <div className="card-body">
                  <h3 className="card-title text-lg md:text-xl font-semibold">{story.title}</h3>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-2"><FaCalendarAlt /> {story.date}</div>
                  <p className="text-gray-600 text-sm md:text-base mb-3">{story.description}</p>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between text-gray-500 text-sm gap-2 md:gap-0 mt-2">
                    <div className="flex items-center gap-2"><FaUser /> {story.name} ({story.role})</div>
                    <div className="flex items-center gap-2"><FaMapMarkerAlt /> {story.place}</div>
                  </div>
 <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Link to="/allStories" className="btn btn-outline btn-primary flex-1">
              <FaArrowRight /> All Stories
            </Link>

            {user?.email ? (
              <FacebookShareButton
                url={window.location.href}
                quote={`Check out this amazing travel story by ${name}!`}
                hashtag="#ExploreWithUs"
                className="flex-1 flex justify-center"
              >
                <FacebookIcon size={40} round />
              </FacebookShareButton>
            ) : (
              <button
                onClick={handleShareClick}
                className="btn btn-primary flex-1 flex items-center gap-2 justify-center"
              >
                <FaShareAlt /> Login to Share
              </button>
            )}
          </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default StorySection;
