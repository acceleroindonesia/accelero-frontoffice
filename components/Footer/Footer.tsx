'use client'

import React from 'react'
import Link from 'next/link'
import { useLanguage } from '@contexts/LanguageContext'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()
  const { t } = useLanguage()

  const footerLinks = {
    about: [
      { nameKey: 'ourMission', href: '/about' },
      { nameKey: 'ourTeam', href: '/about' },
      { nameKey: 'impactStories', href: '/impact' },
    ],
    getInvolved: [
      { nameKey: 'donate', href: '/donate' },
      { nameKey: 'volunteer', href: '/volunteer' },
      { nameKey: 'partner', href: '/partner' },
    ],
    programs: [{ nameKey: 'viewAllPrograms', href: '/projects' }],
    resources: [
      { nameKey: 'helpCenter', href: '/help' },
      { nameKey: 'contactUs', href: '/contact' },
      { nameKey: 'faq', href: '/help/answers' },
      { nameKey: 'blog', href: '/blog' },
    ],
  }

  const socialLinks = [
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@accelero.id',
      icon: (
        <svg
          fill="currentColor"
          viewBox="0 0 32 32"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z"></path>
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/accelero.id',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/accelero-indonesia/',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ]

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
            <p className="footer-mission">{t('footerMission')}</p>
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
              <h4 className="footer-column-title">{t('aboutUs')}</h4>
              <ul className="footer-list">
                {footerLinks.about.map((link) => (
                  <li key={link.nameKey}>
                    <Link href={link.href} className="footer-link">
                      {t(link.nameKey as any)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title">{t('getInvolved')}</h4>
              <ul className="footer-list">
                {footerLinks.getInvolved.map((link) => (
                  <li key={link.nameKey}>
                    <Link href={link.href} className="footer-link">
                      {t(link.nameKey as any)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title">{t('programs')}</h4>
              <ul className="footer-list">
                {footerLinks.programs.map((link) => (
                  <li key={link.nameKey}>
                    <Link href={link.href} className="footer-link">
                      {t(link.nameKey as any)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title">{t('resources')}</h4>
              <ul className="footer-list">
                {footerLinks.resources.map((link) => (
                  <li key={link.nameKey}>
                    <Link href={link.href} className="footer-link">
                      {t(link.nameKey as any)}
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
            <h4 className="newsletter-title">{t('stayUpdated')}</h4>
            <p className="newsletter-description">{t('newsletterDescription')}</p>
          </div>
          <form className="newsletter-form" suppressHydrationWarning>
            <input
              type="email"
              placeholder={t('enterYourEmail')}
              className="newsletter-input"
              required
              suppressHydrationWarning
            />
            <button type="submit" className="newsletter-button" suppressHydrationWarning>
              {t('subscribe')}
            </button>
          </form>
        </div>

        {/* Footer Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p className="footer-copyright">
              © {currentYear} Accelero Foundation. {t('allRightsReserved')}.
            </p>
          </div>
          <div className="footer-bottom-right">
            <div className="footer-badges">
              <span className="badge">🔒 {t('secureDonations')}</span>
              <span className="badge">✓ {t('verifiedNonprofit')}</span>
              <span className="badge">💯 {t('transparency')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
