import React from "react";

/* One recipe for every section heading between the hero and the footer:
   Anton at --t-h1, ink, closed by an accent period. */
const SectionHeading = ({ children, as: Tag = "h2", align = "left", className = "" }) => (
  <Tag
    className={`font-anton ${className}`}
    style={{
      fontSize: "var(--t-h1)",
      lineHeight: "0.95",
      letterSpacing: "0.5px",
      color: "var(--ink)",
      textAlign: align,
      marginBottom: "var(--space-5)",
    }}
  >
    {children} <span style={{ color: "var(--accent)" }}>.</span>
  </Tag>
);

export default SectionHeading;
