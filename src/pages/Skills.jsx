import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "../context/DataContext";

// Icon Imports
import { DiJava, DiPython, DiJavascript1, DiHtml5, DiCss3, DiBootstrap, DiReact, DiDatabase, DiMysql, DiGit } from "react-icons/di";
import { 
  SiSpringboot, SiSpring, SiPostman, SiRailway, SiRender, 
  SiTailwindcss, SiMongodb, SiDocker, 
  SiFirebase, SiFigma, SiAndroid, SiLinux, SiGo, SiRust, 
  SiTypescript, SiCplusplus, SiKotlin, SiSwift, SiFlutter, 
  SiKubernetes, SiExpress, SiDjango
} from "react-icons/si";
import { AiOutlineApi } from "react-icons/ai";
import { GiArtificialIntelligence } from "react-icons/gi";
import { BsCpu } from "react-icons/bs";
import { MdOutlinePsychology } from "react-icons/md";
import { FiCloud, FiCode } from "react-icons/fi";
import { FaNodeJs, FaGithub, FaAws } from "react-icons/fa";

const iconMap = {
  // Existing Icons
  DiJava: DiJava,
  DiPython: DiPython,
  DiJavascript1: DiJavascript1,
  DiHtml5: DiHtml5,
  DiCss3: DiCss3,
  DiBootstrap: DiBootstrap,
  DiReact: DiReact,
  SiSpringboot: SiSpringboot,
  SiSpring: SiSpring,
  AiOutlineApi: AiOutlineApi,
  DiDatabase: DiDatabase,
  DiMysql: DiMysql,
  DiGit: DiGit,
  SiPostman: SiPostman,
  FiCode: FiCode,
  FiCloud: FiCloud,
  SiRailway: SiRailway,
  SiRender: SiRender,
  GiArtificialIntelligence: GiArtificialIntelligence,
  BsCpu: BsCpu,
  MdOutlinePsychology: MdOutlinePsychology,

  // New Pre-loaded Preset Icons
  FaNodeJs: FaNodeJs,
  SiExpress: SiExpress,
  SiTailwindcss: SiTailwindcss,
  SiMongodb: SiMongodb,
  SiDocker: SiDocker,
  SiAmazonwebservices: FaAws,
  FaAws: FaAws,
  SiFirebase: SiFirebase,
  SiFigma: SiFigma,
  SiAndroid: SiAndroid,
  SiLinux: SiLinux,
  SiGo: SiGo,
  SiRust: SiRust,
  FaGithub: FaGithub,
  SiTypescript: SiTypescript,
  SiCplusplus: SiCplusplus,
  SiKotlin: SiKotlin,
  SiSwift: SiSwift,
  SiFlutter: SiFlutter,
  SiKubernetes: SiKubernetes,
  SiDjango: SiDjango,
};

const SkillIcon = ({ name, className }) => {
  const IconComponent = iconMap[name];
  return IconComponent ? <IconComponent className={className} /> : <BsCpu className={className} />;
};

const Skills = () => {
  const { skills } = useData();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Programming Languages",
    "Backend",
    "Frontend",
    "Database",
    "AI Technologies",
    "Tools",
    "Version Control",
    "Cloud"
  ];

  const filteredSkills = activeCategory === "All"
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  return (
    <div className="min-h-screen py-32 px-6 md:px-12 bg-white dark:bg-black-pure text-black dark:text-white duration-300">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Title */}
        <div className="text-center space-y-2">
          <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight">
            My <span className="text-primary">Skills</span>
          </h2>
          <p className="text-sm text-dark-gray tracking-wider uppercase">
            Languages, frameworks, databases & libraries I've mastered
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 border-b border-black/5 dark:border-white/5 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider duration-300 cursor-pointer clickable ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-glow"
                  : "glass border border-black/10 dark:border-white/10 text-dark-gray hover:text-primary hover:border-primary/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                layout
                key={skill.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="p-6 rounded-2xl glass border border-black/5 dark:border-white/5 hover:border-primary/25 dark:hover:border-primary/20 hover:shadow-glass-light dark:hover:shadow-glass-dark duration-300 flex flex-col gap-4"
              >
                {/* Header: Icon, Name, Category */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl text-primary border border-primary/10">
                    <SkillIcon name={skill.icon} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base leading-snug">{skill.name}</h3>
                    <span className="text-[10px] uppercase font-semibold text-dark-gray tracking-wider">
                      {skill.category}
                    </span>
                  </div>
                  <span className="ml-auto font-outfit font-extrabold text-lg text-primary">
                    {skill.percentage}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="w-full h-2 bg-light-gray/30 dark:bg-white/5 rounded-full overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.percentage}%` }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full shadow-glow"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
export { SkillIcon };
