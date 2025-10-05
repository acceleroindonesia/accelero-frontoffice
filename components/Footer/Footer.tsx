
import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    about: [
      { name: "Our Mission", href: "/about" },
      { name: "Our Team", href: "/about/team" },
      { name: "Impact Stories", href: "/impact" },
      { name: "Annual Reports", href: "/reports" },
      { name: "Partnerships", href: "/partnerships" },
    ],
    getInvolved: [
      { name: "Donate", href: "/donate" },
      { name: "Volunteer", href: "/volunteer" },
      { name: "Corporate Giving", href: "/partnerships/corporate" },
      { name: "Fundraise", href: "/fundraise" },
      { name: "Spread the Word", href: "/share" },
    ],
    programs: [
      { name: "Teaching at Right Level", href: "/programs/tarl" },
      { name: "Reading Programs", href: "/programs/reading" },
      { name: "Math Foundation", href: "/programs/math" },
      { name: "Teacher Training", href: "/programs/training" },
      { name: "All Programs", href: "/programs" },
    ],
    resources: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "FAQ", href: "/help/answers" },
      { name: "News & Blog", href: "/news" },
      { name: "Media Kit", href: "/media" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/legal/privacy" },
      { name: "Terms of Service", href: "/legal/terms" },
      { name: "Cookie Policy", href: "/legal/cookies" },
      { name: "Financial Transparency", href: "/transparency" },
    ],
  };

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com/accelerofoundation",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "https://twitter.com/accelerofound",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com/accelerofoundation",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/accelero-foundation",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@accelerofoundation",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="footer" suppressHydrationWarning>
      <div className="footer-container">
        {/* Footer Top Section */}
        <div className="footer-top">
          {/* Brand Section */}
          <div className="footer-brand">
            <Link href="/">
              <div className="footer-logo">
                <span className="footer-logo-icon">📚</span>
                <div className="footer-logo-text">
                  <span className="footer-logo-title">Accelero</span>
                  <span className="footer-logo-subtitle">Foundation</span>
                </div>
              </div>
            </Link>
            <p className="footer-mission">
              Empowering underserved communities in Indonesia through quality education. Every
              child deserves the right to learn.
            </p>
            <div className="footer-social">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  title={social.name}
                  aria-label={social.name}
                  suppressHydrationWarning
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="footer-links">
            <div className="footer-column">
              <h4 className="footer-column-title">About Us</h4>
              <ul className="footer-list">
                {footerLinks.about.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="footer-link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title">Get Involved</h4>
              <ul className="footer-list">
                {footerLinks.getInvolved.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="footer-link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title">Programs</h4>
              <ul className="footer-list">
                {footerLinks.programs.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="footer-link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title">Resources</h4>
              <ul className="footer-list">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="footer-link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="footer-newsletter">
          <div className="newsletter-content">
            <h4 className="newsletter-title">Stay Updated</h4>
            <p className="newsletter-description">
              Get monthly updates on our programs and see the impact of your support
            </p>
          </div>
          <form className="newsletter-form" suppressHydrationWarning>
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
              required
              suppressHydrationWarning
            />
            <button type="submit" className="newsletter-button" suppressHydrationWarning>
              Subscribe
            </button>
          </form>
        </div>

        {/* Footer Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p className="footer-copyright">
              © {currentYear} Accelero Foundation. All rights reserved.
            </p>
            <div className="footer-legal-links">
              {footerLinks.legal.map((link, index) => (
                <React.Fragment key={link.name}>
                  <Link href={link.href} className="footer-legal-link">
                    {link.name}
                  </Link>
                  {index < footerLinks.legal.length - 1 && <span className="separator">•</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="footer-bottom-right">
            <div className="footer-badges">
              <span className="badge">🔒 Secure Donations</span>
              <span className="badge">✓ Verified Nonprofit</span>
              <span className="badge">💯 Transparency</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;