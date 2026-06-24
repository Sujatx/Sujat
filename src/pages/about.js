import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import profileImage from "../assets/images/Profile-img.jpg";

const stack = ["TypeScript", "JavaScript", "React", "Python", "Docker"];

const About = () => {
  const [inView, setInView] = useState(false);
  const aboutRef = useRef(null);
  const [scrambledText, setScrambledText] = useState("");

  const finalText = "To define is to limit";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { root: null, threshold: 0.5 }
    );

    const aboutElement = aboutRef.current;
    if (aboutElement) observer.observe(aboutElement);
    return () => { if (aboutElement) observer.unobserve(aboutElement); };
  }, []);

  useEffect(() => {
    if (inView) scrambleText(finalText);
  }, [inView]);

  const scrambleText = (text) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let iterations = 0;
    const interval = setInterval(() => {
      setScrambledText(
        text.split("").map((char, index) => {
          if (index < iterations) return char;
          return characters[Math.floor(Math.random() * characters.length)];
        }).join("")
      );
      if (iterations >= text.length) {
        clearInterval(interval);
        setScrambledText(text);
      }
      iterations += 1 / 2;
    }, 50);
  };

  return (
    <div
      ref={aboutRef}
      className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-4 bg-transparent text-primaryFont p-10 bg-black"
    >
      {/* Image Section */}
      <div className="flex flex-col items-center justify-center">
        <div
          className={`relative flex w-full items-center justify-center transition-transform duration-700 ${
            inView ? "scale-110" : "scale-50"
          }`}
        >
          <img
            src={profileImage}
            alt="Sujat"
            className="w-[200px] h-[350px] md:w-[350px] md:lg:h-[500px] 2xl:w-[500px] object-cover relative rounded-[50%]"
          />
          <div className="flex flex-row absolute bottom-0 left-[100px]">
            <span className="font-tusker mt-[100px] text-primaryFont text-[0px] md:text-[70px] 2xl:text-[100px] 2xl:ml-[200px]">
              {scrambledText}
            </span>
          </div>
        </div>
      </div>

      {/* Text Section */}
      <div className="flex flex-col justify-center" style={{ maxWidth: '600px' }}>
        <span
          className="font-spaceMono uppercase block"
          style={{ fontSize: '12px', letterSpacing: '3px', color: '#FFD24A', marginBottom: '14px' }}
        >
          / ABOUT
        </span>

        <h1
          className="font-anton"
          style={{ fontSize: '62px', lineHeight: '0.9', letterSpacing: '0.5px', marginBottom: '20px' }}
        >
          <span style={{ color: '#FFD24A' }}>Hello! </span>
          <span style={{ color: '#F5EEE6' }}>I'm Sujat</span>
        </h1>

        <p
          className="font-sora"
          style={{ fontSize: '16px', lineHeight: '1.65', color: '#CFC9BD', maxWidth: '600px', marginBottom: '20px' }}
        >
          I'm a developer who builds projects — for clients, for fun, and for the challenge of it.
          I contribute to open source when something catches my eye, and I'm always learning — mostly by shipping things and figuring it out as I go.
        </p>

        <p
          className="font-sora"
          style={{ fontSize: '16px', color: '#CFC9BD', marginBottom: '16px' }}
        >
          Here are some of the technologies I build with —
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '13px 28px',
            maxWidth: '480px',
            marginBottom: '24px',
          }}
        >
          {stack.map((tech) => (
            <motion.div
              key={tech}
              className="flex items-center font-sora cursor-default select-none"
              style={{ gap: '13px', fontSize: '16px', color: '#E7E1D6' }}
              whileHover={{ x: 4, color: '#FFD24A' }}
              transition={{ duration: 0.18 }}
            >
              <span style={{ color: '#FFD24A', fontSize: '12px' }}>▸</span>
              {tech}
            </motion.div>
          ))}
        </div>

        <p
          className="font-sora"
          style={{ fontSize: '16px', lineHeight: '1.65', color: '#8F897C', maxWidth: '600px' }}
        >
          So whether you need someone to code a digital masterpiece, paint a literal one, or tell you what to read next — I'm your person.
        </p>
      </div>
    </div>
  );
};

export default About;
