import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import Users from "./Users";

const App = () => {
  return (
    <Router>
      <div className="mainApp">
        <div>
          <Link to="/api/registration">
            <button>Registration</button>
          </Link>
          <Link to="/api/login">
            <button>Login</button>
          </Link>
          {/* <Link to="/users">          //disabled
            <button>Users</button>
          </Link> */}
        </div>
        <Routes>
          <Route path="/api/registration" element={<Registration />} />
          <Route path="/api/login" element={<Login />} />
          <Route path="/api/users" element={<Users />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
