import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signinUser } from "../../Reducers/auth.js";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signinUser(formData));
  };

  const { successsignin, msgsignin } = useSelector((state) => state.user);
  const navigate = useNavigate();


  useEffect(() => {
  
    if (successsignin) {
      // toast.success("Congratualtion");
      navigate("/courses");
    }
  }, [successsignin]);

  return (
    <div className="flex bg-gray-500 justify-center w-screen items-center h-screen">
      <div className="h-3/4 w-1/3 rounded border-2 bg-gray-800  border-gray-500">
        <span className="text-gray-300 text-3xl flex justify-center items-center w-full p-2 bg-gray-900">
          Signin Here
        </span>
        <form
          className="w-full bg-gray-800 px-7 py-7 mx-auto flex gap-4 flex-col mt-3"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 flex flex-col gap-2">
            <label
              htmlFor="email"
              className="block text-white text-xl font-semibold outline-none"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 text-white bg-slate-800 rounded border border-gray-500"
            />
          </div>

          <div className="mb-4 flex flex-col gap-2">
            <label
              htmlFor="password"
              className="block text-white text-xl font-semibold outline-none"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 text-white bg-slate-800 rounded border border-gray-500"
            />
          </div>
          <button className="mt-14 p-2 bg-red-600 text-white rounded font-serif text-3xl mx-auto   hover:bg-red-900">
            Signin
          </button>
          <span className="mx-auto text-white">
            Don't have an account?{" "}
            <button onClick={() => navigate("/")} className="text-red-400">
              Sign up
            </button>
          </span>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signin;
