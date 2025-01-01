import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
function Form({ setErr }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCpassword] = useState("");
  const navigate = useNavigate();
  async function handleSignUp(e) {
    try {
      e.preventDefault();
      let name = firstName + " " + lastName;
      // console.log(name);
      if (password != cPassword) throw new Error("Passwords do not match");
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/signUp`, {
        email,
        password,
        name,
      });
      if (res.data.status === "Fail") {
        throw new Error(res.data.msg);
      }
      localStorage.setItem("jwToken", res.data.token);
      localStorage.setItem("userID", res.data.user._id);
      localStorage.setItem("email", res.data.user.email);
      localStorage.setItem("name", res.data.user.name);
      navigate("/connect");
      console.log(res.data.token);
    } catch (err) {
      setErr("Email already exists, LogIn");
    }
  }
  return (
    <form onSubmit={(e) => handleSignUp(e)} className=" my-5 ">
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="first_name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            First name
          </label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            id="first_name"
            className="bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5"
            placeholder="Suresh"
            required
          />
        </div>
        <div>
          <label
            htmlFor="last_name"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Last name
          </label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            id="last_name"
            className="bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5"
            placeholder="Kumar"
            required
          />
        </div>
      </div>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Email address
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          className="bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5"
          placeholder="Suresh@gmail.com"
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Password
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          className="bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5"
          placeholder="•••••••••"
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="confirm_password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Confirm password
        </label>
        <input
          value={cPassword}
          onChange={(e) => setCpassword(e.target.value)}
          type="password"
          id="confirm_password"
          className="bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5"
          placeholder="•••••••••"
          required
        />
      </div>
      <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
          <input
            id="remember"
            type="checkbox"
            value=""
            className="w-4 h-4 border  rounded bg-gray-50 focus:ring-3 focus:ring-violet-300"
            required
          />
        </div>
        <label
          htmlFor="remember"
          className="ms-2 mr-2 text-sm font-medium text-gray-900"
        >
          I agree with the{" "}
          <a
            // href="#"
            className="text-violet-600 hover:underline"
          >
            terms and conditions
          </a>
          .
        </label>
        <p className="ms-2 text-sm font-medium text-gray-900">
          Already have an account?{" "}
          <NavLink className="text-violet-600 hover:underline " to="/login">
            Login
          </NavLink>
        </p>
      </div>
      <button
        type="submit"
        className="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Submit
      </button>
    </form>
  );
}

export default Form;
