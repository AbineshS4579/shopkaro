import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import './Cart.css';

export default function Cart() {
  const { items, total, count, removeFromCart, updateQty, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <main className="cart-empty page-enter">
        <div className="container">
          <div className="empty-cart-box">
            <div className="empty-icon">🛍️</div>
            <h1>Your cart is empty</h1>
            <p>Looks like you haven't added anything yet.</p>
            <Link to="/catalog" className="btn-primary">Browse Products</Link>
          </div>
        </div>
      </main>
    );
  }

  const shipping = total >= 100 ? 0 : 9.99;
  const tax = total * 0.08;
  const grand = total + shipping + tax;

  return (
    <main className="cart-page page-enter">
      <div className="container">
        <div className="cart-header">
          <h1 className="cart-title">Shopping Cart</h1>
          <span className="cart-item-count">{count} item{count !== 1 ? 's' : ''}</span>
        </div>

        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items">
            {items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-visual" style={{ background: item.color }}>
                  <span>{item.emoji}</span>
                </div>
                <div className="item-info">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price-unit">${item.price} each</p>
                </div>
                <div className="item-qty" role="group" aria-label={`Quantity for ${item.name}`}>
                  <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Decrease">−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Increase">+</button>
                </div>
                <div className="item-subtotal">
                  ${(item.price * item.qty).toFixed(2)}
                </div>
                <button
                  className="item-remove"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name}`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            ))}

            <button className="clear-btn" onClick={clearCart}>Clear cart</button>
          </div>

          {/* Summary */}
          <div className="order-summary">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-rows">
              <div className="summary-row">
                <span>Subtotal ({count} items)</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'free' : ''}>
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="free-shipping-note">
                  Add ${(100 - total).toFixed(2)} more for free shipping
                </p>
              )}
              <div className="summary-row">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <span>${grand.toFixed(2)}</span>
            </div>

            <button className="btn-checkout" onClick={() => alert('Checkout flow coming soon! This is a demo.')}>
              Proceed to Checkout
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>

            <Link to="/catalog" className="continue-link">← Continue Shopping</Link>

            <div className="trust-badges">
              <span>🔒 Secure checkout</span>
              <span>🚚 Fast delivery</span>
              <span>↩️ Easy returns</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
