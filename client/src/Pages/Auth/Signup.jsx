import { Link } from "react-router-dom";
import { User, Mail, Phone, Globe, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import axios from 'axios'


const Signup = () => {

    const [countries, setCountries] = useState([]);

useEffect(() => {

    const fetchCountries = async () => {

        const response = await axios.get(
            'http://localhost:3000/api/v1/countries'
        );

        setCountries(response.data.countries);

    };

    fetchCountries();

}, []);


  return (
    <div className="h-screen bg-slate-950 flex overflow-hidden">

      {/* Left Section */}

      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-amber-500 to-orange-600 items-center justify-center p-16">

        <div>

          <h1 className="text-6xl font-extrabold text-white mb-6">
            BidNest
          </h1>

          <p className="text-2xl text-white/90 mb-8">
            Buy • Sell • Bid
          </p>

          <p className="text-white/80 text-lg leading-8 max-w-md">
            Create your BidNest account and start buying,
            selling and participating in exciting auctions.
          </p>

        </div>

      </div>

      {/* Right Section */}

      <div className="flex-1 overflow-y-auto flex justify-center px-6 py-10">

        <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-2xl my-auto">

          <h2 className="text-4xl font-bold text-white text-center mb-2">
            Create Account
          </h2>

          <p className="text-slate-400 text-center mb-8">
            Join BidNest today
          </p>

          {/* Name */}

          <div className="mb-4">

            <label className="block text-slate-300 mb-2">
              Full Name
            </label>

            <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl px-4">

              <User size={20} className="text-slate-400" />

              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full bg-transparent outline-none p-3 text-white placeholder:text-slate-500"
              />

            </div>

          </div>

          {/* Email */}

          <div className="mb-4">

            <label className="block text-slate-300 mb-2">
              Email
            </label>

            <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl px-4">

              <Mail size={20} className="text-slate-400" />

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none p-3 text-white placeholder:text-slate-500"
              />

            </div>

          </div>

          {/* Phone */}

          <div className="mb-4">

            <label className="block text-slate-300 mb-2">
              Phone Number
            </label>

            <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl px-4">

              <Phone size={20} className="text-slate-400" />

              <input
                type="text"
                placeholder="Enter your phone number"
                className="w-full bg-transparent outline-none p-3 text-white placeholder:text-slate-500"
              />

            </div>

          </div>

          {/* Country */}

          <div className="mb-4">

            <label className="block text-slate-300 mb-2">
              Country
            </label>

            <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl px-4">

              <Globe size={20} className="text-slate-400" />

             <select className="w-full bg-transparent outline-none p-3 text-white">

    <option value="">
        Select Country
    </option>

    {countries.map((country) => (

        <option
            key={country}
            value={country}
            className="text-black"
        >
            {country}
        </option>

    ))}

</select>

            </div>

          </div>

          {/* Password */}

          <div className="mb-4">

            <label className="block text-slate-300 mb-2">
              Password
            </label>

            <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl px-4">

              <Lock size={20} className="text-slate-400" />

              <input
                type="password"
                placeholder="Enter password"
                className="w-full bg-transparent outline-none p-3 text-white placeholder:text-slate-500"
              />

            </div>

          </div>

          {/* Confirm Password */}

          <div className="mb-6">

            <label className="block text-slate-300 mb-2">
              Confirm Password
            </label>

            <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl px-4">

              <Lock size={20} className="text-slate-400" />

              <input
                type="password"
                placeholder="Confirm password"
                className="w-full bg-transparent outline-none p-3 text-white placeholder:text-slate-500"
              />

            </div>

          </div>

          {/* Button */}

          <button
            className="w-full bg-amber-500 hover:bg-amber-600 transition-all duration-300 py-3 rounded-xl font-semibold text-white"
          >
            Create Account
          </button>

          {/* Login */}

          <p className="text-center text-slate-400 mt-6">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-amber-400 hover:text-amber-500 font-semibold"
            >
              Sign In
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Signup;