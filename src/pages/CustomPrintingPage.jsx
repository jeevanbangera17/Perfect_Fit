import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Check, ChevronRight } from 'lucide-react';
import Instagram from '../components/icons/Instagram';
import { buildWhatsAppUrl, buildGeneralEnquiryMessage, validateForm } from '../utils/helpers';
import './CustomPrintingPage.css';

const WA_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '';

const SERVICES = [
  {
    title: 'Custom T-Shirt Printing',
    desc: 'Premium ring-spun cotton tees with your artwork, logo or text. Screen printing and DTF available.',
    icon: '👕',
  },
  {
    title: 'Custom Hoodie Printing',
    desc: 'Heavyweight fleece hoodies with chest, back, sleeve or hood print options.',
    icon: '🧥',
  },
  {
    title: 'Personal Artwork Prints',
    desc: 'Bring your illustrations, photography or digital art to life on any garment.',
    icon: '🎨',
  },
  {
    title: 'College & Event Merch',
    desc: 'Batch tees for college fests, reunions, clubs and societies. Fast turnaround.',
    icon: '🎓',
  },
  {
    title: 'Corporate Apparel',
    desc: 'Professional branded uniforms, polos and hoodies for teams and organisations.',
    icon: '💼',
  },
  {
    title: 'Team & Bulk Orders',
    desc: 'Competitive pricing for large quantity orders with size-mix flexibility.',
    icon: '📦',
  },
];

const PRINT_METHODS = [
  { name: 'Screen Printing', best: 'Best for: Large batches, bold colours', min: 'Min: 24 pieces' },
  { name: 'DTF Printing', best: 'Best for: Full-colour, photos, gradients', min: 'Min: 1 piece' },
  { name: 'DTG Printing', best: 'Best for: Complex artwork, small batches', min: 'Min: 1 piece' },
  { name: 'Embroidery', best: 'Best for: Corporate, premium texture', min: 'Min: 12 pieces' },
];

const PRODUCT_TYPES = [
  'T-Shirt (Standard)',
  'Oversized T-Shirt',
  'Hoodie (Pullover)',
  'Hoodie (Zip-Up)',
  'Polo T-Shirt',
  'Other (Please describe)',
];

const initialForm = {
  name: '',
  phone: '',
  email: '',
  productType: '',
  quantity: '',
  designRequirements: '',
};

export default function CustomPrintingPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | success | error

  useEffect(() => {
    document.title = 'Custom Printing — Perfect Fit Factory';
    window.scrollTo({ top: 0 });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((err) => ({ ...err, [name]: undefined, contact: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, errors: errs } = validateForm(form);
    if (!isValid) {
      setErrors(errs);
      return;
    }

    // WhatsApp fallback since no backend yet
    if (WA_NUMBER) {
      const message = buildGeneralEnquiryMessage(form);
      window.open(buildWhatsAppUrl(WA_NUMBER, message), '_blank');
    } else {
      window.open('https://www.instagram.com/perfectfit.factory/', '_blank');
    }
    setStatus('success');
    setForm(initialForm);
  };

  return (
    <div className="custom-page">
      {/* Hero */}
      <div className="custom-hero">
        <div className="custom-hero-img-wrap">
          <img
            src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1600&q=80"
            alt="Custom apparel printing"
            className="custom-hero-img"
          />
          <div className="custom-hero-overlay" />
        </div>
        <div className="container custom-hero-content">
          <div className="section-label" style={{ color: 'var(--color-accent-light)' }}>Custom Printing</div>
          <h1 className="custom-hero-title">Your Design.<br /><em>Perfectly Printed.</em></h1>
          <p className="custom-hero-sub">
            From a single piece to a thousand — we print your ideas on premium garments with
            professional results, every time.
          </p>
          <a href="#enquiry-form" className="btn btn-accent btn-lg">
            Start Your Order
            <ArrowRight size={18} />
          </a>
        </div>
      </div>

      {/* Services */}
      <section className="section custom-services" aria-labelledby="services-title">
        <div className="container">
          <div className="section-header-center">
            <div className="section-label">What We Offer</div>
            <h2 className="section-title" id="services-title">Custom Printing Services</h2>
          </div>
          <div className="services-grid">
            {SERVICES.map(({ title, desc, icon }) => (
              <div className="service-card" key={title}>
                <div className="service-icon">{icon}</div>
                <h3 className="service-title">{title}</h3>
                <p className="service-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Print methods */}
      <section className="section custom-methods" aria-labelledby="methods-title">
        <div className="container">
          <div className="methods-inner">
            <div className="methods-text">
              <div className="section-label">Print Technology</div>
              <h2 className="section-title" id="methods-title">The Right Print for Every Project</h2>
              <p className="section-subtitle">
                We recommend the best printing method based on your design, quantity and budget.
                All methods deliver vibrant, wash-resistant results.
              </p>
              <Link to="/contact" className="btn btn-outline" style={{ marginTop: 'var(--space-6)', width: 'fit-content' }}>
                Talk to Our Team
                <ChevronRight size={16} />
              </Link>
            </div>
            <div className="methods-cards">
              {PRINT_METHODS.map(({ name, best, min }) => (
                <div className="method-card" key={name}>
                  <h3 className="method-name">{name}</h3>
                  <p className="method-best">{best}</p>
                  <span className="method-min">{min}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section custom-process" aria-labelledby="process-title">
        <div className="container">
          <div className="section-header-center">
            <div className="section-label">How It Works</div>
            <h2 className="section-title" id="process-title">Four Simple Steps</h2>
          </div>
          <div className="custom-process-steps">
            {[
              { n: '01', t: 'Share Your Idea', d: 'Tell us the garment type, your design concept, quantity and any specific requirements.' },
              { n: '02', t: 'We Discuss & Plan', d: 'Our team recommends the best print method, garment and finishes for your project.' },
              { n: '03', t: 'Receive Your Quote', d: 'Get a clear, itemised quotation. Request a pre-production sample if needed.' },
              { n: '04', t: 'Confirm & Deliver', d: 'Approve the design proof, confirm payment and we take it from there.' },
            ].map(({ n, t, d }) => (
              <div className="custom-process-step" key={n}>
                <div className="custom-step-num">{n}</div>
                <div className="custom-step-content">
                  <h3 className="custom-step-title">{t}</h3>
                  <p className="custom-step-desc">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry form */}
      <section className="section custom-enquiry" id="enquiry-form" aria-labelledby="form-title">
        <div className="container">
          <div className="enquiry-layout">
            <div className="enquiry-info">
              <div className="section-label">Get a Quote</div>
              <h2 className="section-title" id="form-title">Start Your Custom Order</h2>
              <p className="section-subtitle">
                Fill in your details and we'll get back to you with a tailored quote.
                Alternatively, reach us directly on WhatsApp or Instagram.
              </p>
              <div className="enquiry-contact-options">
                <a
                  href="https://www.instagram.com/perfectfit.factory/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="enquiry-contact-link"
                >
                  <Instagram size={20} />
                  <div>
                    <span className="ec-label">Instagram</span>
                    <span className="ec-value">@perfectfit.factory</span>
                  </div>
                </a>
                {WA_NUMBER ? (
                  <a
                    href={`https://wa.me/${WA_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="enquiry-contact-link"
                  >
                    <MessageCircle size={20} />
                    <div>
                      <span className="ec-label">WhatsApp</span>
                      <span className="ec-value">Message Us</span>
                    </div>
                  </a>
                ) : null}
              </div>
            </div>

            <div className="enquiry-form-wrap">
              {status === 'success' ? (
                <div className="form-success">
                  <div className="form-success-icon">
                    <Check size={32} />
                  </div>
                  <h3>Enquiry Received!</h3>
                  <p>
                    We've opened WhatsApp (or directed you to Instagram) with your enquiry details.
                    We'll get back to you shortly.
                  </p>
                  <button className="btn btn-outline" onClick={() => setStatus('idle')}>
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form className="enquiry-form" onSubmit={handleSubmit} noValidate aria-label="Custom printing enquiry form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="cp-name" className="form-label">Full Name *</label>
                      <input
                        id="cp-name"
                        name="name"
                        type="text"
                        className={`form-input${errors.name ? ' error' : ''}`}
                        placeholder="Your name"
                        value={form.name}
                        onChange={handleChange}
                        autoComplete="name"
                      />
                      {errors.name && <p className="form-error">{errors.name}</p>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="cp-phone" className="form-label">Phone Number *</label>
                      <input
                        id="cp-phone"
                        name="phone"
                        type="tel"
                        className={`form-input${errors.phone || errors.contact ? ' error' : ''}`}
                        placeholder="10-digit mobile number"
                        value={form.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                      />
                      {(errors.phone || errors.contact) && (
                        <p className="form-error">{errors.phone || errors.contact}</p>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="cp-email" className="form-label">Email Address</label>
                    <input
                      id="cp-email"
                      name="email"
                      type="email"
                      className={`form-input${errors.email ? ' error' : ''}`}
                      placeholder="you@example.com (optional)"
                      value={form.email}
                      onChange={handleChange}
                      autoComplete="email"
                    />
                    {errors.email && <p className="form-error">{errors.email}</p>}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="cp-product" className="form-label">Product Type *</label>
                      <div className="select-wrap" style={{ width: '100%' }}>
                        <select
                          id="cp-product"
                          name="productType"
                          className="form-select"
                          value={form.productType}
                          onChange={handleChange}
                        >
                          <option value="">Select product…</option>
                          {PRODUCT_TYPES.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="cp-quantity" className="form-label">Quantity *</label>
                      <input
                        id="cp-quantity"
                        name="quantity"
                        type="number"
                        min="1"
                        className={`form-input${errors.quantity ? ' error' : ''}`}
                        placeholder="e.g. 50"
                        value={form.quantity}
                        onChange={handleChange}
                      />
                      {errors.quantity && <p className="form-error">{errors.quantity}</p>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="cp-design" className="form-label">Design Requirements</label>
                    <textarea
                      id="cp-design"
                      name="designRequirements"
                      className="form-textarea"
                      placeholder="Describe your design, colours, placement, any reference images, and special requirements…"
                      value={form.designRequirements}
                      onChange={handleChange}
                      rows={4}
                    />
                  </div>

                  <div className="form-note">
                    * By submitting, your enquiry details will be sent via WhatsApp. No data is stored on a server in this demo.
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg btn-full">
                    <MessageCircle size={18} />
                    {WA_NUMBER ? 'Send via WhatsApp' : 'Enquire via Instagram'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
