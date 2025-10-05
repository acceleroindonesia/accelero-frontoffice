"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@components/Button/Button";

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Every Child Deserves the Right to Learn",
      subtitle:
        "Transform lives through education. Help us bring quality literacy and numeracy programs to underserved schools across Indonesia.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&h=900&fit=crop",
    },
    {
      title: "Building Brighter Futures Together",
      subtitle:
        "Join 500+ donors making a real difference. Your support provides books, training, and hope to thousands of students.",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1600&h=900&fit=crop",
    },
    {
      title: "Teaching at the Right Level Works",
      subtitle:
        "85% improvement in literacy rates. Our proven TaRL methodology meets students where they are and helps them soar.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&h=900&fit=crop",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="hero-modern">
      {/* Background Slider */}
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-overlay-gradient"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="hero-container">
        <div className="hero-content-wrapper">
          <div className="hero-badge">
            <span className="badge-icon">🎓</span>
            <span className="badge-text">Transforming Education Since 2020</span>
          </div>

          <h1 className="hero-title-modern">{slides[currentSlide].title}</h1>
          <p className="hero-subtitle-modern">{slides[currentSlide].subtitle}</p>

          {/* CTA Buttons */}
          <div className="hero-cta-group">
            <Link href="/donate" className="btn-primary-large">
              <span className="btn-icon">❤️</span>
              <span className="btn-text">
                <strong>Donate Now</strong>
                <small>Make an impact today</small>
              </span>
            </Link>
            <Link href="/projects" className="btn-secondary-large">
              <span className="btn-text">
                <strong>View Programs</strong>
                <small>See where we work</small>
              </span>
              <span className="btn-arrow">→</span>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="hero-quick-stats">
            <div className="quick-stat">
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <strong>2,500+</strong>
                <span>Students Helped</span>
              </div>
            </div>
            <div className="quick-stat">
              <div className="stat-icon">🏫</div>
              <div className="stat-content">
                <strong>45+</strong>
                <span>Partner Schools</span>
              </div>
            </div>
            <div className="quick-stat">
              <div className="stat-icon">📈</div>
              <div className="stat-content">
                <strong>85%</strong>
                <span>Success Rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Slider Navigation */}
        <div className="hero-slider-nav">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

export default HeroSection;