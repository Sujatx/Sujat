import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { GithubIcon, ShareIcon, ChevronIcon, PlayIcon, IconButton } from "./icons";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
};

/* Blurred, over-scaled copy of the media so a frame that does not match the
   panel aspect ratio fills the flanks instead of showing bare letterbox. */
const BlurBackdrop = ({ src }) =>
  src ? (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "blur(40px) saturate(1.15)",
        transform: "scale(1.2)",
        opacity: 0.45,
      }}
    />
  ) : (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(120% 90% at 50% 40%, rgba(245,238,230,0.09) 0%, rgba(0,0,0,0) 70%), #060504",
      }}
    />
  );

const SlideMedia = ({ project, playVideo, onRequestPlay }) => {
  const title = `${project.titleLine1} ${project.titleLine2}`;
  const contain = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
  };

  if (project.video) {
    return (
      <>
        <BlurBackdrop src={project.poster} />
        {playVideo ? (
          <video
            src={project.video}
            poster={project.poster || undefined}
            preload="none"
            autoPlay
            muted
            loop
            playsInline
            aria-label={`${title} walkthrough`}
            style={contain}
          />
        ) : (
          <>
            {project.poster && <img src={project.poster} alt={title} style={contain} />}
            <button
              type="button"
              onClick={onRequestPlay}
              aria-label={`Play ${title} walkthrough`}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#F5EEE6",
              }}
            >
              <span
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  border: "1px solid rgba(245,238,230,0.45)",
                  background: "rgba(0,0,0,0.45)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: "4px",
                }}
              >
                <PlayIcon size={20} />
              </span>
            </button>
          </>
        )}
      </>
    );
  }

  return (
    <>
      <BlurBackdrop src={project.image} />
      <img src={project.image} alt={title} style={contain} />
    </>
  );
};

/* Bare chevron — no circle chrome, so it stays clear of the media. */
const ArrowButton = ({ dir, onClick, label, size = 30 }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      style={{
        background: "transparent",
        border: "none",
        padding: "6px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: hovered ? "#FFD24A" : "rgba(245,238,230,0.65)",
        filter: "drop-shadow(0 1px 6px rgba(0,0,0,0.6))",
        transition: "color .15s ease",
      }}
    >
      <ChevronIcon dir={dir} size={size} />
    </button>
  );
};

const SpotlightMeta = ({ project, overlay }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      maxWidth: "620px",
      margin: "0 auto",
      padding: overlay ? 0 : "20px 2px 0",
    }}
  >
    <h3
      className="font-anton"
      style={{
        fontSize: overlay ? "clamp(26px, 2.6vw, 42px)" : "28px",
        lineHeight: "0.95",
        textTransform: "uppercase",
        textShadow: overlay ? "0 2px 20px rgba(0,0,0,0.75)" : "none",
        marginBottom: "10px",
      }}
    >
      <span style={{ color: "#F5EEE6" }}>{project.titleLine1} </span>
      <span style={{ color: "#FFD24A" }}>{project.titleLine2}</span>
    </h3>

    <p
      className="font-sora"
      style={{
        fontSize: "13px",
        lineHeight: "1.55",
        color: overlay ? "#E4DED4" : "#CFC9BD",
        marginBottom: "10px",
        textShadow: overlay ? "0 1px 10px rgba(0,0,0,0.7)" : "none",
      }}
    >
      {project.tagline || project.description}
    </p>

    <div
      className="font-spaceMono"
      style={{
        fontSize: "10.5px",
        letterSpacing: "1px",
        lineHeight: "1.7",
        textTransform: "uppercase",
        color: overlay ? "#B6AFA2" : "#8F897C",
        marginBottom: "14px",
        overflowWrap: "anywhere",
      }}
    >
      {project.techStack.join(", ")}
    </div>

    {(project.github || project.live) && (
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        {project.github && (
          <IconButton
            href={project.github}
            size={34}
            label={`${project.titleLine1} ${project.titleLine2} on GitHub`}
          >
            <GithubIcon size={18} />
          </IconButton>
        )}
        {project.live && (
          <IconButton
            href={project.live}
            size={34}
            label={`${project.titleLine1} ${project.titleLine2} live site`}
          >
            <ShareIcon size={18} />
          </IconButton>
        )}
      </div>
    )}
  </div>
);

const ProjectSpotlight = ({ projects }) => {
  const [active, setActive] = useState(0);
  const [manualPlay, setManualPlay] = useState(false);
  const [inView, setInView] = useState(false);
  const wrapperRef = useRef(null);

  const isMobile = useMediaQuery("(max-width: 767px)");
  const reduceMotion = useReducedMotion();

  const count = projects.length;
  const go = useCallback((next) => setActive((next + count) % count), [count]);

  useEffect(() => {
    setManualPlay(false);
  }, [active]);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { root: null, threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  if (!count) return null;

  const project = projects[active];
  const autoAllowed = inView && !isMobile && !reduceMotion;
  const playVideo = Boolean(project.video) && (autoAllowed || manualPlay);

  const panelHeight = isMobile ? "220px" : "clamp(260px, 34vw, 460px)";

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(active - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(active + 1);
    }
  };

  return (
    <div ref={wrapperRef} style={{ marginBottom: "64px" }}>
      {/* Media panel — one fixed size for every slide */}
      <div
        tabIndex={0}
        onKeyDown={onKeyDown}
        role="group"
        aria-roledescription="carousel"
        aria-label="Featured projects"
        style={{
          position: "relative",
          height: panelHeight,
          borderRadius: "16px",
          border: "1px solid rgba(245,238,230,0.14)",
          overflow: "hidden",
          background: "#000",
        }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, x: reduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{ position: "absolute", inset: 0 }}
          >
            <SlideMedia
              project={project}
              playVideo={playVideo}
              onRequestPlay={() => setManualPlay(true)}
            />
          </motion.div>
        </AnimatePresence>

        {/* Desktop: scrim + overlaid copy */}
        {!isMobile && (
          <>
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.55) 32%, rgba(0,0,0,0) 62%)",
              }}
            />
            <div style={{ position: "absolute", left: "72px", right: "72px", bottom: "30px" }}>
              <SpotlightMeta project={project} overlay />
            </div>

            <div style={{ position: "absolute", top: "50%", left: "14px", transform: "translateY(-50%)" }}>
              <ArrowButton dir="left" onClick={() => go(active - 1)} label="Previous project" />
            </div>
            <div style={{ position: "absolute", top: "50%", right: "14px", transform: "translateY(-50%)" }}>
              <ArrowButton dir="right" onClick={() => go(active + 1)} label="Next project" />
            </div>
          </>
        )}
      </div>

      {/* Mobile: copy sits below the panel */}
      {isMobile && <SpotlightMeta project={project} overlay={false} />}

      {/* Controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {isMobile && (
          <ArrowButton dir="left" size={22} onClick={() => go(active - 1)} label="Previous project" />
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {projects.map((p, i) => (
            <button
              key={p.titleLine1 + p.titleLine2}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to project ${i + 1}: ${p.titleLine1} ${p.titleLine2}`}
              aria-current={i === active}
              style={{
                width: isMobile ? "22px" : "32px",
                height: "3px",
                padding: 0,
                border: "none",
                borderRadius: "2px",
                cursor: "pointer",
                background: i === active ? "#FFD24A" : "rgba(245,238,230,0.24)",
                transition: "background .25s ease",
              }}
            />
          ))}
        </div>

        {isMobile && (
          <ArrowButton dir="right" size={22} onClick={() => go(active + 1)} label="Next project" />
        )}
      </div>
    </div>
  );
};

export default ProjectSpotlight;
