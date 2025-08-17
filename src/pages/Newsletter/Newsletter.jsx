import React, { useState } from "react";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// toast.configure();

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }
    // Here you can call your API to subscribe
    toast.success("Successfully Subscribed!", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });
    setEmail("");
  };

  return (
    <section className="mt-20 bg-base-200 py-16 px-4 md:px-20 rounded-lg shadow-lg">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-3xl font-bold mb-4 ">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-md md:text-lg text-gray-700 mb-8">
          Stay updated with our latest news, offers, and tips. Join our mailing
          list and never miss an update!
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col md:flex-row justify-center items-center gap-4"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered input-primary w-full md:w-80"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary w-full md:w-auto">
            Subscribe
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
