import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronDown, Package } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, CATEGORIES } from '../data/products';
import { debounce } from '../utils/helpers';
import './ShopPage.css';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const activeCategory = searchParams.get('category') || 'all';
  const [sortBy, setSortBy] = useState('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    document.title = 'Shop — Perfect Fit Factory';
  }, []);

  const handleCategoryChange = (catId) => {
    const params = new URLSearchParams(searchParams);
    if (catId === 'all') {
      params.delete('category');
    } else {
      params.set('category', catId);
    }
    setSearchParams(params);
  };

  const handleSearch = useMemo(() => debounce((val) => setSearchQuery(val), 300), []);

  const filteredAndSorted = useMemo(() => {
    let result = [...products];

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((t) => t.includes(q)))
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'price-asc':
        result.sort((a, b) => (a.price ?? 999999) - (b.price ?? 999999));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  const activeCategoryLabel = CATEGORIES.find((c) => c.id === activeCategory)?.label || 'All Products';

  return (
    <div className="shop-page">
      {/* Page header */}
      <div className="shop-header">
        <div className="container">
          <div className="shop-header-inner">
            <div>
              <div className="section-label">Our Collection</div>
              <h1 className="shop-title">Shop All Products</h1>
            </div>
            <div className="shop-search-wrap">
              <div className="search-input-wrap">
                <Search size={16} className="search-icon" />
                <input
                  type="search"
                  placeholder="Search products…"
                  className="search-input"
                  onChange={(e) => handleSearch(e.target.value)}
                  aria-label="Search products"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container shop-body">
        {/* Toolbar */}
        <div className="shop-toolbar">
          {/* Category chips - desktop */}
          <div className="category-chips">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`category-chip${activeCategory === cat.id ? ' active' : ''}`}
                onClick={() => handleCategoryChange(cat.id)}
                aria-pressed={activeCategory === cat.id}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="shop-controls">
            <span className="product-count">
              {filteredAndSorted.length} {filteredAndSorted.length === 1 ? 'product' : 'products'}
            </span>
            <div className="sort-wrap">
              <label htmlFor="sort-select" className="sr-only">Sort by</label>
              <div className="select-wrap">
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="select-arrow" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile category filter */}
        <div className="mobile-filter-row">
          <button
            className="btn btn-outline btn-sm mobile-filter-btn"
            onClick={() => setFiltersOpen(!filtersOpen)}
            aria-expanded={filtersOpen}
          >
            <SlidersHorizontal size={14} />
            Filter: {activeCategoryLabel}
            <ChevronDown size={12} style={{ transform: filtersOpen ? 'rotate(180deg)' : '' }} />
          </button>
          {searchQuery && (
            <div className="active-search-pill">
              <Search size={12} />
              &ldquo;{searchQuery}&rdquo;
              <button onClick={() => { setSearchQuery(''); }} aria-label="Clear search">
                <X size={12} />
              </button>
            </div>
          )}
        </div>

        {filtersOpen && (
          <div className="mobile-category-list">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`category-chip${activeCategory === cat.id ? ' active' : ''}`}
                onClick={() => { handleCategoryChange(cat.id); setFiltersOpen(false); }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {filteredAndSorted.length > 0 ? (
          <div className="shop-products-grid">
            {filteredAndSorted.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">
              <Package size={48} />
            </div>
            <h2 className="empty-state-title">No products found</h2>
            <p className="empty-state-sub">
              {searchQuery
                ? `No results for "${searchQuery}". Try a different search term.`
                : 'No products in this category yet. Check back soon!'}
            </p>
            <button
              className="btn btn-primary"
              onClick={() => { setSearchQuery(''); handleCategoryChange('all'); }}
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
