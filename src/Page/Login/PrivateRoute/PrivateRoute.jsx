import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { context } from "../../../Hook/UseContext";

function PrivateRoute() {
    const { authentication } = useContext(context);
  
    if (authentication) {
      return <Outlet />;
    } else {
      const data = localStorage.getItem("accessToken"); 
      if (data !== 'undefined' && data) {
        return <Outlet />
      } else {
        return <Navigate to="/login" />;
  
      }
    }
  }
  
  export default PrivateRoute;