import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


export const ProtectedRoute = ({ element }) => {
    const { auth } = useSelector((state)=>state);

    if ( auth.isAuthenticated) {
      // If authenticated, render the protected route
      return element;
    } else {
      // If not authenticated, redirect to the login page
      return <Navigate to="/sign-in" />;
    }
  };