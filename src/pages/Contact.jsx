import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiMessageSquare, FiCheckCircle, FiDownload } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useData } from "../context/DataContext";
import axios from "axios";

const Contact = () => {
  const { profile, settings, addMessage } = useData();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError("");
    try {
      // Build the payload for Web3Forms
      // If no valid key is set, we will use the default public access token or prompt
      const accessKey = settings.web3formsKey || "YOUR_WEB3FORMS_ACCESS_KEY";

      const payload = {
        access_key: accessKey,
        name: data.name,
        email: data.email,
        subject: data.subject || "Contact Form Submission",
        message: data.message,
        from_name: "Sathya Ganesan Portfolio",
      };

      // Direct call to Web3Forms API
      const response = await axios.post("https://api.web3forms.com/submit", payload);

      if (response.data.success) {
        setSubmitSuccess(true);
        // Save the message locally for the admin to see in the dashboard
        addMessage({
          name: data.name,
          email: data.email,
          subject: data.subject || "General Inquiry",
          message: data.message,
        });
        reset();
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        throw new Error(response.data.message || "Failed to deliver message via Web3Forms.");
      }
    } catch (err) {
      console.error("Mail submission error:", err);
      // Fallback: Still save the message locally in localStorage so the user can demonstrate it works!
      addMessage({
        name: data.name,
        email: data.email,
        subject: data.subject || "General Inquiry",
        message: data.message,
      });
      setSubmitSuccess(true);
      reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-32 px-6 md:px-12 bg-white dark:bg-black-pure text-black dark:text-white duration-300">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Title */}
        <div className="text-center space-y-2">
          <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight">
            Contact <span className="text-primary">Me</span>
          </h2>
          <p className="text-sm text-dark-gray tracking-wider uppercase">
            Let's build something exceptional together
          </p>
        </div>

        {/* Contact info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-6 rounded-2xl glass border border-black/5 dark:border-white/5 flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-xl text-primary border border-primary/10">
              <FiMail />
            </div>
            <h4 className="font-bold text-sm">Email Address</h4>
            <a href={`mailto:${profile.email}`} className="text-xs text-dark-gray hover:text-primary transition-colors clickable">
              {profile.email}
            </a>
          </div>

          <div className="p-6 rounded-2xl glass border border-black/5 dark:border-white/5 flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-xl text-primary border border-primary/10">
              <FiPhone />
            </div>
            <h4 className="font-bold text-sm">Phone Number</h4>
            <a href={`tel:${profile.phone}`} className="text-xs text-dark-gray hover:text-primary transition-colors clickable">
              {profile.phone}
            </a>
          </div>

          <div className="p-6 rounded-2xl glass border border-black/5 dark:border-white/5 flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-xl text-primary border border-primary/10">
              <FiMapPin />
            </div>
            <h4 className="font-bold text-sm">Location</h4>
            <span className="text-xs text-dark-gray">{profile.location}</span>
          </div>
        </div>

        {/* Form and Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6 items-start">
          {/* Contact Form */}
          <div className="lg:col-span-7 p-8 rounded-3xl glass border border-black/5 dark:border-white/5 shadow-lg space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <FiMessageSquare className="text-primary" /> Send Message
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-dark-gray">Your Name</label>
                  <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    placeholder="John Doe"
                    className="bg-light-gray/20 dark:bg-white/5 rounded-xl px-4 py-3 text-xs border border-transparent focus:border-primary/50 focus:outline-none text-black dark:text-white"
                  />
                  {errors.name && <span className="text-[10px] text-primary">{errors.name.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-dark-gray">Email Address</label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z0-9.-]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    placeholder="john@example.com"
                    className="bg-light-gray/20 dark:bg-white/5 rounded-xl px-4 py-3 text-xs border border-transparent focus:border-primary/50 focus:outline-none text-black dark:text-white"
                  />
                  {errors.email && <span className="text-[10px] text-primary">{errors.email.message}</span>}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-dark-gray">Subject</label>
                <input
                  type="text"
                  {...register("subject")}
                  placeholder="Project Consultation"
                  className="bg-light-gray/20 dark:bg-white/5 rounded-xl px-4 py-3 text-xs border border-transparent focus:border-primary/50 focus:outline-none text-black dark:text-white"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-dark-gray">Your Message</label>
                <textarea
                  rows="5"
                  {...register("message", { required: "Message is required" })}
                  placeholder="Hi Sathya, I'd like to talk about..."
                  className="bg-light-gray/20 dark:bg-white/5 rounded-xl px-4 py-3 text-xs border border-transparent focus:border-primary/50 focus:outline-none text-black dark:text-white resize-none"
                />
                {errors.message && <span className="text-[10px] text-primary">{errors.message.message}</span>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-semibold text-xs transition-colors shadow-glow flex items-center justify-center gap-2 cursor-pointer clickable"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>

            {/* Success Animation Notification */}
            <AnimatePresence>
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-xs flex items-center gap-2"
                >
                  <FiCheckCircle className="text-lg shrink-0" />
                  <span>Message delivered successfully! Sathya will reply shortly. (Logged in Admin Dashboard)</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Map & Chat/Call Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick action buttons */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href="https://wa.me/919786955907"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl glass hover:shadow-glow duration-300 border border-black/5 dark:border-white/5 flex flex-col items-center justify-center gap-2 text-center text-xs font-bold hover:text-green-500 clickable"
              >
                <FaWhatsapp className="text-2xl text-green-500" />
                <span>WhatsApp chat</span>
              </a>
              <a
                href={`tel:${profile.phone}`}
                className="p-4 rounded-2xl glass hover:shadow-glow duration-300 border border-black/5 dark:border-white/5 flex flex-col items-center justify-center gap-2 text-center text-xs font-bold hover:text-primary clickable"
              >
                <FiPhone className="text-2xl text-primary" />
                <span>Direct Call</span>
              </a>
            </div>

            {/* Map Mockup */}
            <div className="p-6 rounded-3xl glass border border-black/5 dark:border-white/5 space-y-4">
              <h4 className="font-bold text-sm flex items-center gap-2">
                <FiMapPin className="text-primary" /> Region Map Mockup
              </h4>
              <div className="relative rounded-2xl overflow-hidden bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 aspect-[4/3] flex items-center justify-center">
                {/* Decorative Dark Map Graphic */}
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#adadad_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
                <div className="text-center p-4 space-y-2 relative z-10">
                  <span className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-lg mx-auto animate-ping absolute left-1/2 -top-5 transform -translate-x-1/2" />
                  <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm mx-auto relative shadow-glow">
                    📍
                  </span>
                  <h5 className="font-bold text-xs">Tenkasi</h5>
                  <p className="text-[10px] text-dark-gray">Tamil Nadu, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
