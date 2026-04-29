import { useAuth } from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return null; // prevent flicker
  }

  return <>{children}</>;
};

export default Protected;