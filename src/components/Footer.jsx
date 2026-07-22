import React from "react";
import { Link } from "react-router-dom";
import { FiGithub, FiLinkedin, FiMail, FiMessageCircle } from "react-icons/fi";
import { useData } from "../context/DataContext";

const Footer = () => {
  const { profile } = useData();

  return (
    <footer className="w-full bg-white dark:bg-black-pure border-t border-black/5 dark:border-white/5 py-12 px-6 md:px-12 duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left Side */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link to="/" className="font-outfit text-lg font-bold tracking-tight">
            Sathya<span className="text-primary font-black">.G</span>
          </Link>
          <p className="text-xs text-dark-gray max-w-sm text-center md:text-left">
            Java Full Stack Developer & AI Integration Specialist. Designing robust backend architectures and beautiful frontends.
          </p>
        </div>

        {/* Center - Socials */}
        <div className="flex items-center gap-6 text-xl">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark-gray hover:text-primary transition-colors cursor-pointer clickable"
            aria-label="GitHub"
          >
            <FiGithub />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark-gray hover:text-primary transition-colors cursor-pointer clickable"
            aria-label="LinkedIn"
          >
            <FiLinkedin />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="text-dark-gray hover:text-primary transition-colors cursor-pointer clickable"
            aria-label="Email"
          >
            <FiMail />
          </a>
          <a
            href="https://wa.me/919786955907"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark-gray hover:text-primary transition-colors cursor-pointer clickable"
            aria-label="WhatsApp"
          >
            <FiMessageCircle />
          </a>
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-center md:items-end gap-1 text-xs text-dark-gray">
          <span>Tenkasi, Tamil Nadu, India</span>
          <span>© {new Date().getFullYear()} Sathya Ganesan. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
