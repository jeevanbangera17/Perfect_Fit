import { Link } from 'react-router-dom';
import { MessageCircle, Tag } from 'lucide-react';
import { formatPrice, getDiscountPercent, buildProductEnquiryMessage, buildWhatsAppUrl } from '../utils/helpers';
import './ProductCard.css';

const WA_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '';

export default function ProductCard({ product }) {
  const { slug, name, categoryLabel, price, originalPrice, images, isFeatured, isNew, isQuoteBased } = product;
  const discount = getDiscountPercent(price, originalPrice);

  const handleWhatsApp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!WA_NUMBER) {
      window.open('https://www.instagram.com/perfectfit.factory/', '_blank');
      return;
    }
    const message = buildProductEnquiryMessage(product);
    window.open(buildWhatsAppUrl(WA_NUMBER, message), '_blank');
  };

  return (
    <article className="product-card">
      <Link to={`/shop/${slug}`} className="product-card-img-wrap" aria-label={`View ${name}`}>
        <img
          src={images[0]}
          alt={name}
          className="product-card-img"
          loading="lazy"
        />
        {/* Badges */}
        <div className="product-card-badges">
          {isNew && <span className="badge badge-accent">New</span>}
          {isFeatured && <span className="badge badge-dark">Featured</span>}
          {isQuoteBased && <span className="badge badge-dark">Quote</span>}
          {discount > 0 && <span className="badge badge-success">-{discount}%</span>}
        </div>
        {/* Quick action */}
        <div className="product-card-actions">
          <button
            className="btn btn-whatsapp btn-sm product-quick-wa"
            onClick={handleWhatsApp}
            aria-label={`WhatsApp enquiry for ${name}`}
          >
            <MessageCircle size={14} />
            Enquire
          </button>
        </div>
      </Link>

      <div className="product-card-body">
        <div className="product-card-meta">
          <span className="product-card-category">
            <Tag size={11} />
            {categoryLabel}
          </span>
        </div>
        <h3 className="product-card-name">
          <Link to={`/shop/${slug}`}>{name}</Link>
        </h3>
        <div className="product-card-pricing">
          {isQuoteBased ? (
            <span className="product-price-quote">Get a Quote</span>
          ) : (
            <>
              <span className="product-price">{formatPrice(price)}</span>
              {originalPrice && originalPrice > price && (
                <span className="product-price-original">{formatPrice(originalPrice)}</span>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  );
}
