import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => setCount((currcount) => currcount - 1), 1000);
    count === 1 && navigate("/login");
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div>
      <h1 style={{ marginTop: "15%" }}>Redirecting in {count} seconds</h1>
    </div>
  );
};

export default LoadingToRedirect;
