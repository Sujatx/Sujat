import React from "react";
import projects from "../data/projects.json";
import ProjectSpotlight from "../fragments/projectSpotlight";
import ProjectCard from "../fragments/projectCard";
import SectionHeading from "../fragments/sectionHeading";

const Work = () => {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <div className="section-shell section-block bg-transparent">
      <SectionHeading>selected works</SectionHeading>

      <ProjectSpotlight projects={featured} />

      <div
        className="grid gap-[var(--space-5)]"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}
      >
        {rest.map((project) => (
          <ProjectCard key={project.titleLine1 + project.titleLine2} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Work;
