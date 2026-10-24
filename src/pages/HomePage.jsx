import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Zap, Shield, Truck, ChevronRight } from 'lucide-react';
import Instagram from '../components/icons/Instagram';
import ProductCard from '../components/ProductCard';
import { getFeaturedProducts } from '../data/products';
import './HomePage.css';

const INSTAGRAM_URL = 'https://www.instagram.com/perfectfit.factory/';

const CATEGORIES = [
  {
    id: 'tshirts',
    label: 'T-Shirts',
    description: 'Premium everyday essentials',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
  },
  {
    id: 'oversized',
    label: 'Oversized',
    description: 'Drop-shoulder streetwear cuts',
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600&q=80',
  },
  {
    id: 'hoodies',
    label: 'Hoodies',
    description: 'Heavyweight fleece pullovers',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80',
  },
  {
    id: 'custom',
    label: 'Custom Print',
    description: 'Your design, any garment',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80',
  },
];

const VALUES = [
  {
    icon: <Zap size={24} />,
    title: 'Premium Quality',
    description: 'We source only the finest fabrics — heavyweight cottons, French terry fleece and sustainable materials.',
  },
  {
    icon: <Star size={24} />,
    title: 'Custom Craftsmanship',
    description: 'Every piece is crafted to your specification. DTF, DTG and screen printing to bring any design to life.',
  },
  {
    icon: <Shield size={24} />,
    title: 'Guaranteed Satisfaction',
    description: 'We stand behind every order. If the quality isn\'t right, we make it right — no questions asked.',
  },
  {
    icon: <Truck size={24} />,
    title: 'Pan-India Delivery',
    description: 'We ship custom and bulk orders across India with careful packaging and reliable delivery partners.',
  },
];

const PROCESS_STEPS = [
  { step: '01', title: 'Share Your Idea', description: 'Tell us what you\'re looking for — product type, design concept, quantities and timeline.' },
  { step: '02', title: 'We Discuss', description: 'Our team reviews your requirements and suggests the best printing method, fabric and fit.' },
  { step: '03', title: 'Get Your Quote', description: 'Receive a transparent, itemised quotation with no hidden costs. Pre-production samples available.' },
  { step: '04', title: 'Confirm & Create', description: 'Approve your design proof, confirm the order and let us bring it to life.' },
];

const LOOKBOOK_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&q=80', alt: 'Premium white tee close-up', span: 'tall' },
  { src: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&q=80', alt: 'Oversized tee editorial', span: '' },
  { src: 'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=500&q=80', alt: 'Hoodie styling', span: '' },
  { src: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80', alt: 'Custom print detail', span: 'wide' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80', alt: 'Streetwear look', span: '' },
];

export default function HomePage() {
  const featured = getFeaturedProducts();

  useEffect(() => {
    document.title = 'Perfect Fit Factory — Premium Custom Apparel';
  }, []);

  return (
    <div className="home-page">

      {/* ── Hero ── */}
      <section className="hero" aria-label="Hero">
        <div className="hero-bg">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=85"
            alt="Premium custom apparel editorial"
            className="hero-img"
          />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content container">
          <div className="hero-text animate-fade-up">
            <h1 className="hero-headline">
              Wear Your
              <br />
              <em className="hero-accent">Identity.</em>
            </h1>
            <p className="hero-sub">
              Premium custom T-shirts, oversized tees, hoodies, and bespoke merchandise —
              crafted to perfection with high-definition DTF printing.
            </p>
            <div className="hero-ctas">
              <Link to="/shop" className="btn btn-accent btn-lg">
                Shop Collection
                <ArrowRight size={18} />
              </Link>
              <Link to="/custom-printing" className="btn btn-outline-light btn-lg">
                Custom Printing
              </Link>
            </div>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num">500+</span>
              <span className="hero-stat-label">Orders fulfilled</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-num">15+</span>
              <span className="hero-stat-label">Print options</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-num">Pan-India</span>
              <span className="hero-stat-label">Delivery</span>
            </div>
          </div>
        </div>
        <div className="hero-scroll-hint" aria-hidden="true">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="section home-featured" aria-labelledby="featured-title">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="section-label">Featured Collection</div>
              <h2 className="section-title" id="featured-title">Our Best Picks</h2>
              <p className="section-subtitle">
                Handpicked styles from our premium collection — built for those who don't settle for ordinary.
              </p>
            </div>
            <Link to="/shop" className="btn btn-outline view-all-btn">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="products-grid">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Shop by Category ── */}
      <section className="section home-categories" aria-labelledby="categories-title">
        <div className="container">
          <div className="section-label">Browse by Style</div>
          <h2 className="section-title" id="categories-title">Shop the Collection</h2>
          <div className="categories-grid">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/shop?category=${cat.id}`}
                className="category-card"
                aria-label={`Shop ${cat.label}`}
              >
                <div className="category-card-img-wrap">
                  <img src={cat.image} alt={cat.label} className="category-card-img" loading="lazy" />
                  <div className="category-card-overlay" />
                </div>
                <div className="category-card-info">
                  <h3 className="category-card-label">{cat.label}</h3>
                  <p className="category-card-desc">{cat.description}</p>
                  <span className="category-card-cta">
                    Shop Now <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Custom Printing Banner ── */}
      <section className="home-custom-banner" aria-labelledby="custom-banner-title">
        <div className="custom-banner-img-wrap">
          <img
            src="https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=1400&q=80"
            alt="Custom print production"
            className="custom-banner-img"
            loading="lazy"
          />
          <div className="custom-banner-overlay" />
        </div>
        <div className="container custom-banner-content">
          <div className="custom-banner-text">
            <div className="section-label" style={{ color: 'var(--color-accent-light)' }}>
              Custom Printing
            </div>
            <h2 className="section-title text-white" id="custom-banner-title">
              Your Design.
              <br />
              Our Craft.
            </h2>
            <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '480px' }}>
              Screen printing, DTF and DTG options for personal prints, brand merchandise,
              college events and corporate uniforms. Minimum 1 piece — no order is too small or too large.
            </p>
            <div className="custom-banner-ctas">
              <Link to="/custom-printing" className="btn btn-accent btn-lg">
                Start Your Order
                <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="btn btn-outline-light">
                Talk to Us
              </Link>
            </div>
          </div>
          <div className="custom-banner-features">
            {['Personal Prints', 'College Events', 'Corporate Apparel', 'Team Uniforms', 'Brand Merchandise', 'Bulk Orders'].map((f) => (
              <div key={f} className="custom-feature-pill">
                <ChevronRight size={12} />
                {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Value Proposition ── */}
      <section className="section home-values" aria-labelledby="values-title">
        <div className="container">
          <div className="section-header-center">
            <div className="section-label">Why Choose Us</div>
            <h2 className="section-title" id="values-title">Built on Quality &amp; Trust</h2>
          </div>
          <div className="values-grid">
            {VALUES.map(({ icon, title, description }) => (
              <div className="value-card" key={title}>
                <div className="value-icon">{icon}</div>
                <h3 className="value-title">{title}</h3>
                <p className="value-desc">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand Atelier & Official Crest Showcase ── */}
      <section className="home-atelier" aria-label="Brand Atelier">
        <div className="container">
          <div className="atelier-inner">
            <div className="atelier-crest-wrap">
              <img src="/logo.jpg" alt="Perfect Fit Official Logo Crest" className="atelier-crest-img" />
              <div className="atelier-crest-glow" />
            </div>
            <div className="atelier-content">
              <span className="section-label" style={{ color: 'var(--color-accent-light)' }}>Official Atelier</span>
              <h2 className="atelier-title">DTF &amp; Custom Print Perfection</h2>
              <p className="atelier-motto">"STYLE THAT FITS. CONFIDENCE THAT SHOWS."</p>
              <p className="atelier-desc">
                From precision Direct-to-Film (DTF) transfers to bespoke apparel engineering, Perfect Fit ensures each garment embodies supreme comfort, vivid wash-fast colors, and tailored distinction.
              </p>
              <div className="atelier-features">
                <div className="atelier-feature">
                  <span className="feature-dot">✦</span> High-Definition DTF Transfers
                </div>
                <div className="atelier-feature">
                  <span className="feature-dot">✦</span> Pure Ring-Spun &amp; Heavy Terry Cotton
                </div>
                <div className="atelier-feature">
                  <span className="feature-dot">✦</span> Single Pieces to Bulk Fleet Orders
                </div>
              </div>
              <div className="atelier-actions">
                <Link to="/custom-printing" className="btn btn-accent">
                  Explore Custom Printing <ArrowRight size={16} />
                </Link>
                <Link to="/about" className="btn btn-outline-light">
                  Our Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Lookbook ── */}
      <section className="section home-lookbook" aria-labelledby="lookbook-title">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="section-label">Lookbook</div>
              <h2 className="section-title" id="lookbook-title">The Aesthetic</h2>
            </div>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <Instagram size={16} />
              Follow for Inspiration
            </a>
          </div>
          <div className="lookbook-grid">
            {LOOKBOOK_IMAGES.map(({ src, alt, span }) => (
              <div key={src} className={`lookbook-item${span ? ` lookbook-${span}` : ''}`}>
                <img src={src} alt={alt} className="lookbook-img" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="section home-process" aria-labelledby="process-title">
        <div className="container">
          <div className="section-header-center">
            <div className="section-label">How It Works</div>
            <h2 className="section-title" id="process-title">From Idea to Doorstep</h2>
            <p className="section-subtitle" style={{ margin: '1rem auto 0', textAlign: 'center' }}>
              Getting custom apparel has never been simpler. Share your vision and we handle the rest.
            </p>
          </div>
          <div className="process-steps">
            {PROCESS_STEPS.map(({ step, title, description }, i) => (
              <div className="process-step" key={step}>
                <div className="process-step-num">{step}</div>
                {i < PROCESS_STEPS.length - 1 && <div className="process-connector" aria-hidden="true" />}
                <div className="process-step-body">
                  <h3 className="process-step-title">{title}</h3>
                  <p className="process-step-desc">{description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="process-cta-wrap">
            <Link to="/custom-printing" className="btn btn-primary btn-lg">
              Start a Custom Order
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Instagram Section ── */}
      <section className="home-instagram" aria-labelledby="instagram-title">
        <div className="container">
          <div className="instagram-inner">
            <div className="instagram-icon">
              <Instagram size={32} />
            </div>
            <h2 className="instagram-title" id="instagram-title">
              Follow Our Journey
            </h2>
            <p className="instagram-sub">
              Behind-the-scenes, new drops and styling inspiration — all on Instagram.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark-outline instagram-btn"
              aria-label="Follow Perfect Fit Factory on Instagram"
            >
              <Instagram size={18} />
              @perfectfit.factory
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
