import React, { useState } from "react";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import WarningIcon from "@mui/icons-material/Warning";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import "../../Stylesheets/Login/Login.scss";
import TablePage from "../TablePage/TablePage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [viewpass, setViewpass] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://crudcrud.com/api/78d5eea282ce42a396fa546f20763035/organizations",
        formData
      );
      // Handle successful registration
      console.log("Registration successful:", response.data);
      toast.success("Signup Successfully");

      // Store the newly created user details in local storage
      localStorage.setItem("SignupUserData", JSON.stringify(response.data));

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (error) {
      // Handle registration error
      console.error("Registration failed:", error);
    }
  };

  return (
    <>
      <div className="login-page-main-wrapper">
        <div className="login_inner-wrapper container-xxl">
          <div className="input-field-wrapper">
            <div className="login-fields-wrapper">
              <div className="Form_inner_fileds">
                <h2>Signup</h2>
                <form onSubmit={handleSubmit}>
                  <div>
                    <div className="label">
                      Username <span style={{ color: "red" }}>*</span>
                    </div>
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter your User Name"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                    <i className="icon">
                      <PersonIcon />
                    </i>
                  </div>
                  <div>
                    <div className="label">
                      Email <span style={{ color: "red" }}>*</span>
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <i className="icon">
                      <PersonIcon />
                    </i>
                  </div>
                  <div>
                    <div className="label">
                      Password <span style={{ color: "red" }}>*</span>
                    </div>
                    <input
                      type={viewpass ? "text" : "password"}
                      name="password"
                      className={`${viewpass ? "activate" : "notactivate"}`}
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="off"
                      autoSave="off"
                      required
                    />
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
                  <button type="submit">Signup</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
