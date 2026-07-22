import React, { createContext, useContext, useState, useEffect } from "react";
import { initialResumeData } from "../constants/resumeData";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Helper to load or seed data
  const getStoredData = (key, fallback) => {
    const data = localStorage.getItem(key);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error("Error parsing localStorage data for " + key, e);
        return fallback;
      }
    }
    // Seed and return fallback
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  };

  // State hooks
  const [profile, setProfile] = useState(() => getStoredData("portfolio_profile", initialResumeData.profile));
  const [skills, setSkills] = useState(() => getStoredData("portfolio_skills", initialResumeData.skills));
  const [experiences, setExperiences] = useState(() => getStoredData("portfolio_experiences", initialResumeData.experiences));
  const [projects, setProjects] = useState(() => getStoredData("portfolio_projects", initialResumeData.projects));
  const [education, setEducation] = useState(() => getStoredData("portfolio_education", initialResumeData.education));
  const [certificates, setCertificates] = useState(() => getStoredData("portfolio_certificates", initialResumeData.certificates));
  const [services, setServices] = useState(() => getStoredData("portfolio_services", initialResumeData.services));
  const [settings, setSettings] = useState(() => getStoredData("portfolio_settings", initialResumeData.settings));
  const [messages, setMessages] = useState(() => getStoredData("portfolio_messages", []));

  // Sync state to local storage when they change
  useEffect(() => {
    localStorage.setItem("portfolio_profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("portfolio_skills", JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem("portfolio_experiences", JSON.stringify(experiences));
  }, [experiences]);

  useEffect(() => {
    localStorage.setItem("portfolio_projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem("portfolio_education", JSON.stringify(education));
  }, [education]);

  useEffect(() => {
    localStorage.setItem("portfolio_certificates", JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem("portfolio_services", JSON.stringify(services));
  }, [services]);



  useEffect(() => {
    localStorage.setItem("portfolio_settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem("portfolio_messages", JSON.stringify(messages));
  }, [messages]);

  // One-time migration to link StepUp project in localStorage
  useEffect(() => {
    setProjects((prev) => {
      let changed = false;
      const updated = prev.map((p) => {
        if (p.id === "proj-1" && (p.githubUrl === "https://github.com" || p.title === "E-Commerce Web Application" || p.liveUrl === "https://demo-ecommerce.sathyaganesan.dev")) {
          changed = true;
          return {
            ...p,
            title: "StepUp - E-Commerce Web Application",
            githubUrl: "https://github.com/Sathya2346/stepup",
            liveUrl: "https://stepup-9j90.onrender.com/"
          };
        }
        return p;
      });
      return changed ? updated : prev;
    });
  }, []);

  // CRUD Operations

  // Profile CRUD
  const updateProfile = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  // Projects CRUD
  const addProject = (project) => {
    const newProj = { ...project, id: "proj-" + Date.now() };
    setProjects((prev) => [newProj, ...prev]);
    return newProj;
  };

  const updateProject = (updatedProj) => {
    setProjects((prev) => prev.map((p) => (p.id === updatedProj.id ? updatedProj : p)));
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // Skills CRUD
  const addSkill = (skill) => {
    const newSkill = { ...skill, id: "skill-" + Date.now() };
    setSkills((prev) => [...prev, newSkill]);
    return newSkill;
  };

  const updateSkill = (updatedSkill) => {
    setSkills((prev) => prev.map((s) => (s.id === updatedSkill.id ? updatedSkill : s)));
  };

  const deleteSkill = (id) => {
    setSkills((prev) => prev.filter((s) => s.id !== id));
  };

  // Experiences CRUD
  const addExperience = (exp) => {
    const newExp = { ...exp, id: "exp-" + Date.now() };
    setExperiences((prev) => [newExp, ...prev]);
    return newExp;
  };

  const updateExperience = (updatedExp) => {
    setExperiences((prev) => prev.map((e) => (e.id === updatedExp.id ? updatedExp : e)));
  };

  const deleteExperience = (id) => {
    setExperiences((prev) => prev.filter((e) => e.id !== id));
  };

  // Education CRUD
  const addEducation = (edu) => {
    const newEdu = { ...edu, id: "edu-" + Date.now() };
    setEducation((prev) => [...prev, newEdu]);
    return newEdu;
  };

  const updateEducation = (updatedEdu) => {
    setEducation((prev) => prev.map((e) => (e.id === updatedEdu.id ? updatedEdu : e)));
  };

  const deleteEducation = (id) => {
    setEducation((prev) => prev.filter((e) => e.id !== id));
  };

  // Certificates CRUD
  const addCertificate = (cert) => {
    const newCert = { ...cert, id: "cert-" + Date.now() };
    setCertificates((prev) => [newCert, ...prev]);
    return newCert;
  };

  const updateCertificate = (updatedCert) => {
    setCertificates((prev) => prev.map((c) => (c.id === updatedCert.id ? updatedCert : c)));
  };

  const deleteCertificate = (id) => {
    setCertificates((prev) => prev.filter((c) => c.id !== id));
  };

  // Services CRUD
  const addService = (serv) => {
    const newServ = { ...serv, id: "serv-" + Date.now() };
    setServices((prev) => [...prev, newServ]);
    return newServ;
  };

  const updateService = (updatedServ) => {
    setServices((prev) => prev.map((s) => (s.id === updatedServ.id ? updatedServ : s)));
  };

  const deleteService = (id) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };



  // Settings CRUD
  const updateSettings = (updatedSettings) => {
    setSettings(updatedSettings);
  };

  // Contact Messages
  const addMessage = (msg) => {
    const newMsg = {
      ...msg,
      id: "msg-" + Date.now(),
      date: new Date().toLocaleString(),
      read: false
    };
    setMessages((prev) => [newMsg, ...prev]);
    return newMsg;
  };

  const deleteMessage = (id) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const markMessageAsRead = (id) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
  };

  const clearAllMessages = () => {
    setMessages([]);
  };

  return (
    <DataContext.Provider
      value={{
        profile,
        updateProfile,
        skills,
        addSkill,
        updateSkill,
        deleteSkill,
        experiences,
        addExperience,
        updateExperience,
        deleteExperience,
        projects,
        addProject,
        updateProject,
        deleteProject,
        education,
        addEducation,
        updateEducation,
        deleteEducation,
        certificates,
        addCertificate,
        updateCertificate,
        deleteCertificate,
        services,
        addService,
        updateService,
        deleteService,

        settings,
        updateSettings,
        messages,
        addMessage,
        deleteMessage,
        markMessageAsRead,
        clearAllMessages
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
