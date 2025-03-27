import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, LogOut, User } from "lucide-react";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/auth/info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setUserData(response.data);
        setError("");
      } catch (err) {
        setError("Failed to fetch profile. Please login again.");
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl border border-gray-300">
        <div className="bg-gradient-to-r from-black to-gray-800 px-8 py-6 border-b border-gray-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-black rounded-xl">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">User Profile</h1>
              <p className="text-gray-300 mt-1">Personal information & settings</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          {loading ? (
            <div className="animate-pulse space-y-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-300 rounded-full w-3/4 mb-4" />
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-100 p-6 rounded-xl border border-red-300">
              <p className="text-red-600 text-center text-lg">{error}</p>
              <Button
                onClick={() => navigate("/login")}
                className="mt-4 w-full bg-red-500 text-white py-3 rounded-xl font-semibold transition-all"
              >
                Go to Login
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <InfoCard label="Name" value={userData?.name} icon={<User size={18} />} />
                <InfoCard label="Email" value={userData?.email} />
                <InfoCard label="Date of Birth" 
                  value={userData?.dob && new Date(userData.dob).toLocaleDateString()} />
                <InfoCard label="Gender" value={userData?.gender} />
              </div>
              
              <div className="space-y-4">
                <InfoCard label="Height" value={userData?.height && `${userData.height} cm`} />
                <InfoCard label="Weight" value={userData?.weight && `${userData.weight} kg`} />
                <InfoCard label="Blood Group" value={userData?.bloodGroup} />
                <InfoCard label="Joined" 
                  value={userData?.createdAt && new Date(userData.createdAt).toLocaleDateString()} />
              </div>

              <div className="md:col-span-2 space-y-4 pt-8 border-t border-gray-300">
                <Button
                  onClick={handleBackToHome}
                  className="w-full bg-black hover:bg-gray-900 text-white py-4 rounded-xl font-semibold transition-all flex gap-3 items-center justify-center"
                >
                  <Home className="w-5 h-5" />
                  Dashboard Home
                </Button>
                <Button
                  onClick={handleLogout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-semibold transition-all flex gap-3 items-center justify-center"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out Account
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const InfoCard = ({ label, value, icon }) => (
  <div className="bg-gray-100 p-4 rounded-xl border border-gray-300 hover:border-gray-400 transition-all">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-gray-600 text-sm">
        {icon}
        <span>{label}</span>
      </div>
    </div>
    <p className="text-gray-900 text-lg font-medium mt-2">
      {value || <span className="text-gray-500">Not specified</span>}
    </p>
  </div>
);