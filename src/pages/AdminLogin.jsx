import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_PASSWORD = "fireworks2024";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("admin_logged_in", "true");
      navigate("/admin");
    } else {
      setError("Invalid password");
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <div style={card}>
        <div style={logo}>
          <span style={{ fontSize: "48px" }}>🔥</span>
        </div>
        <h1 style={title}>Admin Login</h1>
        <p style={subtitle}>Enter password to access dashboard</p>

        <form onSubmit={handleLogin} style={form}>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={input}
          />
          {error && <p style={errorText}>{error}</p>}
          <button type="submit" disabled={loading} style={button}>
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <a href="/" style={backLink}>← Back to Site</a>
      </div>
    </div>
  );
}

const container = {
  minHeight: "100vh",
  background: "#0a0a0f",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
};

const card = {
  background: "rgba(26,10,46,0.4)",
  backdropFilter: "blur(16px)",
  borderRadius: "16px",
  padding: "48px 32px",
  border: "1px solid rgba(255,255,255,0.05)",
  boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
  maxWidth: "400px",
  width: "100%",
  textAlign: "center",
};

const logo = {
  marginBottom: "16px",
};

const title = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "white",
  marginBottom: "8px",
};

const subtitle = {
  color: "#9ca3af",
  marginBottom: "32px",
};

const form = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const input = {
  width: "100%",
  background: "rgba(10,10,15,0.5)",
  border: "1px solid #374151",
  borderRadius: "8px",
  padding: "14px 16px",
  color: "white",
  fontSize: "15px",
  boxSizing: "border-box",
};

const button = {
  background: "#facc15",
  color: "#0a0a0f",
  fontWeight: "600",
  padding: "14px 24px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontSize: "15px",
};

const errorText = {
  color: "#ef4444",
  fontSize: "14px",
};

const backLink = {
  display: "block",
  marginTop: "24px",
  color: "#facc15",
  textDecoration: "none",
  fontSize: "14px",
};