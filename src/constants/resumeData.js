export const initialResumeData = {
  profile: {
    name: "Sathya Ganesan",
    title: "Java Full Stack Developer",
    subtitle: "AI Integrations & Full Stack Engineer",
    email: "ganesansathya2346@gmail.com",
    phone: "+91 9786955907",
    location: "Tenkasi, Tamil Nadu, India",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    portfolio: "https://sathyaganesan.dev",
    resumeUrl: "#", // Placeholder for download
    bio: "Motivated Java Full Stack Developer with practical experience building scalable web applications using Java, Spring Boot, REST APIs, and MySQL. Skilled in frontend development with HTML5, CSS3, Bootstrap, and JavaScript. Experienced in MVC architecture, authentication systems, and role-based access control. Proven ability to lead projects, mentor junior developers, and deliver production-ready applications.",
    aboutBio: "I am an enthusiastic full-stack developer based in Tenkasi, Tamil Nadu. My passion lies in crafting high-performance backend systems combined with interactive, fluid user interfaces. With hands-on experience as a Project Lead and Trainer at Vetri IT Systems, I have mentored over 20+ trainees while directing production-grade software projects. I am continuously learning and integrating advanced AI solutions, including Agentic AI and Retrieval-Augmented Generation (RAG) applications, to deliver cutting-edge software products.",
    careerGoals: "To leverage my full-stack expertise in building next-generation enterprise applications and AI solutions, driving innovation while collaborating with cross-functional global teams in an agile environment.",
    achievements: [
      "Mentored and trained 20+ junior developers and student trainees in full-stack architectures.",
      "Successfully led the end-to-end development of multiple real-time applications using Spring Boot.",
      "Optimized MySQL database queries and API response times by 30% in core project modules.",
      "Designed and deployed responsive, user-friendly client dashboards with robust RBAC configurations."
    ]
  },
  skills: [
    // Programming Languages
    { id: "1", name: "Java", percentage: 92, category: "Programming Languages", icon: "DiJava" },
    { id: "2", name: "Python", percentage: 80, category: "Programming Languages", icon: "DiPython" },
    { id: "3", name: "JavaScript", percentage: 85, category: "Programming Languages", icon: "DiJavascript1" },
    // Frontend
    { id: "4", name: "HTML5", percentage: 95, category: "Frontend", icon: "DiHtml5" },
    { id: "5", name: "CSS3", percentage: 90, category: "Frontend", icon: "DiCss3" },
    { id: "6", name: "Bootstrap", percentage: 88, category: "Frontend", icon: "DiBootstrap" },
    { id: "7", name: "React JS", percentage: 80, category: "Frontend", icon: "DiReact" },
    { id: "8", name: "Tailwind CSS", percentage: 85, category: "Frontend", icon: "SiTailwindcss" },
    // Backend
    { id: "9", name: "Spring Boot", percentage: 90, category: "Backend", icon: "SiSpringboot" },
    { id: "10", name: "Spring MVC", percentage: 85, category: "Backend", icon: "SiSpring" },
    { id: "11", name: "RESTful Web Services", percentage: 92, category: "Backend", icon: "AiOutlineApi" },
    { id: "12", name: "JDBC", percentage: 85, category: "Backend", icon: "DiDatabase" },
    // Database
    { id: "13", name: "MySQL", percentage: 88, category: "Database", icon: "DiMysql" },
    // Tools / Cloud / Version Control
    { id: "14", name: "Git & GitHub", percentage: 88, category: "Version Control", icon: "DiGit" },
    { id: "15", name: "Postman", percentage: 90, category: "Tools", icon: "SiPostman" },
    { id: "16", name: "VS Code", percentage: 92, category: "Tools", icon: "FiCode" },
    { id: "17", name: "Aiven", percentage: 75, category: "Cloud", icon: "FiCloud" },
    { id: "18", name: "Railway", percentage: 80, category: "Cloud", icon: "SiRailway" },
    { id: "19", name: "Render", percentage: 80, category: "Cloud", icon: "SiRender" },
    // AI Technologies
    { id: "20", name: "Agentic AI", percentage: 70, category: "AI Technologies", icon: "GiArtificialIntelligence" },
    { id: "21", name: "RAG Applications", percentage: 75, category: "AI Technologies", icon: "BsCpu" },
    { id: "22", name: "Prompt Engineering", percentage: 85, category: "AI Technologies", icon: "MdOutlinePsychology" }
  ],
  experiences: [
    {
      id: "exp-1",
      company: "Vetri IT Systems",
      location: "Tenkasi, Tamil Nadu",
      designation: "Full Stack Trainer & Project Lead (Java & Python)",
      duration: "February 2026 - Present",
      responsibilities: [
        "Delivered professional training in Java Full Stack and Python Development to 20+ trainees.",
        "Trained students in Core Java, OOP, Collections, JDBC, Spring Boot, REST APIs, and MySQL.",
        "Conducted frontend training covering HTML5, CSS3, Bootstrap, and JavaScript.",
        "Led end-to-end development of real-time full-stack projects using Spring Boot and MVC architecture.",
        "Implemented authentication and role-based access control (RBAC) modules.",
        "Mentored trainees in Git/GitHub, API testing with Postman, and cloud deployment on Render/Railway.",
        "Performed code reviews, debugging, and application performance optimization."
      ],
      technologies: ["Java", "Spring Boot", "MySQL", "Git", "Postman", "Railway", "Render", "Bootstrap"]
    },
    {
      id: "exp-2",
      company: "Vetri IT Systems",
      location: "Tenkasi, Tamil Nadu",
      designation: "Junior Software Developer (Internship)",
      duration: "January 2026",
      responsibilities: [
        "Developed Spring Boot-based web applications following MVC architecture.",
        "Built backend RESTful APIs and integrated them with frontend components.",
        "Designed MySQL database schemas and implemented CRUD operations.",
        "Used Git & GitHub for version control and collaborated with team to debug and optimize performance."
      ],
      technologies: ["Java", "Spring Boot", "MySQL", "REST API", "Git", "GitHub"]
    },
    {
      id: "exp-3",
      company: "Vetri IT Systems",
      location: "Tenkasi, Tamil Nadu",
      designation: "Java Full Stack Development Training",
      duration: "November 2025",
      responsibilities: [
        "Completed hands-on training in Core Java, Spring Boot, HTML, CSS, JavaScript, and MySQL.",
        "Built mini-projects and one major full-stack project following industry coding standards.",
        "Learned API testing using Postman and deployment using Render/Railway platforms."
      ],
      technologies: ["Core Java", "Spring Boot", "HTML", "CSS", "JavaScript", "MySQL", "Postman", "Render"]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "StepUp - E-Commerce Web Application",
      subtitle: "Enterprise E-Commerce Platform with Payment Gateway & Chatbot",
      category: "Java Full Stack",
      duration: "Dec 2025 - Jan 2026",
      status: "Completed",
      thumbnail: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80"
      ],
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Demo video
      githubUrl: "https://github.com/Sathya2346/stepup",
      liveUrl: "https://stepup-9j90.onrender.com/",
      description: "StepUp is a robust Spring Boot e-commerce ecosystem. It features secure role-based access control (RBAC), OTP registrations, an interactive cart/checkout pipeline, and an integrated customer support chatbot utilizing a custom fuzzy-matching Levenshtein distance algorithm for typo-tolerant FAQ responses and direct order tracking.",
      techStack: ["Java", "Spring Boot", "MySQL", "REST API", "HTML", "CSS", "Bootstrap", "JavaScript", "Razorpay API", "Docker"],
      caseStudy: {
        features: [
          "Secure registration featuring dynamic OTP-based email validations.",
          "Complete shopping catalog, interactive cart, and Razorpay payment integration.",
          "Fuzzy-matching support chatbot with Levenshtein distance typo tolerance.",
          "Session-aware direct Order & Refund status tracking integrated into Chat endpoints.",
          "Automated PDF invoice attachments triggered on successful checkout."
        ],
        challenges: [
          "Synchronizing inventory quantities during high-concurrency checkouts to prevent double-selling.",
          "Providing intelligent support dialogs and instant order tracking queries without relying on heavy external LLM services."
        ],
        solutions: [
          "Orchestrated pessimistic locks and strict database transactions using Spring's `@Transactional` boundaries.",
          "Implemented a custom Java-based Levenshtein distance lookup to match user queries with database rules, verifying session security for order queries."
        ]
      }
    },
    {
      id: "proj-2",
      title: "Employee Management System (EMS)",
      subtitle: "Enterprise Portal with Shift Tracking & Dashboard Roles",
      category: "Spring Boot",
      duration: "Nov 2025 - Dec 2025",
      status: "Completed",
      thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&auto=format&fit=crop&q=80"
      ],
      videoUrl: "",
      githubUrl: "https://github.com",
      liveUrl: "https://ems-demo.sathyaganesan.dev",
      description: "An internal corporate tool designed to optimize HR workflows, containing robust checking modules, work hour aggregators, leaves routing system, and granular RBAC levels for separate admin and employee portals.",
      techStack: ["Java", "Spring Boot", "Thymeleaf", "Bootstrap", "JavaScript", "MySQL", "REST API", "Aiven", "Railway"],
      caseStudy: {
        features: [
          "Daily check-in and check-out tracking with active IP logs.",
          "Automatic working hours, overtime, and attendance percentage calculator.",
          "Hierarchical leave management workflows (Request, Approve, Decline).",
          "Granular role privileges with custom dashboard panels for HR, admins, and engineers.",
          "Database connection hosting on Aiven with automated daily backups."
        ],
        challenges: [
          "Computing exact active work-hours across multiple break punches, overnight shifts, and timezone changes.",
          "Ensuring high performance for statistical reports when querying thousands of check-in records."
        ],
        solutions: [
          "Designed a normalized punches schema and aggregated durations using local server timezone logic.",
          "Implemented database indexing on employee IDs and query pagination for ledger endpoints."
        ]
      }
    },
    {
      id: "proj-3",
      title: "Personal Portfolio Website",
      subtitle: "Ultra-Premium Interactive Showcase",
      category: "React",
      duration: "Jun 2026 - Jul 2026",
      status: "Completed",
      thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
      screenshots: [
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80"
      ],
      videoUrl: "",
      githubUrl: "https://github.com",
      liveUrl: "https://sathyaganesan.dev",
      description: "A gorgeous, responsive portfolio demonstrating premium animations, dynamic content filtering, fully-featured administrative dashboard CRUD, and client-side database architecture.",
      techStack: ["React JS", "Vite", "Tailwind CSS", "Framer Motion", "GSAP", "Three.js", "Web3Forms"],
      caseStudy: {
        features: [
          "Rich interactive cursor, magnetic buttons, and GSAP scroll reveals.",
          "Beautiful dark and light theme toggles with smooth layout transitions.",
          "Web3Forms direct mail dispatching with local verification checks.",
          "Fully administrative panel interface for real-time portfolio management via localStorage."
        ],
        challenges: [
          "Maintaining high rendering speeds and 60fps animations while running multiple heavy Framer Motion overlays and Three.js backgrounds.",
          "Creating a database-like experience in a static deployment that supports image uploads and data modifications."
        ],
        solutions: [
          "Configured optimized GSAP timelines and lazily-loaded complex Three.js particle backgrounds.",
          "Engineered a local storage schema and file-to-Base64 converter that encodes uploads directly into localStorage."
        ]
      }
    }
  ],
  education: [
    {
      id: "edu-1",
      institution: "S. Thangapazham Polytechnic College, DOTE",
      degree: "Diploma in Electronics & Communication Engineering",
      duration: "Completion: 2021",
      details: "Completed standard technical curriculum with a focus on electronic circuits, microcontroller programming, and digital signal communication."
    },
    {
      id: "edu-2",
      institution: "Govt. Hr. Sec. School, State Board",
      degree: "SSLC (10th Standard)",
      duration: "Completion: 2018",
      details: "State Board general education studies with primary focus on science and mathematics."
    }
  ],
  certificates: [
    {
      id: "cert-1",
      name: "Certified Java Full Stack Developer",
      issuer: "Vetri IT Systems",
      date: "Nov 2025",
      credentialUrl: "#",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80"
    }
  ],
  services: [
    {
      id: "serv-1",
      title: "Java Full Stack Development",
      description: "End-to-end design of modern web applications using Enterprise Java, Spring Boot microservices, security architectures, and relational SQL schemas.",
      icon: "FaJava"
    },
    {
      id: "serv-2",
      title: "Python Full Stack Development",
      description: "Development of modular, data-focused backends using Django, Flask, or FastAPI integrated with responsive client interfaces.",
      icon: "FaPython"
    },
    {
      id: "serv-3",
      title: "AI Integration & Agents",
      description: "Designing intelligent features, building autonomous agent setups, custom tool bindings, and prompt execution systems.",
      icon: "GiArtificialIntelligence"
    },
    {
      id: "serv-4",
      title: "RAG Applications",
      description: "Retrieval-Augmented Generation using vector indexes, PDF data loaders, and contextually grounded LLM generation.",
      icon: "VscServerProcess"
    },
    {
      id: "serv-5",
      title: "REST API Design & Testing",
      description: "Crafting fully documented, high-efficiency, standardized REST routes. Verified and load-tested with Postman.",
      icon: "AiOutlineApi"
    },
    {
      id: "serv-6",
      title: "Database Engineering",
      description: "Designing normalized MySQL tables, structuring optimal index keys, writing composite JOINs, and orchestrating hosted clouds like Aiven.",
      icon: "DiDatabase"
    }
  ],
  settings: {
    theme: "dark",
    web3formsKey: "YOUR_WEB3FORMS_ACCESS_KEY", // Configurable in the Admin UI
    seo: {
      title: "Sathya Ganesan | Java Full Stack Developer & AI Engineer",
      description: "Professional portfolio of Sathya Ganesan, showcasing enterprise Java development, Spring Boot APIs, and responsive React web experiences.",
      keywords: "Java, Spring Boot, React, Developer Portfolio, Tenkasi, Tamil Nadu, Full Stack Developer, AI Integration"
    },
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "ganesansathya2346@gmail.com",
      whatsapp: "https://wa.me/919786955907",
      phone: "+919786955907"
    }
  }
};
