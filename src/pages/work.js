import React from "react";
import projects from "../data/projects.json";
import ProjectSpotlight from "../fragments/projectSpotlight";
import ProjectCard from "../fragments/projectCard";

const Work = () => {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <div className="section-shell bg-transparent pt-10 pb-14 md:pt-[60px] md:pb-20">
      <div className="mb-8 md:mb-10">
        <h2
          className="font-anton"
          style={{
            fontSize: "clamp(34px, 4.6vw, 58px)",
            lineHeight: "0.85",
            letterSpacing: "1px",
            color: "#F5EEE6",
          }}
        >
          selected works <span style={{ color: "#FFD24A" }}>.</span>
        </h2>
      </div>

      <ProjectSpotlight projects={featured} />

      <div
        className="grid gap-[26px]"
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
