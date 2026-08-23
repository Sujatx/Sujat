import React, { useState } from "react";
import { GithubIcon, ShareIcon, FolderIcon, IconButton } from "./icons";

const ProjectCard = ({ project }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#000",
        border: "1px solid " + (hovered ? "rgba(245,238,230,0.32)" : "rgba(245,238,230,0.16)"),
        borderRadius: "16px",
        padding: "28px 26px 24px",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "border-color .2s ease, transform .2s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Header: folder glyph left, links right */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "26px" }}>
        <span style={{ color: hovered ? "#FFD24A" : "rgba(245,238,230,0.55)", transition: "color .2s ease" }}>
          <FolderIcon />
        </span>
        <div style={{ display: "flex", gap: "10px" }}>
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
          fontSize: "22px",
          lineHeight: "1.05",
          textTransform: "uppercase",
          color: "#F5EEE6",
          marginBottom: "12px",
        }}
      >
        {project.titleLine1}{" "}
        <span style={{ color: "#FFD24A" }}>{project.titleLine2}</span>
      </h3>

      <p
        className="font-sora"
        style={{
          fontSize: "12.5px",
          lineHeight: "1.6",
          color: "#CFC9BD",
          marginBottom: "18px",
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
          paddingTop: "18px",
          fontSize: "10.5px",
          letterSpacing: "1px",
          lineHeight: "1.7",
          textTransform: "uppercase",
          color: "#8F897C",
          overflowWrap: "anywhere",
        }}
      >
        {project.techStack.join(", ")}
      </div>
    </div>
  );
};

export default ProjectCard;
