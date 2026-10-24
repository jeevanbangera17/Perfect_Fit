import { useState, useEffect } from 'react';
import { MessageCircle, Check, Package } from 'lucide-react';
import Instagram from '../components/icons/Instagram';
import { validateForm, buildWhatsAppUrl } from '../utils/helpers';
import './ContactPage.css';

const WA_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '';

const initialForm = { name: '', phone: '', email: '', message: '', quantity: '' };

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    document.title = 'Contact — Perfect Fit Factory';
    window.scrollTo({ top: 0 });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((err) => ({ ...err, [name]: undefined, contact: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, errors: errs } = validateForm({ ...form, designRequirements: form.message });
    if (!isValid) { setErrors(errs); return; }

    const message = `Hi! I'd like to get in touch.\n\n*Name:* ${form.name}\n*Phone:* ${form.phone || '—'}\n*Email:* ${form.email || '—'}\n*Message:* ${form.message || '—'}`;
    if (WA_NUMBER) {
      window.open(buildWhatsAppUrl(WA_NUMBER, message), '_blank');
    } else {
      window.open('https://www.instagram.com/perfectfit.factory/', '_blank');
    }
    setStatus('success');
    setForm(initialForm);
  };

  return (
    <div className="contact-page">
      {/* Header */}
      <div className="contact-header">
        <div className="container">
          <div className="section-label" style={{ color: 'var(--color-accent-light)' }}>Get In Touch</div>
          <h1 className="contact-title">Let's Talk Apparel</h1>
          <p className="contact-sub">
            Have a question, a custom order idea, or want to discuss bulk pricing?
            Reach us on Instagram or WhatsApp — we respond quickly.
          </p>
        </div>
      </div>

      <div className="container contact-body">
        <div className="contact-layout">
          {/* Info panel */}
          <div className="contact-info">
            <h2 className="contact-info-title">Contact Details</h2>

            {/* Instagram */}
            <div className="contact-method">
              <div className="contact-method-icon">
                <Instagram size={22} />
              </div>
              <div>
                <div className="contact-method-label">Instagram</div>
                <a
                  href="https://www.instagram.com/perfectfit.factory/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-method-value link"
                >
                  @perfectfit.factory
                </a>
                <p className="contact-method-note">DM us with your enquiry for quick responses.</p>
              </div>
            </div>

            {/* WhatsApp */}
            {WA_NUMBER ? (
              <div className="contact-method">
                <div className="contact-method-icon whatsapp">
                  <MessageCircle size={22} />
                </div>
                <div>
                  <div className="contact-method-label">WhatsApp</div>
                  <a
                    href={`https://wa.me/${WA_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-method-value link"
                  >
                    Send a Message
                  </a>
                  <p className="contact-method-note">Fastest way to get product quotes and order updates.</p>
                </div>
              </div>
            ) : (
              <div className="contact-method">
                <div className="contact-method-icon whatsapp">
                  <MessageCircle size={22} />
                </div>
                <div>
                  <div className="contact-method-label">WhatsApp</div>
                  <span className="contact-method-value">Configure VITE_WHATSAPP_NUMBER to enable</span>
                  <p className="contact-method-note">See .env.example for setup instructions.</p>
                </div>
              </div>
            )}

            {/* Note about phone / address */}
            <div className="contact-placeholder-note">
              <span>ℹ</span>
              Phone number and address details will be added when publicly available.
              For now, reach us through Instagram or WhatsApp.
            </div>

            {/* Bulk orders */}
            <div className="bulk-order-box">
              <div className="bulk-order-icon">
                <Package size={24} />
              </div>
              <div>
                <h3 className="bulk-order-title">Bulk Order Enquiries</h3>
                <p className="bulk-order-desc">
                  Looking for 25+ pieces with custom printing? We offer volume discounts,
                  size-mix flexibility and dedicated support for large orders.
                </p>
                <a
                  href="https://www.instagram.com/perfectfit.factory/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                  style={{ marginTop: 'var(--space-4)', width: 'fit-content' }}
                >
                  <Instagram size={14} />
                  Message for Bulk Pricing
                </a>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="contact-form-wrap">
            <h2 className="contact-form-title">Send an Enquiry</h2>
            {status === 'success' ? (
              <div className="contact-success">
                <div className="contact-success-icon">
                  <Check size={28} />
                </div>
                <h3>Message Sent!</h3>
                <p>We've opened WhatsApp with your message. We'll be in touch shortly.</p>
                <button className="btn btn-outline" onClick={() => setStatus('idle')}>
                  Send Another
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate aria-label="Contact form">
                <div className="form-group">
                  <label htmlFor="c-name" className="form-label">Full Name *</label>
                  <input
                    id="c-name" name="name" type="text"
                    className={`form-input${errors.name ? ' error' : ''}`}
                    placeholder="Your name"
                    value={form.name} onChange={handleChange} autoComplete="name"
                  />
                  {errors.name && <p className="form-error">{errors.name}</p>}
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label htmlFor="c-phone" className="form-label">Phone Number</label>
                    <input
                      id="c-phone" name="phone" type="tel"
                      className={`form-input${errors.phone || errors.contact ? ' error' : ''}`}
                      placeholder="10-digit mobile"
                      value={form.phone} onChange={handleChange} autoComplete="tel"
                    />
                    {(errors.phone || errors.contact) && (
                      <p className="form-error">{errors.phone || errors.contact}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="c-email" className="form-label">Email Address</label>
                    <input
                      id="c-email" name="email" type="email"
                      className={`form-input${errors.email ? ' error' : ''}`}
                      placeholder="you@example.com"
                      value={form.email} onChange={handleChange} autoComplete="email"
                    />
                    {errors.email && <p className="form-error">{errors.email}</p>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="c-message" className="form-label">Message</label>
                  <textarea
                    id="c-message" name="message"
                    className="form-textarea"
                    placeholder="Tell us what you're looking for…"
                    value={form.message} onChange={handleChange} rows={5}
                  />
                </div>

                <p className="form-note">
                  * At least one contact method (phone or email) is required. No server data is stored in this demo.
                </p>

                <button type="submit" className="btn btn-primary btn-lg btn-full">
                  <MessageCircle size={18} />
                  {WA_NUMBER ? 'Send via WhatsApp' : 'Contact via Instagram'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
