import React, { useState } from "react";

export const GithubIcon = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

/* Stroked glyphs below are Lucide, unmodified, at Lucide's own 2px stroke.
   GithubIcon above stays the official brand mark. */

/* lucide: square-arrow-up */
export const ShareIcon = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="m16 12-4-4-4 4" />
    <path d="M12 16V8" />
  </svg>
);

/* lucide: folder */
export const FolderIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
  </svg>
);

/* lucide: chevron-left (mirrored for the right-hand control) */
export const ChevronIcon = ({ dir = "left", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    style={{ transform: dir === "right" ? "rotate(180deg)" : "none" }}>
    <path d="m15 18-6-6 6-6" />
  </svg>
);

/* lucide: play */
export const PlayIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
  </svg>
);

/* Bare glyph link/button — no circle chrome, colour carries the hover state.
   Fixed box keeps a comfortable tap target even though nothing is drawn. */
export const IconButton = ({ href, onClick, label, size = 34, children }) => {
  const [hovered, setHovered] = useState(false);

  const style = {
    width: size + "px",
    height: size + "px",
    background: "transparent",
    border: "none",
    color: hovered ? "#FFD24A" : "rgba(245,238,230,0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transform: hovered ? "translateY(-2px)" : "translateY(0)",
    transition: "color .15s ease, transform .15s ease",
    cursor: "pointer",
    flexShrink: 0,
    padding: 0,
    filter: "drop-shadow(0 1px 6px rgba(0,0,0,0.55))",
  };

  const handlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus: () => setHovered(true),
    onBlur: () => setHovered(false),
  };

  if (onClick) {
    return (
      <button type="button" onClick={onClick} aria-label={label} style={style} {...handlers}>
        {children}
      </button>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} style={style} {...handlers}>
      {children}
    </a>
  );
};
