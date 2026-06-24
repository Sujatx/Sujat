import React, { useState } from "react";
import projects from "../data/projects.json";

const GithubIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const ShareIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 8 12 4 8 8" />
    <line x1="12" y1="4" x2="12" y2="16" />
    <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
  </svg>
);

const IconButton = ({ href, children }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href || "#"}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        border: `1px solid ${hovered ? "#FFD24A" : "rgba(245,238,230,0.4)"}`,
        background: hovered ? "#FFD24A" : "transparent",
        color: hovered ? "#16130f" : "#F5EEE6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "all .15s ease",
        cursor: "pointer",
        flexShrink: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </a>
  );
};

const ProjectCard = ({ project }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position: "relative",
        background: "#000",
        border: "1px solid rgba(245,238,230,0.16)",
        borderRadius: "16px",
        overflow: "hidden",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "border-color .2s ease, transform .2s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Punched notch circles */}
      <div style={{ position: "absolute", top: "64px", left: "-9px", width: "18px", height: "18px", borderRadius: "50%", background: "#000", border: "1px solid rgba(245,238,230,0.16)", zIndex: 10 }} />
      <div style={{ position: "absolute", top: "64px", right: "-9px", width: "18px", height: "18px", borderRadius: "50%", background: "#000", border: "1px solid rgba(245,238,230,0.16)", zIndex: 10 }} />

      {/* Header row */}
      <div style={{ padding: "20px 20px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="font-jack" style={{ fontSize: "24px", color: "#FFD24A" }}>
          Project {project.num}
        </span>
        <div style={{ display: "flex", gap: "10px" }}>
          {project.github && <IconButton href={project.github}><GithubIcon /></IconButton>}
          {project.live && <IconButton href={project.live}><ShareIcon /></IconButton>}
        </div>
      </div>

      {/* Image strip + overlapping title */}
      <div style={{ marginTop: "16px", position: "relative", height: "170px" }}>
        <img
          src={project.image}
          alt={project.titleLine2}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
{/* Title bleeds over image bottom into body */}
        <div
          className="font-anton"
          style={{
            position: "absolute",
            left: "18px",
            bottom: "-14px",
            lineHeight: "0.84",
            fontSize: "46px",
            textTransform: "uppercase",
            textShadow: "0 2px 20px rgba(0,0,0,0.7)",
            pointerEvents: "none",
          }}
        >
          <div style={{ color: "#F5EEE6" }}>{project.titleLine1}</div>
          <div style={{ color: "#FFD24A" }}>{project.titleLine2}</div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "28px 22px 22px" }}>
        <p
          className="font-sora"
          style={{ fontSize: "13.5px", lineHeight: "1.62", color: "#CFC9BD", marginBottom: "18px" }}
        >
          {project.description}
        </p>
        <div
          className="font-spaceMono"
          style={{
            fontSize: "11px",
            letterSpacing: "1px",
            color: "#8F897C",
            lineHeight: "1.9",
            borderTop: "1px solid rgba(245,238,230,0.14)",
            borderBottom: "1px solid rgba(245,238,230,0.14)",
            padding: "12px 0",
          }}
        >
          {project.techStack.join(" / ")}
        </div>
      </div>
    </div>
  );
};

const Work = () => {
  return (
    <div style={{ background: "transparent", padding: "60px 60px 80px" }}>
      <div
        style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "48px" }}
        className="flex-col sm:flex-row gap-3 sm:gap-0"
      >
        <h2
          className="font-anton"
          style={{
            fontSize: "clamp(40px, 6vw, 72px)",
            lineHeight: "0.85",
            letterSpacing: "1px",
            color: "#F5EEE6",
          }}
        >
          selected works <span style={{ color: "#FFD24A" }}>.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Work;
