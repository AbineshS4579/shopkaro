import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { CartProvider } from './hooks/useCart';
import { AuthProvider } from './hooks/useAuth';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy-loaded pages (code splitting per route)
const Home          = lazy(() => import('./pages/Home'));
const Catalog       = lazy(() => import('./pages/Catalog'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart          = lazy(() => import('./pages/Cart'));
const About         = lazy(() => import('./pages/About'));
const Login         = lazy(() => import('./pages/Login'));
const Register      = lazy(() => import('./pages/Register'));

function LoadingScreen() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '13px',
    }}>
      Loading…
    </div>
  );
}

function NotFound() {
  return (
    <main style={{ paddingTop: 120, paddingBottom: 80, textAlign: 'center', minHeight: '100vh' }}>
      <div style={{ fontSize: 80, marginBottom: 20 }}>404</div>
      <h1 style={{ fontSize: 28, marginBottom: 12 }}>Page not found</h1>
      <a href="/" style={{ color: 'var(--accent-light)' }}>← Go home</a>
    </main>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/"            element={<Home />} />
            <Route path="/catalog"     element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart"        element={<Cart />} />
            <Route path="/about"       element={<About />} />
            <Route path="/login"       element={<Login />} />
            <Route path="/register"    element={<Register />} />
            <Route path="*"            element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
}
