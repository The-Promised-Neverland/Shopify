import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory hook

const FailedScreen = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 1) {
        setCountdown(countdown - 1);
      } else {
        clearTimeout(timer);
        navigate("/");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div
      style={{ textAlign: "center", padding: "40px 0", background: "#EBF0F5" }}
    >
      <div
        className="card"
        style={{
          background: "white",
          padding: "60px",
          borderRadius: "4px",
          boxShadow: "0 2px 3px #C8D0D8",
          display: "inline-block",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            borderRadius: "200px",
            height: "200px",
            width: "200px",
            background: "#F8FAF5",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <i
            className="checkmark"
            style={{ color: "red", fontSize: "100px", lineHeight: "200px" }}
          >
            X
          </i>
        </div>
        <h1
          style={{
            color: "#88B04B",
            fontFamily: '"Nunito Sans", "Helvetica Neue", sans-serif',
            fontWeight: 900,
            fontSize: "40px",
            marginBottom: "10px",
          }}
        >
          Transaction Failed
        </h1>
        <p
          style={{
            color: "#404F5E",
            fontFamily: '"Nunito Sans", "Helvetica Neue", sans-serif',
            fontSize: "20px",
            margin: "0",
          }}
        >
          Any debit amount will be refunded in 3-5 business days
        </p>
      </div>
      <p>Redirecting in {countdown} seconds</p>
    </div>
  );
};

export default FailedScreen;
