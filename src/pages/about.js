import React, { useState, useEffect, useRef } from "react";
import profileImage from "../assets/images/Profile-img.jpg";
import SectionHeading from "../fragments/sectionHeading";

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
      className="section-shell section-block min-h-screen flex flex-col bg-transparent text-primaryFont"
    >
      <SectionHeading>about</SectionHeading>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Image Section */}
        <div className="flex flex-col items-center justify-center">
        <div
          className={`relative flex w-fit items-center justify-center transition-transform duration-700 ${
            inView ? "scale-110" : "scale-50"
          }`}
        >
          <img
            src={profileImage}
            alt="Sujat"
            draggable="false"
            className="no-drag w-[180px] h-[270px] md:w-[215px] md:h-[315px] lg:w-[270px] lg:h-[395px] 2xl:w-[300px] 2xl:h-[440px] object-cover relative rounded-[50%]"
          />
          <div className="absolute bottom-0 left-0 right-0 flex justify-center">
            <span className="font-tusker text-primaryFont whitespace-nowrap text-[0px] md:text-[40px] lg:text-[48px] 2xl:text-[56px]">
              {scrambledText}
            </span>
          </div>
        </div>
      </div>

      {/* Text Section */}
      <div className="flex flex-col justify-center" style={{ maxWidth: '600px' }}>
        <h1
          className="font-anton"
          style={{ fontSize: '62px', lineHeight: '0.9', letterSpacing: '0.5px', marginBottom: '20px' }}
        >
          <span style={{ color: 'var(--accent)' }}>Hello! </span>
          <span style={{ color: 'var(--ink)' }}>I'm Sujat</span>
        </h1>

        <p
          className="font-sora"
          style={{ fontSize: 'var(--t-body)', lineHeight: '1.65', color: 'var(--ink-2)', maxWidth: '600px', marginBottom: 'var(--space-5)' }}
        >
          I'm a developer who builds projects — for clients, for fun, and for the challenge of it.
          Competing and speedrunning hackathon & CTF — mostly by shipping things and figuring it out as I go.
        </p>

        <p
          className="font-sora"
          style={{ fontSize: 'var(--t-body)', color: 'var(--ink-2)', marginBottom: 'var(--space-4)' }}
        >
          Here are some of the technologies I build with —
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-3) var(--space-6)',
            maxWidth: '480px',
            marginBottom: 'var(--space-5)',
          }}
        >
          {stack.map((tech) => (
            <div
              key={tech}
              className="flex items-center font-sora"
              style={{ gap: 'var(--space-3)', fontSize: 'var(--t-small)', color: 'var(--ink-2)' }}
            >
              <span style={{ color: 'var(--accent)', fontSize: 'var(--t-label)' }}>▸</span>
              {tech}
            </div>
          ))}
        </div>

        <p
          className="font-sora"
          style={{ fontSize: 'var(--t-body)', lineHeight: '1.65', color: 'var(--ink-3)', maxWidth: '600px' }}
        >
          So whether you need someone to code a digital masterpiece, paint a literal one, or tell you what to read next — I'm your person.
        </p>
        </div>
      </div>
    </div>
  );
};

export default About;
