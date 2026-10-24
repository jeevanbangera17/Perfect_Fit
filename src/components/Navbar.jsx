import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ChevronRight, MessageCircle } from 'lucide-react';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'Shop' },
  { to: '/custom-printing', label: 'Custom Printing' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="navbar-wrap">
      {/* Announcement Bar */}
      <div className="announce-bar">
        <span>✦</span>
        <span>Free design consultation · WhatsApp us for custom orders</span>
        <span>✦</span>
        <a href="https://www.instagram.com/perfectfit.factory/" target="_blank" rel="noopener noreferrer">
          Follow @perfectfit.factory
        </a>
      </div>

      {/* Main Navbar */}
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo" aria-label="Perfect Fit — Home">
            <div className="navbar-logo-badge">
              <img src="/logo.jpg" alt="Perfect Fit Emblem" className="navbar-logo-img" />
            </div>
            <div className="navbar-logo-text">
              <span className="logo-main">Perfect Fit</span>
              <span className="logo-sub">DTF & Custom Print</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="navbar-nav" role="menubar">
            {NAV_LINKS.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                role="menuitem"
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Actions */}
          <div className="navbar-actions">
            <Link to="/custom-printing" className="nav-enquiry-btn">
              <MessageCircle size={14} />
              Get a Quote
            </Link>
            <button
              className="mobile-menu-btn"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu" id="mobile-menu" role="dialog" aria-label="Navigation menu" aria-modal="true">
          <div className="mobile-menu-overlay" onClick={closeMenu} aria-hidden="true" />
          <div className="mobile-menu-panel">
            <div className="mobile-menu-header">
              <Link to="/" className="navbar-logo" onClick={closeMenu}>
                <div className="navbar-logo-badge">
                  <img src="/logo.jpg" alt="Perfect Fit Emblem" className="navbar-logo-img" />
                </div>
                <div className="navbar-logo-text">
                  <span className="logo-main">Perfect Fit</span>
                  <span className="logo-sub">DTF & Custom Print</span>
                </div>
              </Link>
              <button
                onClick={closeMenu}
                className="nav-icon-btn"
                aria-label="Close navigation menu"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="mobile-nav-links" aria-label="Mobile navigation">
              {NAV_LINKS.map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}
                  onClick={closeMenu}
                >
                  {label}
                  <ChevronRight size={18} />
                </NavLink>
              ))}
            </nav>

            <div className="mobile-menu-footer">
              <Link
                to="/custom-printing"
                className="btn btn-primary btn-full"
                onClick={closeMenu}
              >
                <MessageCircle size={16} />
                Get a Custom Quote
              </Link>
              <a
                href="https://www.instagram.com/perfectfit.factory/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-full"
                onClick={closeMenu}
              >
                Follow on Instagram
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
