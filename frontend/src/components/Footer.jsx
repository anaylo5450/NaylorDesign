import './Footer.css';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="naylor-footer">
      <div className="footer-content">
        <div className="footer-section">
          <Link to="/contact" className="footer-link">Contact</Link>
          <Link to="/about" className="footer-link">About Us</Link>
          <Link to="/policies" className="footer-link">Policies</Link>
        </div>

        <div className="footer-section">
          <p className="footer-note">© {new Date().getFullYear()} Naylor Design. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
