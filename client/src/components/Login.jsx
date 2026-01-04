import React, { useEffect, useState, useCallback } from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import teddyAnimation from "../assets/animated_login_character.riv";
import "../styling/LoginPage.css";
import { NavLink, } from "react-router";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getToken ,setToken,removeToken , isLoggedIn } from "../utils/auth";

export default function LoginPage() {
  const { rive, RiveComponent } = useRive({
    src: teddyAnimation,
    stateMachines: "Login Machine",
    autoplay: true,
  });

  const isChecking = useStateMachineInput(rive, "Login Machine", "isChecking");
  const isHandsUp = useStateMachineInput(rive, "Login Machine", "isHandsUp");
  const trigSuccess = useStateMachineInput(rive, "Login Machine", "trigSuccess");
  const trigFail = useStateMachineInput(rive, "Login Machine", "trigFail");
  const numLook = useStateMachineInput(rive, "Login Machine", "numLook");
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (numLook) {
      numLook.value = 0.5;
    }
  }, [numLook]);

  // 🟢 NEW: Make sure isChecking starts as false
  useEffect(() => {
    if (isChecking) {
      isChecking.value = false;
    }
  }, [isChecking]);

  // Log missing inputs (one time)
  useEffect(() => {
    if (!rive) return;
    const missing = [];
    if (!isChecking) missing.push("isChecking");
    if (!isHandsUp) missing.push("isHandsUp");
    if (!trigSuccess) missing.push("trigSuccess");
    if (!trigFail) missing.push("trigFail");
    if (!numLook) missing.push("numLook");
    if (missing.length) {
      console.warn("Rive inputs missing:", missing.join(", "));
    }
  }, [rive, isChecking, isHandsUp, trigSuccess, trigFail, numLook]);

  // 🟢 Smooth eye movement (lerp)
  const smoothSetNumLook = useCallback(
    (target) => {
      if (!numLook) return;
      const current = numLook.value || 0;
      const smooth = current + (target - current) * 0.2; // smooth transition
      numLook.value = smooth;
    },
    [numLook]
  );

  // 🟢 Email typing → update numLook continuously (range 0–1)
  useEffect(() => {
    if (!numLook || !isChecking) return;
    if (!isChecking.value) return;

    const maxChars = 20;
    const progress = Math.min(email.length / maxChars, 1);
    smoothSetNumLook(progress);
  }, [email, isChecking, numLook, smoothSetNumLook]);

  // 🟢 Email focus/blur
  const handleEmailFocus = () => {
    setTyping(true);
    if (isChecking) isChecking.value = true;
    if (isHandsUp) isHandsUp.value = false;
  };

  const handleEmailBlur = () => {
    setTyping(false);
    if (isChecking) isChecking.value = false;
    // return eyes to center when not typing
    if (numLook) numLook.value = 0.5;
  };

  // Password focus/blur
  const handlePasswordFocus = () => {
    if (isHandsUp) isHandsUp.value = true;
  };
  const handlePasswordBlur = () => {
    if (isHandsUp) isHandsUp.value = false;
  };

  // 🟢 Removed unnecessary mouse move (eye follows email typing only)

  // 🟢 Login logic
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!trigSuccess || !trigFail) {
      console.warn("Trigger inputs not ready.");
      return;
    }

    // if (email === "test@example.com" && password === "1234") {
    //   trigSuccess.fire();
    // } else {
    //   trigFail.fire();
    // }

    const response = await fetch("https://paste-app-backend.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Step 3: Save token in localStorage
      setToken(data.token)
      trigSuccess.fire();
      toast.success("login successful");
      
      navigate("/");
      
      //alert("Login successful!");
      // redirect or update UI
    } else {
      trigFail.fire();
      
      toast.error(data.message);
      
      //alert(data.message || "Login failed");
    }
    
  };


  

  return (
    <div className="login-page-dark">
      <div className="login-card-column">
        <div className="teddy-top">
          <RiveComponent className="rive-animation" />
        </div>

        <form className="form-section-dark" onSubmit={handleLogin}>
          <h2>Welcome to Paste App</h2>
          <p className="subtitle">Login to continue</p>

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onFocus={handleEmailFocus}
            onBlur={handleEmailBlur}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordBlur}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          <button type="submit">Login</button>
          <p className="signup-text">
            Don’t have an account? <span><NavLink to = "/register">Register</NavLink></span>
          </p>
        </form>
      </div>
    </div>
  );
}


