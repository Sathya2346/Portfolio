import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiBriefcase,
  FiSettings,
  FiLogOut,
  FiLayers,
  FiMail,
  FiTrash2,
  FiPlus,
  FiEdit,
  FiCheck,
  FiInfo,
} from "react-icons/fi";
import { useData } from "../context/DataContext";
import { SkillIcon } from "../pages/Skills";

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    profile, updateProfile,
    projects, addProject, updateProject, deleteProject,
    skills, addSkill, updateSkill, deleteSkill,
    experiences, addExperience, updateExperience, deleteExperience,
    settings, updateSettings,
    messages, deleteMessage, markMessageAsRead, clearAllMessages
  } = useData();

  const [activeTab, setActiveTab] = useState("analytics");

  // Verify authentication
  useEffect(() => {
    const token = sessionStorage.getItem("portfolio_admin_token");
    if (token !== "authenticated") {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("portfolio_admin_token");
    navigate("/");
  };

  // Helper to convert file input to Base64 string for storage
  const handleFileAsBase64 = (file, callback) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-white-soft dark:bg-black-rich text-black dark:text-white flex flex-col md:flex-row duration-300">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white dark:bg-black-card border-b md:border-b-0 md:border-r border-black/5 dark:border-white/5 p-6 flex flex-col gap-8 shrink-0">
        <div>
          <span className="font-outfit text-lg font-black tracking-tight text-primary">
            SG Dashboard
          </span>
          <p className="text-[10px] text-dark-gray uppercase tracking-widest mt-1">Admin Panel</p>
        </div>

        <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 shrink-0">
          <button
            onClick={() => setActiveTab("analytics")}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-3 transition-colors shrink-0 ${
              activeTab === "analytics"
                ? "bg-primary text-white"
                : "text-dark-gray hover:bg-light-gray/20 dark:hover:bg-white/5"
            }`}
          >
            <FiGrid className="text-base" /> Overview
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-3 transition-colors shrink-0 ${
              activeTab === "projects"
                ? "bg-primary text-white"
                : "text-dark-gray hover:bg-light-gray/20 dark:hover:bg-white/5"
            }`}
          >
            <FiLayers className="text-base" /> Projects
          </button>

          <button
            onClick={() => setActiveTab("skills")}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-3 transition-colors shrink-0 ${
              activeTab === "skills"
                ? "bg-primary text-white"
                : "text-dark-gray hover:bg-light-gray/20 dark:hover:bg-white/5"
            }`}
          >
            <FiBriefcase className="text-base" /> Skills
          </button>

          <button
            onClick={() => setActiveTab("experience")}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-3 transition-colors shrink-0 ${
              activeTab === "experience"
                ? "bg-primary text-white"
                : "text-dark-gray hover:bg-light-gray/20 dark:hover:bg-white/5"
            }`}
          >
            <FiBriefcase className="text-base" /> Timelines
          </button>



          <button
            onClick={() => setActiveTab("messages")}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-3 transition-colors shrink-0 relative ${
              activeTab === "messages"
                ? "bg-primary text-white"
                : "text-dark-gray hover:bg-light-gray/20 dark:hover:bg-white/5"
            }`}
          >
            <FiMail className="text-base" /> Messages
            {messages.filter(m => !m.read).length > 0 && (
              <span className="absolute right-4 bg-primary text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-black-card font-bold animate-pulse">
                {messages.filter(m => !m.read).length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-3 transition-colors shrink-0 ${
              activeTab === "settings"
                ? "bg-primary text-white"
                : "text-dark-gray hover:bg-light-gray/20 dark:hover:bg-white/5"
            }`}
          >
            <FiSettings className="text-base" /> Settings
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-3 text-red-500 hover:bg-red-500/10 transition-colors mt-auto shrink-0 cursor-pointer"
        >
          <FiLogOut className="text-base" /> Sign Out
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 md:p-12 overflow-y-auto max-h-screen">
        {activeTab === "analytics" && (
          <AnalyticsTab projects={projects} skills={skills} experiences={experiences} messages={messages} markRead={markMessageAsRead} />
        )}
        {activeTab === "projects" && (
          <ProjectsTab projects={projects} addProject={addProject} updateProject={updateProject} deleteProject={deleteProject} handleFileAsBase64={handleFileAsBase64} />
        )}
        {activeTab === "skills" && (
          <SkillsTab skills={skills} addSkill={addSkill} updateSkill={updateSkill} deleteSkill={deleteSkill} />
        )}
        {activeTab === "experience" && (
          <ExperienceTab experiences={experiences} addExperience={addExperience} updateExperience={updateExperience} deleteExperience={deleteExperience} />
        )}

        {activeTab === "messages" && (
          <MessagesTab messages={messages} deleteMessage={deleteMessage} markRead={markMessageAsRead} clearAll={clearAllMessages} />
        )}
        {activeTab === "settings" && (
          <SettingsTab settings={settings} updateSettings={updateSettings} profile={profile} updateProfile={updateProfile} />
        )}
      </main>
    </div>
  );
};

/* ========================================================================= */
/* ANALYTICS TAB SUBCOMPONENT                                                */
/* ========================================================================= */
const AnalyticsTab = ({ projects, skills, experiences, messages, markRead }) => {
  const unreadCount = messages.filter((m) => !m.read).length;

  const mockTraffic = [
    { day: "Mon", count: 42 },
    { day: "Tue", count: 58 },
    { day: "Wed", count: 85 },
    { day: "Thu", count: 64 },
    { day: "Fri", count: 120 },
    { day: "Sat", count: 95 },
    { day: "Sun", count: 110 }
  ];

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl md:text-3xl font-extrabold">Overview Analytics</h2>
      </div>

      {/* Counters Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-black-card border border-black/5 dark:border-white/5 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-dark-gray tracking-wider">Total Projects</span>
          <p className="text-3xl font-extrabold text-primary mt-2">{projects.length}</p>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-black-card border border-black/5 dark:border-white/5 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-dark-gray tracking-wider">Skills Logged</span>
          <p className="text-3xl font-extrabold text-primary mt-2">{skills.length}</p>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-black-card border border-black/5 dark:border-white/5 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-dark-gray tracking-wider">Timeline Entries</span>
          <p className="text-3xl font-extrabold text-primary mt-2">{experiences.length}</p>
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-black-card border border-black/5 dark:border-white/5 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-dark-gray tracking-wider">Unread Mails</span>
          <p className="text-3xl font-extrabold text-primary mt-2">{unreadCount}</p>
        </div>
      </div>

      {/* Graphs & Recents */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Graph Mock */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white dark:bg-black-card border border-black/5 dark:border-white/5 space-y-6">
          <h3 className="font-bold text-sm uppercase tracking-wide">Weekly Site Traffic (Mock)</h3>
          <div className="h-60 flex items-end gap-3 md:gap-6 border-b border-black/10 dark:border-white/10 pb-2 pt-4 px-4">
            {mockTraffic.map((t, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] text-primary opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                  {t.count}
                </span>
                <div
                  className="w-full bg-primary/20 hover:bg-primary rounded-t-lg transition-all duration-500 shadow-glow"
                  style={{ height: `${(t.count / 150) * 100}%` }}
                />
                <span className="text-[10px] font-semibold text-dark-gray mt-1">{t.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Mails */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-black-card border border-black/5 dark:border-white/5 space-y-4 flex flex-col">
          <h3 className="font-bold text-sm uppercase tracking-wide">Recent Inquiries</h3>
          <div className="space-y-3 overflow-y-auto max-h-60 flex-grow">
            {messages.slice(0, 3).map((m) => (
              <div
                key={m.id}
                onClick={() => markRead(m.id)}
                className={`p-3 rounded-xl border text-xs cursor-pointer duration-200 ${
                  m.read
                    ? "bg-light-gray/10 border-black/5 dark:border-white/5"
                    : "bg-primary/5 border-primary/20 hover:bg-primary/10"
                }`}
              >
                <div className="flex justify-between items-center mb-1 font-bold">
                  <span>{m.name}</span>
                  <span className="text-[9px] text-dark-gray">{m.date.split(",")[0]}</span>
                </div>
                <p className="font-semibold text-[10px] text-primary line-clamp-1">{m.subject}</p>
                <p className="text-[10px] text-dark-gray line-clamp-1 mt-0.5">{m.message}</p>
              </div>
            ))}
            {messages.length === 0 && (
              <div className="text-center py-8 text-xs text-dark-gray">No messages received yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* PROJECTS TAB SUBCOMPONENT                                                 */
/* ========================================================================= */
const ProjectsTab = ({ projects, addProject, updateProject, deleteProject, handleFileAsBase64 }) => {
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("Java Full Stack");
  const [status, setStatus] = useState("Completed");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [techStackInput, setTechStackInput] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("https://images.unsplash.com/photo-1557821552-17105176677c?w=800");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  
  // Case Study fields
  const [features, setFeatures] = useState("");
  const [challenges, setChallenges] = useState("");
  const [solutions, setSolutions] = useState("");

  const resetForm = () => {
    setTitle("");
    setSubtitle("");
    setCategory("Java Full Stack");
    setStatus("Completed");
    setDuration("");
    setDescription("");
    setTechStackInput("");
    setThumbnailUrl("https://images.unsplash.com/photo-1557821552-17105176677c?w=800");
    setGithubUrl("");
    setLiveUrl("");
    setVideoUrl("");
    setFeatures("");
    setChallenges("");
    setSolutions("");
    setEditingId(null);
    setIsAdding(false);
  };

  const handleEdit = (proj) => {
    setEditingId(proj.id);
    setTitle(proj.title);
    setSubtitle(proj.subtitle);
    setCategory(proj.category);
    setStatus(proj.status);
    setDuration(proj.duration || "");
    setDescription(proj.description);
    setTechStackInput(proj.techStack.join(", "));
    setThumbnailUrl(proj.thumbnail);
    setGithubUrl(proj.githubUrl || "");
    setLiveUrl(proj.liveUrl || "");
    setVideoUrl(proj.videoUrl || "");
    
    if (proj.caseStudy) {
      setFeatures(proj.caseStudy.features ? proj.caseStudy.features.join(", ") : "");
      setChallenges(proj.caseStudy.challenges ? proj.caseStudy.challenges.join(", ") : "");
      setSolutions(proj.caseStudy.solutions ? proj.caseStudy.solutions.join(", ") : "");
    } else {
      setFeatures("");
      setChallenges("");
      setSolutions("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const techArray = techStackInput.split(",").map((s) => s.trim()).filter(Boolean);
    const featuresArray = features.split(",").map((s) => s.trim()).filter(Boolean);
    const challengesArray = challenges.split(",").map((s) => s.trim()).filter(Boolean);
    const solutionsArray = solutions.split(",").map((s) => s.trim()).filter(Boolean);

    const projectPayload = {
      title,
      subtitle,
      category,
      status,
      duration,
      description,
      techStack: techArray,
      thumbnail: thumbnailUrl,
      githubUrl,
      liveUrl,
      videoUrl,
      caseStudy: {
        features: featuresArray,
        challenges: challengesArray,
        solutions: solutionsArray
      }
    };

    if (editingId) {
      updateProject({ ...projectPayload, id: editingId });
    } else {
      addProject(projectPayload);
    }
    resetForm();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-6">
        <h2 className="text-2xl font-extrabold">Project Manager</h2>
        {!isAdding && !editingId && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2.5 rounded-full bg-primary text-white text-xs font-semibold flex items-center gap-2 shadow-glow hover:bg-primary-dark duration-200 cursor-pointer clickable"
          >
            <FiPlus /> Add Project
          </button>
        )}
      </div>

      {/* Forms Section */}
      {(isAdding || editingId) && (
        <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-3xl bg-white dark:bg-black-card border border-black/5 dark:border-white/5 space-y-6 max-w-3xl">
          <h3 className="font-bold text-sm uppercase tracking-wide border-b border-black/5 dark:border-white/5 pb-3">
            {editingId ? "Edit Project Details" : "Upload New Project"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-dark-gray">Project Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enterprise E-Commerce"
                className="bg-light-gray/20 dark:bg-white/5 rounded-xl px-4 py-3 text-xs border border-transparent focus:border-primary/50 focus:outline-none text-black dark:text-white"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-dark-gray">Subtitle</label>
              <input
                type="text"
                required
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Microservices with spring boot"
                className="bg-light-gray/20 dark:bg-white/5 rounded-xl px-4 py-3 text-xs border border-transparent focus:border-primary/50 focus:outline-none text-black dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-dark-gray">Category</label>
              <input
                list="project-categories-list"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Type or select category..."
                className="bg-light-gray/20 dark:bg-white/5 rounded-xl px-4 py-3 text-xs border border-transparent focus:border-primary/50 focus:outline-none text-black dark:text-white"
              />
              <datalist id="project-categories-list">
                <option value="Java Full Stack" />
                <option value="Spring Boot" />
                <option value="Python Full Stack" />
                <option value="Mobile Apps" />
                <option value="Agentic AI" />
                <option value="AI Projects" />
                <option value="React" />
                <option value="UI/UX" />
                <option value="Open Source" />
                {Array.from(new Set(projects.map(p => p.category).filter(Boolean))).map(cat => (
                  <option key={cat} value={cat} />
                ))}
              </datalist>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-dark-gray">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="bg-light-gray/20 dark:bg-white/5 rounded-xl px-4 py-3 text-xs border border-transparent focus:outline-none text-black dark:text-white"
              >
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Maintained">Maintained</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-dark-gray">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Dec 2025 - Jan 2026"
                className="bg-light-gray/20 dark:bg-white/5 rounded-xl px-4 py-3 text-xs border border-transparent focus:border-primary/50 focus:outline-none text-black dark:text-white"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-dark-gray">Description</label>
            <textarea
              required
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed description of project architectures..."
              className="bg-light-gray/20 dark:bg-white/5 rounded-xl px-4 py-3 text-xs border border-transparent focus:border-primary/50 focus:outline-none text-black dark:text-white resize-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-dark-gray">Technology Stack (Comma separated)</label>
            <input
              type="text"
              required
              value={techStackInput}
              onChange={(e) => setTechStackInput(e.target.value)}
              placeholder="Java, Spring Boot, MySQL, Thymeleaf"
              className="bg-light-gray/20 dark:bg-white/5 rounded-xl px-4 py-3 text-xs border border-transparent focus:border-primary/50 focus:outline-none text-black dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-dark-gray">Project Cover Image</label>
              <div className="flex gap-4 items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileAsBase64(e.target.files[0], setThumbnailUrl)}
                  className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
                {thumbnailUrl && (
                  <img src={thumbnailUrl} alt="Thumbnail preview" className="w-12 h-12 object-cover rounded-lg border border-black/5" />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-dark-gray">Demo Video URL (Optional)</label>
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://example.com/demo.mp4"
                className="bg-light-gray/20 dark:bg-white/5 rounded-xl px-4 py-3 text-xs border border-transparent focus:border-primary/50 focus:outline-none text-black dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-dark-gray">GitHub URL</label>
              <input
                type="text"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/..."
                className="bg-light-gray/20 dark:bg-white/5 rounded-xl px-4 py-3 text-xs border border-transparent focus:border-primary/50 focus:outline-none text-black dark:text-white"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-dark-gray">Live App URL</label>
              <input
                type="text"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://app.sathyaganesan.dev"
                className="bg-light-gray/20 dark:bg-white/5 rounded-xl px-4 py-3 text-xs border border-transparent focus:border-primary/50 focus:outline-none text-black dark:text-white"
              />
            </div>
          </div>

          {/* Case Study segments */}
          <div className="space-y-4 border-t border-black/5 dark:border-white/5 pt-4">
            <h4 className="font-bold text-xs uppercase text-primary tracking-wide">Case Study Components</h4>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-dark-gray">Features Included (Comma separated)</label>
              <input
                type="text"
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                placeholder="Dynamic catalog, Razorpay transactions, automatic invoicing"
                className="bg-light-gray/20 dark:bg-white/5 rounded-xl px-4 py-3 text-xs border border-transparent focus:border-primary/50 focus:outline-none text-black dark:text-white"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-dark-gray">Challenges Faced (Comma separated)</label>
              <input
                type="text"
                value={challenges}
                onChange={(e) => setChallenges(e.target.value)}
                placeholder="Inventory concurrency locks, Webhook checkout recovery"
                className="bg-light-gray/20 dark:bg-white/5 rounded-xl px-4 py-3 text-xs border border-transparent focus:border-primary/50 focus:outline-none text-black dark:text-white"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-dark-gray">Solutions Applied (Comma separated)</label>
              <input
                type="text"
                value={solutions}
                onChange={(e) => setSolutions(e.target.value)}
                placeholder="Configured database pessimistic locks, Integrated webhook settlement scripts"
                className="bg-light-gray/20 dark:bg-white/5 rounded-xl px-4 py-3 text-xs border border-transparent focus:border-primary/50 focus:outline-none text-black dark:text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2.5 rounded-full border border-black/10 dark:border-white/10 text-xs font-bold hover:bg-light-gray/10 duration-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-primary text-white text-xs font-bold shadow-glow hover:bg-primary-dark duration-200 cursor-pointer"
            >
              Save Project
            </button>
          </div>
        </form>
      )}

      {/* Projects List view */}
      {!isAdding && !editingId && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj) => (
            <div key={proj.id} className="p-5 rounded-2xl bg-white dark:bg-black-card border border-black/5 dark:border-white/5 flex gap-4 items-center">
              <img src={proj.thumbnail} alt={proj.title} className="w-16 h-16 object-cover rounded-xl border border-black/10 dark:border-white/10 shrink-0" />
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-sm truncate">{proj.title}</h4>
                <span className="text-[10px] text-primary font-bold uppercase tracking-wider">{proj.category}</span>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => handleEdit(proj)}
                  className="p-2 rounded-lg bg-light-gray/25 dark:bg-white/5 text-xs hover:text-primary duration-200 cursor-pointer"
                  title="Edit Project"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => deleteProject(proj.id)}
                  className="p-2 rounded-lg bg-red-500/10 text-xs text-red-500 hover:bg-red-500 hover:text-white duration-200 cursor-pointer"
                  title="Delete Project"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ========================================================================= */
/* SKILLS TAB SUBCOMPONENT                                                   */
/* ========================================================================= */
const SkillsTab = ({ skills, addSkill, updateSkill, deleteSkill }) => {
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const [name, setName] = useState("");
  const [percentage, setPercentage] = useState(80);
  const [category, setCategory] = useState("Programming Languages");
  const [icon, setIcon] = useState("DiJava");

  const resetForm = () => {
    setName("");
    setPercentage(80);
    setCategory("Programming Languages");
    setIcon("DiJava");
    setEditingId(null);
    setIsAdding(false);
  };

  const handleEdit = (skill) => {
    setEditingId(skill.id);
    setName(skill.name);
    setPercentage(skill.percentage);
    setCategory(skill.category);
    setIcon(skill.icon);
    setIsAdding(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { name, percentage: Number(percentage), category, icon };
    if (editingId) {
      updateSkill({ ...payload, id: editingId });
    } else {
      addSkill(payload);
    }
    resetForm();
  };

  const availableIcons = [
    "DiJava", "DiPython", "DiJavascript1", "DiHtml5", "DiCss3", "DiBootstrap", "DiReact",
    "SiSpringboot", "SiSpring", "AiOutlineApi", "DiDatabase", "DiMysql", "DiGit",
    "SiPostman", "SiVisualstudiocode", "FiCloud", "SiRailway", "SiRender",
    "GiArtificialIntelligence", "BsCpu", "MdOutlinePromptSuggestion",
    "FaNodeJs", "SiExpress", "SiTailwindcss", "SiMongodb", "SiDocker", "FaAws", 
    "SiFirebase", "SiFigma", "SiAndroid", "SiLinux", "SiGo", "SiRust", "FaGithub", 
    "SiTypescript", "SiCplusplus", "SiKotlin", "SiSwift", "SiFlutter", "SiKubernetes", 
    "SiDjango"
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-6">
        <h2 className="text-2xl font-extrabold">Skill Manager</h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2.5 rounded-full bg-primary text-white text-xs font-semibold flex items-center gap-2 shadow-glow hover:bg-primary-dark duration-200 cursor-pointer clickable"
          >
            <FiPlus /> Add Skill
          </button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-3xl bg-white dark:bg-black-card border border-black/5 dark:border-white/5 space-y-6 max-w-md">
          <h3 className="font-bold text-sm uppercase tracking-wide border-b border-black/5 dark:border-white/5 pb-3">
            {editingId ? "Edit Skill" : "Add New Skill"}
          </h3>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-dark-gray">Skill Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="React Native"
              className="bg-light-gray/20 dark:bg-white/5 rounded-xl px-4 py-3 text-xs border border-transparent focus:border-primary/50 focus:outline-none text-black dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-dark-gray">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-light-gray/20 dark:bg-white/5 rounded-xl px-4 py-3 text-xs border border-transparent focus:outline-none text-black dark:text-white"
              >
                <option value="Programming Languages">Languages</option>
                <option value="Backend">Backend</option>
                <option value="Frontend">Frontend</option>
                <option value="Database">Database</option>
                <option value="AI Technologies">AI Technologies</option>
                <option value="Tools">Tools</option>
                <option value="Version Control">Version Control</option>
                <option value="Cloud">Cloud</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-dark-gray">Icon Component</label>
              <select
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="bg-light-gray/20 dark:bg-white/5 rounded-xl px-4 py-3 text-xs border border-transparent focus:outline-none text-black dark:text-white"
              >
                {availableIcons.map((ic) => (
                  <option key={ic} value={ic}>{ic}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-xs font-semibold text-dark-gray">
              <span>Proficiency Percentage</span>
              <span className="text-primary font-bold">{percentage}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              className="accent-primary cursor-pointer w-full"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2.5 rounded-full border border-black/10 dark:border-white/10 text-xs font-bold hover:bg-light-gray/10 duration-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-primary text-white text-xs font-bold shadow-glow hover:bg-primary-dark duration-200 cursor-pointer"
            >
              Save Skill
            </button>
          </div>
        </form>
      )}

      {!isAdding && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map((sk) => (
            <div key={sk.id} className="p-4 rounded-xl bg-white dark:bg-black-card border border-black/5 dark:border-white/5 flex gap-4 items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-primary text-lg">
                  <SkillIcon name={sk.icon} />
                </div>
                <div>
                  <h4 className="font-bold text-xs">{sk.name}</h4>
                  <span className="text-[9px] text-dark-gray">{sk.percentage}%</span>
                </div>
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={() => handleEdit(sk)}
                  className="p-1.5 rounded bg-light-gray/25 dark:bg-white/5 hover:text-primary duration-200 text-xs cursor-pointer"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => deleteSkill(sk.id)}
                  className="p-1.5 rounded bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white duration-200 text-xs cursor-pointer"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ========================================================================= */
/* TIMELINE MANAGER SUBCOMPONENT (EXPERIENCES)                               */
/* ========================================================================= */
const ExperienceTab = ({ experiences, addExperience, updateExperience, deleteExperience }) => {
  const [editingId, setEditingId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [techInput, setTechInput] = useState("");

  const resetForm = () => {
    setCompany("");
    setDesignation("");
    setDuration("");
    setLocation("");
    setResponsibilities("");
    setTechInput("");
    setEditingId(null);
    setIsAdding(false);
  };

  const handleEdit = (exp) => {
    setEditingId(exp.id);
    setCompany(exp.company);
    setDesignation(exp.designation);
    setDuration(exp.duration);
    setLocation(exp.location);
    setResponsibilities(exp.responsibilities.join("\n"));
    setTechInput(exp.technologies.join(", "));
    setIsAdding(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const respArray = responsibilities.split("\n").map((r) => r.trim()).filter(Boolean);
    const techArray = techInput.split(",").map((t) => t.trim()).filter(Boolean);

    const payload = {
      company,
      designation,
      duration,
      location,
      responsibilities: respArray,
      technologies: techArray
    };

    if (editingId) {
      updateExperience({ ...payload, id: editingId });
    } else {
      addExperience(payload);
    }
    resetForm();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-6">
        <h2 className="text-2xl font-extrabold">Timeline Manager (Experience)</h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2.5 rounded-full bg-primary text-white text-xs font-semibold flex items-center gap-2 shadow-glow hover:bg-primary-dark duration-200 cursor-pointer clickable"
          >
            <FiPlus /> Add Timeline
          </button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-3xl bg-white dark:bg-black-card border border-black/5 dark:border-white/5 space-y-6 max-w-2xl">
          <h3 className="font-bold text-sm uppercase tracking-wide border-b border-black/5 dark:border-white/5 pb-3">
            {editingId ? "Edit Timeline Entry" : "Create Timeline Entry"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-dark-gray">Company Name</label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Vetri IT Systems"
                className="bg-light-gray/20 dark:bg-white/5 rounded-xl px-4 py-3 text-xs border border-transparent focus:border-primary/50 focus:outline-none text-black dark:text-white"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-dark-gray">Designation</label>
              <input
                type="text"
                required
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder="Project Lead"
                className="bg-light-gray/20 dark:bg-white/5 rounded-xl px-4 py-3 text-xs border border-transparent focus:border-primary/50 focus:outline-none text-black dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-dark-gray">Duration</label>
              <input
                type="text"
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Feb 2026 - Present"
                className="bg-light-gray/20 dark:bg-white/5 rounded-xl px-4 py-3 text-xs border border-transparent focus:border-primary/50 focus:outline-none text-black dark:text-white"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-dark-gray">Location</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Tenkasi, Tamil Nadu"
                className="bg-light-gray/20 dark:bg-white/5 rounded-xl px-4 py-3 text-xs border border-transparent focus:border-primary/50 focus:outline-none text-black dark:text-white"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-dark-gray">Responsibilities (One item per line)</label>
            <textarea
              required
              rows="5"
              value={responsibilities}
              onChange={(e) => setResponsibilities(e.target.value)}
              placeholder="Trained 20+ junior developers&#10;Designed MySQL database schemas&#10;Performed code reviews"
              className="bg-light-gray/20 dark:bg-white/5 rounded-xl px-4 py-3 text-xs border border-transparent focus:border-primary/50 focus:outline-none text-black dark:text-white resize-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-dark-gray">Technologies Used (Comma separated)</label>
            <input
              type="text"
              required
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="Java, Spring Boot, MySQL"
              className="bg-light-gray/20 dark:bg-white/5 rounded-xl px-4 py-3 text-xs border border-transparent focus:border-primary/50 focus:outline-none text-black dark:text-white"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2.5 rounded-full border border-black/10 dark:border-white/10 text-xs font-bold hover:bg-light-gray/10 duration-200 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-primary text-white text-xs font-bold shadow-glow hover:bg-primary-dark duration-200 cursor-pointer"
            >
              Save Timeline
            </button>
          </div>
        </form>
      )}

      {!isAdding && (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="p-5 rounded-2xl bg-white dark:bg-black-card border border-black/5 dark:border-white/5 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h4 className="font-bold text-sm leading-snug">{exp.designation}</h4>
                <p className="text-xs text-primary font-semibold">{exp.company} — <span className="text-dark-gray font-medium">{exp.duration}</span></p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(exp)}
                  className="px-4 py-2 rounded-xl bg-light-gray/25 dark:bg-white/5 hover:text-primary duration-200 text-xs font-semibold cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteExperience(exp.id)}
                  className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white duration-200 text-xs cursor-pointer"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};



/* ========================================================================= */
/* MESSAGES INBOX PANEL                                                      */
/* ========================================================================= */
const MessagesTab = ({ messages, deleteMessage, markRead, clearAll }) => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-6">
        <h2 className="text-2xl font-extrabold">Inbox Messages</h2>
        {messages.length > 0 && (
          <button
            onClick={clearAll}
            className="px-4 py-2.5 rounded-full bg-red-500 text-white text-xs font-semibold flex items-center gap-2 hover:bg-red-600 duration-200 cursor-pointer"
          >
            <FiTrash2 /> Clear Inbox
          </button>
        )}
      </div>

      <div className="space-y-4 max-w-4xl">
        {messages.map((m) => (
          <div
            key={m.id}
            onMouseEnter={() => !m.read && markRead(m.id)}
            className={`p-6 rounded-2xl border flex flex-col gap-3 relative transition-all duration-300 ${
              m.read
                ? "bg-white dark:bg-black-card border-black/5 dark:border-white/5"
                : "bg-primary/5 border-primary/30 shadow-glass-light dark:shadow-glass-dark"
            }`}
          >
            {!m.read && (
              <span className="absolute top-4 right-4 bg-primary text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase animate-pulse">
                New
              </span>
            )}
            <div className="flex flex-col sm:flex-row justify-between sm:items-start text-xs border-b border-black/5 dark:border-white/5 pb-3">
              <div>
                <h4 className="font-extrabold text-sm text-black dark:text-white">{m.name}</h4>
                <a href={`mailto:${m.email}`} className="text-primary font-semibold hover:underline mt-0.5 block">{m.email}</a>
              </div>
              <span className="text-[10px] text-dark-gray font-medium mt-1 sm:mt-0">{m.date}</span>
            </div>

            <div>
              <p className="font-bold text-xs text-primary">{m.subject}</p>
              <p className="text-xs text-dark-gray leading-relaxed mt-2 whitespace-pre-line bg-black/5 dark:bg-white/5 p-4 rounded-xl">
                {m.message}
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => deleteMessage(m.id)}
                className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <FiTrash2 /> Delete message
              </button>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="text-center py-20 text-xs text-dark-gray border border-dashed border-black/10 dark:border-white/10 rounded-2xl">
            No inquiries received in the mailbox.
          </div>
        )}
      </div>
    </div>
  );
};

/* ========================================================================= */
/* SETTINGS tab manager                                                      */
/* ========================================================================= */
const SettingsTab = ({ settings, updateSettings, profile, updateProfile }) => {
  // Local state copy
  const [web3Key, setWeb3Key] = useState(settings.web3formsKey);
  const [passkey, setPasskey] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  // SEO states
  const [seoTitle, setSeoTitle] = useState(settings.seo.title);
  const [seoDesc, setSeoDesc] = useState(settings.seo.description);
  const [seoKeys, setSeoKeys] = useState(settings.seo.keywords);

  // Bio state
  const [bio, setBio] = useState(profile.bio);
  const [aboutBio, setAboutBio] = useState(profile.aboutBio);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update settings payload
    const updatedSettingsPayload = {
      ...settings,
      web3formsKey: web3Key,
      seo: {
        title: seoTitle,
        description: seoDesc,
        keywords: seoKeys
      }
    };

    if (passkey.trim()) {
      updatedSettingsPayload.adminPassword = passkey;
    }

    updateSettings(updatedSettingsPayload);

    // Update profile bio details
    updateProfile({
      ...profile,
      bio,
      aboutBio
    });

    setSavedSuccess(true);
    setPasskey("");
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      <div className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-6">
        <h2 className="text-2xl font-extrabold">Site Configurations</h2>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-full bg-primary text-white text-xs font-bold shadow-glow hover:bg-primary-dark duration-200 cursor-pointer"
        >
          Save Settings
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-xs flex items-center gap-2">
          <FiCheck className="text-lg shrink-0" />
          <span>System configurations and bio details successfully saved in local storage!</span>
        </div>
      )}

      {/* Web3Forms settings */}
      <div className="p-6 rounded-3xl bg-white dark:bg-black-card border border-black/5 dark:border-white/5 space-y-4">
        <h3 className="font-bold text-xs uppercase text-primary tracking-wider">Mail Client Settings</h3>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-dark-gray">Web3Forms Access Key</label>
          <input
            type="text"
            required
            value={web3Key}
            onChange={(e) => setWeb3Key(e.target.value)}
            placeholder="YOUR_WEB3FORMS_ACCESS_KEY"
            className="bg-light-gray/20 dark:bg-white/5 rounded-xl px-4 py-3 text-xs border border-transparent focus:border-primary/50 focus:outline-none text-black dark:text-white"
          />
          <span className="text-[10px] text-dark-gray leading-normal mt-1">
            Get your free access key at <a href="https://web3forms.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">web3forms.com</a> to receive contact form emails directly to your inbox.
          </span>
        </div>
      </div>

      {/* Profile Bio Details */}
      <div className="p-6 rounded-3xl bg-white dark:bg-black-card border border-black/5 dark:border-white/5 space-y-4">
        <h3 className="font-bold text-xs uppercase text-primary tracking-wider">Bio Details</h3>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-dark-gray">Short Hero Summary</label>
          <textarea
            rows="3"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="bg-light-gray/20 dark:bg-white/5 rounded-xl px-4 py-3 text-xs border border-transparent focus:border-primary/50 focus:outline-none text-black dark:text-white resize-none"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-dark-gray">About Bio Story</label>
          <textarea
            rows="5"
            value={aboutBio}
            onChange={(e) => setAboutBio(e.target.value)}
            className="bg-light-gray/20 dark:bg-white/5 rounded-xl px-4 py-3 text-xs border border-transparent focus:border-primary/50 focus:outline-none text-black dark:text-white resize-none"
          />
        </div>
      </div>

      {/* SEO configuration */}
      <div className="p-6 rounded-3xl bg-white dark:bg-black-card border border-black/5 dark:border-white/5 space-y-4">
        <h3 className="font-bold text-xs uppercase text-primary tracking-wider">SEO Metadata Settings</h3>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-dark-gray">Meta Title</label>
          <input
            type="text"
            required
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            className="bg-light-gray/20 dark:bg-white/5 rounded-xl px-4 py-3 text-xs border border-transparent focus:border-primary/50 focus:outline-none text-black dark:text-white"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-dark-gray">Meta Description</label>
          <textarea
            rows="3"
            required
            value={seoDesc}
            onChange={(e) => setSeoDesc(e.target.value)}
            className="bg-light-gray/20 dark:bg-white/5 rounded-xl px-4 py-3 text-xs border border-transparent focus:border-primary/50 focus:outline-none text-black dark:text-white resize-none"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-dark-gray">Meta Keywords</label>
          <input
            type="text"
            required
            value={seoKeys}
            onChange={(e) => setSeoKeys(e.target.value)}
            className="bg-light-gray/20 dark:bg-white/5 rounded-xl px-4 py-3 text-xs border border-transparent focus:border-primary/50 focus:outline-none text-black dark:text-white"
          />
        </div>
      </div>

      {/* Security credentials */}
      <div className="p-6 rounded-3xl bg-white dark:bg-black-card border border-black/5 dark:border-white/5 space-y-4">
        <h3 className="font-bold text-xs uppercase text-primary tracking-wider">Security settings</h3>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-dark-gray">Change Admin Passkey</label>
          <input
            type="password"
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
            placeholder="Type new passkey..."
            className="bg-light-gray/20 dark:bg-white/5 rounded-xl px-4 py-3 text-xs border border-transparent focus:border-primary/50 focus:outline-none text-black dark:text-white"
          />
        </div>
      </div>
    </form>
  );
};

export default Dashboard;
