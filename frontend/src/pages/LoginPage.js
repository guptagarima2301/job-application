import React from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setRole }) => {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    setRole(role);
    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-6xl font-semibold mb-12">Select Login Role</h1>
      <div className="flex flex-col items-center gap-6"> {/* Use gap-6 for spacing */}
        <button
          className="w-80 py-3 rounded-lg text-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-xl"
          onClick={() => handleLogin("user")}
        >
          Login as User
        </button>
        <button
          className="w-80 py-3 rounded-lg text-xl bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-xl"
          onClick={() => handleLogin("admin")}
        >
          Login as Admin
        </button>
      </div>
    </div>
  );
};

export default Login;
