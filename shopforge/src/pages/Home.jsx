import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Home.css';

const FEATURED_IDS = [1, 6, 8, 3];
const featured = FEATURED_IDS.map(id => products.find(p => p.id === id)).filter(Boolean);

const categories = [
  { id: 'electronics', label: 'Electronics', emoji: '⚡', count: products.filter(p => p.category === 'electronics').length },
  { id: 'apparel',     label: 'Apparel',     emoji: '👕', count: products.filter(p => p.category === 'apparel').length },
  { id: 'home',        label: 'Home',        emoji: '🏠', count: products.filter(p => p.category === 'home').length },
  { id: 'sports',      label: 'Sports',      emoji: '🏃', count: products.filter(p => p.category === 'sports').length },
];

const stats = [
  { value: '9+', label: 'Products' },
  { value: '4.7★', label: 'Avg Rating' },
  { value: '7k+', label: 'Reviews' },
  { value: '100%', label: 'Satisfaction' },
];

export default function Home() {
  return (
    <main className="home page-enter">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb orb-1" />
          <div className="hero-orb orb-2" />
          <div className="hero-grid" />
        </div>
        <div className="container hero-content">
          <div className="hero-eyebrow">
            <span className="eyebrow-dot" />
            New collection — Summer 2025
          </div>
          <h1 className="hero-headline">
            Products built for<br />
            <span className="headline-accent">how you live now</span>
          </h1>
          <p className="hero-sub">
            Premium electronics, apparel, and home goods — curated with obsessive attention to quality and design.
          </p>
          <div className="hero-actions">
            <Link to="/catalog" className="btn-primary">
              Shop the Catalog
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link to="/about" className="btn-ghost">Learn more</Link>
          </div>
          <div className="hero-stats">
            {stats.map(s => (
              <div key={s.label} className="stat">
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
            <Link to="/catalog" className="section-link">View all →</Link>
          </div>
          <div className="category-grid">
            {categories.map(cat => (
              <Link key={cat.id} to={`/catalog?cat=${cat.id}`} className="category-card">
                <span className="cat-emoji">{cat.emoji}</span>
                <span className="cat-label">{cat.label}</span>
                <span className="cat-count">{cat.count} items</span>
                <div className="cat-arrow">→</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <Link to="/catalog" className="section-link">See all →</Link>
          </div>
          <div className="products-grid">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-orb" />
            <h2 className="cta-title">Ready to explore everything?</h2>
            <p className="cta-sub">Browse all 9 products across 4 categories. Free shipping on orders over $100.</p>
            <Link to="/catalog" className="btn-primary">
              Browse Full Catalog
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
