import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";   // ← add this
import "./Browse.css";

//to call the correct URL
const API_BASE = import.meta.env.VITE_API_BASE;
const ASSET_BASE = (API_BASE || "").replace(/\/api\/?$/, "");

export default function Browse() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products?limit=48")
      .then(res => setProducts(res.data.data || []))
      .catch(err => console.error(err));
  }, []);

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
            <Link key={product._id} className="prod-card" to={`/product/${product._id}`}>
              {product.imageFile?.filename ? (
                <img
                  className="prod-thumb"
                  src={`/uploads/${product.imageFile.filename}`}
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
