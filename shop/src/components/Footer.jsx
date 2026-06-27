import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="logo-mark">⬡</span>
          <span className="logo-text">ShopForge</span>
          <p>Modern products for modern living.</p>
        </div>
        <nav className="footer-nav">
          <div className="footer-col">
            <h4>Shop</h4>
            <Link to="/catalog">All Products</Link>
            <Link to="/catalog?cat=electronics">Electronics</Link>
            <Link to="/catalog?cat=apparel">Apparel</Link>
            <Link to="/catalog?cat=home">Home & Living</Link>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <Link to="/about">About</Link>
            <Link to="/about">Careers</Link>
            <Link to="/about">Press</Link>
          </div>
        </nav>
      </div>
      <div className="footer-bottom container">
        <span>© 2025 ShopForge. All rights reserved.</span>
        <span>Built with React + Vite</span>
      </div>
    </footer>
  );
}
