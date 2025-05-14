"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

// Register TextPlugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(TextPlugin);
}

const Header = ({ username = "User" }) => {
  const [currentTime, setCurrentTime] = useState("");
  const headingRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      setCurrentTime(now.toLocaleDateString("en-US", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  // GSAP animation for the heading
  useEffect(() => {
    if (headingRef.current && typeof window !== "undefined") {
      const text = `Welcome back, ${username}!`;

      // Use setTimeout to ensure this runs after hydration
      setTimeout(() => {
        // Clear any existing content
        gsap.set(headingRef.current, { text: "" });

        // Animate text typing
        gsap.to(headingRef.current, {
          duration: 1.5,
          text: text,
          ease: "none",
          delay: 0.5,
        });
      }, 100);
    }
  }, [username]);

  return (
    <motion.header
      className="w-full mb-8 md:mb-12"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-5xl mx-auto">
        <h1
          ref={headingRef}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          Welcome back, {username}!
        </h1>
        <motion.p
          className="text-sm md:text-base text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {currentTime}
        </motion.p>
      </div>
    </motion.header>
  );
};

export default Header;
