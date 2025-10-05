"use client";

import React from "react";

const ImpactStats: React.FC = () => {
  const stats = [
    {
      icon: "📚",
      number: "12,500+",
      label: "Books Distributed",
      description: "Reading materials for every level",
      color: "#667eea",
    },
    {
      icon: "👨‍🏫",
      number: "156",
      label: "Teachers Trained",
      description: "Empowering educators with TaRL",
      color: "#f56565",
    },
    {
      icon: "🌍",
      number: "8",
      label: "Regions Served",
      description: "Across Eastern Indonesia",
      color: "#48bb78",
    },
    {
      icon: "💰",
      number: "Rp 285M",
      label: "Total Funding",
      description: "Raised from generous donors",
      color: "#ed8936",
    },
  ];

  return (
    <section className="impact-stats-modern">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-modern">
          <span className="section-label">Our Impact</span>
          <h2 className="section-title-modern">Making Real Difference</h2>
          <p className="section-desc-modern">
            Transparent results powered by community support and proven methodologies
          </p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid-modern">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card-modern" data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="stat-icon-wrapper" style={{ backgroundColor: `${stat.color}20` }}>
                <span className="stat-icon-large">{stat.icon}</span>
              </div>
              <div className="stat-number-modern" style={{ color: stat.color }}>
                {stat.number}
              </div>
              <h3 className="stat-label-modern">{stat.label}</h3>
              <p className="stat-desc-modern">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="overall-progress">
          <div className="progress-header">
            <div>
              <h4>2025 Annual Goal Progress</h4>
              <p>Reaching 5,000 students by end of year</p>
            </div>
            <div className="progress-percentage">50%</div>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: "50%" }}>
              <div className="progress-shimmer"></div>
            </div>
          </div>
          <div className="progress-footer">
            <span>2,500 students reached</span>
            <span>2,500 students to go</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;