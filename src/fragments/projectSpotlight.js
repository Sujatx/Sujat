import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { GithubIcon, ShareIcon, ChevronIcon, PlayIcon, IconButton } from "./icons";

/* Blurred, over-scaled copy of the media so a frame that does not match the
   panel aspect ratio fills the flanks instead of showing bare letterbox. */
/* How long a still-image slide holds before advancing. */
const IMAGE_MS = 5000;

/* Playback speed for spotlight clips. Set on loadedmetadata because
   playbackRate is a property, not an attribute, and it resets on each load. */
const VIDEO_RATE = 1.25;
const setRate = (e) => {
  e.currentTarget.playbackRate = VIDEO_RATE;
};

const acrylic = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  filter: "blur(36px) saturate(1.3)",
  transform: "scale(1.15)",
  opacity: 0.7,
};

const BlurBackdrop = ({ src, video }) =>
  video ? (
    /* A second copy of the clip, blurred, so the flanks carry the frame's own
       colour as it plays instead of a static fallback. */
    <video
      src={video}
      autoPlay
      muted
      playsInline
      onLoadedMetadata={setRate}
      aria-hidden="true"
      tabIndex={-1}
      draggable="false"
      className="no-drag"
      style={acrylic}
    />
  ) : src ? (
    <div
      aria-hidden="true"
      style={{
        ...acrylic,
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  ) : (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(120% 90% at 50% 40%, rgba(245,238,230,0.09) 0%, rgba(0,0,0,0) 70%), var(--surface)",
      }}
    />
  );

const SlideMedia = ({ project, playVideo, onRequestPlay, videoRef }) => {
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
        {playVideo ? (
          <BlurBackdrop video={project.video} />
        ) : (
          <BlurBackdrop src={project.poster} />
        )}
        {playVideo ? (
          <video
            ref={videoRef}
            src={project.video}
            poster={project.poster || undefined}
            className="no-drag"
            draggable="false"
            preload="none"
            autoPlay
            muted
            playsInline
            onLoadedMetadata={setRate}
            aria-label={`${title} walkthrough`}
            style={contain}
          />
        ) : (
          <>
            {project.poster && (
              <img src={project.poster} alt={title} className="no-drag" draggable="false" style={contain} />
            )}
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
                color: "var(--ink)",
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
      <img src={project.image} alt={title} loading="lazy" decoding="async" className="no-drag" draggable="false" style={contain} />
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
        color: hovered ? "var(--accent)" : "rgba(245,238,230,0.65)",
        filter: "drop-shadow(0 1px 6px rgba(0,0,0,0.6))",
        transition: "color .15s ease",
      }}
    >
      <ChevronIcon dir={dir} size={size} />
    </button>
  );
};

const SpotlightMeta = ({ project }) => {
  const hasLinks = Boolean(project.github || project.live);

  return (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      maxWidth: "620px",
      margin: "0 auto",
    }}
  >
    <h3
      className="font-anton"
      style={{
        fontSize: "var(--t-h2)",
        lineHeight: "0.95",
        textTransform: "uppercase",
        textShadow: "0 2px 20px rgba(0,0,0,0.75)",
        marginBottom: "clamp(4px, 1.4vw, 12px)",
      }}
    >
      <span style={{ color: "var(--ink)" }}>{project.titleLine1} </span>
      <span style={{ color: "var(--accent)" }}>{project.titleLine2}</span>
    </h3>

    <p
      className="font-sora"
      style={{
        fontSize: "var(--t-small)",
        lineHeight: "1.55",
        color: "var(--ink-2)",
        marginBottom: "clamp(4px, 1.4vw, 12px)",
        textShadow: "0 1px 10px rgba(0,0,0,0.7)",
      }}
    >
      {project.tagline || project.description}
    </p>

    <div
      className="font-spaceMono"
      style={{
        fontSize: "var(--t-label)",
        letterSpacing: "1px",
        lineHeight: "1.5",
        textTransform: "uppercase",
        color: "var(--ink-3)",
        /* No icon row on link-less projects, so the margin would be dead space. */
        marginBottom: hasLinks ? "clamp(6px, 1.8vw, 16px)" : 0,
        overflowWrap: "anywhere",
      }}
    >
      {project.techStack.join(", ")}
    </div>

    {hasLinks && (
      <div style={{ display: "flex", justifyContent: "center", gap: "var(--space-3)" }}>
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
};

const ProjectSpotlight = ({ projects }) => {
  const [active, setActive] = useState(0);
  const [manualPlay, setManualPlay] = useState(false);
  const [inView, setInView] = useState(false);
  const wrapperRef = useRef(null);
  const touchStart = useRef(null);
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);

  const reduceMotion = useReducedMotion();

  const count = projects.length;
  const go = useCallback((next) => setActive((next + count) % count), [count]);

  const project = projects[active];
  const autoAllowed = inView && !reduceMotion;
  const playVideo = Boolean(project && project.video) && (autoAllowed || manualPlay);

  useEffect(() => {
    setManualPlay(false);
  }, [active]);

  /* Drives the indicator and the auto-advance. Video slides run for as long as
     the clip does and follow its actual playback; image slides run IMAGE_MS.
     A video waiting on a manual play button holds the carousel rather than
     advancing past unwatched footage. */
  useEffect(() => {
    setProgress(0);
    if (!inView) return undefined;

    const isVideo = Boolean(project && project.video);
    if (isVideo && !playVideo) return undefined;

    const start = performance.now();
    let raf;
    const tick = (now) => {
      let p;
      if (isVideo) {
        const v = videoRef.current;
        p = v && v.duration ? v.currentTime / v.duration : 0;
      } else {
        p = (now - start) / IMAGE_MS;
      }
      if (p >= 1) {
        go(active + 1);
        return;
      }
      setProgress(p);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, inView, playVideo, project, go]);

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

  const panelHeight = "clamp(260px, 34vw, 460px)";

  /* Swipe to advance. Gestures that are mostly vertical are ignored so the
     page still scrolls normally with a finger on the panel. */
  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < 50 || Math.abs(dx) <= Math.abs(dy)) return;
    go(dx < 0 ? active + 1 : active - 1);
  };

  if (!count) return null;

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
    <div ref={wrapperRef} style={{ marginBottom: "var(--space-8)" }}>
      {/* Media panel — one fixed size for every slide */}
      <div
        tabIndex={0}
        onKeyDown={onKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        role="group"
        aria-roledescription="carousel"
        aria-label="Featured projects"
        style={{
          position: "relative",
          height: panelHeight,
          borderRadius: "var(--r-xl)",
          border: "1px solid var(--hairline)",
          overflow: "hidden",
          background: "var(--surface)",
          /* Vertical panning stays with the page; horizontal is ours. */
          touchAction: "pan-y",
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
              videoRef={videoRef}
              playVideo={playVideo}
              onRequestPlay={() => setManualPlay(true)}
            />
          </motion.div>
        </AnimatePresence>

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
        {/* Inset scales so the copy always clears the arrows, down to 360px. */}
        <div
          style={{
            position: "absolute",
            left: "clamp(48px, 12vw, 72px)",
            right: "clamp(48px, 12vw, 72px)",
            bottom: "clamp(10px, 3.5vw, 30px)",
          }}
        >
          <SpotlightMeta project={project} />
        </div>

        {/* Touch gets the swipe gesture instead. */}
        <div
          className="hidden md:block"
          style={{ position: "absolute", top: "50%", left: "14px", transform: "translateY(-50%)" }}
        >
          <ArrowButton dir="left" onClick={() => go(active - 1)} label="Previous project" />
        </div>
        <div
          className="hidden md:block"
          style={{ position: "absolute", top: "50%", right: "14px", transform: "translateY(-50%)" }}
        >
          <ArrowButton dir="right" onClick={() => go(active + 1)} label="Next project" />
        </div>
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--space-3)",
          marginTop: "var(--space-5)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
          {projects.map((p, i) => (
            <button
              key={p.titleLine1 + p.titleLine2}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to project ${i + 1}: ${p.titleLine1} ${p.titleLine2}`}
              aria-current={i === active}
              style={{
                width: "32px",
                height: "3px",
                padding: 0,
                border: "none",
                borderRadius: "2px",
                cursor: "pointer",
                background: "rgba(245,238,230,0.24)",
                overflow: "hidden",
                display: "block",
              }}
            >
              <span
                style={{
                  display: "block",
                  height: "100%",
                  width: i === active ? `${Math.round(progress * 100)}%` : "0%",
                  background: "var(--accent)",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectSpotlight;
