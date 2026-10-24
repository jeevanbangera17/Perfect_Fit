/**
 * API Service Layer — Perfect Fit Factory
 *
 * NOTE: All functions in this file currently use LOCAL DEMO DATA.
 * When the Flask/MongoDB backend is ready, replace each function body
 * with the corresponding fetch() or axios call.
 *
 * Pattern for future replacement:
 *   const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
 *   const response = await fetch(`${BASE_URL}/api/products`);
 *   return response.json();
 */

import {
  products,
  getFeaturedProducts,
  getNewProducts,
  getProductById,
  getProductBySlug,
  getProductsByCategory,
  getRelatedProducts,
} from '../data/products';

// Simulate async network delay for realistic UX development
const simulateDelay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  /**
   * Fetch all products
   * @returns {Promise<Array>}
   */
  async getProducts() {
    await simulateDelay();
    return [...products];
  },

  /**
   * Fetch featured products
   * @returns {Promise<Array>}
   */
  async getFeaturedProducts() {
    await simulateDelay();
    return getFeaturedProducts();
  },

  /**
   * Fetch new arrivals
   * @returns {Promise<Array>}
   */
  async getNewProducts() {
    await simulateDelay();
    return getNewProducts();
  },

  /**
   * Fetch a single product by ID
   * @param {string} id
   * @returns {Promise<object|null>}
   */
  async getProductById(id) {
    await simulateDelay();
    return getProductById(id) || null;
  },

  /**
   * Fetch a single product by slug
   * @param {string} slug
   * @returns {Promise<object|null>}
   */
  async getProductBySlug(slug) {
    await simulateDelay();
    return getProductBySlug(slug) || null;
  },

  /**
   * Fetch products by category
   * @param {string} category
   * @returns {Promise<Array>}
   */
  async getProductsByCategory(category) {
    await simulateDelay();
    return getProductsByCategory(category);
  },

  /**
   * Fetch related products
   * @param {object} product
   * @param {number} limit
   * @returns {Promise<Array>}
   */
  async getRelatedProducts(product, limit = 4) {
    await simulateDelay(150);
    return getRelatedProducts(product, limit);
  },

  /**
   * Submit a contact enquiry (demo: logs to console)
   * @param {object} formData
   * @returns {Promise<{ success: boolean }>}
   */
  async submitEnquiry(formData) {
    await simulateDelay(500);
    console.log('[DEMO] Enquiry submitted:', formData);
    // TODO: POST to /api/enquiries when backend is ready
    return { success: true };
  },

  // ─── Admin endpoints (demo only) ───────────────────────────────────────────

  /**
   * Add a new product (demo: returns product with generated id)
   * @param {object} productData
   * @returns {Promise<object>}
   */
  async adminAddProduct(productData) {
    await simulateDelay(400);
    const newProduct = { ...productData, id: `p${Date.now()}`, createdAt: new Date().toISOString() };
    console.log('[DEMO] Product added:', newProduct);
    return newProduct;
  },

  /**
   * Update a product (demo)
   * @param {string} id
   * @param {object} updates
   * @returns {Promise<object>}
   */
  async adminUpdateProduct(id, updates) {
    await simulateDelay(400);
    console.log('[DEMO] Product updated:', id, updates);
    return { id, ...updates };
  },

  /**
   * Delete a product (demo)
   * @param {string} id
   * @returns {Promise<{ success: boolean }>}
   */
  async adminDeleteProduct(id) {
    await simulateDelay(300);
    console.log('[DEMO] Product deleted:', id);
    return { success: true };
  },
};
