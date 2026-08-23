import React, { useEffect, useState } from 'react';
import CtaButton from "../fragments/ctaButton";
import { MAILTO_HREF, onMailClick } from "../lib/mailLink";

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
      <div className="flex m-auto flex-col text-primaryFont">
        <div className="text-[150px] lg:text-[200px] 4k:text-[300px] 4k:leading-[300px] font-tusker text-primaryFont leading-[200px] lg:leading-[100px] p-8">
          <span className="text-yellow">Let's</span> {scrambledText}
        </div>
        <CtaButton
          href={MAILTO_HREF}
          onClick={onMailClick}
          size="lg"
          className="mx-auto mt-5"
        >
          Say Hello!
        </CtaButton>
      </div>
      <div className="section-shell bg-transparent absolute bottom-10 left-0 right-0 flex justify-center text-primaryFont">
        <div className="font-sora text-center text-sm">
          Built and designed by Sujat Khan.<br />All rights reserved. ©
        </div>
      </div>
    </div>
  );
};

export default Footer;
