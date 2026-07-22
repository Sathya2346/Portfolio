import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiExternalLink, FiGithub, FiPlay, FiCpu } from "react-icons/fi";
import { useData } from "../context/DataContext";

const ProjectDetails = () => {
  const { id } = useParams();
  const { projects } = useData();
  const project = projects.find((p) => p.id === id);

  const [activeImage, setActiveImage] = useState(null);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4 bg-white dark:bg-black-pure text-black dark:text-white">
        <h2 className="text-3xl font-bold font-outfit">Project Not Found</h2>
        <Link to="/projects" className="px-6 py-2 bg-primary text-white rounded-full text-sm font-semibold hover:bg-primary-dark duration-200">
          Back to Projects
        </Link>
      </div>
    );
  }

  // Combine thumbnail and screenshots for gallery
  const allImages = [project.thumbnail, ...(project.screenshots || [])];

  const workflowSteps = [
    { name: "Client Trigger", desc: "User triggers actions from responsive React UI via REST endpoints." },
    { name: "Gateway & Auth", desc: "API requests are validated using Spring Security RBAC configuration." },
    { name: "Logic Engine", desc: "Spring Boot service layer manages transactional units and triggers external APIs." },
    { name: "Data Store", desc: "Persistent operations execute safe database commits via indexed tables." }
  ];

  return (
    <div className="min-h-screen py-32 px-6 md:px-12 bg-white dark:bg-black-pure text-black dark:text-white duration-300">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Back Link */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-xs uppercase font-bold text-dark-gray hover:text-primary transition-colors clickable"
        >
          <FiArrowLeft className="text-sm" /> Back to Projects
        </Link>

        {/* Large Banner Cover */}
        <div className="relative rounded-3xl overflow-hidden aspect-[21/9] border border-black/5 dark:border-white/5 bg-black/10">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black-pure via-black-pure/45 to-transparent" />
          <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 space-y-2 md:space-y-4 text-white">
            <span className="text-[10px] md:text-xs bg-primary px-3 py-1 rounded-full uppercase font-bold tracking-widest">
              {project.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-none text-white">
              {project.title}
            </h1>
            <p className="text-xs md:text-sm text-light-gray max-w-xl font-medium leading-relaxed">
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6">
          {/* Main Description */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold border-b border-black/5 dark:border-white/5 pb-3">
                Project Overview
              </h2>
              <p className="text-sm text-dark-gray leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Screenshots Gallery */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Screenshot Gallery</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {allImages.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveImage(img)}
                    className="relative overflow-hidden aspect-video rounded-xl bg-black/5 border border-black/5 dark:border-white/5 cursor-pointer group clickable"
                  >
                    <img
                      src={img}
                      alt={`Screenshot ${index + 1}`}
                      className="w-full h-full object-cover duration-300 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Workflow */}
            <div className="space-y-6 pt-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <FiCpu className="text-primary" /> Application Architecture
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {workflowSteps.map((step, idx) => (
                  <div key={idx} className="p-4 rounded-2xl glass border border-black/5 dark:border-white/5 relative">
                    <span className="absolute top-3 right-3 text-2xl font-black text-primary/10">
                      0{idx + 1}
                    </span>
                    <h4 className="font-bold text-xs text-primary mb-1">{step.name}</h4>
                    <p className="text-[10px] text-dark-gray leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side Panel: Tech, Metadata & Actions */}
          <div className="lg:col-span-4 space-y-8">
            {/* Actions Card */}
            <div className="p-6 rounded-3xl glass border border-black/5 dark:border-white/5 space-y-4 flex flex-col">
              <h3 className="font-bold text-base border-b border-black/5 dark:border-white/5 pb-3">
                Repository & Deployment
              </h3>
              <div className="flex flex-col gap-3 pt-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-xs flex items-center justify-center gap-2 hover:bg-primary dark:hover:bg-primary dark:hover:text-white hover:text-white transition-all transform hover:scale-105 duration-300 clickable"
                  >
                    <FiGithub className="text-sm" /> Code Repository
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-full bg-primary text-white font-semibold text-xs flex items-center justify-center gap-2 hover:bg-primary-dark transition-all transform hover:scale-105 duration-300 shadow-glow clickable"
                  >
                    <FiExternalLink className="text-sm" /> Live Application
                  </a>
                )}
              </div>
            </div>

            {/* Tech Stack Card */}
            <div className="p-6 rounded-3xl glass border border-black/5 dark:border-white/5 space-y-4">
              <h3 className="font-bold text-base border-b border-black/5 dark:border-white/5 pb-3">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2 pt-2">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] bg-primary/5 text-primary border border-primary/10 px-3 py-1 rounded-md font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Metadata Card */}
            <div className="p-6 rounded-3xl glass border border-black/5 dark:border-white/5 space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-dark-gray font-semibold">Development Date:</span>
                <span className="font-bold">{project.duration || "2026"}</span>
              </div>
              <div className="flex justify-between items-center border-t border-black/5 dark:border-white/5 pt-2.5">
                <span className="text-dark-gray font-semibold">Project Status:</span>
                <span className="font-bold text-primary">{project.status}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Case Study Details - Full Width */}
        {project.caseStudy && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-black/5 dark:border-white/5 pt-12">
            {/* Features */}
            <div className="p-8 rounded-3xl glass border border-black/5 dark:border-white/5 space-y-4">
              <h3 className="text-lg font-bold text-primary flex items-center gap-2 uppercase tracking-wide">
                Key Features Included
              </h3>
              <ul className="list-disc pl-4 text-xs text-dark-gray space-y-2">
                {project.caseStudy.features.map((feature, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenges & Solutions */}
            <div className="p-8 rounded-3xl glass border border-black/5 dark:border-white/5 space-y-6">
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-red-500 uppercase tracking-widest">
                  The Challenges
                </h3>
                <ul className="list-decimal pl-4 text-xs text-dark-gray space-y-2">
                  {project.caseStudy.challenges.map((challenge, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 border-t border-black/5 dark:border-white/5 pt-4">
                <h3 className="text-xs font-bold text-green-500 uppercase tracking-widest">
                  Our Solutions
                </h3>
                <ul className="list-decimal pl-4 text-xs text-dark-gray space-y-2">
                  {project.caseStudy.solutions.map((sol, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {sol}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Video Player Segment */}
        {project.videoUrl && (
          <div className="space-y-6 border-t border-black/5 dark:border-white/5 pt-12">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <FiPlay className="text-primary" /> Application Video Walkthrough
            </h3>
            <div className="relative rounded-3xl overflow-hidden aspect-video border border-black/5 dark:border-white/5 bg-black">
              <video
                src={project.videoUrl}
                controls
                className="w-full h-full"
                poster={project.thumbnail}
              />
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Backdrop Viewer */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 bg-black/90 z-[99999] flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={activeImage}
              alt="Expanded view"
              className="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectDetails;
