"use client";

import { useEffect, useState } from "react";
import Master from "@components/Layout/Master";
import ProjectCard from "@components/Card/ProjectCard";
import { ScrollAnimations } from "../home/components/ScrollAnimations";
import Request, { type IResponse } from "@utils/Request";

interface IProject {
  id: string;
  url: string;
  title: string;
  location: string;
  description: string;
  goalAmount: number;
  raisedAmount: number;
  studentsImpacted: number;
  image: string;
  status: string;
  category: string;
}

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("active");
  const [sortBy, setSortBy] = useState<string>("newest");

  const categories = [
    { value: "all", label: "All Programs", icon: "🎯" },
    { value: "literacy", label: "Literacy", icon: "📚" },
    { value: "numeracy", label: "Numeracy", icon: "🔢" },
    { value: "teacher-training", label: "Teacher Training", icon: "👨‍🏫" },
    { value: "infrastructure", label: "Infrastructure", icon: "🏗️" },
  ];

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterAndSortProjects();
  }, [projects, searchQuery, selectedCategory, selectedStatus, sortBy]);

  const fetchProjects = async () => {
    const res: IResponse = await Request.getResponse({
      url: "/api/projects?limit=50",
      method: "GET",
    });

    if (res?.data?.projects) {
      setProjects(res.data.projects);
    }
    setIsLoading(false);
  };

  const filterAndSortProjects = () => {
    let filtered = [...projects];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((project) => project.category === selectedCategory);
    }

    // Filter by status
    if (selectedStatus !== "all") {
      filtered = filtered.filter((project) => project.status === selectedStatus);
    }

    // Sort projects
    switch (sortBy) {
      case "newest":
        // Assuming projects come sorted by newest by default
        break;
      case "funding-high":
        filtered.sort((a, b) => {
          const aPercent = (a.raisedAmount / a.goalAmount) * 100;
          const bPercent = (b.raisedAmount / b.goalAmount) * 100;
          return bPercent - aPercent;
        });
        break;
      case "funding-low":
        filtered.sort((a, b) => {
          const aPercent = (a.raisedAmount / a.goalAmount) * 100;
          const bPercent = (b.raisedAmount / b.goalAmount) * 100;
          return aPercent - bPercent;
        });
        break;
      case "impact-high":
        filtered.sort((a, b) => b.studentsImpacted - a.studentsImpacted);
        break;
    }

    setFilteredProjects(filtered);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedStatus("active");
    setSortBy("newest");
  };

  const activeFiltersCount =
    (searchQuery ? 1 : 0) +
    (selectedCategory !== "all" ? 1 : 0) +
    (selectedStatus !== "active" ? 1 : 0) +
    (sortBy !== "newest" ? 1 : 0);

  if (isLoading) {
    return (
      <Master>
        <div className="projects-page-loading">
          <div className="skeleton skeleton-header"></div>
          <div className="container">
            <div className="skeleton-filters-grid">
              <div className="skeleton skeleton-filter"></div>
              <div className="skeleton skeleton-filter"></div>
              <div className="skeleton skeleton-filter"></div>
            </div>
            <div className="projects-grid">
              {[...Array(6)].map((_, idx) => (
                <div key={idx} className="skeleton skeleton-card"></div>
              ))}
            </div>
          </div>
        </div>
      </Master>
    );
  }

  return (
    <Master>
      <ScrollAnimations />

      {/* Page Header */}
      <section className="projects-page-header">
        <div className="container">
          <div className="header-content">
            <span className="page-label">Our Programs</span>
            <h1 className="page-title">Make a Difference Today</h1>
            <p className="page-subtitle">
              Browse our programs and support schools and students who need it most. Every donation
              is tracked transparently and makes a real impact.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="header-stats">
            <div className="stat-item">
              <div className="stat-value">{projects.length}</div>
              <div className="stat-label">Active Programs</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">
                {projects.reduce((sum, p) => sum + p.studentsImpacted, 0).toLocaleString()}
              </div>
              <div className="stat-label">Students Reached</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">
                Rp{" "}
                {Math.round(
                  projects.reduce((sum, p) => sum + p.raisedAmount, 0) / 1000000
                ).toLocaleString()}
                M
              </div>
              <div className="stat-label">Total Raised</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="projects-filters-section">
        <div className="container">
          {/* Search Bar */}
          <div className="search-bar-wrapper">
            <div className="search-bar">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search by school name, location, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button className="clear-search" onClick={() => setSearchQuery("")}>
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Filters */}
          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category.value}
                className={`category-btn ${selectedCategory === category.value ? "active" : ""}`}
                onClick={() => setSelectedCategory(category.value)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-label">{category.label}</span>
              </button>
            ))}
          </div>

          {/* Filter Bar */}
          <div className="filter-bar">
            <div className="filter-left">
              <div className="filter-group">
                <label className="filter-label">Status:</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">Sort By:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select"
                >
                  <option value="newest">Newest First</option>
                  <option value="funding-low">Lowest Funded</option>
                  <option value="funding-high">Highest Funded</option>
                  <option value="impact-high">Most Impact</option>
                </select>
              </div>
            </div>

            <div className="filter-right">
              {activeFiltersCount > 0 && (
                <button className="clear-filters-btn" onClick={handleClearFilters}>
                  Clear Filters ({activeFiltersCount})
                </button>
              )}
              <div className="results-count">
                {filteredProjects.length} program{filteredProjects.length !== 1 ? "s" : ""}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="projects-grid-section">
        <div className="container">
          {filteredProjects.length > 0 ? (
            <div className="projects-grid">
              {filteredProjects.map((project, index) => (
                <div key={project.id} data-aos="fade-up" data-aos-delay={Math.min(index * 50, 300)}>
                  <ProjectCard
                    id={project.id}
                    url={project.url}
                    title={project.title}
                    location={project.location}
                    description={project.description}
                    goalAmount={project.goalAmount}
                    raisedAmount={project.raisedAmount}
                    studentsImpacted={project.studentsImpacted}
                    image={project.image}
                    status={project.status}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No Programs Found</h3>
              <p>
                We couldn't find any programs matching your criteria. Try adjusting your filters or
                search query.
              </p>
              <button className="btn-reset" onClick={handleClearFilters}>
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="projects-cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-content">
              <h2>Can't Find What You're Looking For?</h2>
              <p>
                Make a general donation to our fund and we'll allocate it to the programs that need
                it most.
              </p>
            </div>
            <div className="cta-actions">
              <a href="/donate?type=general" className="btn-cta-large">
                Donate to General Fund
              </a>
              <a href="/contact" className="btn-cta-outline">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </Master>
  );
};

export default ProjectsPage;