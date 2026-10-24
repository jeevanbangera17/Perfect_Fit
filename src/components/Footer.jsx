import { Link } from 'react-router-dom';
import { MessageCircle, ChevronRight, ArrowUp } from 'lucide-react';
import Instagram from './icons/Instagram';
import './Footer.css';

const CURRENT_YEAR = new Date().getFullYear();

const SHOP_LINKS = [
  { to: '/shop?category=tshirts', label: 'T-Shirts' },
  { to: '/shop?category=oversized', label: 'Oversized T-Shirts' },
  { to: '/shop?category=hoodies', label: 'Hoodies' },
  { to: '/shop?category=custom', label: 'Custom Printing' },
  { to: '/shop?category=bulk', label: 'Bulk Orders' },
];

const COMPANY_LINKS = [
  { to: '/about', label: 'Our Story' },
  { to: '/custom-printing', label: 'Custom Printing' },
  { to: '/contact', label: 'Contact Us' },
  { to: '/admin', label: 'Admin' },
];

const POLICY_LINKS = [
  { label: 'Privacy Policy' },
  { label: 'Terms & Conditions' },
  { label: 'Shipping Policy' },
  { label: 'Returns Policy' },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            {/* Brand col */}
            <div className="footer-brand">
              <Link to="/" className="footer-brand-header">
                <img src="/logo.jpg" alt="Perfect Fit Logo" className="footer-logo-img" />
                <div className="footer-logo">
                  <span className="footer-logo-main">Perfect Fit</span>
                  <span className="footer-logo-sub">DTF & Custom Print</span>
                </div>
              </Link>
              <p className="footer-motto">"Style that fits. Confidence that shows."</p>
              <p className="footer-tagline">
                Premium custom apparel crafted for individuals, brands, and teams. Wear your identity.
              </p>
              <div className="footer-social">
                <a
                  href="https://www.instagram.com/perfectfit.factory/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Perfect Fit Factory on Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://wa.me/?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20custom%20apparel."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link whatsapp"
                  aria-label="WhatsApp enquiry"
                >
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>

            {/* Shop links */}
            <div className="footer-col">
              <h3 className="footer-col-title">Shop</h3>
              <ul className="footer-links">
                {SHOP_LINKS.map(({ to, label }) => (
                  <li key={label}>
                    <Link to={to} className="footer-link">
                      <ChevronRight size={12} />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company links */}
            <div className="footer-col">
              <h3 className="footer-col-title">Company</h3>
              <ul className="footer-links">
                {COMPANY_LINKS.map(({ to, label }) => (
                  <li key={label}>
                    <Link to={to} className="footer-link">
                      <ChevronRight size={12} />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact col */}
            <div className="footer-col">
              <h3 className="footer-col-title">Get in Touch</h3>
              <p className="footer-contact-note">
                For enquiries, custom orders, and bulk pricing, reach us on Instagram or WhatsApp.
              </p>
              <div className="footer-contact-links">
                <a
                  href="https://www.instagram.com/perfectfit.factory/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-contact-btn"
                >
                  <Instagram size={16} />
                  @perfectfit.factory
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <p className="footer-copy">
              © {CURRENT_YEAR} Perfect Fit Factory. All rights reserved. Style that fits. Confidence that shows.
            </p>
            <div className="footer-policy-links">
              {POLICY_LINKS.map(({ label }) => (
                <span key={label} className="policy-link">{label}</span>
              ))}
            </div>
            <button
              className="back-to-top"
              onClick={scrollToTop}
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
