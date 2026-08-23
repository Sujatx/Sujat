import React from "react";
import painting01 from "../assets/images/painting-01.webp";
import painting02 from "../assets/images/painting-02.webp";
import SectionHeading from "../fragments/sectionHeading";

const Hobby = () => {
  return (
    <div className="section-shell section-block h-full bg-transparent flex flex-col text-primaryFont">
      <SectionHeading>artistry unveiled</SectionHeading>
      {/* Intro Text */}
      <div className="font-sora text-2xl 2xl:text-5xl">
        I like art..
      </div>

      {/* Image Container */}
      <div className="w-full flex flex-col md:flex-row gap-8 mt-10 justify-center items-center md:items-end">
        <img src={painting01} loading="lazy" decoding="async" draggable="false" className="no-drag max-w-full md:w-auto max-h-[480px] rounded-lg transition-transform duration-300 md:hover:scale-105 hover:shadow-2xl" alt="Painting 01" />
        <img src={painting02} loading="lazy" decoding="async" draggable="false" className="no-drag max-w-full md:w-auto max-h-[384px] rounded-lg transition-transform duration-300 md:hover:scale-105 hover:shadow-2xl" alt="Painting 02" />
      </div>

      {/* Outro Text */}
      <div className="font-sora text-right text-2xl 2xl:text-5xl mt-5">
        ...hence the theme
      </div>
    </div>
  );
};

export default Hobby;