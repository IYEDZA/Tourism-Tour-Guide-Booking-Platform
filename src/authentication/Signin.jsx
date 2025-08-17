import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';
import { ToastContainer, toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import loginAnimation from '../assets/Animation - 1751914780115.json';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
import Authcontext from '../context/Authcontext';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import { Link, useLocation, useNavigate } from 'react-router';

const Signin = () => {
  const { register, handleSubmit, getValues } = useForm();
  const { signInoldUser, googleSingIn } = useContext(Authcontext);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (data) => {
    if (!data.terms) {
      setErrorMessage('Please accept our condition');
      toast.error('Please accept our condition!');
      return;
    }

    setErrorMessage('');

    signInoldUser(data.email, data.password)
      .then(() => {
        toast.success('Login successful!');
        navigate(location.state || '/');
      })
      .catch(() => {
        setErrorMessage('Wrong password or email');
        toast.error('Something went wrong!');
      });
  };

  const handleGoogleLogin = () => {
    googleSingIn()
      .then(() => {
        toast.success('Google login successful!');
        navigate(location.state || '/');
      })
      .catch(() => toast.error('Something went wrong!'));
  };

  const handleForgetPassword = () => {
    const email = getValues('email');
    if (!email) {
      toast.error('Please enter your email first!');
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => alert('Password reset email sent'))
      .catch((error) => {
        setErrorMessage(error.message);
        toast.error('Something went wrong!');
      });
  };

  return (
    <>
      <Helmet>
        <title>Login | The Tourist Guide</title>
      </Helmet>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="min-h-screen flex items-center justify-center  p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className=" bg-opacity-90 backdrop-blur-md shadow-2xl rounded-3xl p-10 w-full max-w-4xl flex flex-col md:flex-row gap-10 border-l-4 border-r-4 border-gradient-to-b from-blue-400 to-pink-400 animate-glow"
        >
          <div className="hidden md:block w-1/2">
            <Lottie animationData={loginAnimation} loop={true} className="h-full" />
          </div>

          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 animate-text">
              Login To Explore Tours ✈️
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
              <div className="form-control">
                <label className="label font-semibold flex items-center gap-2 text-gray-700">
                  <FaEnvelope /> Email
                </label>
                <input
                  {...register('email', { required: true })}
                  type="email"
                  placeholder="Enter email"
                  className="input input-bordered"
                />
              </div>

              <div className="form-control relative">
                <label className="label font-semibold flex items-center gap-2 text-gray-700">
                  <FaLock /> Password
                </label>
                <input
                  {...register('password', { required: true })}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  className="input input-bordered"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-10 cursor-pointer text-blue-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="form-control">
                <label className="cursor-pointer flex items-center gap-2 ">
                  <input type="checkbox" {...register('terms')} className="checkbox checkbox-sm  bg-amber-300" />
                  Accept Terms & Conditions
                </label>
              </div>

              <div className="form-control">
                <button type="submit" className="btn btn-primary w-full">
                  Login
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleForgetPassword}
                  className="link link-hover text-sm text-primary"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="btn w-full border border-gray-300"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                Login with Google
              </button>

              <p className="text-center text-sm mt-4">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-500 font-semibold">
                  Register Here
                </Link>
              </p>

              {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
            </form>
            <Link to='/' className=' '> <button className='btn btn-primary mt-10 ml-32'>back home</button></Link>
            
          </div>
          
          
        </motion.div>

       
      </div>

      <style>{`
        .animate-glow {
          animation: glowBorder 3s ease-in-out infinite alternate;
        }

        @keyframes glowBorder {
          0% { filter: brightness(1); }
          100% { filter: brightness(1.4); }
        }

        .animate-text {
          background-size: 200% auto;
          animation: shineText 5s linear infinite;
        }

        @keyframes shineText {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </>
  );
};

export default Signin;
