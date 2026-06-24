import React from "react";
import painting01 from "../assets/images/painting-01.png";
import painting02 from "../assets/images/painting-02.png";

const Hobby = () => {
  return (
    <div className="w-full h-full md:p-10 2xl:p-[100px] p-5 bg-transparent flex flex-col text-primaryFont">
      <div className="font-tuskerBold text-7xl sm:text-9xl flex justify-center text-primaryFont m-5">artistry unveiled .</div>
      {/* Intro Text */}
      <div className="justify-start text-2xl 2xl:text-5xl font-abril">
        I like art..
      </div>

      {/* Image Container */}
      <div className="w-full flex flex-col md:flex-row gap-8 mt-10 justify-center items-center md:items-end">
        <img src={painting01} className="max-w-full md:w-auto max-h-[480px] rounded-2xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl" alt="Painting 01" />
        <img src={painting02} className="max-w-full md:w-auto max-h-[384px] rounded-2xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl" alt="Painting 02" />
      </div>

      {/* Outro Text */}
      <div className="justify-end text-right 2xl:text-5xl text-2xl font-abril mt-5">
        ...hence the theme
      </div>
    </div>
  );
};

export default Hobby;