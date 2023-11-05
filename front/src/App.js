import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./Components/Auth/Signup.js";
import "./App.css";
import Signin from "./Components/Auth/Signin.js";
import AllCourse from "./Components/Course/Allcourse.js";
import IndividualCourse from "./Components/Course/IndividualCourse.js";
import Dash from "./Components/Dash/Dash.js";
import ProtectedRoute from "./PrivateRoute.js";
import { useSelector } from "react-redux";

const App = () => {

  const {
    isAuth
   } = useSelector((state) => state.user);
  return (
    <Router>
      <Routes>
       
        <Route element={<ProtectedRoute isAuth={isAuth}/>}>
        <Route path="/courses" element={<AllCourse />} />
        <Route path="/course/:id" element={<IndividualCourse />} />
        <Route path="/dashboard" element={<Dash />} />
        </Route>
        <Route path="*" element={<AllCourse />} />
        <Route path="/" element={<Auth />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
      </Router>
  );
};

export default App;
