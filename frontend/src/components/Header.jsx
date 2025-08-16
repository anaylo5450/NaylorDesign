import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/naylor-logo.png'; // adjust path if needed

export default function Header() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (search.trim()) {
        navigate(`/search?q=${encodeURIComponent(search.trim())}`);
        setSearch("");
      }
    }
  };

  return (
    <header className="naylor-header">
      <div className="naylor-header-content">

        <div className="header-left">
          <Link to="/">
            <img src={logo} alt="Naylor Design Logo" className="naylor-logo-img" />
          </Link>
          <Link to="/request" className="header-link">Engineer a Custom Solution</Link>
        </div>

        <div className="header-center">
          <span className="naylor-logo"><Link to="/">Naylor Design</Link></span>
        </div>

        <div className="header-right">
          <Link to="/browse" className="header-link">Browse Products</Link>
          <input
            type="text"
            placeholder="Search..."
            className="header-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

      </div>
    </header>
  );
}
