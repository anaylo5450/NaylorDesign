// AddProduct.jsx
import { useEffect, useState } from "react";
import "./AddProduct.css";

/* === keep Field OUTSIDE so identity is stable === */
function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder = "",
  value,
  onChange,
  ...rest
}) {
  const id = `field-${name}`;
  return (
    <div className="field">
      <label className="label" htmlFor={id}>{label}</label>
      <input
        id={id}
        className="input"
        name={name}
        type={type}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        inputMode={type === "number" ? "numeric" : undefined}
        {...rest}  /* step/min pass-through */
      />
    </div>
  );
}

export default function AddProduct() {
  console.log("AddProduct render");
  useEffect(() => {
    console.log("AddProduct MOUNT");
    return () => console.log("AddProduct UNMOUNT");
  }, []);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    year: "",
    make: "",
    model: "", // UI calls it "Model", but backend expects carModel
  });
  const [imageFile, setImageFile] = useState(null);
  const [modelFile, setModelFile] = useState(null); // STL or STEP
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [ok, setOk] = useState(false);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onPickImage = (e) => {
    const f = e.target.files?.[0] || null;
    if (preview) URL.revokeObjectURL(preview);
    setImageFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const onPickModel = (e) => {
    const f = e.target.files?.[0] || null;
    if (!f) {
      setModelFile(null);
      return;
    }
    const name = f.name.toLowerCase();
    const okExt = name.endsWith(".stl") || name.endsWith(".stp") || name.endsWith(".step");
    if (!okExt) {
      setMsg("Please choose a .stl, .stp, or .step file for the 3D model.");
      e.target.value = ""; // clear the input
      setModelFile(null);
      return;
    }
    setModelFile(f);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    setOk(false);

    try {
      if (!imageFile || !modelFile) {
        setMsg("Please choose both an image and a .stl/.stp/.step file.");
        return;
      }

      const data = new FormData();
      // text fields
      data.append("name", form.name);
      data.append("description", form.description);
      data.append("price", form.price);
      data.append("year", form.year);
      data.append("make", form.make);
      // backend expects carModel
      data.append("carModel", form.model);

      // file fields (must match multer field names)
      data.append("image", imageFile);
      data.append("model", modelFile); // STL or STEP

      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          // NOTE: avoid sending admin secrets from client in production
          "x-admin-key": import.meta.env.VITE_ADMIN_API_KEY,
        },
        body: data,
      });

      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.message || "Failed to add product");
      }

      setOk(true);
      setMsg("✅ Product added.");
      setForm({ name: "", description: "", price: "", year: "", make: "", model: "" });
      setImageFile(null);
      setModelFile(null);
      if (preview) URL.revokeObjectURL(preview);
      setPreview(null);
    } catch (err) {
      setOk(false);
      setMsg("❌ " + (err?.message || "Something went wrong"));
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    // cleanup object URL on unmount/preview change
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className = "body">
    <div className="addprod-wrap">
      <div className="card">
        <h1 className="title">Add Product</h1>

        <form onSubmit={onSubmit} className="form">
          <Field label="Name" name="name" value={form.name} onChange={onChange} required />

          <div className="field">
            <label className="label" htmlFor="field-description">Description</label>
            <textarea
              id="field-description"
              className="textarea"
              rows={4}
              name="description"
              value={form.description}
              onChange={onChange}
              placeholder="Describe the part…"
              required
            />
          </div>

          <div className="grid grid-2">
            <Field label="Price" name="price" type="number" step="0.01" value={form.price} onChange={onChange} required />
            <Field label="Year"  name="year"  type="number" min="1900" value={form.year}  onChange={onChange} required />
          </div>

          <div className="grid grid-2">
            <Field label="Make"  name="make"  value={form.make}  onChange={onChange} required />
            <Field label="Model" name="model" value={form.model} onChange={onChange} required />
          </div>

          <div className="grid grid-2">
            <div className="field">
              <label className="label" htmlFor="field-image">Product Image</label>
              <input
                id="field-image"
                className="input file"
                type="file"
                accept="image/*"
                onChange={onPickImage}
                required
              />
            </div>

            <div className="field">
              <label className="label" htmlFor="field-model">3D Model (.stl, .stp, .step)</label>
              <input
                id="field-model"
                className="input file"
                type="file"
                accept=".stl,.stp,.step"
                onChange={onPickModel}
                required
              />
            </div>
          </div>

          <div className="actions">
            <button type="submit" disabled={saving} className="btn">
              {saving ? "Saving…" : "Save Product"}
            </button>
          </div>

          {msg && (
            <div className={`alert ${ok ? "alert-ok" : "alert-bad"}`}>
              {msg}
            </div>
          )}
        </form>

        {preview && (
          <div className="preview">
            <div className="preview-label">Preview</div>
            <img src={preview} alt="preview" className="preview-img" />
          </div>
        )}
      </div>
    </div>
    </div>
  );
  }
