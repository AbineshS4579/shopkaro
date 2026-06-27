import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories, getSortedProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Catalog.css';

const SORTS = [
  { value: 'default',    label: 'Featured' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Top Rated' },
  { value: 'reviews',    label: 'Most Reviewed' },
];

export default function Catalog() {
  const [params, setParams] = useSearchParams();
  const [sort, setSort] = useState('default');

  const activeCategory = params.get('cat') || 'all';
  const searchQuery = (params.get('q') || '').toLowerCase();

  const setCategory = (cat) => {
    const next = new URLSearchParams(params);
    if (cat === 'all') next.delete('cat');
    else next.set('cat', cat);
    next.delete('q');
    setParams(next);
  };

  const filtered = useMemo(() => {
    let list = products;
    if (activeCategory !== 'all') list = list.filter(p => p.category === activeCategory);
    if (searchQuery) list = list.filter(p =>
      p.name.toLowerCase().includes(searchQuery) ||
      p.description.toLowerCase().includes(searchQuery) ||
      p.specs.some(s => s.toLowerCase().includes(searchQuery))
    );
    return getSortedProducts(list, sort);
  }, [activeCategory, searchQuery, sort]);

  return (
    <main className="catalog page-enter">
      <div className="container">
        {/* Header */}
        <div className="catalog-header">
          <div>
            <h1 className="catalog-title">
              {searchQuery
                ? `Results for "${searchQuery}"`
                : activeCategory === 'all'
                ? 'All Products'
                : categories.find(c => c.id === activeCategory)?.label}
            </h1>
            <p className="catalog-count">
              <span className="count-num">{filtered.length}</span> product{filtered.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="catalog-sort">
            <label htmlFor="sort-select" className="sort-label">Sort by</label>
            <select
              id="sort-select"
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="sort-select"
            >
              {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="category-pills" role="tablist" aria-label="Filter by category">
          {categories.map(cat => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`pill${activeCategory === cat.id ? ' active' : ''}`}
              onClick={() => setCategory(cat.id)}
            >
              {cat.label}
              <span className="pill-count">
                {cat.id === 'all' ? products.length : products.filter(p => p.category === cat.id).length}
              </span>
            </button>
          ))}
        </div>

        {/* Search active notice */}
        {searchQuery && (
          <div className="search-notice">
            <span>Showing results for <strong>"{searchQuery}"</strong></span>
            <button onClick={() => { const n = new URLSearchParams(params); n.delete('q'); setParams(n); }}>
              Clear search ×
            </button>
          </div>
        )}

        {/* Grid or empty */}
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-emoji">🔍</div>
            <h3>No products found</h3>
            <p>Try a different search term or browse all categories.</p>
            <button className="btn-primary" onClick={() => { setParams({}); setSort('default'); }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="catalog-grid">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
