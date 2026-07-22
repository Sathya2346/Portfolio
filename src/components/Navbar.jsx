import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon, FiMenu, FiX, FiLock } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "glass-nav py-4 shadow-sm" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 clickable">
          <span className="font-outfit text-xl font-bold tracking-tight text-black dark:text-white">
            Sathya<span className="text-primary font-black">.G</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`relative font-outfit text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                      isActive ? "text-primary" : "text-dark-gray"
                    } clickable`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-[-6px] left-0 w-full h-[2px] bg-primary rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="w-[1px] h-4 bg-dark-gray/30" />

          {/* Theme & Admin Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-light-gray/20 dark:hover:bg-white/5 text-dark-gray hover:text-primary transition-colors cursor-pointer clickable"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
            </button>

            <Link
              to="/admin/login"
              className="p-2 rounded-full hover:bg-light-gray/20 dark:hover:bg-white/5 text-dark-gray hover:text-primary transition-colors clickable"
              aria-label="Admin Login"
            >
              <FiLock className="text-lg" />
            </Link>
          </div>
        </nav>

        {/* Mobile Actions */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-light-gray/20 dark:hover:bg-white/5 text-dark-gray hover:text-primary transition-colors cursor-pointer clickable"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
          </button>

          <Link
            to="/admin/login"
            className="p-2 rounded-full hover:bg-light-gray/20 dark:hover:bg-white/5 text-dark-gray hover:text-primary transition-colors clickable"
            aria-label="Admin Login"
          >
            <FiLock className="text-lg" />
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full hover:bg-light-gray/20 dark:hover:bg-white/5 text-dark-gray hover:text-primary transition-colors cursor-pointer clickable"
            aria-label="Toggle Menu"
          >
            {isOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden w-full glass shadow-lg border-t border-black/5 dark:border-white/5 absolute top-full left-0 overflow-hidden"
          >
            <nav className="p-6 flex flex-col gap-6 bg-white/95 dark:bg-black-rich/95 backdrop-blur-md">
              <ul className="flex flex-col gap-4">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className={`block font-outfit text-base font-semibold transition-colors hover:text-primary ${
                          isActive ? "text-primary" : "text-black dark:text-white"
                        } clickable`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
