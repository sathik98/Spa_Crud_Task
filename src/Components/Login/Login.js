import React, { useState, useEffect } from "react";
import TablePage from "../TablePage/TablePage";
import "../../Stylesheets/Login/Login.scss";
import PersonIcon from "@mui/icons-material/Person";
import WarningIcon from "@mui/icons-material/Warning";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [viewpass, setViewpass] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // method1
  const handleSubmit = async (e) => {
    // e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return;
    }
    try {
      const response = await axios.post(
        "https://crudcrud.com/api/2967e627f58346bb867e5bf8c166bda8/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );
      const user = response.data;
      // Check if user exists in response
      if (user) {
        // Handle successful login
        console.log("Login successful:", user);
        toast.success("Login Successfully");
        setTimeout(() => {
          // Redirect user to TablePage
          navigate("/TablePage");
        }, 1500);
      } else {
        // Handle invalid credentials
        setError("Invalid email or password");
      }
    } catch (error) {
      // Handle login error
      console.error("Login failed:", error);
      setError("Login failed. Please try again.");
    }
  };

  // method 2
  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedInStatus === "true");
  }, []);

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      setIsLoggedIn(true);
      // localStorage.setItem("username", username);
      localStorage.setItem("isLoggedIn", true);
    } else {
      alert("Invalid username or password");
    }
  };

  const HandlePrevent = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="login-page-main-wrapper">
        {isLoggedIn ? (
          <div>
            {/* <button onClick={handleLogout}>Logout</button> */}
            <TablePage />
          </div>
        ) : (
          <div className="login_inner-wrapper container-xxl">
            <div className="input-field-wrapper">
              <div className="login-fields-wrapper">
                <div className="Form_inner_fileds">
                  <h2>Login</h2>
                  <form onSubmit={HandlePrevent}>
                    {/* <div>
                      <div className="label">
                        User Name <span style={{ color: "red" }}>*</span>
                      </div>
                      <input
                        type="text"
                        name="username"
                        // value={username}
                        placeholder="Enter your User Name"
                        // onChange={(e) => setUsername(e.target.value)}
                        // autoComplete="off"
                        // autoSave="off"
                      ></input>
                      <i className="icon">
                        <PersonIcon />
                      </i>
                    </div> */}

                    {/* email */}
                    <div>
                      <div className="label">
                        Email <span style={{ color: "red" }}>*</span>
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your Email"
                        // onChange={(e) => setUsername(e.target.value)}
                        // autoComplete="off"
                        // autoSave="off"
                      ></input>
                      <i className="icon">
                        <PersonIcon />
                      </i>
                    </div>
                    <div>
                      <div className="label">
                        Password <span style={{ color: "red" }}>*</span>
                      </div>
                      <input
                        type={`text`}
                        className={`${viewpass ? "activate" : "notactivate"}`}
                        name="password"
                        // value={password}
                        value={formData.password}
                        placeholder="Enter password"
                        autoComplete="off"
                        autoSave="off"
                        // onChange={(e) => setPassword(e.target.value)}
                        onChange={handleChange}
                      ></input>
                      <i className="icon">
                        {viewpass ? (
                          <VisibilityOffIcon
                            onClick={(e) => setViewpass(!viewpass)}
                          ></VisibilityOffIcon>
                        ) : (
                          <RemoveRedEyeIcon
                            onClick={(e) => setViewpass(!viewpass)}
                          ></RemoveRedEyeIcon>
                        )}
                      </i>
                    </div>

                    <div>
                      <button
                        className="Activate_button"
                        // onClick={(e) => handleLogin()}
                        onClick={(e) => handleSubmit()}
                        type="submit"
                      >
                        LOG IN
                      </button>
                    </div>
                    {error && <div style={{ color: "red" }}>{error}</div>}
                  </form>
                  {/*  */}
                  <a href="/signup">Create an account.</a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
