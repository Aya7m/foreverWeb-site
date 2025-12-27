import axios from "axios";
import React from "react";
import { useState } from "react";
import { backend_url } from "../App";
import { toast } from "react-hot-toast";
const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backend_url + "/api/user/admin", {
        email,
        password,
      });
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  };
  console.log(email,password);
  
  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <form
        onSubmit={handelSubmit}
        className="flex flex-col items-center justify-center gap-2 border border-gray-300 p-6 px-8 py-6 max-w-md shadow-md rounded-lg"
      >
        <h2 className="font-semibold">Admin Login</h2>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="p-2 w-full border border-gray-300 outline-none"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="p-2 w-full border border-gray-300 outline-none"
        />
        <button
          type="submit"
          className="px-4 py-1.5 border border-amber-100 rounded-md bg-blue-400 text-white my-3 cursor-pointer hover:bg-blue-600 transition-all duration-300 w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
