"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const Header: React.FC = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "id">("en");

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Impact", href: "/impact" },
    { name: "Partner", href: "/partner" },
    { name: "Volunteer", href: "/volunteer" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/Blog" },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "id" : "en");
    // TODO: Implement i18n language switching
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header" suppressHydrationWarning>
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo">
          <Link href="/">
            <div className="logo-wrapper">
              <span className="logo-icon">📚</span>
              <div className="logo-text">
                <span className="logo-title">Accelero</span>
                <span className="logo-subtitle">Foundation</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="header-nav">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`nav-link ${pathname === item.href ? "active" : ""}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="language-toggle"
            title="Change Language"
            suppressHydrationWarning
          >
            {language === "en" ? "🇬🇧 EN" : "🇮🇩 ID"}
          </button>

          {/* User Menu or Donate Button */}
          {session?.user ? (
            <div className="user-menu">
              <Link href="/members/account" className="user-link">
                <span className="user-icon">👤</span>
                <span className="user-name">{session.user.name}</span>
              </Link>
            </div>
          ) : (
            <Link href="/members/signin" className="signin-link">
              Sign In
            </Link>
          )}

          {/* Primary CTA */}
          <Link href="/donate" className="donate-button" suppressHydrationWarning>
            <span className="donate-icon">❤️</span>
            <span>Donate Now</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className={`mobile-menu-toggle ${isMenuOpen ? "active" : ""}`}
            onClick={handleMenuToggle}
            aria-label="Toggle menu"
            suppressHydrationWarning
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="mobile-nav">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`mobile-nav-link ${pathname === item.href ? "active" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="mobile-nav-actions">
            {!session?.user && (
              <Link
                href="/members/signin"
                className="mobile-signin"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
            <Link
              href="/donate"
              className="mobile-donate"
              onClick={() => setIsMenuOpen(false)}
              suppressHydrationWarning
            >
              ❤️ Donate Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;