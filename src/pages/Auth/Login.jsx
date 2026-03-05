import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const axios = useAxiosSecure();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      if (res.data.success) {
        login(res.data);
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    // ব্যাকগ্রাউন্ড কালার পরিবর্তন করে #F5F0E9 দেওয়া হয়েছে যা একদম ফিগমার মতো
    <div className="min-h-screen bg-[#F2EADA] flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-[460px]">
        
        <div className="text-center mb-10">
          <h1 className="text-[36px] md:text-[44px] font-normal text-[#111] leading-tight tracking-tight mb-2">
            Sign in to your account
          </h1>
          <p className="text-[#666] text-sm md:text-base">
            Or <Link to="/register" className="font-bold underline text-black hover:opacity-70 transition-opacity">create a new account</Link>
          </p>
        </div>

        {/* কার্ড ডিজাইন */}
        <div className="bg-white p-8 md:p-12 shadow-[0_2px_15px_rgba(0,0,0,0.03)] rounded-sm">
          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 text-[13px] text-center border border-red-100 italic">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-[2px] text-gray-400 block mb-2.5">
                Email address
              </label>
              <input 
                type="email" 
                required
                placeholder="Enter your email"
                className="w-full border border-gray-200 p-3.5 text-sm rounded-sm focus:outline-none focus:border-black transition-all placeholder:text-gray-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-[2px] text-gray-400 block mb-2.5">
                Password
              </label>
              <input 
                type="password" 
                required
                placeholder="Enter your password"
                className="w-full border border-gray-200 p-3.5 text-sm rounded-sm focus:outline-none focus:border-black transition-all placeholder:text-gray-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between text-[13px]">
              <label className="flex items-center gap-2 text-gray-500 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 accent-black border-gray-300 rounded-none" />
                <span className="group-hover:text-black">Show passwords</span>
              </label>
              <Link to="#" className="font-bold text-black underline hover:opacity-70 transition-opacity">
                Forgot your password?
              </Link>
            </div>

            <button 
              type="submit"
              className="w-full bg-black text-white py-4 font-bold uppercase tracking-[2.5px] text-[13px] hover:bg-[#1a1a1a] transition-all transform active:scale-[0.98] mt-4"
            >
              Sign In
            </button>
          </form>
        </div>
        
        <p className="mt-10 text-center text-[12px] text-gray-400 leading-relaxed px-4">
          By signing in, you agree to our <span className="font-bold text-black underline cursor-pointer">Terms of Service</span> and <span className="font-bold text-black underline cursor-pointer">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default Login;