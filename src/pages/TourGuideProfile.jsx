import React, { useEffect, useState } from "react";
import { Card, Button, Badge, Avatar, Input } from "react-daisyui";

const TourGuideProfilePage = () => {
  
  const stories = [ { id: 1, title: "Exploring the Ancient Temples of Bagan", 
    images: [ "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&q=80",
       "https://i.ibb.co.com/XxVH0zX1/image.jpg", ],
     place: "Bagan, Myanmar", date: "2024-05-12", cost: "$120", description: "A magical sunrise hot-air balloon ride over the thousands of temples in Bagan.", name: "Alex Johnson", photo: "https://i.pravatar.cc/150?img=47", role: "Tour Guide", }, 
     { id: 2, title: "Hiking the Swiss Alps", 
      images: [ "https://i.ibb.co.com/k2yFfVmf/image.jpg", "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80", ], place: "Zermatt, Switzerland", date: "2024-07-02", cost: "$250", description: "An unforgettable hiking adventure with breathtaking mountain views.", name: "Sophia Lee", photo: "https://i.pravatar.cc/150?img=32", role: "Mountain Guide", },
       { id: 3, title: "Discovering the Streets of Kyoto", images: [ "https://i.ibb.co.com/PZcSrWP5/image.jpg", "https://images.unsplash.com/photo-1563897539633-7374c276c212?w=800&q=80", ], place: "Kyoto, Japan", date: "2024-08-20", cost: "$180", description: "Traditional tea ceremonies, cherry blossoms, and ancient shrines.", name: "Kenji Tanaka", photo: "https://i.pravatar.cc/150?img=12", role: "Cultural Guide", }, { id: 4, title: "Safari in Serengeti", images: [ "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800&q=80", "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80", ], place: "Tanzania", date: "2024-09-14", cost: "$400", description: "Witnessing the great migration of wildebeest and zebras.", name: "David Miller", photo: "https://i.pravatar.cc/150?img=22", role: "Safari Guide", }, { id: 5, title: "Venice Gondola Ride", images: [ "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80", "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=800&q=80", ], place: "Venice, Italy", date: "2024-10-02", cost: "$150", description: "Gliding through Venice canals with charming views of historical buildings.", name: "Isabella Rossi", photo: "https://i.pravatar.cc/150?img=5", role: "City Guide", }, { id: 6, title: "Exploring the Sahara Desert", images: [ "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", ], place: "Morocco", date: "2024-11-05", cost: "$300", description: "Camel rides and camping under the stars in the endless golden desert.", name: "Fatima Zahra", photo: "https://i.pravatar.cc/150?img=8", role: "Desert Guide", }, { id: 7, title: "Discovering New York City", images: [ "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=800&q=80", "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80", ], place: "New York, USA", date: "2025-01-12", cost: "$500", description: "Exploring Central Park, Times Square, and enjoying the vibrant city life.", name: "John Smith", photo: "https://i.pravatar.cc/150?img=15", role: "City Guide", }, { id: 8, title: "Relaxing in Bali Beaches", images: [ "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&q=80", ], place: "Bali, Indonesia", date: "2025-02-25", cost: "$200", description: "White sand beaches, surf waves, and traditional Balinese culture.", name: "Made Wijaya", photo: "https://i.pravatar.cc/150?img=18", role: "Beach Guide", }, ];

  const [currentImage, setCurrentImage] = useState({});
  const [hoveredGuideId, setHoveredGuideId] = useState(null);
  const [searchText, setSearchText] = useState("");

  // Filter stories based on search
  const filteredStories = stories.filter(
    (story) =>
      story.title.toLowerCase().includes(searchText.toLowerCase()) ||
      story.place.toLowerCase().includes(searchText.toLowerCase()) ||
      story.name.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => {
        const newState = { ...prev };
        stories.forEach((story) => {
          const idx = prev[story.id] ?? 0;
          newState[story.id] = (idx + 1) % story.images.length;
        });
        return newState;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [stories]);

  const handlePrev = (id, length) => {
    setCurrentImage((prev) => ({
      ...prev,
      [id]: (prev[id] - 1 + length) % length,
    }));
  };

  const handleNext = (id, length) => {
    setCurrentImage((prev) => ({
      ...prev,
      [id]: (prev[id] + 1) % length,
    }));
  };

  return (
    <div className="py-10 px-5">
      <div className="w-11/12 mx-auto mt-20">
        <h3 className="text-3xl font-bold mb-6 text-center">✨ Travel Stories</h3>

        {/* Search Input */}
        <div className="mb-6 flex justify-center">
          <Input
            placeholder="Search by title, place, or guide"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full max-w-md"
          />
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredStories.map((story) => (
            <Card
              key={story.id}
              className="relative overflow-hidden shadow-xl bg-base-100 group cursor-pointer rounded-xl hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Carousel */}
              <div className="relative w-full overflow-hidden rounded-t-xl">
                <img
                  src={story.images[currentImage[story.id] ?? 0]}
                  alt={story.title}
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  onClick={() => handlePrev(story.id, story.images.length)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 text-white px-3 py-1 rounded-full hover:bg-opacity-70 transition"
                >
                  ❮
                </button>
                <button
                  onClick={() => handleNext(story.id, story.images.length)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-40 text-white px-3 py-1 rounded-full hover:bg-opacity-70 transition"
                >
                  ❯
                </button>
              </div>

              <Card.Body>
                <Card.Title>{story.title}</Card.Title>
                <p className="text-sm">{story.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge color="primary">{story.place}</Badge>
                  <Badge color="secondary">{story.date}</Badge>
                  <Badge color="primary">{story.cost}</Badge>
                  <Badge color="primary">{story.name}</Badge>
                </div>

                {/* Tooltip on hover */}
                <div className="justify-end mt-3 relative flex">
                  <Button
                    color="primary"
                    size="sm"
                    onMouseEnter={() => setHoveredGuideId(story.id)}
                    onMouseLeave={() => setHoveredGuideId(null)}
                  >
                    See tour-guide profile
                  </Button>

                  {hoveredGuideId === story.id && (
                    <div className="absolute bottom-full mb-2 right-0 w-48 bg-black bg-opacity-90 text-white rounded-lg p-3 shadow-lg flex flex-col items-center">
                      <Avatar
                        src={story.photo}
                        size="lg"
                        shape="circle"
                        className="mb-2"
                      />
                      <h4 className="font-bold text-red-500">{story.name}</h4>
                      <p className="text-sm">{story.role}</p>
                    </div>
                  )}
                </div>
              </Card.Body>
            </Card>
          ))}

          {/* Show message if no results */}
          {filteredStories.length === 0 && (
            <p className="text-center col-span-full text-gray-500">
              No stories found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourGuideProfilePage;
