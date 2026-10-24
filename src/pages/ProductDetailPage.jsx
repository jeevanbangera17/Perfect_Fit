import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, ChevronLeft, ChevronRight, Minus, Plus, Check } from 'lucide-react';
import Instagram from '../components/icons/Instagram';
import ProductCard from '../components/ProductCard';
import { getProductBySlug, getRelatedProducts } from '../data/products';
import { formatPrice, getDiscountPercent, buildProductEnquiryMessage, buildWhatsAppUrl } from '../utils/helpers';
import './ProductDetailPage.css';

const WA_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);

  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [customNote, setCustomNote] = useState('');
  const [errors, setErrors] = useState({});
  const [enquirySent, setEnquirySent] = useState(false);

  const [prevSlug, setPrevSlug] = useState(slug);
  if (prevSlug !== slug) {
    setPrevSlug(slug);
    setActiveImg(0);
    setSelectedSize('');
    setSelectedColor(product?.colors?.[0]?.name || '');
    setQuantity(1);
    setCustomNote('');
    setErrors({});
    setEnquirySent(false);
  }

  useEffect(() => {
    if (!product) return;
    document.title = `${product.name} — Perfect Fit Factory`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  if (!product) {
    return (
      <div className="product-not-found">
        <h1>Product Not Found</h1>
        <p>The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/shop" className="btn btn-primary">Back to Shop</Link>
      </div>
    );
  }

  const related = getRelatedProducts(product, 4);
  const discount = getDiscountPercent(product.price, product.originalPrice);

  const validate = () => {
    const errs = {};
    if (!product.isQuoteBased && product.sizes?.length > 0 && !selectedSize) {
      errs.size = 'Please select a size.';
    }
    return errs;
  };

  const handleWhatsApp = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    const message = buildProductEnquiryMessage(product, {
      size: selectedSize,
      color: selectedColor,
      quantity,
      customNote,
    });

    if (!WA_NUMBER) {
      window.open('https://www.instagram.com/perfectfit.factory/', '_blank');
      return;
    }
    window.open(buildWhatsAppUrl(WA_NUMBER, message), '_blank');
    setEnquirySent(true);
  };

  const prevImg = () => setActiveImg((i) => (i === 0 ? product.images.length - 1 : i - 1));
  const nextImg = () => setActiveImg((i) => (i === product.images.length - 1 ? 0 : i + 1));

  return (
    <div className="product-detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/shop" className="breadcrumb-link">
              <ArrowLeft size={14} />
              Shop
            </Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main product section */}
      <div className="container product-main">
        {/* Gallery */}
        <div className="product-gallery">
          <div className="product-main-img-wrap">
            <img
              src={product.images[activeImg]}
              alt={`${product.name} — view ${activeImg + 1}`}
              className="product-main-img"
            />
            {/* Nav arrows */}
            {product.images.length > 1 && (
              <>
                <button className="gallery-btn gallery-prev" onClick={prevImg} aria-label="Previous image">
                  <ChevronLeft size={20} />
                </button>
                <button className="gallery-btn gallery-next" onClick={nextImg} aria-label="Next image">
                  <ChevronRight size={20} />
                </button>
              </>
            )}
            {/* Badges */}
            <div className="product-detail-badges">
              {product.isNew && <span className="badge badge-accent">New</span>}
              {product.isQuoteBased && <span className="badge badge-dark">Quote Based</span>}
              {discount > 0 && <span className="badge badge-success">-{discount}% off</span>}
            </div>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="product-thumbnails">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  className={`thumbnail${i === activeImg ? ' active' : ''}`}
                  onClick={() => setActiveImg(i)}
                  aria-label={`View image ${i + 1}`}
                  aria-pressed={i === activeImg}
                >
                  <img src={img} alt={`${product.name} thumbnail ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="product-info">
          <div className="product-info-category">{product.categoryLabel}</div>
          <h1 className="product-info-name">{product.name}</h1>

          <div className="product-info-pricing">
            {product.isQuoteBased ? (
              <div className="price-quote-block">
                <span className="price-quote-label">Price on Request</span>
                <p className="price-quote-note">
                  We'll share a detailed quote based on your requirements and quantity.
                </p>
              </div>
            ) : (
              <div className="price-block">
                <span className="price-main">{formatPrice(product.price)}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="price-original">{formatPrice(product.originalPrice)}</span>
                    <span className="price-discount">{discount}% off</span>
                  </>
                )}
              </div>
            )}
          </div>

          <p className="product-info-desc">{product.description}</p>

          {/* Features */}
          {product.features?.length > 0 && (
            <ul className="product-features">
              {product.features.map((f) => (
                <li key={f} className="product-feature">
                  <Check size={14} />
                  {f}
                </li>
              ))}
            </ul>
          )}

          {/* Size selection */}
          {product.sizes?.length > 0 && (
            <div className="product-option-group">
              <div className="option-label-row">
                <span className="option-label">Size</span>
                {selectedSize && <span className="selected-indicator">{selectedSize}</span>}
              </div>
              <div className="size-chips">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-chip${selectedSize === size ? ' active' : ''}`}
                    onClick={() => { setSelectedSize(size); setErrors((e) => ({ ...e, size: undefined })); }}
                    aria-pressed={selectedSize === size}
                    aria-label={`Size ${size}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {errors.size && <p className="form-error">{errors.size}</p>}
            </div>
          )}

          {/* Colour selection */}
          {product.colors?.length > 0 && (
            <div className="product-option-group">
              <div className="option-label-row">
                <span className="option-label">Colour</span>
                {selectedColor && <span className="selected-indicator">{selectedColor}</span>}
              </div>
              <div className="color-swatches">
                {product.colors.map(({ name, hex }) => (
                  <button
                    key={name}
                    className={`color-swatch${selectedColor === name ? ' active' : ''}`}
                    style={{ '--swatch-color': hex }}
                    onClick={() => setSelectedColor(name)}
                    aria-label={`Colour: ${name}`}
                    aria-pressed={selectedColor === name}
                    title={name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="product-option-group">
            <span className="option-label">Quantity</span>
            <div className="qty-control">
              <button
                className="qty-btn"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <span className="qty-value" aria-live="polite">{quantity}</span>
              <button
                className="qty-btn"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Custom notes */}
          <div className="product-option-group">
            <label htmlFor="custom-note" className="option-label">
              Design / Customisation Notes <span className="optional">(optional)</span>
            </label>
            <textarea
              id="custom-note"
              className="form-textarea"
              placeholder="Describe your custom requirements, print placement, colours, text, logo, etc."
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="product-actions">
            {enquirySent ? (
              <div className="enquiry-sent-msg">
                <Check size={18} />
                WhatsApp opened! We'll get back to you shortly.
              </div>
            ) : (
              <button className="btn btn-whatsapp btn-lg btn-full" onClick={handleWhatsApp}>
                <MessageCircle size={18} />
                {WA_NUMBER ? 'Enquire on WhatsApp' : 'Contact via Instagram'}
              </button>
            )}

            {!WA_NUMBER && (
              <a
                href="https://www.instagram.com/perfectfit.factory/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-full"
              >
                <Instagram size={16} />
                @perfectfit.factory
              </a>
            )}
          </div>

          {/* Brand Seal */}
          <div className="product-brand-seal">
            <img src="/logo.jpg" alt="Perfect Fit Official Crest" className="product-brand-seal-img" />
            <div className="product-brand-seal-text">
              <span className="seal-title">PERFECT FIT ATELIER</span>
              <span className="seal-desc">Guaranteed High-Density DTF Print &amp; Premium Cotton</span>
            </div>
          </div>

          {/* Availability note */}
          <p className="availability-note">
            {product.inStock
              ? '✓ Available · Shipped within 7–10 business days after order confirmation.'
              : '⚠ Currently out of stock · Contact us for availability.'}
          </p>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="related-section section" aria-labelledby="related-title">
          <div className="container">
            <div className="section-label">You May Also Like</div>
            <h2 className="section-title" id="related-title">Related Products</h2>
            <div className="related-grid">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
