import { useState } from "react";

import { categories } from "../../data/category.js";

import { validateProduct } from "../../Utils/validation.js";

import Button from "../Common/Button.jsx";
import Input from "../Common/Input.jsx";
import Select from "../Common/Select.jsx";

const blank = {
  name: "",
  category: "Coffee",
  price: "",
  cost: "",
  stock: "",
  description: "",
  image: "",
  status: "Active",
  customizable: true,
};

export default function ProductForm({
  initialProduct,
  onSubmit,
  submitLabel = "Save Product",
}) {
  const [form, setForm] = useState(() => ({ ...blank, ...initialProduct }));

  const [errors, setErrors] = useState({});

  const update = (field, value) =>
    setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateProduct(form);

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) return;

    onSubmit({
      ...form,
      image:
        form.image ||
        initialProduct?.image ||
        new URL("../../assets/house-coffee-beans.svg", import.meta.url).href,
    });
  };

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <Input
          label="Product Name"
          name="name"
          value={form.name}
          onChange={(event) => update("name", event.target.value)}
          error={errors.name}
        />
        <Select
          label="Category"
          name="category"
          value={form.category}
          onChange={(event) => update("category", event.target.value)}
          options={categories
            .filter((item) => item.name !== "All")
            .map((item) => item.name)}
          error={errors.category}
        />

        <Select
          label="Status"
          name="status"
          value={form.status}
          onChange={(event) => update("status", event.target.value)}
          options={["Active", "Inactive"]}
        />

        <Input
          label="Price"
          name="price"
          type="number"
          step="0.01"
          min="0"
          value={form.price}
          onChange={(event) => update("price", event.target.value)}
          error={errors.price}
        />
        <Input
          label="Cost"
          name="cost"
          type="number"
          step="0.01"
          min="0"
          value={form.cost}
          onChange={(event) => update("cost", event.target.value)}
          error={errors.cost}
        />

        <Input
          label="Stock"
          name="stock"
          type="number"
          min="0"
          value={form.stock}
          onChange={(event) => update("stock", event.target.value)}
          error={errors.stock}
        />

        <Input
          label="Image URL"
          name="image"
          value={form.image}
          onChange={(event) => update("image", event.target.value)}
          placeholder="Leave blank to use cafe image"
        />
      </div>

      <label className="field">
        <span>Description</span>
        <textarea
          className="input"
          rows="4"
          value={form.description}
          onChange={(event) => update("description", event.target.value)}
        />
      </label>

      <label className="check-line">
        <input
          type="checkbox"
          checked={form.customizable}
          onChange={(event) => update("customizable", event.target.checked)}
        />{" "}
        Supports drink customization
      </label>

      <div className="form-actions">
        <Button variant="primary" type="submit">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
