import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Form({ setErr }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  async function handleLogin(e) {
    try {
      e.preventDefault();
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, {
        email,
        password,
      });
      if (!res.data.token) throw new Error(res.data.msg);
      localStorage.setItem("jwToken", res.data.token);
      localStorage.setItem("userID", res.data.user._id);
      localStorage.setItem("email", res.data.user.email);
      localStorage.setItem("name", res.data.user.name);
      navigate("/connect");
    } catch (err) {
      console.log(err.message);
      setErr(err.message);
    }
  }
  return (
    <form onSubmit={(e) => handleLogin(e)} className=" my-5 relative">
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Email address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5"
          placeholder="suresh@gmail.com"
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5"
          placeholder="•••••••••"
          required
        />
      </div>
      <div className="flex items-start mb-6">
        <p className="ms-2 text-sm font-medium text-gray-900">
          Don't have an account?{" "}
          <NavLink className="text-violet-600 hover:underline" to="/signUp">
            SignUp
          </NavLink>
        </p>
      </div>
      <button
        type="submit"
        className="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Login
      </button>
    </form>
  );
}

export default Form;
