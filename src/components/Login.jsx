import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Login");
  const { setShowLogin, backendURL, setToken, setUser, token } =
    useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const endpoint =
        state === "Login" ? "/api/user/login" : "/api/user/register";
      const payload =
        state === "Login" ? { email, password } : { name, email, password };

      const { data } = await axios.post(backendURL + endpoint, payload);

      if (data.success) {
        await setToken(data.token);
        setUser(data.user);

        localStorage.setItem("token", data.token);
        setShowLogin(false);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form
        onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-xl text-slate-500"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state}
        </h1>
        <p className="text-center mt-2">Sign in to Continue</p>

        {state !== "Login" && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
            <img className="h-5" src={assets.profile_icon} alt="Profile" />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="outline-none text-sm"
              required
              placeholder="Full Name"
            />
          </div>
        )}
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img className="h-3" src={assets.email_icon} alt="Email" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            className="outline-none text-sm"
            required
            placeholder="Email"
          />
        </div>
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img className="h-3" src={assets.lock_icon} alt="Password" />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="outline-none text-sm"
            required
            placeholder="Password"
          />
        </div>

        {state === "Login" ? (
          <>
            <p className="text-sm text-blue-600 my-4 cursor-pointer">
              Forgot Password
            </p>
            <button className="bg-black w-full text-white py-2 rounded-full">
              Login
            </button>
            <p className="mt-2 text-center">
              Don't have an account?
              <span
                onClick={() => setState("Sign Up")}
                className="text-blue-600 cursor-pointer"
              >
                {" "}
                Sign Up
              </span>
            </p>
          </>
        ) : (
          <>
            <button className="bg-black w-full text-white py-2 my-4 rounded-full">
              Sign Up
            </button>
            <p className="mt-2 text-center">
              Already have an account?
              <span
                onClick={() => setState("Login")}
                className="text-blue-600 cursor-pointer"
              >
                {" "}
                Login
              </span>
            </p>
          </>
        )}

        <img
          onClick={() => setShowLogin(false)}
          src={assets.cross_icon}
          alt="Close"
          className="absolute top-5 right-5 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default Login;
