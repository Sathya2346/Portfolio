import React from "react";
import { motion } from "framer-motion";
import { useData } from "../context/DataContext";

// Icons
import { FaJava, FaPython } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { VscServerProcess } from "react-icons/vsc";
import { AiOutlineApi } from "react-icons/ai";
import { DiDatabase } from "react-icons/di";
import { FiCloud, FiLayout } from "react-icons/fi";

const iconMap = {
  FaJava: FaJava,
  FaPython: FaPython,
  GiArtificialIntelligence: GiArtificialIntelligence,
  VscServerProcess: VscServerProcess,
  AiOutlineApi: AiOutlineApi,
  DiDatabase: DiDatabase,
  FiCloud: FiCloud,
  FiLayout: FiLayout,
};

const ServiceIcon = ({ name, className }) => {
  const IconComponent = iconMap[name];
  return IconComponent ? <IconComponent className={className} /> : <GiArtificialIntelligence className={className} />;
};

const Services = () => {
  const { services } = useData();

  // Full set of services required by the user, extending the seeded ones if needed
  const displayServices = services.length > 0 ? services : [
    { id: "s-1", title: "Java Full Stack Development", description: "End-to-end design of modern web applications using Enterprise Java, Spring Boot microservices, security architectures, and relational SQL schemas.", icon: "FaJava" },
    { id: "s-2", title: "Python Full Stack Development", description: "Development of modular, data-focused backends using Django, Flask, or FastAPI integrated with responsive client interfaces.", icon: "FaPython" },
    { id: "s-3", title: "AI Integration & Agents", description: "Designing intelligent features, building autonomous agent setups, custom tool bindings, and prompt execution systems.", icon: "GiRobotGravity" },
    { id: "s-4", title: "RAG Applications", description: "Retrieval-Augmented Generation using vector indexes, PDF data loaders, and contextually grounded LLM generation.", icon: "VscServerProcess" },
    { id: "s-5", title: "REST API Design & Testing", description: "Crafting fully documented, high-efficiency, standardized REST routes. Verified and load-tested with Postman.", icon: "AiOutlineApi" },
    { id: "s-6", title: "Database Engineering", description: "Designing normalized MySQL tables, structuring optimal index keys, writing composite JOINs, and orchestrating hosted clouds like Aiven.", icon: "DiDatabase" }
  ];

  return (
    <div className="min-h-screen py-32 px-6 md:px-12 bg-white dark:bg-black-pure text-black dark:text-white duration-300">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Title */}
        <div className="text-center space-y-2">
          <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight">
            My <span className="text-primary">Services</span>
          </h2>
          <p className="text-sm text-dark-gray tracking-wider uppercase">
            High-performance development, cloud systems & intelligent models
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
          {displayServices.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="p-8 rounded-3xl neumorphic-card border border-black/5 dark:border-white/5 flex flex-col gap-6 hover:shadow-glow duration-300"
            >
              {/* Icon Container with Neumorphic inset */}
              <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-3xl text-primary border border-primary/10">
                <ServiceIcon name={service.icon} />
              </div>

              {/* Title & Desc */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold tracking-tight text-black dark:text-white">
                  {service.title}
                </h3>
                <p className="text-xs text-dark-gray leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Decorative line */}
              <div className="w-12 h-[2px] bg-primary/30 mt-auto rounded-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
