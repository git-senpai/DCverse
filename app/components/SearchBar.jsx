"use client";

import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <motion.div
      className="relative w-full max-w-md mx-auto mb-8"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
        <input
          type="text"
          placeholder="Search avatars..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 dark:text-white transition-all duration-300"
        />
      </div>
    </motion.div>
  );
};

export default SearchBar;
