import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Common/Button.jsx";
import Input from "../../components/Common/Input.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { useToast } from "../../hooks/useToast.js";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
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
      await login(form);
      notify("Signed in successfully.");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <form style={styles.card} onSubmit={handleSubmit} noValidate>
        <div style={styles.header}>
          <div style={styles.logoBadge}>☕</div>
          <h1 style={styles.title}>Sign in</h1>
          <p style={styles.subtitle}>Coffee POS System</p>
        </div>

        <div style={styles.formBody}>
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="you@coffeeshop.local"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
          />

          {error && <p style={styles.error}>{error}</p>}

          <Button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
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