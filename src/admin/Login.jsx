import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiLock, FiUser, FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = sessionStorage.getItem("portfolio_admin_token");
    if (token === "authenticated") {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    // Default mock check
    // We can also check if a custom password exists in localStorage settings
    const storedSettings = localStorage.getItem("portfolio_settings");
    let targetPassword = "admin123";
    if (storedSettings) {
      try {
        const parsed = JSON.parse(storedSettings);
        if (parsed.adminPassword) targetPassword = parsed.adminPassword;
      } catch (err) {}
    }

    if (password === targetPassword) {
      sessionStorage.setItem("portfolio_admin_token", "authenticated");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid password credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 bg-white dark:bg-black-pure text-black dark:text-white duration-300">
      <Link
        to="/"
        className="absolute top-8 left-8 inline-flex items-center gap-2 text-xs uppercase font-bold text-dark-gray hover:text-primary transition-colors clickable"
      >
        <FiArrowLeft className="text-sm" /> Back to Site
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 rounded-3xl glass border border-black/5 dark:border-white/5 shadow-2xl flex flex-col gap-6"
      >
        {/* Title */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-xl text-primary border border-primary/10 mx-auto">
            <FiLock />
          </div>
          <h2 className="text-2xl font-bold font-outfit uppercase tracking-tight mt-3">Admin Login</h2>
          <p className="text-xs text-dark-gray">Enter your administrator passkey to log in.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-dark-gray">Username</label>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-dark-gray">
                <FiUser />
              </span>
              <input
                type="text"
                disabled
                value="admin"
                className="w-full bg-light-gray/25 dark:bg-white/5 rounded-xl pl-10 pr-4 py-3 text-xs border border-transparent focus:outline-none text-dark-gray"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-dark-gray">Passkey</label>
            <div className="relative">
              <span className="absolute left-3.5 top-3.5 text-dark-gray">
                <FiLock />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-light-gray/20 dark:bg-white/5 rounded-xl pl-10 pr-4 py-3 text-xs border border-transparent focus:border-primary/50 focus:outline-none text-black dark:text-white"
              />
            </div>
          </div>

          {error && <span className="text-[10px] text-primary block">{error}</span>}

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-primary hover:bg-primary-dark text-white font-semibold text-xs transition-colors shadow-glow mt-2 cursor-pointer clickable"
          >
            Authenticate
          </button>
        </form>

        <span className="text-[9px] text-center text-dark-gray mt-2">
          Note: Default development passkey is <code className="text-primary font-bold">admin123</code>
        </span>
      </motion.div>
    </div>
  );
};

export default Login;
