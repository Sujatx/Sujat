import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import htmlImg from "../assets/tech-icons/html.png";
import cssImg from "../assets/tech-icons/css.png";
import reactImg from "../assets/tech-icons/react.png";
import javascriptImg from "../assets/tech-icons/js.png";
import typescriptImg from "../assets/tech-icons/typescript.png";
import nodeJsImg from "../assets/tech-icons/node-js.png";
import pythonImg from "../assets/tech-icons/python.png";


const Skills = () => {
  const initialImages = [
    { src: htmlImg, name: "HTML" },
    { src: cssImg, name: "CSS" },
    { src: reactImg, name: "React" },
    { src: javascriptImg, name: "JavaScript" },
    { src: typescriptImg, name: "TypeScript" },
    { src: nodeJsImg, name: "Node.js" },
    { src: pythonImg, name: "Python" },
  ];

  const [images, setImages] = useState(initialImages);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [shuffleCount, setShuffleCount] = useState(0);

  const handleMouseMove = (e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    if (shuffleCount < 6) {
      const timeout = setTimeout(() => {
        setImages((prevImages) => shuffleArray(prevImages));
        setShuffleCount((prevCount) => prevCount + 1);
      }, 1000); // Shuffle every 1 second
      return () => clearTimeout(timeout);
    }
  }, [shuffleCount]);

  return (
    <>
    <div className="flex flex-col w-full items-center justify-center p-5">
    <p className="text-5xl  sm:text-9xl mb-4 text-primaryFont font-tuskerBold">my tech stack.</p>
    </div>
    <div
      className="relative px-10 lg:px-44 xl:px-64 pb-16"
      onMouseMove={handleMouseMove}
    >
      {/* Cursor-following text */}
      <div
        className="fixed pointer-events-none"
        style={{
          top: cursorPosition.y,
          left: cursorPosition.x,
          transform: "translate(-50%, -50%)",
          zIndex: 50,
        }}
      >
        {hoveredImage && (
          <motion.div
            className="bg-[#FFD900] font-abril text-black text-2xl px-4 py-1 rounded-full shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            {hoveredImage}
          </motion.div>
        )}
      </div>

      {/* Grid of images */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden p-3 sm:p-5 bg-white rounded-lg"
            style={{ aspectRatio: "1 / 1" }}
            onMouseEnter={() => setHoveredImage(image.name)}
            onMouseLeave={() => setHoveredImage(null)}
          >
            <motion.img
              src={image.src}
              alt={image.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Skills;
