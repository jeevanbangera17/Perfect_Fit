import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Edit2, Trash2, Eye, EyeOff, X, Check, AlertTriangle, Package, TrendingUp, Tag, LogOut } from 'lucide-react';
import { products as initialProducts, CATEGORIES } from '../../data/products';
import { formatPrice } from '../../utils/helpers';
import './AdminDashboardPage.css';

/**
 * IMPORTANT: This is a FRONTEND PROTOTYPE ONLY.
 * All data operations are in-memory and will reset on page refresh.
 * No real backend, authentication or security is implemented.
 * This prototype must NOT be used for actual administration until the
 * Flask backend with proper authentication is integrated.
 */

const EMPTY_PRODUCT = {
  name: '', category: 'tshirts', categoryLabel: 'T-Shirts', price: '', originalPrice: '',
  images: [''], description: '', sizes: [], colors: [], isFeatured: false, isNew: false,
  inStock: true, isQuoteBased: false, tags: '',
};

const CATEGORY_MAP = Object.fromEntries(CATEGORIES.filter(c => c.id !== 'all').map(c => [c.id, c.label]));

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([...initialProducts]);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [modal, setModal] = useState(null); // null | 'add' | 'edit' | 'delete'
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(EMPTY_PRODUCT);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    document.title = 'Admin Dashboard — Perfect Fit Factory';
    // Simple session check
    if (!sessionStorage.getItem('pff_admin_demo')) {
      navigate('/admin');
    }
  }, [navigate]);

  const showFeedback = (msg, type = 'success') => {
    setFeedback({ msg, type });
    setTimeout(() => setFeedback(null), 3500);
  };

  // Filtered list
  const filtered = productList.filter((p) => {
    const matchCat = filterCat === 'all' || p.category === filterCat;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.categoryLabel.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // Stats
  const stats = [
    { label: 'Total Products', value: productList.length, icon: <Package size={20} /> },
    { label: 'Featured', value: productList.filter(p => p.isFeatured).length, icon: <TrendingUp size={20} /> },
    { label: 'Quote-based', value: productList.filter(p => p.isQuoteBased).length, icon: <Tag size={20} /> },
    { label: 'New Arrivals', value: productList.filter(p => p.isNew).length, icon: <Check size={20} /> },
  ];

  const openAdd = () => {
    setFormData({ ...EMPTY_PRODUCT });
    setEditingProduct(null);
    setModal('add');
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      ...product,
      price: product.price ?? '',
      originalPrice: product.originalPrice ?? '',
      tags: Array.isArray(product.tags) ? product.tags.join(', ') : '',
      images: product.images?.length ? product.images : [''],
    });
    setModal('edit');
  };

  const openDelete = (product) => {
    setDeleteTarget(product);
    setModal('delete');
  };

  const closeModal = () => { setModal(null); setEditingProduct(null); setDeleteTarget(null); };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'category') {
      setFormData(f => ({ ...f, category: value, categoryLabel: CATEGORY_MAP[value] || value }));
    } else {
      setFormData(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const handleSave = () => {
    const processed = {
      ...formData,
      price: formData.price ? Number(formData.price) : null,
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
      tags: typeof formData.tags === 'string' ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : formData.tags,
      images: Array.isArray(formData.images) ? formData.images.filter(Boolean) : [formData.images],
      id: editingProduct?.id || `p${Date.now()}`,
      slug: formData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      createdAt: editingProduct?.createdAt || new Date().toISOString().split('T')[0],
    };

    if (modal === 'add') {
      setProductList(list => [...list, processed]);
      showFeedback('Product added successfully.');
    } else {
      setProductList(list => list.map(p => p.id === processed.id ? processed : p));
      showFeedback('Product updated successfully.');
    }
    closeModal();
  };

  const handleDelete = () => {
    setProductList(list => list.filter(p => p.id !== deleteTarget.id));
    showFeedback('Product deleted.', 'error');
    closeModal();
  };

  const toggleVisibility = (id) => {
    setProductList(list => list.map(p => p.id === id ? { ...p, inStock: !p.inStock } : p));
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <img src="/logo.jpg" alt="Perfect Fit Logo" className="admin-sidebar-logo-img" />
          <div className="admin-sidebar-logo-text">
            <span className="logo-main">Perfect Fit</span>
            <span className="logo-sub">DTF &amp; Custom Print</span>
          </div>
        </div>
        <nav className="admin-nav">
          <button className="admin-nav-item active">
            <Package size={18} /> Products
          </button>
        </nav>
        <button
          className="admin-logout"
          onClick={() => { sessionStorage.removeItem('pff_admin_demo'); navigate('/admin'); }}
        >
          <LogOut size={16} /> Sign Out
        </button>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        {/* Demo warning */}
        <div className="admin-prototype-banner" role="alert">
          <AlertTriangle size={16} />
          <span>
            <strong>Frontend Prototype Only.</strong> Data resets on page refresh. Not secured. Do not use for production administration.
          </span>
        </div>

        {/* Feedback toast */}
        {feedback && (
          <div className={`admin-feedback ${feedback.type}`} role="status">
            {feedback.type === 'success' ? <Check size={16} /> : <Trash2 size={16} />}
            {feedback.msg}
          </div>
        )}

        {/* Stats */}
        <div className="admin-stats-row">
          {stats.map(({ label, value, icon }) => (
            <div className="admin-stat-card" key={label}>
              <div className="admin-stat-icon">{icon}</div>
              <div className="admin-stat-num">{value}</div>
              <div className="admin-stat-label">{label}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="admin-toolbar">
          <h1 className="admin-page-title">Products</h1>
          <div className="admin-toolbar-right">
            <div className="search-input-wrap">
              <Search size={14} className="search-icon" />
              <input
                type="search"
                className="admin-search"
                placeholder="Search products…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                aria-label="Search products"
              />
            </div>
            <select
              className="admin-filter-select"
              value={filterCat}
              onChange={e => setFilterCat(e.target.value)}
              aria-label="Filter by category"
            >
              {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
            <button className="btn btn-primary" onClick={openAdd}>
              <Plus size={16} /> Add Product
            </button>
          </div>
        </div>

        {/* Product table */}
        {filtered.length === 0 ? (
          <div className="admin-empty">
            <Package size={36} />
            <p>No products found.</p>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table" aria-label="Products list">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Visibility</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(product => (
                  <tr key={product.id}>
                    <td>
                      <div className="admin-product-cell">
                        <img
                          src={product.images?.[0]}
                          alt={product.name}
                          className="admin-product-thumb"
                          loading="lazy"
                        />
                        <div>
                          <div className="admin-product-name">{product.name}</div>
                          <div className="admin-product-id">ID: {product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-outline">{product.categoryLabel}</span>
                    </td>
                    <td>
                      <span className="admin-price">
                        {product.isQuoteBased ? 'Quote' : (product.price ? formatPrice(product.price) : '—')}
                      </span>
                    </td>
                    <td>
                      <div className="admin-status-badges">
                        {product.isFeatured && <span className="badge badge-accent">Featured</span>}
                        {product.isNew && <span className="badge badge-dark">New</span>}
                      </div>
                    </td>
                    <td>
                      <button
                        className={`visibility-btn${product.inStock ? ' visible' : ' hidden-item'}`}
                        onClick={() => toggleVisibility(product.id)}
                        title={product.inStock ? 'In stock — click to mark out of stock' : 'Out of stock — click to restore'}
                        aria-label={`Toggle visibility for ${product.name}`}
                      >
                        {product.inStock ? <Eye size={16} /> : <EyeOff size={16} />}
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </button>
                    </td>
                    <td>
                      <div className="admin-row-actions">
                        <button className="admin-action-btn edit" onClick={() => openEdit(product)} title="Edit product" aria-label={`Edit ${product.name}`}>
                          <Edit2 size={14} />
                        </button>
                        <button className="admin-action-btn delete" onClick={() => openDelete(product)} title="Delete product" aria-label={`Delete ${product.name}`}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add / Edit Modal */}
        {(modal === 'add' || modal === 'edit') && (
          <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={modal === 'add' ? 'Add product' : 'Edit product'}>
            <div className="modal-panel">
              <div className="modal-header">
                <h2>{modal === 'add' ? 'Add New Product' : 'Edit Product'}</h2>
                <button className="modal-close" onClick={closeModal} aria-label="Close modal">
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body">
                <div className="modal-form-grid">
                  <div className="form-group">
                    <label className="form-label">Product Name *</label>
                    <input name="name" type="text" className="form-input" value={formData.name} onChange={handleFormChange} placeholder="e.g. Classic Tee" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Category *</label>
                    <select name="category" className="form-select" value={formData.category} onChange={handleFormChange}>
                      {CATEGORIES.filter(c => c.id !== 'all').map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Price (₹) — leave blank for quote-based</label>
                    <input name="price" type="number" className="form-input" value={formData.price} onChange={handleFormChange} placeholder="e.g. 899" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Original Price (₹)</label>
                    <input name="originalPrice" type="number" className="form-input" value={formData.originalPrice} onChange={handleFormChange} placeholder="e.g. 1299" />
                  </div>
                  <div className="form-group modal-full">
                    <label className="form-label">Image URL (primary)</label>
                    <input name="images" type="url" className="form-input" value={Array.isArray(formData.images) ? formData.images[0] : formData.images} onChange={(e) => setFormData(f => ({ ...f, images: [e.target.value] }))} placeholder="https://…" />
                  </div>
                  <div className="form-group modal-full">
                    <label className="form-label">Description</label>
                    <textarea name="description" className="form-textarea" value={formData.description} onChange={handleFormChange} rows={3} />
                  </div>
                  <div className="form-group modal-full">
                    <label className="form-label">Tags (comma-separated)</label>
                    <input name="tags" type="text" className="form-input" value={formData.tags} onChange={handleFormChange} placeholder="oversized, streetwear, heavyweight" />
                  </div>
                  <div className="modal-checkboxes">
                    {[
                      { name: 'isFeatured', label: 'Featured' },
                      { name: 'isNew', label: 'New Arrival' },
                      { name: 'inStock', label: 'In Stock' },
                      { name: 'isQuoteBased', label: 'Quote-Based Pricing' },
                    ].map(({ name, label }) => (
                      <label key={name} className="checkbox-label">
                        <input type="checkbox" name={name} checked={!!formData[name]} onChange={handleFormChange} />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSave}>
                  <Check size={16} />
                  {modal === 'add' ? 'Add Product' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete confirmation */}
        {modal === 'delete' && deleteTarget && (
          <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Confirm deletion">
            <div className="modal-panel modal-sm">
              <div className="modal-header">
                <h2>Delete Product?</h2>
                <button className="modal-close" onClick={closeModal} aria-label="Cancel deletion"><X size={20} /></button>
              </div>
              <div className="modal-body">
                <p className="delete-confirm-msg">
                  Are you sure you want to delete <strong>{deleteTarget.name}</strong>?
                  This action is irreversible in a real system.
                </p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
                <button className="btn btn-delete" onClick={handleDelete}>
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
