import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import Class from "../styles/login.module.css";
import padLock from "../images/padlock.png";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const navigate = useNavigate();
  const navigateToDashBoard = () => {
    navigate("/dashboard");
  };

  const loginAccess = () => {
    if (email === "default@email.com" && password === "Default@2022") {
      console.log("success");
      navigateToDashBoard();
      let randomString = " ";
      for (let i = 0; i < 12; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * 12));
      }
      localStorage.setItem("access-token", randomString);
    }
  };
  return (
    <>
      <div className={Class.loginSection}>
        <div className={Class.circle}>
          <img src={padLock}></img>
        </div>
        <p>
          Login to visit <span className={Class.spantxt}>dashboard</span>
        </p>
        <form action="">
          <div className={Class.email}>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address*"
            />
          </div>
          <div className={Class.password}>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Password*"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className={Class.loginBtn}
            type="submit"
            onClick={loginAccess}
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
