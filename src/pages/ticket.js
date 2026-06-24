import React from "react";
import aiImg from "../assets/images/ai.png";
import barcodeImg from "../assets/images/barcode.png";
import womanlyImg from "../assets/images/womanly.png"
import { motion } from "framer-motion";
import ExrayImg from "../assets/images/Exray.png";
import jarvisImg from "../assets/images/jarvis.png";
import shuklaImg from "../assets/images/shuklaupvccraft.png";

const Ticket = () => {
    const projects = [
        {
            image: shuklaImg,
            title: "Shukla Upvccraft",
            subtitle: "Premium uPVC Windows & Doors",
            techStack: ["React 19", "Tailwind CSS 4", "Framer Motion", "Radix UI", "Wouter", "Vite 7"],
            description:
            "A modern, high-performance web platform for a premium aluminum and uPVC solutions business. It features a polished frontend with rich animations, category-filtered project galleries, and direct WhatsApp integration for enquiries.",
         
            link: "https://www.shuklaupvccraft.com/",
          },
        {
            image: jarvisImg,
            title: "Jarvis",
            subtitle: "The AI Assistant",
            techStack: ["Python", "PySide6", "Playwright", "SQLite"],
            description:
            "An autonomous AI agent for Windows that automates complex tasks through natural language using voice interaction, multi-step reasoning, and an integrated HUD dashboard.",
         
            link: "https://github.com/Sujatx/jarvis/",
          },
        {
            image: ExrayImg,
            title: "Ex-Ray",
            subtitle: "The Relationship X-Ray Tool",
            techStack: ["Python", "Javascript"],
            description:
            "Ex-Ray is a tiny open-source tool that scans your Instagram DMs and roasts your chat game.",
         
            link: "https://github.com/Sujatx/Ex-Ray/",
          },
        {
          image: aiImg,
          title: "AstroResearch Agent",
          subtitle: "Full-Stack AI Agent",
          techStack: ["Python", "JavaScript", "HTML", "CSS"],
          description:
          "A full-stack AI-powered tool that analyzes astrophysics topics, retrieves relevant research papers, performs domain-specific computations, and generates structured research-style reports.",
          link: "https://astroresearch-agent.vercel.app/",
        },
        {
          image: womanlyImg,
          title: "Womanly",
          subtitle: "Next.js e-commerce platform",
          techStack: ["TypeScript", "JavaScript", "CSS", "Next.js"],
          description:
          "Womanly is a modern e-commerce platform built with Next.js, featuring a sleek design and smooth animations to enhance user experience.",
          link: "https://womanly-beryl.vercel.app/",
        },
      ];
      

  return (
    <div className="h-full overflow-hidden pb-10 grid grid-cols-1 md:px-5 py-20 justify-center gap-4 bg-transparent text-primaryFont">
         
      {/* Big screen */}
      {projects.map((project, index) => (
        <React.Fragment key={index}>
      <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.8 }}
        id="big-rectangle"
        className="hidden md:flex bg-primaryFont relative  m-auto my-5 w-full max-w-[1200px] 2xl:max-w-[1500px] 2xl:min-h-[500px] min-h-[250px] "
        >
            {/* Barcode Section  */}
            <div className="hidden xl:flex xl:flex-col justify-start p-5 text-black">
                <div className="lg:w-[180px] lg:h-[200px] ">
                <img
                    src={barcodeImg}
                    alt="barcode"
                    className="rotate-90 lg:object-none lg:h-[200px] lg:w-[700px] w-[180px] h-[200px]"
                />
                </div>
                <div className="font-jack md:text-xl text-3xl 2xl:ml-2 2xl:text-5xl md:mt-[6px]  ml-10">
                Project 0{index + 1}
                </div>
            </div>
            {/* Project image */}
            <div className="flex flex-col h-[300px]  2xl:h-[500px] border-l-4 border-black border-dashed ">
                <div className="w-[450px] 2xl:w-[600px] 2xl:h-[500px] h-[300px]">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <img 
                            src={project.image}
                            alt={project.title}
                            className="w-[600px]  object-cover h-full"
                        />
                    </a>
                </div>
            </div>
         {/* Project details  */}

         <div className="justify-left 2xl:mt-5 flex flex-col  h-full p-5">
            <span className="font-tuskerBold md:text-[40px] md:leading-[40px] 2xl:text-[80px] lg:text-[50px] lg:leading-[50px] text-black flex text-start">
            {project.title}
            </span>
            <span className="font-sora text-[16px] leading-[30px] 2xl:text-[30px] 2xl:leading-[70px] text-black flex text-start">
            {project.subtitle}
            </span>

            <span className="font-jack text-[29px] 2xl:text-[40px] text-black">Description</span>
            <span className="font-sora 2xl:text-[30px] 2xl:leading-[30px] md:text-[15px] md:leading-[15px] text-[18px] leading-[18px] text-black flex text-start">
            {project.description}
            </span>
            <span className="md:text-[0px] md:bg-transparent lg:bg-yellow font-jack lg:text-[29px] 2xl:text-[40px] text-black mt-3 pl-5">
            Skills -
            <span className="md:text-[0px] font-sora lg:text-[18px] leading-[18px] 2xl:text-[30px] 2xl:leading-[30px] text-black">
                {project.techStack.join(", ")}
            </span>
            </span>
        </div>

        {/* Decorative Circles */}
        <div
            className="absolute w-0 h-0 lg:w-10 lg:h-10 bg-black rounded-full"
            style={{ top: "-20px", left: "200px" }}
        ></div>
        <div
            className="absolute md:w-0 md:h-0 lg:w-10 lg:h-10 bg-black rounded-full"
            style={{ bottom: "-20px", left: "200px" }}
        ></div>
        <div
            className="absolute md:w-0 md:h-0 lg:w-10 lg:h-10 bg-black rounded-full"
            style={{ top: "-20px", left: "-20px" }}
        ></div>
        <div
            className="absolute md:w-0 md:h-0 lg:w-10 lg:h-10 bg-black rounded-full"
            style={{ top: "-20px", right: "-20px" }}
        ></div>
        <div
            className="absolute md:w-0 md:h-0 lg:w-10 lg:h-10 bg-black rounded-full"
            style={{ bottom: "-20px", left: "-20px" }}
        ></div>
        <div
            className="absolute md:w-0 md:h-0 lg:w-10 lg:h-10 bg-black rounded-full"
            style={{ bottom: "-20px", right: "-20px" }}
        ></div>
        </motion.div>

      </React.Fragment>
        ))}
            {/* Small Screen */}
            <div className="grid flex md:hidden grid-cols-1 justify-center ">
                {projects.map((project, index) => (
                    <React.Fragment key={index}>

                <div id="small-rectangle" className="flex relative flex-col mb-2 m-auto w-full max-w-[300px] h-[800px] bg-[#FFF9E9]">
                    {/* Project deatails */}
                    <div className="justify-left pt-10 p-5">
                        <span className="font-tuskerBold text-[50px] leading-[50px] text-gray-800 flex text-start">
                            {project.title}
                        </span>
                        <span className="font-sora text-[16px] leading-[30px] text-black flex text-start">
                            {project.subtitle}
                        </span>
                    </div>

                    {/* Project Image  */}
                    <img src={project.image} alt={project.title} className="w-full h-[180px]" />

                    {/* Project details -2  */}
                    <div className="justify-left p-5">
                        <span className="font-jack text-[24px] text-black">Description</span>
                            <span className="font-sora text-[13px] leading-[13px] text-black flex text-start">
                                {project.description}
                            </span>
                        <span className="font-jack text-[24px] text-black bg-yellow mt-5">Skills - 
                            <span className="font-sora text-[15px] leading-[15px] text-black text-start">
                                {project.techStack.join(", ")}
                            </span></span>
                    </div>

                    {/* Barcode Image */}
                    <div className="justify-end p-5">
                        <img src={barcodeImg} alt="barcode" className="w-full h-[180px]" />
                    </div>

                    <div
                    className="absolute w-10 h-10 bg-black rounded-full"
                    style={{ top: "-20px", left: "-20px" }}
                    ></div>
                    <div
                    className="absolute w-10 h-10 bg-black rounded-full"
                    style={{ bottom: "200px", right: "-20px" }}
                    ></div>
                    <div
                    className="absolute w-10 h-10 bg-black rounded-full"
                    style={{ top: "-20px", right: "-20px" }}
                    ></div>
                    <div
                    className="absolute w-10 h-10 bg-black rounded-full"
                    style={{ bottom: "-20px", left: "-20px" }}
                    ></div>
                    <div
                    className="absolute w-10 h-10 bg-black rounded-full"
                    style={{ bottom: "-20px", right: "-20px" }}
                    ></div>
                    <div
                    className="absolute w-10 h-10 bg-black rounded-full"
                    style={{ bottom: "200px", left: "-20px" }}
                    ></div>
                    </div>
                </React.Fragment>
                    ))}
             </div>
      </div>
    
  );
};

export default Ticket;
