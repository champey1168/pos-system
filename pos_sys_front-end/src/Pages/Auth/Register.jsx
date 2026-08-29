import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Common/Button.jsx";
import Input from "../../components/Common/Input.jsx";
import { authService } from "../../services/authService.js"; // ហៅ authService ដោយផ្ទាល់
import { useToast } from "../../hooks/useToast.js";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { notify } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // ផ្ញើ Data { name, email, password } ទៅ Backend
      await authService.register(form);
      
      if (notify) notify("Registered successfully!");
      
      // ចុះឈ្មោះជោគជ័យ នាំទៅទំព័រ Login ឬ Dashboard
      navigate("/login");
    } catch (err) {
      console.error("Register Error:", err);
      setError(err.message || "Registration failed. Check your input.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <form style={styles.card} onSubmit={handleSubmit} noValidate>
        <div style={styles.header}>
          <div style={styles.logoBadge}>☕</div>
          <h1 style={styles.title}>Sign up</h1>
          <p style={styles.subtitle}>Coffee POS System</p>
        </div>

        <div style={styles.formBody}>
          <Input
            label="Full Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            required
          />
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="you@coffeeshop.local"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
          
          {error && <p style={styles.error}>{error}</p>}
          
          <Button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? "Registering..." : "Sign Up"}
          </Button>

          <div style={{ marginTop: "15px", textAlign: "center", fontSize: "14px" }}>
            <p style={{ margin: 0, color: "#666" }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#15803d", fontWeight: "600", textDecoration: "none" }}>
                Login
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f6f8",
    padding: "20px",
    boxSizing: "border-box",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
    padding: "36px 32px",
    boxSizing: "border-box",
  },
  header: {
    textAlign: "center",
    marginBottom: "24px",
  },
  logoBadge: {
    width: "48px",
    height: "48px",
    backgroundColor: "#e6f4ea",
    fontSize: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "12px",
    margin: "0 auto 12px auto",
  },
  title: {
    margin: "0 0 6px 0",
    fontSize: "24px",
    fontWeight: "700",
    color: "#1a1a1a",
  },
  subtitle: {
    margin: 0,
    fontSize: "14px",
    color: "#15803d",
    fontWeight: "500",
  },
  formBody: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  error: {
    color: "#dc2626",
    fontSize: "13px",
    margin: "0",
    textAlign: "left",
  },
  submitBtn: {
    width: "100%",
    padding: "12px",
    fontSize: "15px",
    fontWeight: "600",
    marginTop: "8px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};