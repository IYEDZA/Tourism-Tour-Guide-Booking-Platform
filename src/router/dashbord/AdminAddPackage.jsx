import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import {
  FaPlusCircle,
  FaGlobeAsia,
  FaStar,
  FaMapMarkedAlt,
  FaUsers,
  FaTags,
  FaCalendarAlt,
  FaInstagramSquare,
  FaImage,
  FaRegEdit,
  FaUserTie,
  FaFileAlt,
} from "react-icons/fa";
import "./StarryBackground.css";
import useAxios from "../../hooks/useAxios";

export default function AdminAddPackage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosInstance = useAxios();

  const onSubmit = async(data) => {

    const  {title, location,price,duration,travelType,maxPeople,rating,guide, images,description,itinerary}= data
  //   // 👇 Convert comma-separated image URLs to image1, image2, ...
  // const imageArray = images.split(",").map(url => url.trim());
  // const imageObject = {};
  // imageArray.forEach((url, index) => {
  //   imageObject[`image${index + 1}`] = url;

  // });

  
// 🔁 Convert to array: [{ image: "..." }, ...]
// const imageArray = images
//   .split(",")
//   .map((url) => ({ image: url.trim() }));

// console.log(imageArray);
const imageArray = images.split(",").map(url => url.trim());


  const itineraryArray  =itinerary
  .split(",")
  .map((url) => ({ day: url.trim() }));

console.log(itineraryArray);

    const packageinfo = {title, location,price,duration,travelType,maxPeople,rating,guide, images:imageArray,description,itinerary:itineraryArray}

    
     const userRes = await axiosInstance.post('/packages', packageinfo);
                console.log(userRes.data);

    console.log("Package submitted:", data);
    Swal.fire({
      title: "Success!",
      text: "Tour Package has been added.",
      icon: "success",
      confirmButtonColor: "#3085d6",
    });
    // reset();
  };

  return (
    <div className="min-h-screen relative bg-stars text-white px-6 py-12 overflow-hidden">
      <div className="absolute inset-0 animate-pulse bg-opacity-5 bg-gradient-to-br from-indigo-400 via-purple-600 to-pink-400 z-0" />

      <motion.h1
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-extrabold text-center text-primary drop-shadow-2xl mb-12 z-10 relative"
      >
        <FaGlobeAsia className="inline mr-3 text-secondary animate-spin-slow" />
        Add New Tour Package
      </motion.h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative z-10 max-w-5xl mx-auto bg-base-200 bg-opacity-90 p-10 rounded-3xl shadow-2xl space-y-6 border border-info animate-borderGlow"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col">
            <span className="flex items-center gap-2">
              <FaRegEdit /> Title
            </span>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="input input-bordered w-full text-black"
              placeholder="Package Title"
            />
            {errors.title && <p className="text-error text-sm mt-1">{errors.title.message}</p>}
          </label>

          <label className="flex flex-col">
            <span className="flex items-center gap-2">
              <FaMapMarkedAlt /> Location
            </span>
            <input
              type="text"
              {...register("location", { required: "Location is required" })}
              className="input input-bordered w-full text-black"
              placeholder="Location"
            />
            {errors.location && <p className="text-error text-sm mt-1">{errors.location.message}</p>}
          </label>

          <label className="flex flex-col">
            <span className="flex items-center gap-2">
              <FaTags /> Price
            </span>
            <input
              type="text"
              {...register("price", { required: "Price is required" })}
              className="input input-bordered w-full text-black"
              placeholder="Price (e.g. $799)"
            />
            {errors.price && <p className="text-error text-sm mt-1">{errors.price.message}</p>}
          </label>

          <label className="flex flex-col">
            <span className="flex items-center gap-2">
              <FaCalendarAlt /> Duration
            </span>
            <input
              type="text"
              {...register("duration", { required: "Duration is required" })}
              className="input input-bordered w-full text-black"
              placeholder="Duration (e.g. 4 days / 3 nights)"
            />
            {errors.duration && <p className="text-error text-sm mt-1">{errors.duration.message}</p>}
          </label>

          <label className="flex flex-col">
            <span className="flex items-center gap-2">
              <FaInstagramSquare /> Travel Type
            </span>
            <input
              type="text"
              {...register("travelType")}
              className="input input-bordered w-full text-black"
              placeholder="Travel Type"
            />
          </label>

          <label className="flex flex-col">
            <span className="flex items-center gap-2">
              <FaUsers /> Max People
            </span>
            <input
              type="number"
              {...register("maxPeople", {
                valueAsNumber: true,
                min: { value: 1, message: "Must be at least 1 person" },
              })}
              className="input input-bordered w-full text-black"
              placeholder="Max People"
            />
            {errors.maxPeople && <p className="text-error text-sm mt-1">{errors.maxPeople.message}</p>}
          </label>

          <label className="flex flex-col">
            <span className="flex items-center gap-2">
              <FaStar /> Rating
            </span>
            <input
              type="number"
              step="0.1"
              max="5"
              {...register("rating", {
                valueAsNumber: true,
                min: { value: 0, message: "Min rating is 0" },
                max: { value: 5, message: "Max rating is 5" },
              })}
              className="input input-bordered w-full text-black"
              placeholder="Rating (1-5)"
            />
            {errors.rating && <p className="text-error text-sm mt-1">{errors.rating.message}</p>}
          </label>

          <label className="flex flex-col">
            <span className="flex items-center gap-2">
              <FaUserTie /> Guide
            </span>
            <input
              type="text"
              {...register("guide")}
              className="input input-bordered w-full text-black"
              placeholder="Guide Name"
            />
          </label>
        </div>

        <label className="flex flex-col">
          <span className="flex items-center gap-2">
            <FaImage /> Images
          </span>
          <input
            type="text"
            {...register("images")}
            className="input input-bordered w-full text-black"
            placeholder="Image URLs (comma separated)"
          />
        </label>

        <label className="flex flex-col">
          <span className="flex items-center gap-2">
            <FaFileAlt /> Description
          </span>
          <textarea
            {...register("description")}
            rows={4}
            className="textarea textarea-bordered w-full text-black"
            placeholder="Tour Description"
          />
        </label>

        <label className="flex flex-col">
          <span className="flex items-center gap-2">
            <FaCalendarAlt /> Itinerary
          </span>
          <textarea
            {...register("itinerary")}
            rows={5}
            className="textarea textarea-bordered w-full text-black"
            placeholder="Itinerary (e.g. Day 1:..., Day 2:...)"
          />
        </label>

        <div className="text-center pt-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="btn btn-primary text-white px-10 text-lg shadow-xl"
          >
            <FaPlusCircle className="mr-2" />
            Submit Package
          </motion.button>
        </div>
      </form>
    </div>
  );
}
