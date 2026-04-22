import React, { useEffect, useState, useCallback } from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import teddyAnimation from "../assets/animated_login_character.riv";
import "../styling/LoginPage.css";
import { NavLink ,  } from "react-router";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../api/api";

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
  const  navigate = useNavigate();
  const [UserName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmpassword] = useState("");
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

    const maxChars = 30;
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

    try {
      const response = await api.post("/auth/register", { UserName, email, password, ConfirmPassword });
      const data = response.data;

      localStorage.setItem("token", data.token);
      trigSuccess.fire();
      toast.success("SignUp successful!");
      navigate("/");
    } catch (error) {
      trigFail.fire();
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
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
          <p className="subtitle">Sign Up to continue</p>

          <label>Username</label>
          <input
            type="name"
            placeholder="Enter your Username"
            value={UserName}
            onFocus={handleEmailFocus}
            onBlur={handleEmailBlur}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />

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
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={ConfirmPassword}
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordBlur}
            onChange={(e) => setConfirmpassword(e.target.value)}
            autoComplete="current-password"
          />

          <button type="submit">Sign Up</button>
          <p className="signup-text">
            Already have an account? <span><NavLink to = "/login">Login</NavLink></span>
          </p>
        </form>
      </div>
    </div>
  );
}