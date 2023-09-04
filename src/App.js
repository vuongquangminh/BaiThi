import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Page/Login/Login";
import User from "./Page/User/User";
import PrivateRoute from "./Page/Login/PrivateRoute/PrivateRoute";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/user" element={<User />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
