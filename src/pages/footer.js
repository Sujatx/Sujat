import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";

const Footer = () => {
  const [scrambledText, setScrambledText] = useState("");
  const finalConnectText = "Connect";

  useEffect(() => {
    scrambleText(finalConnectText);
  }, []);

  const scrambleText = (text) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let iterations = 0;

    const interval = setInterval(() => {
      setScrambledText(
        text
          .split("")
          .map((char, index) => {
            if (index < iterations) return char;
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      if (iterations >= text.length) {
        clearInterval(interval);
        setScrambledText(text);
      }

      iterations += 1 / 2;
    }, 100);
  };

  return (
    <div
      className="relative w-full h-screen bg-transparent bg-center justify-start bg-cover flex"
    >
      <div className="flex m-auto flex-col text-white">
        <div className="text-[150px] md:lg:text-[200px] 4k:text-[300px] 4k:leading-[300px] font-tusker text-primaryFont leading-[200px] md:lg:leading-[100px] p-8">
          <span className="text-yellow">Let's</span> {scrambledText}
        </div>
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          className='justify-center flex'
        >
          <a
            href="mailto:sujatk891@gmail.com?subject=Hello Sujat!&body=Hi Sujat,"
            className="md:lg:px-7 m-auto bg-yellow mt-5 md:lg:pt-2 md:lg:pb-3 pt-1 pb-2 px-4 4k:px-10 4k:pt-4 4k:pb-5 font-abril text-md md:lg:text-2xl 4k:text-4xl text-black border-4 border-black rounded-full"
          >
            Say Hello!
          </a>
        </motion.div>
      </div>
      <div className="bg-transparent absolute bottom-10 flex px-10 4k:px-20 justify-end text-primaryFont w-full">
        <div className="font-sora text-right text-sm">
          Built and designed by Sujat Khan.<br />All rights reserved. ©
        </div>
      </div>
    </div>
  );
};

export default Footer;
