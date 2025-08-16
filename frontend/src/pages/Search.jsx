import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

export default function Search() {
  const [params] = useSearchParams();
  const q = params.get("q")?.trim() || "";
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancel;
    setLoading(true);
    setErr("");
    axios.get(`/api/products/search`, {
      params: { q, limit: 48 },
      cancelToken: new axios.CancelToken(c => (cancel = c)),
    })
    .then(res => setItems(res.data?.data || []))
    .catch(e => {
      if (axios.isCancel(e)) return;
      setErr(e?.response?.data?.message || e.message || String(e));
    })
    .finally(() => setLoading(false));

    return () => cancel && cancel();
  }, [q]);

  return (
    <div style={{ padding: 24, color: "#eaeaea", background: "#1c1c1c", minHeight: "100vh" }}>
      <h1 style={{ marginTop: 64 }}>Search Results</h1>
      <div style={{ opacity: 0.8, marginBottom: 12 }}>
        Query: <strong>{q || "(empty)"}</strong> — {loading ? "Searching…" : `${items.length} result(s)`}
      </div>

      {err && <pre>{err}</pre>}

      {!loading && !err && items.map(p => (
        <Link key={p._id} to={`/product/${p._id}`} style={{ display: "block", padding: "8px 0", color: "#b7f0cd" }}>
          {p.name} — {p.make} {p.carModel || p.model || ""} {p.year} — ${p.price}
        </Link>
      ))}
    </div>
  );
}
