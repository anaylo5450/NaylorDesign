import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./Product.css";

export default function Product() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(res => setItem(res.data?.data || null))
      .catch(e => setErr(e?.response?.data?.message || e.message || String(e)));
  }, [id]);

  if (err) return <pre className="prod-error">{err}</pre>;
  if (!item) return <div className="prod-loading">Loading…</div>;

  const img = item.imageFile?.filename ? `/uploads/${item.imageFile.filename}` : null;

  return (
    <div className="prod-page">
      <div className="prod-container">
        <div className="prod-breadcrumb">
          <Link to="/browse">← Back to Browse</Link>
        </div>

        <div className="prod-wrap">
          <div className="prod-media">
            {img ? (
              <img className="prod-img" src={img} alt={item.name} />
            ) : (
              <div className="prod-img-fallback" />
            )}
          </div>

          <div className="prod-info">
            <h1 className="prod-title">{item.name}</h1>
            <div className="prod-sub">
              {item.year} {item.make} {item.carModel || item.model || ""}
            </div>
            <div className="prod-price">
              {typeof item.price === "number" ? `$${item.price.toFixed(2)}` : item.price}
            </div>

            <p className="prod-desc">{item.description}</p>

            {item.cadFile?.filename && (
              <div className="prod-cad">
                CAD file:{" "}
                <a href={`/uploads/${item.cadFile.filename}`} target="_blank" rel="noreferrer">
                  {item.cadFile.filename}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
