import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../Features/Auth/Login";
import Register from "../Features/Auth/Register";
import Protected from "../Features/Auth/Components/Protected";
import Home from "../Features/Interview/Pages/Home"
import Interview from "../Features/Interview/Pages/Interview"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",        
    element: <Protected><Home/></Protected>,
  },
  {
    path:"/interview/:interviewId",
    element: <Protected><Interview /></Protected>
}
]);