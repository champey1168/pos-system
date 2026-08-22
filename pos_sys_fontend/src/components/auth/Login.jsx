import { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  gender: "",
  password: "",
  role: "",
  status: "",
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Invalid email format";
    }
    if (!form.gender) errs.gender = "Gender is required";
    if (!form.password) {
      errs.password = "Password is required";
    } else if (form.password.length < 6) {
      errs.password = "Password must be at least 6 characters";
    }
    if (!form.role) errs.role = "Role is required";
    if (!form.status) errs.status = "Status is required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Login failed");
      }

      const data = await res.json();
      if (data.user?.status === "inactive") {
        throw new Error("Your account is inactive. Contact admin.");
      }
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      setMessage({ type: "success", text: `Welcome ${data.user.name} (${data.user.role})` });
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-xl shadow-md p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {message && (
          <p
            className={`text-sm p-2 rounded ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </p>
        )}

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          />
          {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          />
          {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="gender">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className="text-xs text-red-600 mt-1">{errors.gender}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          />
          {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="role">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          >
            <option value="">Select role</option>
            <option value="admin">Admin</option>
            <option value="cashier">Cashier</option>
            <option value="manager">Manager</option>
          </select>
          {errors.role && <p className="text-xs text-red-600 mt-1">{errors.role}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
          >
            <option value="">Select status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {errors.status && <p className="text-xs text-red-600 mt-1">{errors.status}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
