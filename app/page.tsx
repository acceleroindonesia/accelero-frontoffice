
"use client";

import { useEffect, useState } from "react";
import Master from "@components/Layout/Master";
import Section from "@components/Section/Section";
import HeroSection from "./home/components/HeroSection";
import ImpactStats from "./home/components/ImpactStats";
import ProjectCard from "@components/Card/ProjectCard";
import HowItWorks from "./home/components/HowItWorks";
import VolunteerCTA from "./home/components/VolunteerCTA";
import { ScrollAnimations } from "./home/components/ScrollAnimations";
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
}

const Page: React.FC = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const res: IResponse = await Request.getResponse({
        url: "/api/projects?featured=true&limit=6",
        method: "GET",
      });

      if (res?.data?.projects) {
        setProjects(res.data.projects);
      }
      setIsLoading(false);
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <Master>
        <div className="loading-container">
          <div className="loading-hero">
            <div className="skeleton skeleton-hero"></div>
          </div>
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {[...Array(3)].map((_, idx) => (
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
      <HeroSection />
      <ImpactStats />

      <Section className="projects-section-modern">
        <div className="container">
          <div className="projects-header" data-aos="fade-up">
            <span className="section-label">Our Programs</span>
            <h2 className="section-title-modern">Featured Programs</h2>
            <p className="section-desc-modern">
              Support schools and students who need it most
            </p>
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={project.id} data-aos="fade-up" data-aos-delay={index * 100}>
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

          <div className="center" data-aos="fade-up">
            <a href="/projects" className="btn-cta-primary">
              View All Programs
            </a>
          </div>
        </div>
      </Section>

      <HowItWorks />
      <VolunteerCTA />
    </Master>
  );
};

export default Page;