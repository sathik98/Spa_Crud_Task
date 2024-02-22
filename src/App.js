import "./App.css";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import TablePage from "./Components/TablePage/TablePage";
import Sidebar from "./Components/Sidebar/Sidebar";
import PrivateRoutes from "./Components/privateroutes";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  var logintest = localStorage.getItem("login");

  return (
    <Router>
      <div className="App">
        <ToastContainer limit={1} />
        <>
          {logintest == "false" ? (
            <>
              <Navbar />
              <Sidebar />
              <Route element={<TablePage />} path="/"></Route>
            </>
          ) : (
            <Routes>
              <Route element={<PrivateRoutes />} path="/" exact />
              <Route path="/login" element={<Login />} />
            </Routes>
          )}
        </>
      </div>
    </Router>
  );
}

export default App;
