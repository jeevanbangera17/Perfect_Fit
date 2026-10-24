/**
 * Utility functions for Perfect Fit Factory
 * NOTE: formatPrice, buildWhatsAppUrl and validateForm are used by frontend demo.
 * When backend is integrated, buildWhatsAppUrl will remain client-side only.
 */

/**
 * Format a number as Indian Rupees
 * @param {number} amount
 * @returns {string}
 */
export const formatPrice = (amount) => {
  if (amount === null || amount === undefined) return 'Get a Quote';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Calculate discount percentage
 * @param {number} price
 * @param {number} originalPrice
 * @returns {number}
 */
export const getDiscountPercent = (price, originalPrice) => {
  if (!price || !originalPrice) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};

/**
 * Build a WhatsApp message URL
 * @param {string} phoneNumber - E.164 format without + (e.g., "919876543210")
 * @param {string} message - Plain text message
 * @returns {string} wa.me URL
 */
export const buildWhatsAppUrl = (phoneNumber, message) => {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encoded}`;
};

/**
 * Build a product enquiry WhatsApp message
 * @param {object} product
 * @param {object} selections - { size, color, quantity, customNote }
 * @returns {string} formatted message
 */
export const buildProductEnquiryMessage = (product, selections = {}) => {
  const { size, color, quantity = 1, customNote = '' } = selections;
  const priceText = product.price ? formatPrice(product.price) : 'Quote Required';

  let message = `Hi! I'm interested in:\n\n`;
  message += `*Product:* ${product.name}\n`;
  message += `*Category:* ${product.categoryLabel}\n`;
  message += `*Price:* ${priceText}\n`;
  if (size) message += `*Size:* ${size}\n`;
  if (color) message += `*Colour:* ${color}\n`;
  if (quantity) message += `*Quantity:* ${quantity}\n`;
  if (customNote) message += `*Custom Requirement:* ${customNote}\n`;
  message += `\nPlease share availability and details. Thank you!`;

  return message;
};

/**
 * Build a general enquiry WhatsApp message
 * @param {object} formData
 * @returns {string}
 */
export const buildGeneralEnquiryMessage = (formData) => {
  const { name, productType, quantity, designRequirements } = formData;
  let message = `Hi! I'd like to enquire about a custom order.\n\n`;
  if (name) message += `*Name:* ${name}\n`;
  if (productType) message += `*Product Type:* ${productType}\n`;
  if (quantity) message += `*Quantity:* ${quantity}\n`;
  if (designRequirements) message += `*Design Requirements:* ${designRequirements}\n`;
  message += `\nPlease get back to me with a quotation. Thank you!`;
  return message;
};

/**
 * Validate a contact/enquiry form
 * @param {object} fields
 * @returns {{ isValid: boolean, errors: object }}
 */
export const validateForm = (fields) => {
  const errors = {};

  if (!fields.name || fields.name.trim().length < 2) {
    errors.name = 'Please enter your full name.';
  }

  if (!fields.email && !fields.phone) {
    errors.contact = 'Please provide an email address or phone number.';
  }

  if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (fields.phone && !/^[6-9]\d{9}$/.test(fields.phone.replace(/\s/g, ''))) {
    errors.phone = 'Please enter a valid 10-digit Indian mobile number.';
  }

  if (fields.quantity && (isNaN(fields.quantity) || Number(fields.quantity) < 1)) {
    errors.quantity = 'Quantity must be at least 1.';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};

/**
 * Truncate text to a given length
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export const truncateText = (text, maxLength = 120) => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '…';
};

/**
 * Debounce a function
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
export const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Scroll to top of page
 */
export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
