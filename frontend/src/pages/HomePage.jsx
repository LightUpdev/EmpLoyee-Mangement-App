import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/employee");
  }, [navigate]);
  return (
    <h1 className="py-3 text-align-center">Redirecting to employees page</h1>
  );
};

export default HomePage;
