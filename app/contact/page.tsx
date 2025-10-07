"use client";

import { useState } from "react";
import Master from "@components/Layout/Master";
import Section from "@components/Section/Section";
import { ScrollAnimations } from "../home/components/ScrollAnimations";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitStatus({
        type: "success",
        message:
          "Thank you for contacting us! We'll get back to you within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "general",
        message: "",
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again or email us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Master>
      <ScrollAnimations />

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <span className="contact-label">Get In Touch</span>
            <h1 className="contact-title">We'd Love to Hear From You</h1>
            <p className="contact-subtitle">
              Have questions about our programs? Want to volunteer or partner
              with us? We're here to help and excited to connect!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <Section className="contact-methods-section">
        <div className="container">
          <div className="contact-methods-grid">
            {/* Email Card */}
            <div className="contact-method-card">
              <div className="method-icon email-icon">📧</div>
              <h3>Email Us</h3>
              <p>Our team typically responds within 24 hours</p>
              <a
                href="mailto:info@accelero-indonesia.org"
                className="method-link"
              >
                info@accelero-indonesia.org
              </a>
            </div>

            {/* WhatsApp Card */}
            <div className="contact-method-card">
              <div className="method-icon whatsapp-icon">💬</div>
              <h3>WhatsApp</h3>
              <p>Chat with us for quick questions</p>
              <a
                href="https://wa.me/6281292207121?text=Hi%20Accelero!%20I'd%20like%20to%20learn%20more%20about%20your%20programs."
                target="_blank"
                rel="noopener noreferrer"
                className="method-link"
              >
                +62 812-9220-7121
              </a>
            </div>

            {/* Office Card */}
            <div className="contact-method-card">
              <div className="method-icon location-icon">📍</div>
              <h3>Office Location</h3>
              <p>Jakarta, Indonesia (Remote Operations)</p>
              <span className="method-link">Working remotely nationwide</span>
            </div>
          </div>
        </div>
      </Section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-form-grid">
            {/* Left Side - Form */}
            <div className="form-container">
              <div className="form-header">
                <h2>Send Us a Message</h2>
                <p>
                  Fill out the form below and we'll get back to you as soon as
                  possible
                </p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-input"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-input"
                      placeholder="+62 xxx xxxx xxxx"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="form-select"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="general">General Inquiry</option>
                      <option value="volunteer">Volunteer Opportunity</option>
                      <option value="partnership">Partnership</option>
                      <option value="donation">Donation Question</option>
                      <option value="media">Media/Press</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                {submitStatus.type && (
                  <div
                    className={`form-status ${submitStatus.type === "success" ? "success" : "error"}`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <span className="btn-arrow">→</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Side - Info */}
            <div className="contact-info-sidebar">
              <div className="info-card">
                <h3>Quick Connect</h3>
                <p>
                  Prefer a more immediate response? Reach out directly through
                  these channels:
                </p>
                <div className="quick-links">
                  <a
                    href="https://wa.me/6281292207121?text=Hi%20Accelero!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="quick-link-btn whatsapp-btn"
                  >
                    <span className="btn-icon">💬</span>
                    <span>Message on WhatsApp</span>
                  </a>
                  <a
                    href="mailto:info@accelero-indonesia.org"
                    className="quick-link-btn email-btn"
                  >
                    <span className="btn-icon">📧</span>
                    <span>Send Email</span>
                  </a>
                </div>
              </div>

              <div className="info-card">
                <h3>Office Hours</h3>
                <div className="office-hours">
                  <div className="hours-row">
                    <span className="day">Monday - Friday</span>
                    <span className="time">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="hours-row">
                    <span className="day">Saturday</span>
                    <span className="time">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="hours-row">
                    <span className="day">Sunday</span>
                    <span className="time">Closed</span>
                  </div>
                </div>
                <p className="timezone-note">
                  <em>* Western Indonesia Time (WIB)</em>
                </p>
              </div>

              <div className="info-card">
                <h3>Need Help?</h3>
                <p>
                  Check out our FAQ page for quick answers to common questions.
                </p>
                <a href="/help" className="help-link">
                  Visit Help Center →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <Section className="contact-faq-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-label">FAQ</span>
            <h2 className="section-title-large">Frequently Asked Questions</h2>
          </div>

          <div className="faq-grid">
            <div className="faq-card">
              <h4>How can I volunteer with Accelero?</h4>
              <p>
                We partner with local universities to recruit volunteers. If
                you're a university student interested in teaching, please fill
                out the contact form above with "Volunteer Opportunity" as the
                subject.
              </p>
            </div>

            <div className="faq-card">
              <h4>How do I make a donation?</h4>
              <p>
                You can donate through our secure donation page. We accept
                various payment methods and provide transparent tracking of how
                your donation is used.
              </p>
            </div>

            <div className="faq-card">
              <h4>Can my organization partner with Accelero?</h4>
              <p>
                We welcome partnerships with schools, universities, NGOs, and
                corporations. Please contact us with "Partnership" as the
                subject to discuss collaboration opportunities.
              </p>
            </div>

            <div className="faq-card">
              <h4>How do I get updates on your programs?</h4>
              <p>
                Subscribe to our newsletter when making a donation, or follow
                our social media channels for regular updates on our impact and
                activities.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <section className="contact-cta-section">
        <div className="container">
          <div className="cta-card-contact">
            <h2>Join Our Mission</h2>
            <p>
              Whether through volunteering, donating, or partnering—there are
              many ways to support educational equity in Indonesia.
            </p>
            <div className="cta-buttons-row">
              <a href="/donate" className="btn-cta-white">
                Make a Donation
              </a>
              <a href="/projects" className="btn-cta-outline-white">
                View Our Programs
              </a>
            </div>
          </div>
        </div>
      </section>
    </Master>
  );
};

export default ContactPage;