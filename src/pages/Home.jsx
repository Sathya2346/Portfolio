import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiDownload, FiFolder } from "react-icons/fi";
import { DiJava, DiPython, DiReact } from "react-icons/di";
import { SiSpringboot, SiMysql } from "react-icons/si";
import { useData } from "../context/DataContext";

// Custom typing animation component to avoid external bundler mismatches
const CustomTypeAnimation = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loop, setLoop] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const words = [
    "Java Full Stack Development",
    "Spring Boot APIs",
    "AI Integrations & Chatbots",
    "React Frontend Architectures"
  ];

  useEffect(() => {
    const handleType = () => {
      const current = loop % words.length;
      const fullText = words[current];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      // Speed configuration: faster deletion
      setTypingSpeed(isDeleting ? 40 : 100);

      if (!isDeleting && text === fullText) {
        // Pause at full word
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        // Switch word
        setIsDeleting(false);
        setLoop(loop + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loop, typingSpeed]);

  return <span className="text-primary font-bold border-b border-primary/25 pb-1">{text}</span>;
};

// Custom counter animation component
const CustomCountUp = ({ end, duration = 1.5, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const endVal = parseInt(end);
    if (isNaN(endVal)) return;
    if (endVal === 0) return;

    const totalSteps = 40;
    const stepTime = (duration * 1000) / totalSteps;
    const stepValue = endVal / totalSteps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= totalSteps) {
        setCount(endVal);
        clearInterval(timer);
      } else {
        setCount(Math.floor(stepValue * currentStep));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <>{count}{suffix}</>;
};

const Home = () => {
  const { profile, projects, skills } = useData();

  const techCount = skills.length;
  const projectCount = projects.length;
  const experienceYears = 1; 

  const floatingIcons = [
    { icon: <DiJava className="text-red-500" />, delay: 0, x: "-10vw", y: "-15vh" },
    { icon: <SiSpringboot className="text-green-500" />, delay: 1.5, x: "25vw", y: "-22vh" },
    { icon: <DiReact className="text-blue-400 animate-spin-slow" />, delay: 0.8, x: "-20vw", y: "15vh" },
    { icon: <DiPython className="text-yellow-500" />, delay: 2.2, x: "20vw", y: "18vh" },
    { icon: <SiMysql className="text-blue-500" />, delay: 1.2, x: "0vw", y: "25vh" },
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 md:px-12 pt-24 overflow-hidden">
      {/* Floating Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-20 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-20 pointer-events-none" />

      {/* Floating Tech Icons */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none -z-10 overflow-hidden">
        {floatingIcons.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.15, 0.45, 0.15],
              scale: [0.8, 1.1, 0.8],
              x: [item.x, `calc(${item.x} + 20px)`, item.x],
              y: [item.y, `calc(${item.y} - 25px)`, item.y],
            }}
            transition={{
              duration: 8 + idx * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }}
            className="absolute text-4xl md:text-5xl"
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-8 relative z-10">
        {/* Intro Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-4 py-1.5 rounded-full border border-primary/20 dark:border-primary/10 bg-primary/5 text-primary text-xs uppercase tracking-widest font-semibold"
        >
          Welcome to my digital space
        </motion.div>

        {/* Animated Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-8xl font-extrabold tracking-tight leading-none text-black dark:text-white"
        >
          Hi, I'm <span className="text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{profile.name}</span>
        </motion.h1>

        {/* Animated Job Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-outfit text-xl md:text-3xl font-semibold text-dark-gray flex flex-wrap justify-center gap-2"
        >
          <span>A Specialist in</span>
          <CustomTypeAnimation />
        </motion.div>

        {/* Professional Summary */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-sm md:text-base text-dark-gray max-w-2xl leading-relaxed"
        >
          {profile.bio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mt-4"
        >
          <Link
            to="/contact"
            className="px-8 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white text-sm font-semibold tracking-wide shadow-glow flex items-center gap-2 duration-300 transform hover:scale-105 clickable"
          >
            Hire Me <FiArrowRight className="text-base" />
          </Link>
          <Link
            to="/projects"
            className="px-8 py-3.5 rounded-full glass border border-black/10 dark:border-white/10 hover:border-primary/30 hover:text-primary text-sm font-semibold tracking-wide flex items-center gap-2 duration-300 transform hover:scale-105 clickable"
          >
            View Projects <FiFolder className="text-base" />
          </Link>
          <a
            href={profile.resumeUrl}
            download
            className="px-8 py-3.5 rounded-full glass border border-black/10 dark:border-white/10 hover:border-primary/30 hover:text-primary text-sm font-semibold tracking-wide flex items-center gap-2 duration-300 transform hover:scale-105 clickable"
          >
            Download Resume <FiDownload className="text-base" />
          </a>
        </motion.div>

        {/* Experience / projects / Tech Counters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="grid grid-cols-3 gap-6 md:gap-12 mt-16 w-full max-w-3xl border-t border-black/5 dark:border-white/5 pt-12"
        >
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-6xl font-extrabold font-outfit text-primary tracking-tight leading-none mb-2">
              <CustomCountUp end={experienceYears} duration={1.5} suffix="+" />
            </span>
            <span className="text-xs font-semibold text-dark-gray uppercase tracking-widest">
              Years Experience
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-6xl font-extrabold font-outfit text-primary tracking-tight leading-none mb-2">
              <CustomCountUp end={projectCount} duration={2} />
            </span>
            <span className="text-xs font-semibold text-dark-gray uppercase tracking-widest">
              Projects Done
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-6xl font-extrabold font-outfit text-primary tracking-tight leading-none mb-2">
              <CustomCountUp end={techCount} duration={1.5} suffix="+" />
            </span>
            <span className="text-xs font-semibold text-dark-gray uppercase tracking-widest">
              Skills Mastered
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
