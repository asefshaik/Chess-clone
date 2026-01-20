import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function OAuthSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("jwt", token);
      navigate("/home", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [location, navigate]);

  return <p>Signing you in...</p>;
}

export default OAuthSuccess;
