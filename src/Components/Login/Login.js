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
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [viewpass, setViewpass] = useState(false);
  const [error, setError] = useState("");

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

  // const handleLogin = async (e) => {
  //   try {
  //     const response = await axios.post(
  //       "https://crudcrud.com/api/c623e9a366b9427c986e7d8177a66966/login",
  //       {
  //         username,
  //         password,
  //       }
  //     );

  //     console.log("Login successful:", response.data);
  //     toast.success("Login Successfully");

  //   } catch (error) {
  //     setError("Invalid username or password");
  //     console.error("Login error:", error);
  //   }
  // };

  const handleLogout = () => {
    // localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const HandlePrevent = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="login-page-main-wrapper">
        {isLoggedIn ? (
          <div>
             <Navbar /> 
            {/* <button onClick={handleLogout}>Logout</button> */}
            <TablePage />
          </div>
        ) : (
          <div className="login_inner-wrapper container-xxl">
            <div className="input-field-wrapper">
              <div className="login-fields-wrapper">
                <div className="Form_inner_fileds">
                  <form onSubmit={HandlePrevent}>
                    <div>
                      <div className="label">
                        User Name <span style={{ color: "red" }}>*</span>
                      </div>
                      <input
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Enter your User Name"
                        onChange={(e) => setUsername(e.target.value)}
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
                        value={password}
                        placeholder="Enter password"
                        autoComplete="off"
                        autoSave="off"
                        onChange={(e) => setPassword(e.target.value)}
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
                        onClick={(e) => handleLogin()}
                        type="submit"
                      >
                        LOG IN
                      </button>
                    </div>
                  </form>
                  {/*  */}
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
