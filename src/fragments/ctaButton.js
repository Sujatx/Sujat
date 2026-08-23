import React from "react";
import { motion } from "framer-motion";

/* The single "email me" call to action. Home and the footer are the same
   button at two scales — never two separately tuned styles.

   w-fit keeps the wrapper button-width. Left as a full-width flex box it
   scales the whole row on hover, and a transform counts toward scroll
   overflow, which unlocks horizontal scrolling on the page. */
const CtaButton = ({ href, children, onClick, size = "md", className = "" }) => (
  <motion.div
    whileHover={{ scale: 1.06 }}
    whileTap={{ scale: 0.96 }}
    className={`flex w-fit ${className}`}
  >
    <a
      href={href}
      onClick={onClick}
      className={
        "font-abril inline-block whitespace-nowrap " +
        (size === "lg"
          ? "px-4 pt-1 pb-2 lg:px-7 lg:pt-2 lg:pb-3 4k:px-10 4k:pt-4 4k:pb-5 lg:text-2xl 4k:text-4xl"
          : "px-5 pt-2 pb-3 2xl:px-10 2xl:pt-4 2xl:pb-5 md:text-2xl 2xl:text-4xl")
      }
      style={{
        background: "var(--accent)",
        color: "var(--accent-ink)",
        border: "2px solid var(--accent-ink)",
        borderRadius: "var(--r-pill)",
      }}
    >
      {children}
    </a>
  </motion.div>
);

export default CtaButton;
