import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Cookies from "js-cookie";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  const cookie = () => {
    Cookies.remove("jwt");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1 className="head-home-info">Home</h1>
      <div className="user-container">
        <h2>
          {" "}
          Welcome <span className="user-name">{user.name} !</span>{" "}
        </h2>
        <h3>
          {" "}
          Mail Id - <span className="user-mail">{user.email}</span>{" "}
        </h3>
        <h3>
          {" "}
          Number - <span className="user-mobile">{user.mobile}</span>{" "}
        </h3>
      </div>
      <div>
        <button className="logout-btn" onClick={cookie}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
