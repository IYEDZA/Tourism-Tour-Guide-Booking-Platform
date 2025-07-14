import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
import {
  FaPlus,
  FaTrashAlt,
  FaBook,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaDollarSign,
  FaImage,
} from "react-icons/fa";

export default function UpdateTouristStories() {
  const { id } = useParams(); // story document ID
  const axiosInstance = useAxios();

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: { stories: [] },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "stories",
  });


//   const res =  axiosInstance.get(`/stories/${id}`);
    //   return res.data;

//   useEffect(() => {
//     if (id) {
//       axiosInstance.get(`/stories/${id}`).then((res) => {
//         replace(res.data.stories || []);
//       });
//     }
//   }, [id, axiosInstance, replace]);

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.patch(`/stories/${id}`, {
        stories: data.stories.map((story) => ({
          ...story,
          updatedAt: new Date(),
        })),
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire("✅ Success!", "Stories updated successfully.", "success");
      } else {
        Swal.fire("ℹ️ No changes", "No updates were made.", "info");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("❌ Error", "Failed to update stories.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 px-6 py-20 text-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto bg-base-100 p-10 rounded-xl shadow-2xl border border-accent animate-pulse-slow"
      >
        <h2 className="text-4xl font-extrabold text-center text-accent mb-10 animate-pulse tracking-wide">
          <FaBook className="inline-block mr-2 text-accent-content" /> Update Tourist Stories
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border border-info p-6 rounded-xl relative bg-black/20 backdrop-blur-lg shadow-md hover:shadow-accent/30 hover:scale-[1.01] transition-all duration-300"
            >
              <h3 className="text-xl font-bold mb-5 text-info">📘 Story {index + 1}</h3>

              <input
                {...register(`stories.${index}.title`, { required: true })}
                placeholder="✍️ Title"
                className="input input-bordered w-full mb-4 text-black"
              />
              <textarea
                {...register(`stories.${index}.description`, { required: true })}
                placeholder="📖 Description"
                className="textarea textarea-bordered w-full mb-4 text-black"
              />

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label text-info font-bold">
                    <FaMapMarkerAlt className="mr-1" /> Place
                  </label>
                  <input
                    {...register(`stories.${index}.place`, { required: true })}
                    placeholder="e.g. Sylhet"
                    className="input input-bordered w-full text-black"
                  />
                </div>
                <div>
                  <label className="label text-info font-bold">
                    <FaCalendarAlt className="mr-1" /> Date
                  </label>
                  <input
                    type="date"
                    {...register(`stories.${index}.date`, { required: true })}
                    className="input input-bordered w-full text-black"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="label text-info font-bold">
                    <FaDollarSign className="mr-1" /> Cost
                  </label>
                  <input
                    type="number"
                    {...register(`stories.${index}.cost`, { required: true })}
                    placeholder="$"
                    className="input input-bordered w-full text-black"
                  />
                </div>
                <div>
                  <label className="label text-info font-bold">
                    <FaImage className="mr-1" /> Image URL
                  </label>
                  <input
                    type="url"
                    {...register(`stories.${index}.image`, { required: true })}
                    placeholder="https://example.com/story.jpg"
                    className="input input-bordered w-full text-black"
                  />
                </div>
              </div>

              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="btn btn-sm btn-error absolute top-2 right-2"
                >
                  <FaTrashAlt /> Remove
                </button>
              )}
            </motion.div>
          ))}

          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() =>
                append({
                  title: "",
                  description: "",
                  place: "",
                  date: "",
                  cost: "",
                  image: "",
                })
              }
              className="btn btn-outline btn-info hover:scale-105 duration-200"
            >
              <FaPlus className="mr-2" /> Add Story
            </button>
          </div>

          <div className="text-center mt-10">
            <button
              type="submit"
              className="btn btn-accent px-10 py-3 text-lg font-bold text-white shadow-lg hover:scale-105 transition-all"
            >
              🚀 Update Stories
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
