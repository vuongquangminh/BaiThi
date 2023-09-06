import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Page/Login/Login";
import User from "./Page/User/User";
import PrivateRoute from "./Page/Login/PrivateRoute/PrivateRoute";
import AddNew from "./Page/AddNew/AddNew";
import UpdateForm from "./Page/UpdateForm/UpdateForm";

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
          <Route element={<PrivateRoute />}>
            <Route path="/loai/them-moi" element={<AddNew />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/loai/chi-tiet" element={<UpdateForm />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
