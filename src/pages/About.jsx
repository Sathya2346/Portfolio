import React from "react";
import { motion } from "framer-motion";
import { FiAward, FiBookOpen, FiCalendar, FiMapPin, FiTarget } from "react-icons/fi";
import { useData } from "../context/DataContext";
import sathya from "../assets/sathya.png";

const About = () => {
  const { profile, experiences, education, certificates } = useData();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen py-32 px-6 md:px-12 bg-white dark:bg-black-pure text-black dark:text-white duration-300">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto space-y-24"
      >
        {/* Page Title */}
        <motion.div variants={itemVariants} className="text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight">
            About <span className="text-primary">Me</span>
          </h2>
          <p className="text-sm text-dark-gray tracking-wider uppercase mt-2">
            My Biography, Achievements & Milestones
          </p>
        </motion.div>

        {/* Bio & Image Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Image */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-sm w-full">
              {/* Decorative Frame */}
              <div className="absolute inset-0 border-2 border-primary/30 rounded-2xl translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 duration-300 -z-10" />
              <img
                src={sathya}
                alt={profile.name}
                className="rounded-2xl shadow-xl w-full object-cover aspect-[4/5] filter hover:grayscale grayscale-0 transition-all duration-500 border border-black/10 dark:border-white/10"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
              I build advanced full-stack architectures & integrate intelligent solutions.
            </h3>
            <p className="text-sm md:text-base text-dark-gray leading-relaxed">
              {profile.aboutBio}
            </p>

            {/* Sub details card grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl glass border border-black/5 dark:border-white/5 flex items-start gap-3">
                <FiMapPin className="text-primary text-xl mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm">Location</h4>
                  <p className="text-xs text-dark-gray">{profile.location}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl glass border border-black/5 dark:border-white/5 flex items-start gap-3">
                <FiTarget className="text-primary text-xl mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm">Career Focus</h4>
                  <p className="text-xs text-dark-gray">Full Stack & AI Engineer</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div variants={itemVariants} className="space-y-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold tracking-tight uppercase">
              Career <span className="text-primary">Timeline</span>
            </h3>
            <p className="text-xs text-dark-gray uppercase tracking-widest mt-1">My professional journey</p>
          </div>

          <div className="relative border-l-2 border-primary/20 dark:border-primary/10 max-w-4xl mx-auto pl-6 sm:pl-10 space-y-12 py-2">
            {experiences.map((exp, idx) => (
              <div key={exp.id} className="relative">
                {/* Timeline Pin */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-primary ring-4 ring-white dark:ring-black-pure flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>

                <div className="p-6 rounded-2xl glass hover:shadow-glow duration-300 border border-black/5 dark:border-white/5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <h4 className="text-lg font-bold text-black dark:text-white leading-tight">
                        {exp.designation}
                      </h4>
                      <p className="text-sm font-semibold text-primary">{exp.company}</p>
                    </div>
                    <div className="flex flex-col sm:items-end text-xs text-dark-gray shrink-0 gap-1">
                      <span className="flex items-center gap-1.5">
                        <FiCalendar /> {exp.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FiMapPin /> {exp.location}
                      </span>
                    </div>
                  </div>

                  <ul className="list-disc pl-4 space-y-1.5 text-xs text-dark-gray">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx}>{resp}</li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {exp.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] bg-primary/5 text-primary border border-primary/10 px-2 py-0.5 rounded-md font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Education & Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Education */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="text-2xl font-bold tracking-tight uppercase flex items-center gap-2 border-b border-black/5 dark:border-white/5 pb-3">
              <FiBookOpen className="text-primary" /> Education
            </h3>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="p-5 rounded-2xl glass border border-black/5 dark:border-white/5 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-primary tracking-widest block">
                    {edu.duration}
                  </span>
                  <h4 className="text-base font-bold leading-tight">{edu.degree}</h4>
                  <p className="text-xs font-semibold text-dark-gray">{edu.institution}</p>
                  <p className="text-xs text-dark-gray leading-relaxed mt-1">{edu.details}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certificates */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="text-2xl font-bold tracking-tight uppercase flex items-center gap-2 border-b border-black/5 dark:border-white/5 pb-3">
              <FiAward className="text-primary" /> Certificates
            </h3>
            <div className="space-y-6">
              {certificates.map((cert) => (
                <div key={cert.id} className="p-5 rounded-2xl glass border border-black/5 dark:border-white/5 flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="w-16 h-16 object-cover rounded-xl border border-black/10 dark:border-white/10 shrink-0"
                  />
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                      {cert.date}
                    </span>
                    <h4 className="text-base font-bold leading-tight">{cert.name}</h4>
                    <p className="text-xs text-dark-gray">Issued by {cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Goals & Achievements */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-primary/5 rounded-3xl p-8 md:p-12 border border-primary/10">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight flex items-center gap-2 text-primary">
              <FiTarget /> Career Goals
            </h3>
            <p className="text-sm text-dark-gray leading-relaxed">
              {profile.careerGoals}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight flex items-center gap-2 text-primary">
              <FiAward /> Key Achievements
            </h3>
            <ul className="list-disc pl-4 text-sm text-dark-gray space-y-2">
              {profile.achievements.map((ach, idx) => (
                <li key={idx} className="leading-relaxed">
                  {ach}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
