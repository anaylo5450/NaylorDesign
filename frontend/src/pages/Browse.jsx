import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Browse.css";

// ✅ Use env var so prod calls your backend service
const API_BASE = import.meta.env.VITE_API_BASE;
// ✅ Asset base is backend host (strip trailing /api)
const ASSET_BASE = (API_BASE || "").replace(/\/api\/?$/, "");

export default function Browse() {
  const [products, setProducts] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        // ✅ absolute URL to the backend service
        const res = await axios.get(`${API_BASE}/products?limit=48`);
        // ✅ tolerate different response shapes
        const payload = res.data?.data ?? res.data?.items ?? res.data;
        setProducts(Array.isArray(payload) ? payload : []);
      } catch (e) {
        console.error("products load failed:", e);
        setErr(e.message || "Failed to load");
      }
    })();
  }, []);

  if (err) return <div className="error">Failed to load: {err}</div>;
  if (!products.length) return <div>No products found.</div>;

  return (
    <div className="browse-page">
      <div className="browse-container">
        <div className="browse-utils">
          <h1 className="browse-title">Browse Products</h1>
          <span className="browse-count">{products.length} items</span>
        </div>
        <p className="browse-sub">Find the latest parts available on Naylor Design.</p>

        <div className="browse-grid">
          {products.map(product => (
            <Link key={product._id || product.id} className="prod-card" to={`/product/${product._id || product.id}`}>
              {product.imageFile?.filename ? (
                <img
                  className="prod-thumb"
                  // ✅ absolute asset URL so Static Site doesn’t look for /uploads on itself
                  src={`${ASSET_BASE}/uploads/${product.imageFile.filename}`}
                  alt={product.name}
                />
              ) : (
                <div className="thumb-fallback" />
              )}
              <div className="prod-body">
                <div className="prod-make">
                  {product.year} {product.make} {product.carModel || product.model || ""}
                </div>
                <div className="prod-name">{product.name}</div>
                <div className="prod-price">${product.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
