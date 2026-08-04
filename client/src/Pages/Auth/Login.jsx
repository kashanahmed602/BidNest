import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post('http://localhost:3000/api/v1/loginUser', {
                email,
                password
            });

            alert("User Login Successfully");
            setEmail("");
            setPassword("");

            const { token, user } = response.data;

            console.log(token)
            console.log(user)


            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            if(user.status === "approved"){
            navigate("/dashboard");
            }
            else if(user.status === "pending"){
            navigate("/pending-request");
            }
            else if(user.status === "rejected"){
            navigate("/account-rejected");
            }

        }catch(error){
            alert("User Not Logged In", error)
        }
    }
  return (
    <div className="min-h-screen bg-slate-950 flex">

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
            Join thousands of users buying, selling and bidding
            on exclusive products every day.
          </p>

        </div>

      </div>

      {/* Right Section */}

      <div className="flex-1 flex justify-center items-center px-6">

        <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-2xl">

          <h2 className="text-4xl font-bold text-white text-center mb-2">
            Welcome Back
          </h2>

          <p className="text-slate-400 text-center mb-8">
            Login to your BidNest account
          </p>

          {/* Email */}

          <div className="mb-5">

            <label className="block text-slate-300 mb-2">
              Email
            </label>

            <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl px-4">

              <Mail size={20} className="text-slate-400" />

              <input
                type="email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none p-3 text-white"
              />

            </div>

          </div>

          {/* Password */}

          <div className="mb-3">

            <label className="block text-slate-300 mb-2">
              Password
            </label>

            <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl px-4">

              <Lock size={20} className="text-slate-400" />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-transparent outline-none p-3 text-white"
              />

            </div>

          </div>

          {/* Button */}

          <button onClick={login}
            className="w-full bg-amber-500 hover:bg-amber-600 transition duration-300 text-white font-semibold py-3 rounded-xl"
          >
            Sign In
          </button>

          {/* Signup */}

          <p className="text-center text-slate-400 mt-6">

            Don't have an account?{" "}

            <Link
              to="/signup"
              className="text-amber-400 hover:text-amber-500 font-semibold"
            >
              Sign Up
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;