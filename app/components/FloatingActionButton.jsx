"use client";

import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";

const FloatingActionButton = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-10 flex items-center justify-center w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl text-white"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      <FiPlus className="w-6 h-6" />
    </motion.button>
  );
};

export default FloatingActionButton;
