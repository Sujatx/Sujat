import React, { useState, useEffect } from "react";
import "../index.css";
import { motion } from "framer-motion";

const Home = () => {
  const [currentDate] = useState(getDate());
  const [scrambledDesigner, setScrambledDesigner] = useState("");
  const finalDesignerText = "DESIGNER";

  function getDate() {
    const today = new Date();
    const months = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[today.getMonth()];
    const date = today.getDate();
    return [date, month];
  }

  useEffect(() => {
    scrambleText(finalDesignerText);
  }, []);

  const scrambleText = (text) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let iterations = 0;

    const interval = setInterval(() => {
      setScrambledDesigner(
        text
          .split("")
          .map((char, index) => {
            if (index < iterations) {
              return char; // Keep revealed characters
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      if (iterations >= text.length) {
        clearInterval(interval);
        setScrambledDesigner(text); // Ensure final text is displayed
      }

      iterations += 1 / 2; // Adjust speed of character reveal
    }, 80); // Adjust interval duration for animation speed
  };

  return (
    <div className="relative w-full h-[80vh] mb-[20vh] flex items-center justify-center">
      <div className="flex flex-row justify-between grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 text-white">
        <div></div>
        {/* Top Right Section */}
        <div>
          <div className="font-jack text-[70px] leading-[30px] md:lg:text-[100px] md:lg:leading-[50px] 2xl:text-[160px] 2xl:leading-[80px]">
            *{currentDate[0]}{" "}
            <span className="text-[40px] md:lg:text-[70px] 2xl:text-[120px]">
              {currentDate[1]}
            </span>
          </div>
          <div className="font-jack text-[16px] 2xl:text-[50px] md:lg:text-[30px] ml-5 md:lg:ml-9 2xl:ml-16 text-yellow">
            available for work
          </div>
          <div className="flex flex-col font-sora text-[15px] md:lg:text-[20px] 2xl:text-[40px] md:lg:ml-10 mx-5 2xl:ml-20">
            I build projects — some for clients, most just because.
            Creating more than I consume.
            Like the Man said - "to heal the soul through the senses, and the senses through the soul."
          </div>
        </div>

        {/* Bottom Left Section */}
        <div className="flex flex-col md:px-10 px-5 2xl:px-20">
          <div className="font-jack text-primaryFont text-[30px] leading-[30px] md:lg:text-[50px] md:lg:leading-[50px] 2xl:text-[70px] 2xl:leading-[80px] mb-2 md:lg:mb-5">
            creative
          </div>
          <div className="font-tuskerBold text-yellow text-[100px] leading-[100px] md:text-[100px] md:leading-[100px] lg:text-[150px] lg:leading-[120px] 2xl:text-[300px] 2xl:leading-[300px]">
            {scrambledDesigner}
            <span className="font-jack text-[50px] md:lg:text-[70px] 2xl:text-[100px] text-primaryFont">
              &
            </span>
          </div>
          <div className="text-primaryFont font-tuskerBold text-[100px] leading-[50px] md:text-[100px] md:leading-[50px] lg:text-[150px] lg:leading-[100px] 2xl:text-[300px] 2xl:leading-[150px]">
            DEVELOPER
          </div>
        </div>

        {/* Bottom Right Section */}
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          className="flex bottom-1 md:bottom-10 right-0 justify-end mr-5 md:absolute sm:relative 2xl:mr-10"
        >
          <a
            href="mailto:sujatk891@gmail.com?subject=Hello Sujat!&body=Hi Sujat,"
            className="px-5 pt-2 pb-3 2xl:px-10 2xl:pt-4 2xl:pb-5 font-abril text-md md:text-2xl 2xl:text-4xl text-[#16130f] bg-[#FFD24A] border-2 border-[#16130f] rounded-full"
          >
            Say hi!
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
