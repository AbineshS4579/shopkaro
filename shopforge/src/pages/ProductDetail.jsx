import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../hooks/useCart';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

function StarRating({ rating, count }) {
  return (
    <div className="detail-stars">
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24"
          fill={i <= Math.round(rating) ? 'var(--warning)' : 'none'}
          stroke="var(--warning)" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
      <span className="detail-rating-num">{rating}</span>
      <span className="detail-review-count">({count.toLocaleString()} reviews)</span>
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <main className="not-found page-enter">
        <div className="container">
          <h1>Product not found</h1>
          <Link to="/catalog" className="btn-primary">← Back to Catalog</Link>
        </div>
      </main>
    );
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="product-detail page-enter">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/catalog">Catalog</Link>
          <span>/</span>
          <Link to={`/catalog?cat=${product.category}`}>
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link>
          <span>/</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        {/* Main layout */}
        <div className="detail-layout">
          {/* Visual */}
          <div className="detail-visual" style={{ '--card-color': product.color }}>
            <div className="detail-emoji">{product.emoji}</div>
            <div className="detail-glow" />
            {product.badge && (
              <span className={`card-badge badge-${product.badge.toLowerCase().replace(/\s/g, '-')}`}>
                {product.badge}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="detail-info">
            <div className="detail-category">{product.category}</div>
            <h1 className="detail-name">{product.name}</h1>

            <StarRating rating={product.rating} count={product.reviews} />

            <div className="detail-pricing">
              <span className="detail-price">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="detail-original">${product.originalPrice}</span>
                  <span className="detail-save">Save {discount}%</span>
                </>
              )}
            </div>

            <p className="detail-desc">{product.description}</p>

            <div className="detail-specs">
              <h3 className="specs-title">Specifications</h3>
              <div className="specs-grid">
                {product.specs.map(s => (
                  <div key={s} className="spec-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <div className="detail-actions">
              <div className="qty-control" role="group" aria-label="Quantity">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
                <span className="qty-value" aria-live="polite">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} aria-label="Increase quantity">+</button>
              </div>
              <button
                className={`btn-add-detail${added ? ' added' : ''}`}
                onClick={handleAdd}
              >
                {added ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                    Add to Cart · ${(product.price * qty).toFixed(2)}
                  </>
                )}
              </button>
            </div>

            <div className="detail-trust">
              <span>✦ Free shipping on orders over $100</span>
              <span>✦ 30-day returns</span>
              <span>✦ 2-year warranty</span>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="related-section">
            <h2 className="section-title" style={{marginBottom: 24}}>Related Products</h2>
            <div className="related-grid">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
