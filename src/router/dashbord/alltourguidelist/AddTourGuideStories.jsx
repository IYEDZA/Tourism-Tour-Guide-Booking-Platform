import { use } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import {
  FaPlus,
  FaImage,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaDollarSign,
  FaTrashAlt,
  FaBook,
} from "react-icons/fa";
import Swal from "sweetalert2";
// import useAxios from "../../hooks/useAxios";
// import Authcontext from "../../context/Authcontext";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import Authcontext from "../../../context/Authcontext";

export default function AddTourGuideStories() {
  const { user } = use(Authcontext);
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      stories: [
        {
          title: "",
          highlight: "",
          description: "",
          date: "",
          place: "",
          cost: "",
          image: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "stories",
  });

  const { data: users = [] } = useQuery({
    queryKey: ["my-profile", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const currentUser = users[0] || {};
  const { photo, role, experience, location, languages, phone, _id: userid, about, bio,availability,
 
specialty} = currentUser;

  const onSubmit = async (formData) => {
    const storyData = {
      name: user.displayName,
      email: user.email,
      photo,
      role,
      experience,
      location,
      languages,
      phone,
      
     availability,
     
      specialty,


      userid,
      about,
      bio,
      social: { facebook: "", instagram: "" },
      stories: formData.stories.map((story) => ({
        ...story,
        createdAt: new Date(),
      })),
    };

    try {
      const res = await axiosInstance.post("/stories", storyData);
      Swal.fire("✅ Success!", "All stories submitted successfully.", "success");
      reset();
      // navigate("/dashboard/manage-stories");
    } catch (error) {
      console.error(error);
      Swal.fire("❌ Error", "Something went wrong while submitting stories.", "error");
    }
  };

  return (
    <div className="min-h-screen  px-6 py-20 ">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-5xl mx-auto  p-10 rounded-2xl shadow-2xl "
      >
        <h2 className="text-3xl font-bold text-center  mb-10 animate-pulse tracking-wide">
          <FaBook className="inline-block mr-2 " /> Add Tour Guide Stories
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="border p-6 rounded-xl relative 20 backdrop-blur-md shadow-md hover:shadow-accent/30 hover:scale-[1.01] transition-all"
            >
              <h3 className="text-xl font-bold mb-5 ">📘 Story {index + 1}</h3>

              <input
                {...register(`stories.${index}.title`, { required: true })}
                placeholder="✍️ Title"
                className="input input-bordered w-full mb-4"
              />

              <input
                {...register(`stories.${index}.highlight`)}
                placeholder="⭐ Highlight (optional)"
                className="input input-bordered w-full mb-4"
              />

              <textarea
                {...register(`stories.${index}.description`, { required: true })}
                placeholder="📖 Description"
                className="textarea textarea-bordered w-full mb-4 "
              />

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="label  font-bold">
                    <FaMapMarkerAlt className="mr-1" /> Place
                  </label>
                  <input
                    {...register(`stories.${index}.place`, { required: true })}
                    placeholder="e.g. Sylhet, Sundarbans"
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="label  font-bold">
                    <FaCalendarAlt className="mr-1" /> Date
                  </label>
                  <input
                    type="date"
                    {...register(`stories.${index}.date`, { required: true })}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="label  font-bold">
                    <FaDollarSign className="mr-1" /> Cost
                  </label>
                  <input
                    type="number"
                    {...register(`stories.${index}.cost`, { required: true })}
                    placeholder="e.g. 500"
                    className="input input-bordered w-full "
                  />
                </div>
                <div>
                  <label className="label  font-bold">
                    <FaImage className="mr-1" /> Image URL
                  </label>
                  <input
                    type="url"
                    {...register(`stories.${index}.image`, { required: true })}
                    placeholder="https://example.com/image.jpg"
                    className="input input-bordered w-full "
                  />
                </div>
              </div>

              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="btn btn-sm btn-primary absolute top-2 right-2"
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
                  highlight: "",
                  description: "",
                  place: "",
                  date: "",
                  cost: "",
                  image: "",
                })
              }
              className="btn btn-outline btn-primary hover:scale-105 duration-200"
            >
              <FaPlus className="mr-2" /> Add Another Story
            </button>
          </div>

          <div className="text-center mt-10">
            <button
              type="submit"
              className="btn btn-primary px-10 py-3 text-lg font-bold  shadow-lg hover:scale-105 transition-all"
            >
              🚀 Submit All Stories
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
