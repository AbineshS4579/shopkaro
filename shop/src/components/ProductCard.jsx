import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useState } from 'react';
import './ProductCard.css';

function StarRating({ rating }) {
  return (
    <div className="stars" aria-label={`${rating} out of 5 stars`}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24"
          fill={i <= Math.floor(rating) ? 'var(--warning)' : 'none'}
          stroke="var(--warning)" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article
      className="product-card"
      style={{ '--card-color': product.color, animationDelay: `${index * 60}ms` }}
    >
      <Link to={`/product/${product.id}`} className="card-inner">
        {/* Visual */}
        <div className="card-visual">
          <div className="card-emoji">{product.emoji}</div>
          <div className="card-glow" />
          {product.badge && (
            <span className={`card-badge badge-${product.badge.toLowerCase().replace(/\s/g, '-')}`}>
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="card-discount">-{discount}%</span>
          )}
        </div>

        {/* Content */}
        <div className="card-content">
          <div className="card-meta">
            <StarRating rating={product.rating} />
            <span className="review-count">({product.reviews.toLocaleString()})</span>
          </div>

          <h3 className="card-name">{product.name}</h3>
          <p className="card-desc">{product.description}</p>

          <div className="card-specs">
            {product.specs.slice(0, 3).map(s => (
              <span key={s} className="spec-pill">{s}</span>
            ))}
          </div>

          <div className="card-footer">
            <div className="card-pricing">
              <span className="price-current">${product.price}</span>
              {product.originalPrice && (
                <span className="price-original">${product.originalPrice}</span>
              )}
            </div>
            <button
              className={`btn-add${added ? ' added' : ''}`}
              onClick={handleAdd}
              aria-label={`Add ${product.name} to cart`}
            >
              {added ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </Link>
    </article>
  );
}
