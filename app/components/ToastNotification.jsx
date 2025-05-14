"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiAlertTriangle, FiInfo, FiX } from "react-icons/fi";

const ToastNotification = ({
  isVisible,
  message,
  type = "success",
  onClose,
  autoClose = true,
  duration = 5000,
}) => {
  useEffect(() => {
    let timer;
    if (isVisible && autoClose) {
      timer = setTimeout(() => {
        onClose();
      }, duration);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible, autoClose, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <FiCheck className="w-5 h-5 text-white" />;
      case "error":
        return <FiAlertTriangle className="w-5 h-5 text-white" />;
      case "info":
        return <FiInfo className="w-5 h-5 text-white" />;
      default:
        return <FiInfo className="w-5 h-5 text-white" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "info":
        return "bg-blue-500";
      default:
        return "bg-green-500";
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <div
            className={`flex items-center px-4 py-3 rounded-lg shadow-lg ${getBackgroundColor()}`}
          >
            <div className="mr-3">{getIcon()}</div>
            <p className="text-white font-medium">{message}</p>
            <button
              onClick={onClose}
              className="ml-4 text-white opacity-70 hover:opacity-100 transition-opacity"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ToastNotification;
