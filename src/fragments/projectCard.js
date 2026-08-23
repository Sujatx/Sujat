import React, { useState } from "react";
import { GithubIcon, ShareIcon, FolderIcon, IconButton } from "./icons";

const ProjectCard = ({ project }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "var(--surface)",
        border: "1px solid " + (hovered ? "var(--hairline-strong)" : "var(--hairline)"),
        borderRadius: "var(--r-xl)",
        padding: "var(--space-6) var(--space-5) var(--space-5)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "border-color .2s ease, transform .2s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Header: folder glyph left, links right */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-5)" }}>
        <span style={{ color: hovered ? "var(--accent)" : "rgba(245,238,230,0.55)", transition: "color .2s ease" }}>
          <FolderIcon />
        </span>
        <div style={{ display: "flex", gap: "var(--space-3)" }}>
          {project.github && (
            <IconButton href={project.github} size={34} label={project.titleLine1 + " " + project.titleLine2 + " on GitHub"}>
              <GithubIcon size={18} />
            </IconButton>
          )}
          {project.live && (
            <IconButton href={project.live} size={34} label={project.titleLine1 + " " + project.titleLine2 + " live site"}>
              <ShareIcon size={18} />
            </IconButton>
          )}
        </div>
      </div>

      <h3
        className="font-anton"
        style={{
          fontSize: "var(--t-h2)",
          lineHeight: "1.05",
          textTransform: "uppercase",
          color: "var(--ink)",
          marginBottom: "var(--space-3)",
        }}
      >
        {project.titleLine1}{" "}
        <span style={{ color: "var(--accent)" }}>{project.titleLine2}</span>
      </h3>

      <p
        className="font-sora"
        style={{
          fontSize: "var(--t-small)",
          lineHeight: "1.6",
          color: "var(--ink-2)",
          marginBottom: "var(--space-4)",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {project.description}
      </p>

      <div
        className="font-spaceMono"
        style={{
          marginTop: "auto",
          paddingTop: "var(--space-4)",
          fontSize: "var(--t-label)",
          letterSpacing: "1px",
          lineHeight: "1.7",
          textTransform: "uppercase",
          color: "var(--ink-3)",
          overflowWrap: "anywhere",
        }}
      >
        {project.techStack.join(", ")}
      </div>
    </div>
  );
};

export default ProjectCard;
