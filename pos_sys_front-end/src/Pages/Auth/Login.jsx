import { useState } from "react";

import Button from "../../components/Common/Button.jsx";

import Input from "../../components/Common/Input.jsx";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit} noValidate>
        <h1>Sign in</h1>

        <p className="login-subtitle">Coffee POS System</p>

        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="you@coffeeshop.local"
          value={form.email}
          onChange={handleChange}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
        />

        <Button type="submit" className="login-submit">
          Sign in
        </Button>
      </form>
    </div>
  );
}
