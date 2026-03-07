import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import {
  ShieldCheck,
  Eye,
  EyeOff,
  Loader2,
  User as UserIcon,
  Lock,
} from "lucide-react";
import Swal from "sweetalert2";

const UserSettings = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState({ old: false, new: false });

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      return Swal.fire({
        icon: "error",
        title: "Mismatch",
        text: "New passwords do not match!",
        confirmButtonColor: "#000",
      });
    }

    setLoading(true);
    try {
      const response = await axios.patch(
        "https://seoul-sage.vercel.app/api/auth/change-password",
        {
          email: user?.email,
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        },
      );

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Security Updated",
          text: "Your password has been changed successfully.",
          confirmButtonColor: "#000",
        });
        setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Update failed",
        confirmButtonColor: "#000",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 md:px-12 text-left animate-in fade-in duration-500">
      {/* Header: Dashboard Overview Style */}
      <div className="mb-10">
        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
          Account Settings
        </h1>
        <div className="h-1 w-12 bg-[#CCAF91] mt-2"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side: User Info (Order Summary Style) */}
        <div className="bg-white border border-gray-200 p-8 rounded-sm shadow-sm">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-20 h-20 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center">
              <UserIcon size={32} className="text-gray-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{user?.name}</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">
                Verified Member
              </p>
            </div>
            <div className="w-full pt-6 border-t border-gray-50 mt-4">
              <div className="flex justify-between text-[11px] font-bold uppercase tracking-tighter text-gray-500 mb-2">
                <span>Email Address</span>
              </div>
              <p className="text-sm font-semibold text-gray-800 truncate w-full">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Change Password (Shipping Info Style) */}
        <div className="lg:col-span-2 bg-white border border-gray-200 p-8 md:p-10 rounded-sm shadow-sm">
          <div className="flex items-center gap-3 mb-8 border-b border-gray-50 pb-5">
            <ShieldCheck size={20} className="text-[#884D5D]" />
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-gray-800">
              Security & Password
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Old Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPass.old ? "text" : "password"}
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  required
                  placeholder="Enter current password"
                  className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-black outline-none transition-all text-sm font-medium"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPass({ ...showPass, old: !showPass.old })
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-black"
                >
                  {showPass.old ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* New Password Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                  New Password
                </label>
                <input
                  type={showPass.new ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                  placeholder="Min. 8 characters"
                  className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-black outline-none transition-all text-sm font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPass.new ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Repeat new password"
                    className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-black outline-none transition-all text-sm font-medium"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPass({ ...showPass, new: !showPass.new })
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-black"
                  >
                    {showPass.new ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button: Full Black Style */}
            <div className="pt-6 border-t border-gray-50">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-12 bg-black text-white py-4 text-[11px] font-black uppercase tracking-[0.2em]  transition-all flex items-center justify-center gap-3 disabled:bg-gray-300"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Updating...
                  </>
                ) : (
                  "Save Password Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
