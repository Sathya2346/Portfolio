import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbMessageChatbot } from "react-icons/tb";
import { IoCloseOutline, IoSendSharp } from "react-icons/io5";

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I'm Sathya's AI assistant. Ask me anything about her skills, experience, or full-stack projects!",
    },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const quickQuestions = [
    { text: "What is your main tech stack?", tag: "stack" },
    { text: "Tell me about your E-Commerce Project.", tag: "project" },
    { text: "Are you open to remote work?", tag: "work" },
  ];

  const handleSend = (textToSend) => {
    const userMsg = textToSend || input;
    if (!userMsg.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    if (!textToSend) setInput("");

    // Simulate bot thinking
    setTimeout(() => {
      const response = getBotResponse(userMsg);
      setMessages((prev) => [...prev, { sender: "bot", text: response }]);
    }, 600);
  };

  const getBotResponse = (query) => {
    const text = query.toLowerCase();

    if (text.includes("stack") || text.includes("skill") || text.includes("language") || text.includes("tech")) {
      return "Sathya is a Java Full Stack Specialist. Her key languages are Java and Python, backed by frameworks like Spring Boot, Spring MVC, and React JS. She also designs databases using MySQL and works with Git, Postman, Railway, and Render.";
    }
    if (text.includes("ecommerce") || text.includes("e-commerce") || text.includes("project")) {
      return "Sathya's major work is a Java Full Stack E-Commerce Web Application. It features product catalogs, shopping carts, order pipelines, Razorpay payment integrations, and an automated PDF invoice generator. She built it using Spring Boot, MySQL, and a Bootstrap UI.";
    }
    if (text.includes("ems") || text.includes("employee") || text.includes("management")) {
      return "Sathya developed an Employee Management System (EMS) using Spring Boot, Thymeleaf, and MySQL. It tracks employee punch check-ins/outs, computes worked hours automatically, guides admin leave approval workflows, and manages separate dashboards with Role-Based Access Control (RBAC).";
    }
    if (text.includes("experience") || text.includes("job") || text.includes("work")) {
      return "Sathya is currently a Full Stack Trainer & Project Lead (Java & Python) at Vetri IT Systems in Tenkasi (Feb 2026 - Present), where she leads project development and trains 20+ junior developers. She also completed a Developer Internship there in January 2026.";
    }
    if (text.includes("remote") || text.includes("location") || text.includes("relocate") || text.includes("tenkasi")) {
      return "Sathya is based in Tenkasi, Tamil Nadu, India. She is fully enthusiastic about learning new trends and is open to hybrid, remote, or physical relocation opportunities!";
    }
    if (text.includes("contact") || text.includes("email") || text.includes("phone") || text.includes("call")) {
      return "You can reach Sathya at ganesansathya2346@gmail.com, call/WhatsApp her at +91 9786955907, or use the Contact Form on this site (integrated with Web3Forms!).";
    }
    if (text.includes("education") || text.includes("college") || text.includes("degree")) {
      return "Sathya completed his Diploma in Electronics & Communication Engineering from S. Thangapazham Polytechnic College (DOTE) in 2021, and his SSLC from Govt. Hr. Sec. School in 2018.";
    }
    if (text.includes("hi") || text.includes("hello") || text.includes("hey")) {
      return "Hello! How can I help you learn more about Sathya Ganesan today?";
    }

    return "Interesting question! Sathya is skilled in Java, Spring Boot, MySQL, and React. She's experienced in API design, database schemas, and AI integrations. Try asking about her projects, skills, training experience, or contact details!";
  };

  return (
    <>
      {/* Floating Toggle Icon */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 left-8 z-[49] flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white shadow-lg cursor-pointer clickable hover:bg-primary-dark transition-colors"
        aria-label="Toggle AI Bot"
      >
        {isOpen ? <IoCloseOutline className="text-2xl" /> : <TbMessageChatbot className="text-2xl" />}
      </motion.button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100, x: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100, x: -50 }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="fixed bottom-24 left-8 z-50 w-[340px] md:w-[380px] h-[500px] rounded-2xl glass shadow-2xl border border-primary/20 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <TbMessageChatbot className="text-xl" />
                </div>
                <div>
                  <h4 className="font-outfit text-sm font-semibold leading-tight">Sathya's Assistant</h4>
                  <span className="text-[10px] text-white/80">Online & Ready to Help</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-secondary duration-200 cursor-pointer"
              >
                <IoCloseOutline className="text-2xl" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                      m.sender === "user"
                        ? "bg-primary text-white rounded-tr-none"
                        : "bg-light-gray/20 dark:bg-dark-gray/10 text-black dark:text-white rounded-tl-none border border-black/5 dark:border-white/5"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="p-2 border-t border-black/5 dark:border-white/5 flex flex-wrap gap-1.5 bg-black/5 dark:bg-white/5">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q.text)}
                  className="text-[10px] bg-white dark:bg-black-card text-primary px-2.5 py-1 rounded-full border border-primary/10 hover:border-primary/30 transition-colors cursor-pointer clickable"
                >
                  {q.text}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-black/5 dark:border-white/5 flex gap-2 items-center bg-white/50 dark:bg-black-rich">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1 bg-light-gray/20 dark:bg-white/5 text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary/50 text-black dark:text-white"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="w-9 h-9 rounded-xl bg-primary hover:bg-primary-dark transition-colors flex items-center justify-center text-white disabled:opacity-50 cursor-pointer clickable"
              >
                <IoSendSharp className="text-sm" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
