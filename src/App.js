import "./App.css";
import Login from "./Components/Login/Login";

import Signup from "./Components/Login/Signup";
import Navbar from "./Components/Navbar/Navbar";
import TablePage from "./Components/TablePage/TablePage";
import Sidebar from "./Components/Sidebar/Sidebar";
import PrivateRoutes from "./Components/privateroutes";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Organization from "./Components/Organization/Organization";
function App() {
  var logintest = localStorage.getItem("login");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <Router>
      <div className="App">
        <ToastContainer limit={1} />
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <PrivateRoutes /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/TablePage" element={<TablePage />} />
          <Route path="/Organization" element={<Organization />} />

          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
