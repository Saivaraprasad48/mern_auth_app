import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";
import { useToast } from "@chakra-ui/react";
import Cookies from "js-cookie";
import "./index.css";

const Register = () => {
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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cfpassword, setCfpassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState(false);
  const [load, setLoad] = useState(false);
  const [pswdError, setPswdError] = useState(false);

  const submitted = async (e) => {
    e.preventDefault();
    if (pswdError) {
      setPswdError(true);
    } else {
      try {
        setLoad(true);
        const response = await axios.post(
          "https://login-server-kpyt.onrender.com/register",
          {
            name,
            email,
            password,
            mobile,
          }
        );
        console.log(response.data);
        setError(false);
        setLoad(false);
        navigate("/login");
        toast({
          title: "Your registration successfully done! Please Login ✅",
          status: "success",
          variant: "left-accent",
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Email is already exist! Try to sign up with new one ❌",
          status: "error",
          variant: "left-accent",
          isClosable: true,
        });
        console.log("Error", error.message);
        setLoad(false);
        setError(true);
      }
    }
  };

  return (
    <div>
      <h1 className="page-info">Register Here! </h1>
      <div className="register-card ">
        <form className="form-container " onSubmit={submitted}>
          <label className="label" htmlFor="username">
            {" "}
            UserName{" "}
          </label>
          <input
            type="text"
            className="input"
            placeholder="Enter Username"
            id="username"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
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
          <br />
          <label className="label" htmlFor="cfpassword">
            {" "}
            Re-Enter Password{" "}
          </label>
          <input
            type="text"
            className="input"
            placeholder="Re-enter Password"
            id="cfpassword"
            required
            value={cfpassword}
            onChange={(e) => setCfpassword(e.target.value)}
            onBlur={() => {
              if (password !== cfpassword) {
                setPswdError(true);
              } else {
                setPswdError(false);
              }
            }}
          />
          {pswdError && <p className="error mn"> Passwords should be same. </p>}
          <br />
          <label className="label" htmlFor="mobile">
            {" "}
            Mobile{" "}
          </label>
          <input
            type="number"
            className="input"
            placeholder="Enter Mobile Number"
            id="mobile"
            required
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          {error && <p className="error"> Email is already used. </p>}
          {load && (
            <div className="loader">
              <ThreeCircles
                height="100"
                width="100"
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
              />
            </div>
          )}
          <input type="submit" className="btn" />
        </form>
        <p>
          {" "}
          Already have an account!{" "}
          <Link to="/login" className="register-label">
            {" "}
            Login{" "}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
