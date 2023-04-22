import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import "./index.css";

const Login = () => {
  const navigate = useNavigate();
  const logged = Cookies.get("jwt");

  const toast = useToast({
    position: "top-right",
    containerStyle: {
      color: "#3E795F",
    },
  });

  useEffect(() => {
    if (logged) {
      navigate("/");
    }
  }, [logged, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [load, setLoad] = useState(false);

  const submitted = async (e) => {
    e.preventDefault();
    try {
      setLoad(true);
      const response = await axios.post(
        "https://login-server-kpyt.onrender.com/login",
        {
          email,
          password,
        }
      );
      console.log(response.data);
      toast({
        title: "You are successfully signed in! ✅",
        status: "success",
        variant: "left-accent",
        isClosable: true,
      });
      setError(false);
      setLoad(false);
      Cookies.set("jwt", response.data.token);

      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (error) {
      toast({
        title: "You are entered invalid details ❌",
        status: "error",
        variant: "left-accent",
        isClosable: true,
      });
      console.error(error);
      setError(true);
      setLoad(false);
    }
  };

  return (
    <div>
      <h1 className="page-info">Login Here! </h1>
      <div className="register-card">
        <form className="form-container" onSubmit={submitted}>
          <label className="label" htmlFor="email">
            {" "}
            Email{" "}
          </label>
          <input
            type="email"
            className="input"
            placeholder="Enter Email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label className="label" htmlFor="password">
            {" "}
            Password{" "}
          </label>
          <input
            type="password"
            className="input"
            placeholder="Enter Password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          {error && <p className="error"> Invalid Username or Password. </p>}
          {load && (
            <div className="loader">
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#4fa94d"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            </div>
          )}
          <input type="submit" className="btn" />
        </form>
        <p>
          {" "}
          Haven't{" "}
          <Link to="/register" className="register-label">
            registered{" "}
          </Link>{" "}
          yet{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
