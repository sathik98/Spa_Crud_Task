import "./App.css";
import Login from "./Components/Login/Login";

import Signup from "./Components/Login/Signup";
import Navbar from "./Components/Navbar/Navbar";
import TablePage from "./Components/TablePage/TablePage";
import Sidebar from "./Components/Sidebar/Sidebar";
import PrivateRoutes from "./Components/privateroutes";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Organization from "./Components/Organization/Organization";
function App() {
  var logintest = localStorage.getItem("login");

  return (
    <Router>
      <div className="App">
        <ToastContainer limit={1} />
        <>
          {logintest == "false" ? (
            <>
              <Route element={<TablePage />} path="/"></Route>
            </>
          ) : (
            <Routes>
              <Route element={<PrivateRoutes />} path="/" exact />
              {/* <Route path="/login" element={<Login />} /> */}

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route element={<TablePage />} path="/TablePage"></Route>

              <Route element={<Organization />} path="/Organization"></Route>
            </Routes>
          )}
        </>
      </div>
    </Router>
  );
}

export default App;
