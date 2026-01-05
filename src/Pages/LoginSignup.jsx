import React, { useState } from 'react';
import axios from "axios";
import {baseUrlFun} from "../Base-url"
import './Css/Loginsignup.css';
import { useNavigate } from 'react-router-dom';

const Base_url = baseUrlFun();

const LoginSignup = () => {

  const [isSignup, setIsSignup] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role:""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
const navigate = useNavigate();
  const toggleForm = () => {
    setIsSignup(prev => !prev);
    setFormData({ name: "", username: "", email: "", password: "",role:"" });
  };

  const handleSubmit = async () => {
    try {
      let response;

      // ------------------ SIGNUP ------------------
      if (isSignup) {
        response = await axios.post(`${Base_url}/api/CreateUser`, {
          name: formData.name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role
        });

        console.log("Signup Success:", response.data);
        alert("Signup Successful!");

        setIsSignup(false); // switch to login
    
      } 
      
      // ------------------ LOGIN ------------------
      else {
        response = await axios.post(`${Base_url}/api/loginwithuser`, {
          username: formData.username,
          password: formData.password
        });

        console.log("Login Success:", response.data);
        alert("Login Successful!");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user._id);
        localStorage.setItem("logout", response.data.user.isLogout);
        localStorage.setItem("role", response.data.user.role);

        
      // ROLE BASED REDIRECT
      const userRole = response.data.user.role;

      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }

    } catch (error) {
      console.error("API Error:", error.response?.data || error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };
 

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">

        <h1>{isSignup ? "Signup" : "Login"}</h1>

        <div className="loginsignup-fields">

          {/* NAME FIELD (SIGNUP ONLY) */}
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
          )}

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />

          {/* EMAIL (SIGNUP ONLY) */}
          {isSignup && (
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

            
      <input
            type="text"
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
          /> 
        </div>

        <button onClick={handleSubmit}>Continue</button>

        <p className="loginsigup-login">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <span onClick={toggleForm}>
            {isSignup ? " Login here" : " Signup"}
          </span>
        </p>

        <div className="loginsignup-agree">
          <input type="checkbox" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

      </div>
    </div>
  );
};

export default LoginSignup;
