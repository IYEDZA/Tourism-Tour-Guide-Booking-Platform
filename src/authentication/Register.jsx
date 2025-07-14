import React from 'react';
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";

import { Helmet } from "react-helmet";
import { FaUser, FaEnvelope, FaImage, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

import { Link, useLocation, useNavigate } from 'react-router';
import Authcontext from '../context/Authcontext';
import useAxios from '../hooks/useAxios';


const Register = () => {

      const { createUser, setUser, updateuser } = useContext(Authcontext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
   const axiosInstance = useAxios();
   const location = useLocation();
    
     const from = location.state?.from || '/';


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!data.agree) {
      toast.error("❌ Please accept our terms & conditions");
      return;
    }

    const { name, email, password, photo } = data;

    createUser(email, password)
      .then(async(result) => {
        const user = result.user;
        console.log(result.user)
         // update userinfo in the database
                const userInfo = {
                     name :name,
                     email: email,
                     photo:photo,
                    role: 'tourist', // default role
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString()
                }

                const userRes = await axiosInstance.post('/users', userInfo);
                console.log(userRes.data);

        
    // update user profile in firebase...

        updateuser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            toast.success("✅ Registered Successfully!");
            reset();
            // navigate here .....
            
             navigate(from);
          })
          .catch((err) => {
            toast.error("❌ Profile update failed");
            console.error(err.message);
          });
      })
      .catch((err) => {
        toast.error("❌ Registration failed");
        console.error(err.message);
      });
  };
    return (
        <div className='mb-40'>
    <Helmet>
        <title>Register | The Tourist Guide</title>
      </Helmet>

      <ToastContainer />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-white to-cyan-100 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-2xl bg-white bg-opacity-90 backdrop-blur-xl shadow-2xl rounded-3xl px-10 py-10 overflow-hidden border-4 border-transparent"
        >
          {/* Side glow borders */}
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 via-cyan-400 to-green-400 animate-glow z-10" />
          <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-yellow-500 via-pink-400 to-red-400 animate-glow z-10" />

          <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-transparent bg-clip-text animate-text">
            Register To Begin Your Tour 🌍
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 z-20 relative">
            {/* Name */}
            <div className="form-control">
              <label className="label text-md font-semibold text-gray-700 flex items-center gap-2">
                <FaUser /> Full Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="e.g., Steven Jobs"
                className="input input-bordered"
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            {/* Photo URL */}
            <div className="form-control">
              <label className="label text-md font-semibold text-gray-700 flex items-center gap-2">
                <FaImage /> Photo URL
              </label>
              <input
                type="text"
                {...register("photo")}
                placeholder="https://photo-url.com/image.jpg"
                className="input input-bordered"
              />
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label text-md font-semibold text-gray-700 flex items-center gap-2">
                <FaEnvelope /> Email Address
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="you@example.com"
                className="input input-bordered"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label text-md font-semibold text-gray-700 flex items-center gap-2">
                <FaLock /> Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d).{6,}$/,
                      message: "Minimum 6 characters with letters & numbers",
                    },
                  })}
                  placeholder="Strong password"
                  className="input input-bordered w-full"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 cursor-pointer text-blue-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Agree Checkbox */}
            <div className="form-control">
              <label className="cursor-pointer flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" {...register("agree")} className="checkbox checkbox-sm" />
                I agree to the Terms & Conditions
              </label>
            </div>

            <button type="submit" className="btn btn-primary w-full mt-3">
              Register Now
            </button>

            <p className="text-sm text-center mt-4">
              Already registered?{" "}
              <Link className="text-blue-600 font-semibold" to="/login">
                Login here
              </Link>
            </p>
          </form>
        </motion.div>
      </div>

      {/* Animation CSS */}
      <style>
        {`
          .animate-glow {
            animation: glowBorder 4s ease-in-out infinite alternate;
          }

          @keyframes glowBorder {
            0% { filter: brightness(1); }
            100% { filter: brightness(1.5); }
          }

          .animate-text {
            background-size: 200% auto;
            animation: shineText 3s linear infinite;
          }

          @keyframes shineText {
            0% { background-position: 0% center; }
            100% { background-position: 200% center; }
          }
        `}
      </style>
        </div>
    );
};

export default Register;