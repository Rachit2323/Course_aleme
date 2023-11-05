import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../Reducers/auth.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const dispatch = useDispatch();
  const navigate=useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signupUser(formData));
     

  };

  const {
    msgsignup,
    successsignup,
    signupstate,
    signupcount,
  } = useSelector((state) => state.user);

  useEffect(() => {

    if (successsignup && signupstate === 201) {

      toast.success("Check Your mail to verify the account");
    } else if (!successsignup && signupstate !== 201 && msgsignup) {
      toast.error(msgsignup);
    }
  }, [successsignup, signupstate, msgsignup, signupcount]);



  return (
    <div className="flex flex-col bg-gray-500 justify-center items-center min-h-screen">
      <div className="w-full max-w-md px-4">
        <h1 className="text-3xl text-center text-gray-300 bg-gray-900 py-2 rounded-t-md">
          Signup Here
        </h1>
        <form className="bg-gray-800 rounded-b-md p-4" onSubmit={handleSubmit}>
         
          <div className="mb-4 flex flex-col gap-3">
            <label htmlFor="name" className="text-white text-xl font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 text-white bg-slate-800 rounded border border-gray-500"
            />
          </div>

          <div className="mb-4 flex flex-col gap-3">
            <label htmlFor="email" className="text-white text-xl font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 text-white bg-slate-800 rounded border border-gray-500"
            />
          </div>

          <div className="mb-4 flex flex-col gap-3">
            <label
              htmlFor="password"
              className="text-white text-xl font-semibold"
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

          <div className="w-full flex flex-col gap-4">
            <button className="p-2 w-full bg-red-600 text-white rounded font-serif text-3xl mx-auto hover:bg-red-900">
              Signup
            </button>
            <span className="text-white text-center mt-4">
              If you already have an account?{" "}
              <button onClick={() => navigate("/signin")} className="text-red-400">
                Sign in
              </button>
            </span>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
