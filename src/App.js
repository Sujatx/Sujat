import React, { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import "./index.css";
import Navbar from "./fragments/navbar";
import Home from "./pages/home";
import About from "./pages/about";
import Footer from "./pages/footer";
import Work from "./pages/work";
import Hobby from "./pages/art";
import { Analytics } from "@vercel/analytics/react";


function App() {
  const [scrolled, setScrolled] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const maxScroll = document.documentElement.scrollHeight - vh;

      setScrolled(y > vh / 2);
      setNearFooter(maxScroll - y < vh / 2);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative">
      <Analytics />
      {/* Scroll Progress Indicator */}
      <motion.div
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 60,
          left: 0,
          right: 0,
          height: "5px",
          originX: 0,
          backgroundColor: "#FFDA73",
          zIndex: 50,
        }}
      />

      <div
        className="fixed top-0 left-0 w-full h-screen bg-landingImg bg-cover bg-center"
        style={{
          opacity: (!scrolled || nearFooter) ? 1 : 0,
          transition: "opacity 0.7s ease",
        }}
      ></div>
      <div className="relative z-10">
        <Navbar scrolled={scrolled} />
        <div id="home" className="relative">
          <Home />
        </div>
        <div id="about" className="relative">
          <About />
        </div>
        <div id="work" className="relative">
          <Work />
        </div>
        <div id="hobbies" className="relative">
          <Hobby />
        </div>

        <div id="contact" className="relative">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
