import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";

// Providers
import { ThemeProvider } from "./context/ThemeContext";
import { DataProvider } from "./context/DataContext";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import AIChatbot from "./components/AIChatbot";
import PageLoader from "./components/PageLoader";
import CanvasBackground from "./components/CanvasBackground";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Contact from "./pages/Contact";

// Admin Pages
import Login from "./admin/Login";
import Dashboard from "./admin/Dashboard";

// Layout wrapper to conditionally render header/footer
const AppContent = () => {
  const location = useLocation();
  const isAdminDashboard = location.pathname.startsWith("/admin/dashboard");
  const lenisRef = useRef(null);

  // Lenis Smooth Scroll Initialization
  useEffect(() => {
    // Disable lenis on admin dashboard for clean editing scroll
    if (isAdminDashboard) {
      lenisRef.current = null;
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isAdminDashboard]);

  // Scroll to top on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <PageLoader />
      <CustomCursor />
      <ScrollProgress />
      <BackToTop />
      <AIChatbot />
      
      {/* CanvasBackground is added globally as a fixed, low-z background */}
      {!isAdminDashboard && <CanvasBackground />}

      {!isAdminDashboard && <Navbar />}
      
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Routes>
      </main>

      {!isAdminDashboard && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <DataProvider>
        <Router>
          <AppContent />
        </Router>
      </DataProvider>
    </ThemeProvider>
  );
};

export default App;
