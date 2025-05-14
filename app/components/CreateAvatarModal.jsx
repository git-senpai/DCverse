"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiUpload } from "react-icons/fi";
import gsap from "gsap";

const CreateAvatarModal = ({
  isOpen,
  onClose,
  editAvatar = null,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
  });

  const modalRef = useRef(null);
  const formFieldsRef = useRef([]);

  // Initialize form data if editing an existing avatar
  useEffect(() => {
    if (editAvatar) {
      setFormData({
        first_name: editAvatar.first_name || "",
        last_name: editAvatar.last_name || "",
        email: editAvatar.email || "",
        avatar: editAvatar.avatar || "",
      });
    } else {
      // Reset form when creating a new avatar
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        avatar: "",
      });
    }
  }, [editAvatar, isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close on Escape key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  // GSAP animation for form fields
  useEffect(() => {
    if (
      isOpen &&
      formFieldsRef.current.length > 0 &&
      typeof window !== "undefined"
    ) {
      // Use a slight delay to ensure DOM is ready
      const animationTimeout = setTimeout(() => {
        gsap.fromTo(
          formFieldsRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.3,
          }
        );
      }, 100);

      return () => clearTimeout(animationTimeout);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={modalRef}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden max-w-md w-full"
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {editAvatar ? "Edit Avatar" : "Create New Avatar"}
              </h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <FiX className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div
                  className="opacity-0" // Initial state for GSAP
                  ref={(el) => (formFieldsRef.current[0] = el)}
                >
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div
                  className="opacity-0" // Initial state for GSAP
                  ref={(el) => (formFieldsRef.current[1] = el)}
                >
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div
                  className="opacity-0" // Initial state for GSAP
                  ref={(el) => (formFieldsRef.current[2] = el)}
                >
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div
                  className="opacity-0" // Initial state for GSAP
                  ref={(el) => (formFieldsRef.current[3] = el)}
                >
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Avatar URL
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      name="avatar"
                      value={formData.avatar}
                      onChange={handleChange}
                      placeholder="https://example.com/avatar.jpg"
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      pattern="https?://.+\.(jpeg|jpg|png|gif|webp)$"
                      title="Enter a valid image URL (http or https) ending with .jpg, .jpeg, .png, .gif, or .webp"
                    />
                    <button
                      type="button"
                      className="px-3 py-2 bg-gray-200 dark:bg-gray-600 rounded-r-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
                    >
                      <FiUpload className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Leave empty to use a random avatar
                  </p>
                </div>
              </div>

              <div
                className="mt-6 flex space-x-3 opacity-0" // Initial state for GSAP
                ref={(el) => (formFieldsRef.current[4] = el)}
              >
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 transition-colors"
                >
                  {editAvatar ? "Save Changes" : "Create Avatar"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateAvatarModal;
