import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiGithub, FiInfo } from "react-icons/fi";
import { useData } from "../context/DataContext";

const Projects = () => {
  const { projects } = useData();
  const [activeFilter, setActiveFilter] = useState("All");

  // Dynamically extract unique categories from projects
  const uniqueCategories = Array.from(new Set(projects.map((p) => p.category).filter(Boolean)));
  const filters = ["All", ...uniqueCategories];

  // Filter projects by category exactly
  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.category?.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="min-h-screen py-32 px-6 md:px-12 bg-white dark:bg-black-pure text-black dark:text-white duration-300">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Title */}
        <div className="text-center space-y-2">
          <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight">
            My <span className="text-primary">Projects</span>
          </h2>
          <p className="text-sm text-dark-gray tracking-wider uppercase">
            A curated list of my enterprise applications & intelligent agent setups
          </p>
        </div>

        {/* Filter List Selector */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 border-b border-black/5 dark:border-white/5 pb-6">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider duration-300 cursor-pointer clickable ${
                activeFilter === f
                  ? "bg-primary text-white shadow-glow"
                  : "glass border border-black/10 dark:border-white/10 text-dark-gray hover:text-primary hover:border-primary/30"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6 }}
                className="rounded-3xl overflow-hidden glass border border-black/5 dark:border-white/5 hover:border-primary/25 dark:hover:border-primary/20 hover:shadow-glass-light dark:hover:shadow-glass-dark duration-300 flex flex-col h-full group"
              >
                {/* Image Cover */}
                <div className="relative overflow-hidden aspect-video border-b border-black/5 dark:border-white/5 bg-black/5">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-md">
                    {project.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[9px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border border-white/10">
                    {project.status}
                  </div>
                </div>

                {/* Body Text */}
                <div className="p-6 flex flex-col flex-grow gap-4 justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-[11px] font-semibold text-dark-gray leading-relaxed line-clamp-2">
                      {project.subtitle}
                    </p>
                    <p className="text-xs text-dark-gray line-clamp-3 leading-relaxed pt-1">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techStack.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] bg-black/5 dark:bg-white/5 text-dark-gray px-2 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="text-[9px] text-primary px-1 font-bold">
                        +{project.techStack.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Action links */}
                  <div className="flex items-center gap-3 border-t border-black/5 dark:border-white/5 pt-4 mt-2">
                    <Link
                      to={`/projects/${project.id}`}
                      className="text-xs font-bold text-primary flex items-center gap-1 hover:text-primary-dark duration-200 clickable"
                    >
                      <FiInfo className="text-sm" /> Details
                    </Link>
                    <div className="ml-auto flex gap-3 text-lg text-dark-gray">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors cursor-pointer clickable"
                          title="GitHub Code"
                        >
                          <FiGithub />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors cursor-pointer clickable"
                          title="Live Demo"
                        >
                          <FiExternalLink />
                        </a>
                      )}
                    </div>
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

export default Projects;
