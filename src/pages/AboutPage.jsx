import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Instagram from '../components/icons/Instagram';
import './AboutPage.css';

export default function AboutPage() {
  useEffect(() => {
    document.title = 'About — Perfect Fit Factory';
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="about-page">
      {/* Hero */}
      <div className="about-hero">
        <div className="about-hero-img-wrap">
          <img
            src="https://images.unsplash.com/photo-1603217039863-aa0c865404f7?w=1600&q=80"
            alt="About Perfect Fit Factory"
            className="about-hero-img"
          />
          <div className="about-hero-overlay" />
        </div>
        <div className="container about-hero-content">
          <div className="section-label" style={{ color: 'var(--color-accent-light)' }}>Our Story</div>
          <h1 className="about-hero-title">More Than a Tee.<br /><em>An Identity.</em></h1>
        </div>
      </div>

      {/* Mission */}
      <section className="section about-mission">
        <div className="container">
          <div className="about-mission-inner">
            <div className="about-mission-text">
              <div className="section-label">Our Mission</div>
              <h2 className="section-title">Why We Started Perfect Fit Factory</h2>
              <p className="about-body-text">
                Perfect Fit Factory began with a simple belief: what you wear should feel like it was made for you. 
                Not a compromise. Not a generic off-the-rack choice. Something that reflects your personality, 
                your brand, or your community.
              </p>
              <p className="about-body-text">
                We work with individuals who want a single statement piece, small brands building their first 
                merchandise line, college societies designing batch tees, and businesses outfitting their teams. 
                Every order — no matter how large or small — gets the same commitment to quality.
              </p>
              <p className="about-body-text">
                Our approach is straightforward: premium fabrics, honest pricing, clear communication and 
                results that exceed expectations. We're building this brand the same way we'd want anything 
                built — with care.
              </p>
            </div>
            <div className="about-mission-visual">
              <div className="about-img-stack">
                <img
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80"
                  alt="Premium tee quality"
                  className="about-stack-img about-stack-main"
                  loading="lazy"
                />
                <img
                  src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&q=80"
                  alt="Detail of fabric quality"
                  className="about-stack-img about-stack-accent"
                  loading="lazy"
                />
                <div className="about-stack-badge">
                  <img src="/logo.jpg" alt="Perfect Fit Atelier Crest" className="about-stack-badge-img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section about-values" aria-labelledby="about-values-title">
        <div className="container">
          <div className="section-header-center">
            <div className="section-label">What We Stand For</div>
            <h2 className="section-title" id="about-values-title">Our Values</h2>
          </div>
          <div className="about-values-grid">
            {[
              { title: 'Uncompromising Quality', body: 'We source fabrics and trims that can withstand repeated wear and washing. Comfort and durability are non-negotiable.' },
              { title: 'Honest Communication', body: 'No hidden fees, no overpromising. We tell you exactly what\'s possible, what the costs are, and what timeline to expect.' },
              { title: 'Personal Attention', body: 'Every order is treated as if it were our own. We review every design file, check every print, and pack every order with care.' },
              { title: 'Sustainable Approach', body: 'We\'re working towards better, more responsible sourcing. Premium doesn\'t have to mean wasteful — and we take that seriously.' },
            ].map(({ title, body }) => (
              <div className="about-value-card" key={title}>
                <h3 className="about-value-title">{title}</h3>
                <p className="about-value-body">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section about-approach">
        <div className="container">
          <div className="about-approach-inner">
            <div className="about-approach-visual">
              <img
                src="https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=700&q=80"
                alt="Custom hoodie production"
                className="about-approach-img"
                loading="lazy"
              />
            </div>
            <div className="about-approach-text">
              <div className="section-label">Our Approach</div>
              <h2 className="section-title">Crafted With Intention</h2>
              <p className="about-body-text">
                We don't believe in cookie-cutter apparel. Every garment starts with the right base — 
                the right weight, weave and cut for the intended purpose. Then we apply the right 
                print method for the design.
              </p>
              <p className="about-body-text">
                Whether it's a minimal one-colour chest print, a full-coverage photographic design, 
                or intricate embroidery for a corporate uniform, we match technique to intention. 
                That's how you get results that last and look exactly right.
              </p>
              <div className="about-ctas">
                <Link to="/custom-printing" className="btn btn-primary">
                  Start a Custom Order
                  <ArrowRight size={16} />
                </Link>
                <a
                  href="https://www.instagram.com/perfectfit.factory/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <Instagram size={16} />
                  See Our Work
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="about-instagram-cta">
        <div className="container">
          <div className="about-ig-inner">
            <h2 className="about-ig-title">Follow the Journey on Instagram</h2>
            <p className="about-ig-sub">Behind-the-scenes, new arrivals and design inspiration at <strong>@perfectfit.factory</strong></p>
            <a
              href="https://www.instagram.com/perfectfit.factory/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent btn-lg"
            >
              <Instagram size={18} />
              Follow Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
